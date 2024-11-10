import { Module } from '@nestjs/common';
import { NotesController } from 'src/notes/notes.controller';

@Module({
    controllers: [NotesController],
})
export class NotesModule {}
