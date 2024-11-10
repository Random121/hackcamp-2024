SELECT load_extension('mod_spatialite');
CREATE TABLE notes{
    id INTEGER primary_key,
    title text NOT NULL,
    note text NOT NULL,
    location POINT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
}
INSERT INTO notes (title, note, location)

SELECT id, title, note, ST_AsText(location)
FROM NOTES
WHERE ST_Distance(location, ST_GeomFROMTEXT(location <= 50)



