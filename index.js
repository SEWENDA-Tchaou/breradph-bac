import dotenv from 'dotenv';
dotenv.config();
import ActualiteRoute from './routes/ActualiteRoute.js';
import ConseilRoute from './routes/ConseilRoute.js';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import express from 'express';
import multer from 'multer'
import mysql from 'mysql';
import cors from 'cors';

const app = express();

const db = mysql.createConnection({
    // host: process.env.DB_HOSTNAME,
    // user: process.env.DB_USERNAME,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_DBNAME
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud_react'
})

db.connect(function(err) {
    if(err) {
        console.log("Error in Connection");
    } else {
        console.log("Connected");
    }
})
app.get('/', (req, res) => {
    res.send('backend!');
  });
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'))
app.use(cors(
    {
        // origin: ['header'],
        origin: 'https://breradph-frontend.vercel.app',
        methods: ['POST', 'GET', 'DELETE', 'PUT'],
        credentials: true
        // allowedHeaders: ['*'],
    }
));

app.use(ActualiteRoute);
app.use(ConseilRoute);



app.listen(3000, () => {
    console.log("Démarrage de mon serveur sur le port 3000")
})
