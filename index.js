const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'db user-name',
    host: 'host name',
    password: 'your password',
    database: 'database-name',
});

db.connect((err) => {
    if (err) {
      console.log(`error connecting: ${err.stack}`);
      return;
    }
    console.log('Database connection success');
  });

app.post('/input-history-olahraga', (req, res) => {
const {time_Add}= req.body
const {user_Id}= req.body
const {type}= req.body
const {time_End}= req.body
const {distance}= req.body
const {sets} = req.body
const {calories} = req.body

console.log(req.body);
console.log(time_Add)

    db.query(
        'INSERT INTO history_olahraga (time_add, user_id, type, time_end, distance, sets, calories) VALUES (?,?,?,?,?,?,?)',
        [time_Add, user_Id, type, time_End, distance, sets, calories], (err, result) => {
        if (err) {
            console.log(err);
            res.send({
            status: err,
            });
        } 
        },
    );

res.send({
    status: 'Laporan berhasil ditambahkan',
});
console.log('Laporan berhasil ditambahkan');
});

app.get('/get-history-olahraga', (req, res) => {
const {user_id} = req.query;
console.log(user_id);
db.query(
    'SELECT * FROM history_olahraga WHERE user_id = ?', user_id,
    (err, result) => {
    if (err) {
        console.log(err);
    }
    if (result.length > 0) {
        res.send({
        status: true,
        data: result,
        });
    } else {
        res.send({
        status: false,
        error: 'tidak ada data history',
        });
    }
    },
);
});

app.post('/input-user-health', (req, res) => {
const {data} = req.body
try{
    data.forEach(i => {
    const {date_time, user_id, weight, height, sleep_start, sleep_end, pulse} = i;

    db.query(
        'INSERT INTO user_health (date_time, user_id, weight, height, sleep_start, sleep_end, pulse) VALUES (?,?,?,?,?,?,?)',
        [new Date(date_time), user_id, weight, height, new Date(sleep_start), new Date(sleep_end), pulse], (err, result) => {
        if (err) {
            console.log(err);
            res.send({
            status: err,
            });
        } 
        },
    );
    });
} catch(error){
    console.log(error);
    res.send({
    status: error,
    });
}

res.send({
    status: 'Laporan berhasil ditambahkan',
});
console.log('Laporan berhasil ditambahkan');
});

app.get('/get-user-health', (req, res) => {
const {user_id} = req.query;
console.log(user_id);
db.query(
    'SELECT * FROM user_health WHERE user_id = ?', user_id,
    (err, result) => {
    if (err) {
        console.log(err);
    }
    if (result.length > 0) {
        res.send({
        status: true,
        data: result,
        });
    } else {
        res.send({
        status: false,
        error: 'tidak ada data history',
        });
    }
    },
);
});

app.listen(3001, () => {
console.log('Listen to port 3001');
});

