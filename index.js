// Grab environment variables from .env file
require('dotenv').config()

// Require packages
const express = require('express')
const {MongoClient} = require('mongodb')
const {json} = require('body-parser')

// Set up server
const app = express()
app.use(json())

// Set up db
MongoClient.connect(process.env.DATABASE_URL)
.then(db => {
   console.log(db)
   app.set('db', db)
})

app.get('/api/users', (req, res, next) => {
   const db = req.app.get('db')
   const User = db.collection('users')
   User.find({}).toArray()
   .then(result => {
      console.log(result)
      res.send(result)
   })
   .catch(err => {
      res.send(err)
   })
})

app.post('/api/users', (req, res, next) => {
   const db = req.app.get('db')
   const User = db.collection('users')
   User.insertOne(req.body)
   .then(result => {
      console.log(result)
      res.send(result)
   })
   .catch(err => {
      res.send(err)
   })
})

app.put('/api/users/:name', (req, res, next) => {
   const db = req.app.get('db')
   const User = db.collection('users')
   User.updateOne({name: req.params.name}, {name: req.body.newName})
   .then(result => {
      res.send(result)
   })
})

app.delete('/api/users/:name', (req, res, next) => {
   const db = req.app.get('db')
   const User = db.collection('users')
   User.deleteOne({name: req.params.name})
   .then(result => {
      res.send(result)
   })
})

app.listen(process.env.PORT, () => {
   console.log(`Listening on port ${process.env.PORT}`)
})

