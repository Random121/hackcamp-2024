import { Module } from '@nestjs/common';
import { NotesModule } from 'src/notes/notes.module';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { TrackerModule } from 'src/tracker/tracker.module';

@Module({
    imports: [NotesModule, TrackerModule, ProfilesModule],
})
export class AppModule {}
