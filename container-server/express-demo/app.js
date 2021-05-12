// STEPS
//npm init --yes
//npm i express
//npm i -g nodemon
//npm i joi
//npm install mongoose
//npm install dotenv
//npm install cors
//npm install bcryptjs
//npm install jsonwebtoken

//to run the app with nodemon, use nodemon app.js
//to run the app with pure node, use node app.js

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');



//MIDDLEWARES
app.use(cors());
//add a piece of meddleware that anable json body request
app.use(express.json());


//ADD ROUTES
const usersRoutes = require('./routes/users.js');
app.use('/api/users', usersRoutes);

const plantsRoutes = require('./routes/plants.js');
app.use('/api/plants', plantsRoutes);

const authRoutes = require('./auth/auth.js');
app.use('/api/auth', authRoutes);







//CONNECT DB MONGODB
mongoose.connect(process.env.DB_CONNECTION, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true  
}, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('BD connected.');
    }
    
});

//PORT if you want to change your enviroment, use "set PORT=5000" on windows
//or "export PORT=5000" on linux, we will keep 3000 by default
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`listening on port ${port}...`);
});


