import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm"

import { charsetCollation } from "./../../config/typeOrm.config"

export class PageTranslationCreate1688704668828 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "page_translations",
                columns: [
                    {
                        name: "id",
                        type: "bigint",
                        width: 20,
                        unsigned: true,
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: "page_id",
                        type: "bigint",
                        width: 20,
                        unsigned: true,
                    },
                    {
                        name: "locale",
                        type: "varchar",
                        length: "3",
                        ...charsetCollation
                    },
                    {
                        name: "title",
                        type: "varchar",
                        length: "250",
                        isNullable: false,
                        default: '""',
                        ...charsetCollation
                    },
                    {
                        name: "slug",
                        type: "varchar",
                        length: "250",
                        isNullable: false,
                        default: '""',
                        ...charsetCollation
                    },
                    {
                        name: "content",
                        type: "text",
                        isNullable: true,
                        default: null,
                        ...charsetCollation
                    },
                    {
                        name: "meta_title",
                        type: "varchar",
                        length: "250",
                        isNullable: false,
                        default: '""',
                        ...charsetCollation
                    },
                    {
                        name: "meta_description",
                        type: "varchar",
                        length: "250",
                        isNullable: false,
                        default: '""',
                        ...charsetCollation
                    },
                    {
                        name: "meta_keywords",
                        type: "varchar",
                        length: "250",
                        isNullable: false,
                        default: '""',
                        ...charsetCollation
                    },
                ],
                engine: 'InnoDB'
            }),
            true,
        )
        await queryRunner.query(`ALTER TABLE page_translations DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`)
        await queryRunner.createForeignKey(
            "page_translations",
            new TableForeignKey({
                name: 'page_translations_page_id_foreign',
                columnNames: ["page_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "pages",
                onDelete: "CASCADE",
            }),
        )
        await queryRunner.createIndices(
            "page_translations",
            [
                new TableIndex({
                    name: 'uk_page_translations',
                    columnNames: ["page_id", "locale"],
                    isUnique: true
                })
            ]
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("page_translations")
    }

}
