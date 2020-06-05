"use strict";
exports.__esModule = true;
var Client = require("pg").Client;
var client = new Client({
    user: "postgres",
    password: "adish",
    host: "localhost",
    port: 5432,
    database: 'userdb'
});
var express = require("express");
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
app.listen(3000);
app.use(bodyParser.json());
function getData(req, res) {
    client.connect().then(function () {
        return console.log("Successfully Connected");
    });
    client.query('select users.empid,users.firstname,users.middlename,users.lastname,users.email,users.phoneno,users.role,users.address,users.customer_id from users order by users.empid asc;', function (err, result) {
        res.status(200).json(result.rows);
    });
}
app.get("/fetchuserdata", getData);
app["delete"]("/deleterow/:id", function (req, res) {
    var id = req.params.id;
    client.query("delete from users where empid=" + id + ";", function (err, result) {
        res.send();
    });
});
app.put('/updateUser/:id', function (req, res) {
    var value = req.body;
    var id = req.params.id;
    client.query("update users set firstname=$1,middlename=$2,lastname=$3,email=$4,phoneno=$5,address=$6,customer_id=$7,role=$8\n  where empid=" + id + ";", [value.firstname, value.middlename, value.lastname, value.email, value.phoneno, value.address, value.customer_id, value.role]);
    res.send();
    console.log(value);
});
app.get('/getroles', function (req, res) {
    client.query("select role_name,role_key from roles", function (error, result) {
        res.status(200).json(result.rows);
    });
});
app.get('/getwebsites', function (req, res) {
    client.query("select customer_id,website from customer", function (error, result) {
        res.status(200).json(result.rows);
    });
});
app.post('/addnewrow', function (req, res) {
    var value = req.body;
    client.query("insert into users (firstname,middlename,lastname,email,phoneno,address,customer_id,role,empid) values($1,$2,$3,$4,$5,$6,$7,$8,$9) returning empid;", [value.firstname, value.middlename, value.lastname, value.email, value.phoneno, value.address, value.customer_id, value.role_name, value.empid])
        .then(function (result) { return res.json(result.rows[0]); });
});
function getcustomer(req, res) {
    client.connect().then(function () {
        return console.log("Successfully Connected");
    });
    client.query('select * from customer order by customer_id asc;', function (err, result) {
        res.status(200).json(result.rows);
    });
}
app.get("/fetchcustomerdata", getcustomer);
app["delete"]("/deletecustomer/:id", function (req, res) {
    var id = req.params.id;
    client.query("delete from customer where customer_id=" + id + ";", function (err, result) {
        res.send();
    });
});
app.put('/updatecustomer/:id', function (req, res) {
    var value1 = req.body;
    var id = req.params.id;
    client.query("update customer set website='" + value1.website + "'\n  where customer_id=" + id + ";");
    res.send();
});
app.post('/addnewcustomer', function (req, res) {
    var value = req.body;
    client.query("insert into customer (customer_id,website) values($1,$2);", [value.customer_id, value.website])
        .then(function (result) { return res.json(result.rows[0]); });
});
app.get('/showusers/:id', function (req, res) {
    var id = req.params.id;
    client.query("select firstname,middlename,lastname,email from users where customer_id=" + id + ";", function (error, result) {
        res.status(200).json(result.rows);
    });
});
