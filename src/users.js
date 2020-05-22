'use strict';

const lodash = require('lodash');
const uuidv4 = require('uuid/v4');

const express = require('express');

const app = express();
app.use(express.json());

// Your code starts here.
// Placeholders for all requests are provided for your convenience.

const users = [];
const authentications = [];
const articles = [];

app.post('/api/user', (req, res) => {
    if (lodash.isEmpty(req.body)) {
        res.status(400).end();
    } else {
        users.push({ userId: req.body.user_id, login: req.body.login, password: req.body.password });
        res.status(201).end();
    }
});

app.post('/api/authenticate', (req, res) => {
    const reqBody = req.body;
    if (lodash.isEmpty(reqBody)) {
        res.status(400).end();
    } else {
        const user = users.find(u => u.login === reqBody.login);
        if (!user) {
            res.status(404).end();
        } else if (user.password !== reqBody.password) {
            res.status(401).end();
        } else {
            const token = uuidv4();
            authentications.push(token);
            res.status(200).send(token).end();
        }
    }
});

app.post('/api/logout', (req, res) => {
    const foundToken = authentications.find(token => token === req.get('authorization'));
    if (!foundToken) {
        res.status(401).end();
    } else {
        authentications.remove(foundToken);
        res.status(200).end();
    }
});

app.post('/api/articles', (req, res) => {
    // ...
});

app.get('/api/articles', (req, res) => {
    // ...
});

exports.default = app.listen(process.env.HTTP_PORT || 3000);