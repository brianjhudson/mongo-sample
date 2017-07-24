// Grab environment variables from .env file
require('dotenv').config()

// Set up server
const express = require('express')

const app = express()

app.listen(process.env.PORT, () => {
   console.log(`Listening on port ${process.env.PORT}`)
})

