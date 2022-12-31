require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const { filterCourse } = require('./controllers/courseController')
const courseRoutes = require('./routes/courses')
const userRoutes = require('./routes/users')
const adminCont = require("./controllers/adminController");
const instructorCont = require("./controllers/adminController");
const corporatetraineeCont = require("./controllers/adminController");


//express app
const app = express()

// middleware
app.use(express.json())

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
  })
  var cors = require('cors')

  app.use(cors())  


  
//routes
app.use('/api/courses',courseRoutes)
app.use('/api/user',userRoutes)
app.post('/filtercourse',filterCourse)
app.use("/api", adminCont);
app.use("/api", instructorCont);
app.use("/api", corporatetraineeCont);



//Connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  })
