
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user";



@Entity()
export class RewardHistory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  points: number;

  @ManyToOne(() => User, (user) => user.rewardby)
  given_by: User;

  @ManyToOne(() => User, (user) => user.rewardto)
  given_to: User;

  @Column({ type: "timestamp" })
  datetime: Date;

}
