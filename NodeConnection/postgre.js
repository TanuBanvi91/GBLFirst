const { Client } = require('pg');
const express = require('express');

const app = express();
const port = 5038;

// Database connection configuration
const dbConfig = {
  user: 'postgres',
  host: 'localhost',
  database: 'mindsphere',
  password: 'Banvi@123',
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
  

app.get('/api/data', (req, res) => {
    const queryText = 'SELECT * FROM mindsdata';
      client.query(queryText)
      .then((result) => {
        res.json(result.rows);
      })
      .catch((err) => {
        console.error('Error executing query', err);
        res.status(500).send('Internal Server Error');
      });
  });

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

  
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });