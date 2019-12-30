//Connect Postgres
const { Pool, Client } = require('pg');
// const connectionString = 'postgres://qyammapipejnvg:054a921bddaf23e3157c25f83caaae011144fe4dfd5b1d9a59d932bc9c1b25cc@ec2-107-22-197-30.compute-1.amazonaws.com:5432/d7jhvlh7d63qqg'
const client = new Client({
    user: 'qyammapipejnvg',
    host: 'ec2-107-22-197-30.compute-1.amazonaws.com',
    database: 'd7jhvlh7d63qqg',
    password: '054a921bddaf23e3157c25f83caaae011144fe4dfd5b1d9a59d932bc9c1b25cc',
    port: 5432,
    ssl: true,
});

client.connect();

module.exports = client;