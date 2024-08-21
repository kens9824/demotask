import { Exclude } from "class-transformer";
import {
  IsEmail,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsOptional,
  Length,
} from "class-validator";

import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RewardHistory } from "./rewardhistory";


@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => RewardHistory, (rewardhistory) => rewardhistory.given_by)
  rewardby: RewardHistory[];

  @OneToMany(() => RewardHistory, (rewardhistory) => rewardhistory.given_to)
  rewardto: RewardHistory[];

}
