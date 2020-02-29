const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
//app.use(cors());

//REQUESTS PERMITIDOS DESDE
app.use(cors({
    origin: ['http://localhost:4200',
        'https://francoraniolo.github.io'
    ]
}));


// var allowedOrigins = ['http://localhost:4200',
//     'https://francoraniolo.github.io/Scrappers/'
// ];
// app.use(cors({
//     origin: function(origin, callback) {
//         // allow requests with no origin 
//         // (like mobile apps or curl requests)
//         if (!origin) return callback(null, true);
//         if (allowedOrigins.indexOf(origin) === -1) {
//             var msg = 'The CORS policy for this site does not ' +
//                 'allow access from the specified Origin.';
//             return callback(new Error(msg), false);
//         }
//         return callback(null, true);
//     }
// }));

//Routes
app.use('/api/articulos', require('./routes/articulos.routes'));


//Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});