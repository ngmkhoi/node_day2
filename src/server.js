const express = require('express');
const port = process.env.PORT || 8080;
const host = process.env.HOST || '0.0.0.0';
const cors = require('cors');
const router = require('./routes');
const responseMiddleware = require('./middlewares/response.middleware');
const errorHandler = require("./middlewares/errorHandler.middleware");
const notFound = require("./middlewares/notFound.middleware");

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
app.use(responseMiddleware);

app.get('/', (req, res) => res.status(200).json({ status: 'healthy' }));
app.use('/api', router);
app.use(notFound)

app.use(errorHandler);

app.listen(port, host, () => console.log(`Server is running on ${host}:${port}`));