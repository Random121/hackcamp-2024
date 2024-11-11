import {
    Body,
    Controller,
    Get,
    Inject,
    Logger,
    NotFoundException,
    Param,
    ParseFloatPipe,
    Post,
    Query,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/notes/comment.entity';
import { CreateCommentDto } from 'src/notes/create-comment.dto';
import { CreateNoteDto } from 'src/notes/create-note.dto';
import { Note } from 'src/notes/note.entity';
import { NotesService } from 'src/notes/notes.service';
import { Repository } from 'typeorm';

@Controller('notes')
export class NotesController {
    constructor(
        @Inject() private notesService: NotesService,
        @InjectRepository(Comment) private commentRepo: Repository<Comment>,
        @InjectRepository(Note) private noteRepo: Repository<Note>,
    ) {}

    @Post()
    create(@Body() createNoteDto: CreateNoteDto) {
        Logger.log('Added note');
        this.notesService.create(createNoteDto);
    }

    @Get('/near')
    getAllNearLocation(
        @Query('longitude', ParseFloatPipe) longitude: number,
        @Query('lattitude', ParseFloatPipe) lattitude: number,
    ) {
        return this.notesService.getAllNearLocation(longitude, lattitude);
    }

    @Post(':id/comments')
    async createComment(
        @Param('id') id: number,
        @Body() createCommentDto: CreateCommentDto,
    ) {
        const comment = new Comment();
        comment.text = createCommentDto.comment;
        comment.username = createCommentDto.username;
        await this.commentRepo.save(comment);

        const note = await this.notesService.getOneById(id);

        if (!note) {
            throw new NotFoundException();
        }

        this.noteRepo
            .createQueryBuilder('note')
            .relation(Note, 'comments')
            .of(note)
            .add(comment);
    }
}
