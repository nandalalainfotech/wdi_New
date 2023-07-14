import {  instanceToPlain, plainToInstance } from "class-transformer";
import { StatusEnum } from "src/enums/status.enum";
import { UserTypeEnum } from "src/enums/userType.enum";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'users'})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 60, name: 'first_name'})
  firstName: string;

  @Column({type: 'varchar', length: 30, name: 'last_name'})
  lastName: string;

  @Column({type: 'varchar', length: 120})
  email: string;

  @CreateDateColumn({ 
    type: 'timestamp', 
    precision: 0,
    nullable: true,
    default: () => null,
    name: 'email_verified_at'
  })
  emailVerifiedAt: Date;

  @Column({type: 'varchar', length: 100, name:'email_token'})
  emailToken: string;

  @Column({type: 'varchar', length: 250})
  password: string;

  @Column({type: 'varchar', length: 16})
  mobile: string;

  @CreateDateColumn({ 
    type: 'timestamp', 
    precision: 0,
    nullable: true,
    default: () => null,
    name: 'mobile_verified_at'
  })
  mobileVerifiedAt: Date;

  @Column({type: 'varchar', length: 6, name:'mobile_token'})
  mobileToken: string;

  /* @Column({
      type: "enum",
      enum: UserTypeEnum,
      nullable: true,
      name:'user_type'
  })
  userType: UserTypeEnum */

  @Column({type: 'tinyint', width: 1, name:'is_admin', default: 0})
  isAdmin: number;

  @Column({type: 'tinyint', width: 1, name:'is_super', default: 0})
  isSuper: number;

  @Column({
      type: "enum",
      enum: StatusEnum,
      nullable: true,
      default: StatusEnum.INACTIVE,
  })
  status: StatusEnum;

  @CreateDateColumn({ 
    type: 'timestamp', 
    precision: 0,
    name: 'created_at'
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp', 
    precision: 0,
    name: 'updated_at'
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamp', 
    precision: 0,
    name: 'deleted_at'
  })
  deletedAt: Date;

  // @BeforeInsert()
  // addCreatedAt(){
  //     this.createdAt = new Date()
  // }

  // @BeforeUpdate()
  // addUpdatedAt(){
  //     this.updatedAt = new Date()
  // }

  
}
