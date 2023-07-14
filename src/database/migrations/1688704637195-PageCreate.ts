import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class PageCreate1688704637195 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "pages",
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
        await queryRunner.query(`ALTER TABLE pages DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("pages")
    }

}
