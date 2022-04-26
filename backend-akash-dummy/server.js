const express = require('express');
const cors = require('cors');
const app = express();

const pool = require("./db");

const pg = require('pg');
pg.types.setTypeParser(pg.types.builtins.INT8, (value) => {
    return parseInt(value);
});
pg.types.setTypeParser(pg.types.builtins.FLOAT8, (value) => {
    return parseFloat(value);
});
pg.types.setTypeParser(pg.types.builtins.NUMERIC, (value) => {
    return parseFloat(value);
});



app.use(cors());
app.use(express.json()); //req.body


app.post('/login', async (req, res) => {
    try {
        const { username, password, userRole } = req.body;
        console.log("body is : ", req.body);
        console.log("username is  :", username);
        console.log("password is  :", password);
        console.log("role is  :", userRole);
        const user;
        if (userRole == "Customer") {
            user = await pool.query(
                `SELECT * 
            FROM customer
            WHERE username = $1 and
                password = $2`, [username, password]
            );
        }
        else {
            user = await pool.query(
                `SELECT * 
            FROM employee
            WHERE username = $1 and
                password = $2 and e_type = $3`, [username, password, userRole]
            );
        }
        
        
        // const user = await pool.query(
        //     `SELECT * 
        //     FROM logindetails`);
        if (user.rows.length === 0) { throw 'no such entry' }
        res.send({
            token: 'VALID',
            username: user.rows[0].username,
            description: user.rows[0].description
        })
        // res.json(user.rows);
        // res.send({
        //     token: 'ERROR'
        // })
    } catch (err) {
        console.error(err.message);
        res.send({
            token: 'ERROR',
            username: 'INVALID',
            description: 'INVALID'
        })

    }
})

app.get("/customer_list", async (req, res) => {
    try {
        const user = await pool.query(`SELECT * from customer`);
        if (user.rows.length == 0) { throw 'no customers present to be shown' }
        res.send({
            
        })
    }
})

/* Example */
// app.get("/players", async (req, res) => {
//     try {
//         const allPlayers = await pool.query(
//             "SELECT * FROM player");
//         res.json(allPlayers.rows);
//         // console.log("All matches sent");
//     } catch (err) {
//         console.error(err.message);
//         // res.json(err.message);
//     }
// });
/* Example END */

// app.get('/', (req, res) => {
//     res.send('Successful response');
// })


app.listen(8080, () => console.log("Server is listening on port 8080"));