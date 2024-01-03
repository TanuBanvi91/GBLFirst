const { Client } = require('pg');
const express = require('express');

const app = express();
const port = process.env.PORT || 3200;
var request = require("superagent");

app.get('getToken', function (req, res) {
  authHeader = req.get("authorization");
  request
  .get('https://msinddev.eu1.mindsphere.io/api/identitymanagement/v3/Users?attributes=meta,name,userName,active')
  .set('authorization', authHeader)
  .set('Accept', 'application/json')
  .then(function(data) {
      res.json({
        resources: data.body.resources
      });
  }).catch(err => {
      console.error(err.message, err.status);
      res.status(err.status).json({ message: 'Failed to fetch users.'});
  });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  
