/**
 * Moment 1 -  CV
 * Caroline Jungefalk Palmgren
 */

//importera paket
const express = require("express");
const sqlite3 = require("sqlite3");
const bodyParser = require("body-parser");

//Anslut till databas
const db = new sqlite3.Database("./db/cv.db");

//Inställningar
const app = express();
const port = 3000;
app.set("view engine", "ejs");         //views
app.use(express.static("public"));     //public
app.use(bodyParser.urlencoded({ extended: true }));

//Routing
app.get("/", (req, res) => {
    res.render("index", {
        error: ""
    });
});

app.get("/form", (req, res) => {
    res.render("form");
});

//Ta emot formulärdata
app.post("/form", (req, res) => {

    //läs in formulärdata
    let coursecode = req.body.coursecode;
    let coursename = req.body.course_name;
    let progression = req.body.progression;
    let syllabus = req.body.syllabus;
    let error = "";

    console.log(coursecode, coursename, progression, syllabus)
    
    res.render("form", {
        error: error
    })
});

app.get("/about", (req, res) => {
    res.render("about");
});

//Starta applikation
app.listen(port, () => {
    console.log("Applikationen har startat på port: " + port);
});