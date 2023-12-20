const express = require('express');
const  dotenv=require("dotenv");
dotenv.config();
const app = express();
const cors=require('cors');
const cookieParser=require('cookie-parser');
const dbConnection = require('./dbConnection');
const path=require('path')
const router = require('./routes/router');
const userRouter = require('./routes/userRouter');
const cartRouter = require('./routes/cartRouter');
const requestLogger = require('./utils/requestLogger');
const errorHandler = require('./utils/errorHandler');

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

//static file
app.use(express.static(path.join(__dirname,'./client/build')));
app.get("*",function(req,res){
  res.sendFile(path.join(__dirname,'.client/build/index.html'))
})

// app.use(cors((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.header('Access-Control-Allow-Credentials', true);
//   // other headers...
//   next();
// }));



// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.header('Access-Control-Allow-Credentials', true);
//   // other headers...
//   next();
// });


// Specify middleware
app.use(express.json());
app.use(cookieParser());

app.use(requestLogger); // Make sure requestLogger middleware is defined and required
app.use('/router', router);
app.use('/user', userRouter);
app.use('/cart', cartRouter);
app.use(errorHandler);

const PORT = 8080;

app.listen(PORT, () => {
  console.group('server started on Port 8080');
});
