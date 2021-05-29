import {Column, Entity, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import {Discussion} from "./discussion.entity";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id_comment: number;

    @Column({nullable: false})
    username: string;

    @Column({nullable: false})
    content: string;

    @Column()
    answer_to: number;

    @ManyToOne(() => Discussion, discussion => discussion.comments, {onUpdate: 'CASCADE', onDelete: 'CASCADE'})
    discussion: Discussion;
}
