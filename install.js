
/**
 * installationsscript för att skapa SQLite-databas samt tabell
 */

//imortera SQLite3
const sqlite3 = require("sqlite3").verbose();

//skapa databas
const db = new sqlite3.Database("./db/cv.db");

//skapa tabell för cv
db.serialize(() => {
    db.run("DROP TABLE IF EXISTS course");

    db.run(`
        CREATE TABLE course(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        coursecode TEXT NOT NULL,
        course_name TEXT NOT NULL,
        progression TEXT NOT NULL,
        syllabus TEXT NOT NULL
        );
        `);
});

//Stäng databas
db.close();