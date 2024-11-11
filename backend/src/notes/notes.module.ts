import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/notes/comment.entity';
import { Note } from 'src/notes/note.entity';
import { NotesController } from 'src/notes/notes.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Note, Comment])],
    controllers: [NotesController],
})
export class NotesModule {}
