import { MigrationInterface, QueryRunner, Table } from "typeorm"

import { charsetCollation } from "./../../config/typeOrm.config"

export class LanguageCreate1688641305397 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "languages",
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
                        name: "name",
                        type: "varchar",
                        length: "30",
                        isNullable: false,
                        default: '""',
                        ...charsetCollation
                    },
                    {
                        name: "locale",
                        type: "varchar",
                        length: "3",
                        isNullable: false,
                        default: '""',
                        ...charsetCollation
                    },
                    {
                        name: "direction",
                        type: "enum",
                        isNullable: true,
                        default: '"ltr"',
                        enum: ["ltr", "rtl"],
                        //...charsetCollation
                    },
                    {
                        name: "image",
                        type: "varchar",
                        length: "180",
                        isNullable: true,
                        default: null,
                        ...charsetCollation
                    },
                    {
                        name: "ordering",
                        type: "tinyint",
                        width: 3,
                        unsigned: true,
                        default: 0
                    },
                    {
                        name: "default",
                        type: "tinyint",
                        width: 3,
                        unsigned: true,
                        default: 0
                    },
                    {
                        name: "status",
                        type: "tinyint",
                        width: 3,
                        unsigned: true,
                        default: 0
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        isNullable: true,
                        default: null
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        isNullable: true,
                        default: null
                    },
                ],
                engine: 'InnoDB'
            }),
            true,
        )
        await queryRunner.query(`ALTER TABLE languages DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("languages")
    }

}
