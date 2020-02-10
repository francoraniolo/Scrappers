const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//REQUESTS PERMITIDOS DESDE
app.use(cors({
    origin: 'http://localhost:4200'
  }));

//Routes
app.use('/api/articulos',require('./routes/articulos.routes'));

//Starting the server
app.listen(app.get('port'), ()=> {
    console.log('Server on port', app.get('port'));
});



