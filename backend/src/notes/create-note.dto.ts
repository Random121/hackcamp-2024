export class CreateNoteDto {
    username: string;
    subject: string;
    body: string;
    tags: string[];
    lattitude: number;
    longitude: number;
}

// Notes
// - id
// - subject TEXT
// - body TEXT
// - lattitude POINT
// - longitude POINT

// Comments
// - id AUTOINCREMENT INTEGER PRIMARY KEY
// - note_id
// - profile_id
// - comment TEXT

// Profiles
// - id
// - username TEXT
// - bio TEXT
