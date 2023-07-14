import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PageEntity } from "src/entities/page.entity";
import { BaseTranslationService } from "src/services/base.translation.service";

@Injectable()
export class PagesService extends BaseTranslationService {
  constructor(
    @InjectRepository(PageEntity)
    repo: Repository<PageEntity>,
  ) {
    super()
    this.repository = repo
  }
}