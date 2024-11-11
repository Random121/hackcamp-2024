import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/notes/comment.entity';
import { Note } from 'src/notes/note.entity';
import { NotesController } from 'src/notes/notes.controller';
import { NotesService } from 'src/notes/notes.service';

@Module({
    imports: [TypeOrmModule.forFeature([Note, Comment])],
    controllers: [NotesController],
    providers: [NotesService],
    exports: [NotesService],
})
export class NotesModule {}
