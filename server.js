const express = require('express');
const port = 3000;
const cors = require('cors');
const router = require('./src/routes');

const app = express();

const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];

app.use(cors({
    origin: function (origin, callback) {
        if(!origin) return callback(null, true)

        if(allowedOrigins.indexOf(origin) !== -1){
            callback(null, true)
        }else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => res.send('API is running'));
app.use('/api', router);

app.listen(port, () => console.log(`Server is running on port ${port}`));