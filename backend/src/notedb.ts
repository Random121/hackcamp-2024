import { db } from './database';

db.serialize(() => {
    db.run("SELECT load_extension('mod_spatialite')", function (err) {
        if (err) {
            console.error('Error Loading SpatiaLite extension:', err);
            return;
        }
    });
    console.log('SpatiaLite extension loaded');
    db.run(
        'CREATE TABLE notes (id INTEGER primary_key, title text, note text, location point) ',
    );
});

export function addNotetoDatabase(title, note, latitude, longitude) {
    return new Promise<void>((resolve, reject) => {
        const insert = db.prepare(
            'INSERT INTO notes(title, note, location) VALUES (?, ?, GeomFromText(?, 4326))',
        );
        // SQL Injection Easter Egg
        const point = `POINT(${latitude} ${longitude})`;
        insert.run(title, note, point, function (err) {
            if (err) {
                console.error('Error inserting note:', err.message);
                reject(err);
                return;
            }
            console.log('New note added');
            resolve();
        });

        insert.finalize();
    });
}

export function retrieveNoteFromDatabase(latitude, longitude) {
    return new Promise((resolve, reject) => {
        // SQL Injection Easter Egg
        const location = `POINT(${longitude} ${latitude})`;
        db.all(
            `
        SELECT id, title, note, ST_AsText(location) AS location
        FROM notes
        WHERE ST_Distance(location, GeomFromText(?, 4326)) <= 50`,
            [location],
            function (err, rows) {
                if (err) {
                    console.error('Error retrieving notes:', err.message);
                    reject(err);
                    return;
                }
                console.log('Retrieved notes:', rows);
                resolve(rows);
            },
        );
    });
}

export function close() {
    return new Promise<void>((resolve, reject) => {
        db.close((err) => {
            if (err) {
                console.error('Error closing database', err.message);
                reject(err);
                return;
            }
            console.log('Database connection closed');
            resolve();
        });
    });
}
