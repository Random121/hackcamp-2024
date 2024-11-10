import sqlite3 from "sqlite3"
import { db } from './database';
db.serialize(() => {
    db.run('CREATE TABLE comments (id INTEGER PRIMARY KEY, title TEXT, user INTEGER, FOREIGN KEY (point) REFERENCES notes(point), FOREIGN KEY (username) REFERENCES profile(username))')
});
export function addCommenttoDatabase(title, note, point, username){
    return new Promise<void>((resolve, reject) => {
    const insert = db.prepare("INSERT INTO comments VALUE(title, id, point, username)");
    insert.run(title, note, point, username, function(err){
        if (err){
            console.error('Error inserting comment:', err.message);
            reject(err);
        }
        console.log("New comment added")
        resolve();
    });
    insert.finalize();
    })
}
export function retrieveCommentFromDatabase(comment) {
    return new Promise<void>((resolve, reject) => {
    db.all(`
        SELECT id, title, user, notes, profile
        FROM comments
        WHERE comments = ?`,
        [comment],
        function (err, rows) {
            if (err) {
                console.error('Error retrieving comment:', err.message);
                reject(err);
            } else {
                console.log('Retrieved comment:', rows);
                resolve();
            }
        });
    
});
}