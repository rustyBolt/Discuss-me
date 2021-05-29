import {Column, Entity, PrimaryGeneratedColumn, OneToOne, ManyToMany, JoinColumn} from "typeorm";
import {Credentials} from "./credentials.entity";
import {Group} from "./group.entity";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id_user: number;

    @Column({nullable: false})
    username: string;

    @OneToOne(()=>Credentials, id_credentials=>id_credentials.user, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    @JoinColumn()
    id_credentials: Credentials;

    @ManyToMany(() => Group, group => group.users, {onUpdate: 'CASCADE'})
    groups: Group[];
}
