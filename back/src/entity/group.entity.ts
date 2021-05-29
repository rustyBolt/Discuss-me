import {Column, Entity, PrimaryGeneratedColumn,ManyToOne, ManyToMany, JoinTable} from "typeorm";
import {User} from "./user.entity";
import {Discussion} from "./discussion.entity";

@Entity()
export class Group {
    @PrimaryGeneratedColumn()
    id_group: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToOne(() => Discussion, discussion => discussion.groups, {onUpdate: 'CASCADE', onDelete: 'CASCADE'})
    discussion: Discussion;

    @ManyToMany(() => User, user => user.groups, { onUpdate: 'CASCADE' })
    @JoinTable()
    users: User[];
}
