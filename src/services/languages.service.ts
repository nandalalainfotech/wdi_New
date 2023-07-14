import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { LanguageEntity } from "src/entities/language.entity";
import { BaseService } from "./base.service";

@Injectable()
export class LanguagesService extends BaseService {
  constructor(
    @InjectRepository(LanguageEntity)
    repo: Repository<LanguageEntity>,
  ) {
    super()
    this.repository = repo
  }
}