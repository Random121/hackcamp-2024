import { Note } from 'src/notes/note.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Note, (note) => note.comments)
    note: Note;

    @Column()
    text: string;

    @Column()
    username: string;
}
