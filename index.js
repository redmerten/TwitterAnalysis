const express = require('express')
//const mongoose = require('mongoose')
const keys = require('./config/keys')

//require('./models/Tweets')

const app = express()

require('./routes/twitterRoutes')(app)

if (process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'))

  const path = require('path')
  app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}


//heroku will pass runtime variables, if dev use 5000
const PORT = process.env.PORT || 5000
//express tells node to listen on port 5000
app.listen(PORT)



