const express = require('express');
const port = process.env.PORT || 8080;
const host = process.env.HOST || '0.0.0.0';
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

app.get('/health', (req, res) => res.status(200).json({ status: 'healthy' }));
app.use('/api', router);

app.listen(port, host, () => console.log(`Server is running on ${host}:${port}`));