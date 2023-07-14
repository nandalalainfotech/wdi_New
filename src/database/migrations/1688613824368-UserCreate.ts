import { MigrationInterface, QueryRunner, Table } from "typeorm"

import { charsetCollation } from "./../../config/typeOrm.config"

export class UserCreate1688613824368 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
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
                        name: "first_name",
                        type: "varchar",
                        length: "60",
                        isNullable: false,
                        default: '""',
                        ...charsetCollation
                    },
                    {
                        name: "last_name",
                        type: "varchar",
                        length: "30",
                        isNullable: false,
                        default: '""',
                        ...charsetCollation
                    },
                    {
                        name: "email",
                        type: "varchar",
                        length: "120",
                        isNullable: true,
                        default: null,
                        ...charsetCollation
                    },
                    {
                        name: "email_verified_at",
                        type: "timestamp",
                        isNullable: true,
                        default: null
                    },
                    {
                        name: "email_token",
                        type: "varchar",
                        length: "100",
                        isNullable: true,
                        default: null,
                        ...charsetCollation
                    },
                    {
                        name: "password",
                        type: "varchar",
                        length: "255",
                        isNullable: true,
                        default: null,
                        ...charsetCollation
                    },
                    {
                        name: "mobile",
                        type: "varchar",
                        length: "16",
                        isNullable: true,
                        default: null,
                        ...charsetCollation
                    },
                    {
                        name: "mobile_verified_at",
                        type: "timestamp",
                        isNullable: true,
                        default: null
                    },
                    {
                        name: "mobile_token",
                        type: "varchar",
                        length: "6",
                        isNullable: true,
                        default: null,
                        ...charsetCollation
                    },
                    {
                        name: "is_admin",
                        type: "tinyint",
                        width: 3,
                        unsigned: true,
                        default: 0
                    },
                    {
                        name: "is_super",
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
                    {
                        name: "deleted_at",
                        type: "timestamp",
                        isNullable: true,
                        default: null
                    },
                ],
                engine: 'InnoDB'
            }),
            true,
        )
        await queryRunner.query(`ALTER TABLE users DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users")
    }

}
