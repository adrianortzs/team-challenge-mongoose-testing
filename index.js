const express = require('express')
const {dbConnection} = require('./config/config')
const routes = require('./routes/index.js');
const app = express()
const port = 3000

dbConnection()

app.use(express.json())
app.use('/', routes);

app.listen(port, () => console.log(`Server started on port ${port}`))