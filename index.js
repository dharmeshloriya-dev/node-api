let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let loginRouter = require('./route/user')
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://root:root@cluster0-r5w6y.mongodb.net/user_table?retryWrites=true&w=majority', {
  useNewUrlParser: true
}).catch(err => {
    console.log('db connexrion error::: ', err);
});

app.use(bodyParser.json())

app.use(loginRouter)

app.listen('8080', () => console.log('Server has been runing on localhost:8080'))