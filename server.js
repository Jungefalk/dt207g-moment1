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

    //läs ut data från databasen
    db.all("SELECT * FROM course;", (err, rows) => {
        if (err) {
            console.error(err.message)
        };

        res.render("index", {
            rows: rows
        });

    });
});

app.get("/form", (req, res) => {
    res.render("form", {
        errors: [],
        coursecode: "",
        course_name: "",
        progression: "",
        syllabus: ""
    });
});

//Ta emot formulärdata
app.post("/form", (req, res) => {

    //läs in formulärdata
    let coursecode = req.body.coursecode;
    let course_name = req.body.course_name;
    let progression = req.body.progression;
    let syllabus = req.body.syllabus;
    let errors = [];

    //kontrollera att input är korrekt i fyllt
    if (coursecode === "") {
        errors.push("Fyll i fältet för kurskod")
    }
    if (course_name === "") {
        errors.push("Fyll i fältet för kursnamn")
    };
    if (progression === "") {
        errors.push("Fyll i fältet för progression")
    };
    if (progression != "" &&
        progression.toLowerCase() != "a" &&
        progression.toLowerCase() != "b" &&
        progression.toLowerCase() != "c") {
        errors.push("Fyll i korrekt värde för progression. A, B eller C.")
    };
    if (syllabus === "") {
        errors.push("Fyll i länk till kursplan")
    };

    //Kolla att det inte finns några felmeddelanden
    if (errors.length === 0) {

        //lagra i databas
        const stmt = db.prepare("INSERT INTO course(coursecode, course_name, progression, syllabus)VALUES(?, ?, ?, ?);");
        stmt.run(coursecode, course_name, progression, syllabus);
        stmt.finalize();

        //Töm inputfälten
        coursecode = "";
        course_name = "";
        progression = "";
        syllabus = "";

        //Skicka användare till startsidan
        return res.redirect("/");
    };

    res.render("form", {
        errors: errors,
        coursecode: coursecode,
        course_name: course_name,
        progression: progression,
        syllabus: syllabus
    });
});

//Route för att rensa databasen från kurser
app.get("/delete", (req, res) => {
    db.run("DELETE FROM course", (err) => {
        if (err){
            console.error(err);
        }

        res.redirect("/");
});

});

app.get("/about", (req, res) => {
    res.render("about");
});

//Starta applikation
app.listen(port, () => {
    console.log("Applikationen har startat på port: " + port);
});