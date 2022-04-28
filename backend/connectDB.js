const { Client } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const session = require('express-session');
const app = require('./index');

const client = new Client({ user: process.env.user, database: process.env.db, password: process.env.pswd, host: process.env.host, port: process.env.psql_port })
client.connect();
// console.log(process.env.user, process.env.pswd)

const store = new (require('connect-pg-simple')(session))({
    pool: client,
})

const sessobj = 
    session({
        store: store,
        secret: 'secret',
        saveUninitialized: false,
        resave: false,
        cookie: {
            secure: false,
            httpOnly: false,
            sameSite: false,
        },
    });

// const sessobj = 
//     session({
//         // store: store,
//         secret: 'secret',
//         saveUninitialized: false,
//         resave: false,
//         cookie: {
//             secure: false,
//             httpOnly: false,
//             sameSite: false,
//             maxAge: 1000 * 60 * 5,
//         },
//     });

// exports.sessobj=sessobj;
exports.client=client;
