import { Module } from '@nestjs/common';
import { NotesModule } from 'src/notes/notes.module';
import { TrackerGateway } from 'src/tracker/tracker.gateway';

@Module({
    imports: [NotesModule],
    providers: [TrackerGateway],
})
export class TrackerModule {}
