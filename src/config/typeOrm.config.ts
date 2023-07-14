import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

import { getMigrationDbConfig } from './database.config';

export const charsetCollation = {
    charset: "utf8mb4",
    collation: "utf8mb4_unicode_ci"
}

config();
 
const configService = new ConfigService();

export default new DataSource(getMigrationDbConfig(configService))