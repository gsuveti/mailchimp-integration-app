/// <reference path="../typings/tsd.d.ts"/>
import {Request, Response} from "express";

var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile');
var moment = require('moment');
var path = require('path');
const fs = require('fs');
const PUBLIC_FOLDER = '/public';
const CHANGES_FOLDER = 'changes';
const CHANGES_PATH = path.join(__dirname, '..', PUBLIC_FOLDER, CHANGES_FOLDER);
const DATE_FORMAT = "YYYY-MM-DD-HH:MM:SS:SSS";

/* GET home page. */
router.get('/', function (req: Request, res: Response, next: Function) {
    const name = moment().format(DATE_FORMAT);
    const filePath = path.join(CHANGES_PATH, `${name}.json`);
    jsonfile.writeFileSync(filePath, req.query);
    res.json(req.query);
});

router.post('/', function (req: Request, res: Response, next: Function) {
    const name = moment().format(DATE_FORMAT);
    const filePath = path.join(CHANGES_PATH, `${name}.json`);
    jsonfile.writeFileSync(filePath, req.body);
    res.json(req.body);
});


router.get('/changes', function (req: Request, res: Response, next: Function) {
    const files = [];

    fs.readdirSync(CHANGES_PATH).forEach(file => {
        files.push(file);
    });

    res.render('index', {
        files: files.sort().reduce((acc, file) => {
            acc.push({
                name: file,
                href: path.join(CHANGES_FOLDER, file)
            });
            return acc;
        }, [])
    });
});

module.exports = router;
