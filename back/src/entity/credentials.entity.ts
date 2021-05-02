import {Column, Entity, PrimaryGeneratedColumn, OneToOne} from "typeorm";
import {User} from "./user.entity";



@Entity()
export class Credentials {
    @PrimaryGeneratedColumn()
    id_credentials: number;

    @Column({nullable: false})
    email: string;

    @Column({nullable: false})
    password: string;

    @OneToOne(() => User, user => user.id_credentials, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    user: User;
}
