const { Client } = require('pg');
const express = require('express');

const app = express();
// const port = 5400;
const port = process.env.PORT || 5400;

// Database connection configuration
const dbConfig = {
  user: 'a9s7397e5f9bee50dff91c6f3d3be66fbc8c25447c1',
  host: '127.0.0.1',
  database: 'pg',
  password: 'a9s169d523e81d348a79b3ae7e71c6af9f690f2a4a8',
  port: 5432, 
};

// Create a new client instance
const client = new Client(dbConfig);

// Connect to the database
client.connect()
  .then(() => {
    console.log('Connected to the PostgreSQL database');
  })
  .catch((err) => {
    console.error('Error connecting to the PostgreSQL database', err);
  })
  

  //posting the data

  app.use(express.json());



 
  // app.post('/api/data', (req, res) => {

  //   const { INPUT_FLOW, _time } = req.body;
  //   const queryText = 'INSERT INTO input_flow("INPUT_FLOW", "_time") VALUES($1, $2)';
  
  //   const dataValues = INPUT_FLOW.map((inputFlow, index) => [JSON.stringify(inputFlow), _time[index]]);

  //   dataValues.forEach((values) => {
      
  //     client.query(queryText, values)
  //       .then((result) => {
  //         console.log('Inputflow data inserted successfully');
  //       })
  //       .catch((err) => {
  //         console.error('Error executing query', err);
  //       });
  //   });
  // });


  //get the data from the database

 
  // app.get('/api/data', (req, res) => {
  //   const queryText = 'SELECT * FROM mindtable';
  //   client.query(queryText)
  //     .then((result) => {
  //       res.json(result.rows);
  //     })
  //     .catch((err) => {
  //       console.error('Error executing query', err);
  //       res.status(500).send('Internal Server Error');
  //     });
  // });


//   app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
//   });



//============================================


// const { Client } = require('pg');
// const express = require('express');

// const app = express();
// const port = process.env.PORT || 5400;

// // Check if running in Cloud Foundry environment
// if (process.env.VCAP_SERVICES) {
//   try {
//     const vcapServices = JSON.parse(process.env.VCAP_SERVICES);
//     const pgService = vcapServices['user-provided'].find(service => service.name === 'mypg');

//     if (pgService) {
//       const pgCredentials = pgService.credentials;

//       // Update dbConfig with service credentials
//       const dbConfig = {
//           user: 'a9s7397e5f9bee50dff91c6f3d3be66fbc8c25447c1',
//           host: 'pod10cfb1-psql-master-alias.node.dc1.a9ssvc',
//           database: 'pg',
//           password: 'a9s169d523e81d348a79b3ae7e71c6af9f690f2a4a8',
//           port: 5432, 
//         };

//       // Create a new client instance
//       const client = new Client(dbConfig);

//       // Connect to the database
//       client.connect()
//         .then(() => {
//           console.log('Connected to the PostgreSQL database');
//         })
//         .catch((err) => {
//           console.error('Error connecting to the PostgreSQL database', err);
//         });

//       // Use the client for your routes
//       app.get('/api/data', (req, res) => {
//         const queryText = 'SELECT * FROM mindtable';
//         client.query(queryText)
//           .then((result) => {
//             res.json(result.rows);
//           })
//           .catch((err) => {
//             console.error('Error executing query', err);
//             res.status(500).send('Internal Server Error');
//           });
//       });
//     } else {
//       console.error('Error: PostgreSQL service not found in VCAP_SERVICES');
//     }
//   } catch (error) {
//     console.error('Error parsing VCAP_SERVICES', error);
//   }
// } else {
//   console.error('Error: VCAP_SERVICES environment variable not found');
// }

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});








