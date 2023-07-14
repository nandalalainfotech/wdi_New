import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { PageEntity } from "src/entities/page.entity";

@Entity({ name: 'page_translations' })
export class PageTranslationEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => PageEntity, (page) => page.translations, {
        lazy: true,
        createForeignKeyConstraints: false
    })
    @JoinColumn({ name: "page_id" })
    page: PageEntity

    @Column({ type: 'varchar', length: 3 })
    locale: string;

    @Column({ type: 'varchar', length: 250 })
    title: string;
}