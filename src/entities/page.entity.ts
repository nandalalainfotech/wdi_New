import { PageTranslationEntity } from "src/entities/pageTranslation.entity";
import { LocaleDirectionEnum } from "src/enums/localeDirection.enum";
import { StatusEnum } from "src/enums/status.enum";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'pages' })
export class PageEntity {
    @PrimaryGeneratedColumn()
    id: number;

    /* @Column({ type: 'varchar', length: 30 })
    title: string; */

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

    @OneToMany(() => PageTranslationEntity, (translation) => translation.page)
    translations: PageTranslationEntity[]

    static translatedAttributes = ['title'];
}