import { Comment } from 'src/notes/comment.entity';
import {
    Column,
    Entity,
    OneToMany,
    Point,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Note {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    subject: string;

    @Column()
    body: string;

    @Column('geography')
    location: Point;

    @OneToMany(() => Comment, (comment) => comment.note)
    comments: Comment[];
}
