

const connectToMongo = require('./db');
connectToMongo();


const express = require('express')
const app = express()
const port = 5000

app.use(express.json())// middleware to view res json objs
var cors = require('cors')



app.use(cors())

//Available routes

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'))
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`inotebook app listening on port ${port}`)
})