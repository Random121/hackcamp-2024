import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/notes/comment.entity';
import { Note } from 'src/notes/note.entity';
import { NotesModule } from 'src/notes/notes.module';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { TrackerModule } from 'src/tracker/tracker.module';

@Module({
    imports: [
        NotesModule,
        TrackerModule,
        ProfilesModule,
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: '127.0.0.1',
            port: +process.env.DATABASE_PORT,
            username: 'postgres',
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            entities: [Note, Comment],
            synchronize: true,
        }),
    ],
})
export class AppModule {}
