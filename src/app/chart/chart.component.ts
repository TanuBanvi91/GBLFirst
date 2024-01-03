import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../data.service';
import { HttpHeaders } from '@angular/common/http';
import { Chart,registerables  } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';

 
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  token:string='';
  fromDate:string='';
  toDate:string='';
  newFromDate:string='';
  newToDate:string='';
  efficiencyValue: number[] = [];
  efficiencyTime:number[]=[];
  chart: any;
  chart1: any;
  chart2: any;
  startTime: number=0;
  endTime:number=0;
  efficiencyAverage:number[] = [];
  efficiencyAverage1:number[] = [];
  Average:number[] = [];
  firstTime : number[]=[];
  inputflowValue: number[] = [];
  inputflowTime:number[]=[];
  intervalValue:number = 0;
  intervalUnit:string='';


  constructor(private DataService: DataService) { 
    Chart.register(...registerables);
    Chart.register(zoomPlugin);

  }



  fetchVariableData(): void{

  
    const headers = new HttpHeaders().set('Authorization', `Bearer ,${this.token}`);
    this.newFromDate = new Date(this.fromDate).toISOString()
    this.newToDate = new Date(this.toDate).toISOString()

      
        // console.log(newToDate);
    this.DataService.fetchVariable(this.token).subscribe(
      data=>{

        // fetching the efficiency value from mindsphere

        const efficiencyList = data;
        this.efficiencyValue = efficiencyList.map((efficiency: { EFFICIENCY: number }) => efficiency.EFFICIENCY);
        // this.efficiencyValue = efficiencyList.map((efficiency: { Flow: number }) => efficiency.Flow);

        
        // fetching the effieciency time from mindsphere
        
        this.efficiencyTime = efficiencyList.map((efficiency: { _time: number }) => efficiency._time);
        // console.log(this.efficiencyTime[0]);

        
        //chart for efficiencyValue

        this.chart = new Chart('canvas',{
          type: 'line',
          data:{
            labels: this.efficiencyTime,
          datasets: [{
              label: 'Efficiency',
              data: this.efficiencyValue,
              borderWidth: 3,
              fill:false,
              backgroundColor:'rgba(93,175,89,0.1)',
              borderColor:'#3e95cd'
          },
        ],
      },
  
      options: {
        scales: {
            y: {
                beginAtZero: false,
                min:0.75, 
                max: 0.95
            },
            
        },
  
        plugins: {
          zoom: {
            zoom: {
              wheel: {
                enabled: true
              },
              pinch: {
                enabled: true
              },
              mode: 'xy'
            }
          }
        }
    }
      
        });

         
      },
      error =>{
        console.error(error);
      }
    )


    //===================  Input FLow     ======================


    this.DataService.fetchInputflow().subscribe(
      data=>{

        // fetching the inputflow value from mindsphere

        const inputflowList = data;
        this.inputflowValue = inputflowList.map((inputflow: { INPUT_FLOW: number }) => inputflow.INPUT_FLOW);
        // this.inputflowValue = inputflowList.map((inputflow: { Motor_Current: number }) => inputflow.Motor_Current);

        
        // fetching the effieciency time from mindsphere
        
        this.inputflowTime = inputflowList.map((inputflow: { _time: number }) => inputflow._time);


        //chart
        this.chart1 = new Chart('canvas1',{
          type: 'bar',
          data:{
            labels: this.inputflowTime,
          datasets: [{
              label: 'Input Flow',
              data: this.inputflowValue,
              borderWidth: 3,
              // fill:true,
              backgroundColor:'rgba(93,175,89,0.1)',
              borderColor:'#3e95cd'
          },
        ],
      },
  
      options: {
        scales: {
            y: {
                beginAtZero: false
                
            }
        },
  
        plugins: {
          zoom: {
            zoom: {
              wheel: {
                enabled: true
              },
              pinch: {
                enabled: true
              },
              mode: 'xy'
            }
          }

          
        }

        
    }
      
        });


      },
      error =>{
        console.error(error);
      }


    )

    this.DataService.fetchAggregate(this.newFromDate, this.newToDate).subscribe(
      data=>{

        // fetching the Aggregate efficiency value from mindsphere

        const efficiencyList = data.aggregates;
        this.efficiencyAverage = efficiencyList.map((efficiency: { EFFICIENCY: { average: number } }) => efficiency.EFFICIENCY.average);    
        
        
        // fetching the Aggregate effieciency time from mindsphere
        
        this.firstTime = efficiencyList.map((efficiency: {EFFICIENCY: {firsttime:number}}) => efficiency.EFFICIENCY.firsttime)
        this.startTime = this.firstTime[0];
        this.endTime = this.firstTime[this.firstTime.length - 1];
        console.log(this.startTime);

        // let startDate = new Date(this.startTime);
        // let endDate = new Date(this.endTime);

        // // time_diff is in milliseconds
        // let time_diff = endDate.getTime() - startDate.getTime();

        // // calculating the day diffrence
        // let day_diff = Math.round((time_diff)/(24*60*60*1000)); 
        // console.log(day_diff);

      

        //chart for Aggregate efficiencyValue

      
          this.chart2 = new Chart('canvas2',{
          type: 'line',
          data:{
            labels: this.firstTime,
          datasets: [{
              label: 'Aggregate Efficiency',
              data: this.efficiencyAverage,
              borderWidth: 3,
              fill:false,
              backgroundColor:'rgba(93,175,89,0.1)',
              borderColor:'#3e95cd'
          },
        ],
      },
  
      options: {
        scales: {
            y: {
                beginAtZero: false,
             
            },
                   
                    
        },
  
        plugins: {
          zoom: {
            zoom: {
              wheel: {
                enabled: true
              },
              pinch: {
                enabled: true
              },
              mode: 'xy',
              onZoom: ({chart}: {chart: any}) => {            
              
              const scales = chart.options.scales;

              if (scales && scales.x && scales.x.min && scales.x.max) {
                let scaleMin = scales.x.min;
                let scaleMax = scales.x.max;
               
                scaleMin = Math.max(0, Math.min(scaleMin, this.firstTime.length - 1));
                scaleMax = Math.max(0, Math.min(scaleMax, this.firstTime.length - 1));
            
                // Get the actual time values from the arrays
                this.startTime = this.firstTime[Math.floor(scaleMin)];
                this.endTime = this.firstTime[Math.floor(scaleMax)];
            
                //calculating the intervalUnit and intervalValue

                let startDate = new Date(this.startTime);
                let endDate = new Date(this.endTime);

                // time_diff is in milliseconds
                let time_diff = endDate.getTime() - startDate.getTime();

                // calculating the day diffrence
                let day_diff = Math.round((time_diff)/(24*60*60*1000)); 
                console.log(day_diff);

                if(day_diff > 1){
                  this.intervalUnit = 'day';
                  this.intervalValue = 1;
                  this.DataService.zoomChart(this.intervalUnit, this.intervalValue, this.startTime, this.endTime).subscribe(
                    zoomData => {                   
                      // console.log('hi');
                    },
                    error => {
                      console.error(error);
                    }
                  );
                }
                else if(day_diff < 1){
                  this.intervalUnit = 'hour';
                  this.intervalValue = 1;
                  this.DataService.zoomChart(this.intervalUnit, this.intervalValue, this.startTime, this.endTime).subscribe(
                    zoomData => {                   
                      console.log('hi');
                    },
                    error => {
                      console.error(error);
                    }
                  );
                }
                        

                // Update the API call with the new parameters
                // this.DataService.zoomChart(this.token, this.intervalUnit, this.startTime, this.endTime).subscribe(
                //   zoomData => {                   
                //     console.log('hi');
                //   },
                //   error => {
                //     console.error(error);
                //   }
                // );
                // Update the API call with the new parameters
                
            }
          }
        }
      }
    }
  }
        });

      
      },
      error =>{
        console.error(error);
      }
    )


    
    
  }

  // post the data 

  // postData() {


  //   const inputflowData = {
  //     INPUT_FLOW: this.inputflowValue.map(Number),
  //     _time: this.inputflowTime.map(time => new Date(time).toISOString()), 
  //   };


  //   this.DataService.saveInputflowData(inputflowData).subscribe(
  //     (response) => {
  //       console.log('Data posted successfully', response);
  //     },
  //     (error) => {
  //       console.error('Error posting data', error);
  //     }
  //   );
  // }
  
  ngOnInit(): void {
  }

}
