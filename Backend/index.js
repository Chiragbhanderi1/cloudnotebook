const connetToMongo = require('./db')
const cors = require('cors')
connetToMongo()

const express = require('express')
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())
// available routes
app.use('/api/auth', require('./routes/auth') )
app.use('/api/notes', require('./routes/notes') )

app.listen(port, () => {
  console.log(`Notebook backend listening on port http://localhost:${port}`)
})