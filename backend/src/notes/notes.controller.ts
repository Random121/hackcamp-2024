import {
    Body,
    Controller,
    Get,
    Logger,
    Param,
    ParseIntPipe,
    Post,
    Query,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/notes/comment.entity';
import { CreateCommentDto } from 'src/notes/create-comment.dto';
import { CreateNoteDto } from 'src/notes/create-note.dto';
import { Note } from 'src/notes/note.entity';
import { Repository } from 'typeorm';

@Controller('notes')
export class NotesController {
    constructor(@InjectRepository(Note) private noteRepo: Repository<Note>) {}

    @Post()
    create(@Body() createNoteDto: CreateNoteDto) {
        Logger.log('added note');
        this.noteRepo.save(
            this.noteRepo.create({
                username: createNoteDto.username,
                subject: createNoteDto.subject,
                body: createNoteDto.body,
                location: {
                    type: 'Point',
                    coordinates: [
                        +createNoteDto.longitude,
                        +createNoteDto.lattitude,
                    ],
                },
            }),
        );
    }

    @Get('/near')
    getAllNearLocation(
        @Query('lattitude', ParseIntPipe) lattitude: number,
        @Query('longitude', ParseIntPipe) longitude: number,
    ) {
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
            .getMany();
    }

    @Post(':id/comments')
    async createComment(
        @Param('id') id: number,
        @Body() createCommentDto: CreateCommentDto,
    ) {
        const comment = new Comment();
        comment.text = createCommentDto.comment;
        comment.username = createCommentDto.username;
        this.noteRepo.save(comment);

        const note = await this.noteRepo.findOneBy({
            id: id,
        });

        if (!note) {
            return;
        }
        Logger.log(note.subject);

        note.comments?.push(comment);

        this.noteRepo.save(note);
    }
}
