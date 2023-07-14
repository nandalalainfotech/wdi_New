import { LocaleDirectionEnum } from "src/enums/localeDirection.enum";
import { StatusEnum } from "src/enums/status.enum";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'languages' })
export class LanguageEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 30 })
    name: string;

    @Column({ type: 'varchar', length: 3 })
    locale: string;

    @Column({
        type: "enum",
        enum: LocaleDirectionEnum,
        nullable: true,
        default: LocaleDirectionEnum.LTR,
    })
    direction: LocaleDirectionEnum;

    @Column({ type: 'varchar', length: 180, name: 'image', default: () => '' })
    image: string;

    @Column({ type: 'tinyint', width: 1, default: 0 })
    ordering: number;

    @Column({ type: 'tinyint', width: 1, default: 0 })
    default: number;

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

    @BeforeInsert()
    addCreatedAt(){
        this.createdAt = new Date()
    }

    @BeforeUpdate()
    addUpdatedAt(){
        this.updatedAt = new Date()
    }
}