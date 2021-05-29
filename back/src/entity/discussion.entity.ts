import {Column, Entity, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import {Group} from "./group.entity";
import {Comment} from "./comment.entity";

@Entity()
export class Discussion {
    @PrimaryGeneratedColumn()
    id_discussion: number;

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    description: string;

    @OneToMany(() => Group, group => group.discussion)
    groups: Group[];

    @OneToMany(() => Comment, comment => comment.discussion)
    comments: Comment[];
}
