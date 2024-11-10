import sqlite3 from "sqlite3"
import { db } from './database';

db.serialize(() => {
    db.run('CREATE TABLE profile (id INTEGER primary_key, username text)')
});
export function addProfiletoDatabase(name, bio, point){
    
    const insert = db.prepare("INSERT INTO comments VALUE(username)");
    insert.run(name,bio, point, function(err){
        if (err){
            console.error('Error inserting profile:', err.message);
        }
        console.log("New profile added")
    });

    insert.finalize();
}
export function retrieveProfileFromDatabase(name: string) {
    return new Promise((resolve, reject) => {
        db.all(`
            SELECT id, username AS profile
            FROM notes
            WHERE username = ?`,  
            [name],  
            function (err, rows) {
                if (err) {
                    console.error('Error retrieving profile:', err.message);
                    reject(err);
                } else {
                    console.log('Retrieved profile:', rows);
                    resolve(rows);
                }
            });
    });
}





db.close();