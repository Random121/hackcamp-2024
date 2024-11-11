import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/notes/comment.entity';
import { CreateNoteDto } from 'src/notes/create-note.dto';
import { Note } from 'src/notes/note.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotesService {
    constructor(
        @InjectRepository(Note) private noteRepo: Repository<Note>,
        @InjectRepository(Comment) private commentRepo: Repository<Comment>,
    ) {}

    create(createNoteDto: CreateNoteDto) {
        const note = new Note();
        note.username = createNoteDto.username;
        note.subject = createNoteDto.subject;
        note.body = createNoteDto.body;
        note.location = {
            type: 'Point',
            coordinates: [+createNoteDto.longitude, +createNoteDto.lattitude],
        };
        this.noteRepo.save(note);
    }

    getAllNearLocation(longitude: number, lattitude: number) {
        const position = {
            type: 'Point',
            coordinates: [longitude, lattitude],
        };

        return this.noteRepo
            .createQueryBuilder('note')
            .where(
                `ST_DWithin(location, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(location)), 50)`,
            )
            .setParameters({
                origin: JSON.stringify(position),
            })
            .leftJoinAndSelect(
                'note.comments',
                'comment',
                'comment.note = note.id',
            )
            .getMany();
    }

    getOneById(id: number) {
        return this.noteRepo.findOneBy({
            id: id,
        });
    }
}
