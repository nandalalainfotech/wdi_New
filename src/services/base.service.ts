import { IPaginationMeta, IPaginationOptions, Pagination, paginate, paginateRaw, paginateRawAndEntities } from "nestjs-typeorm-paginate";
import { DataSource, EntityMetadata, FindManyOptions, FindOptionsRelations, FindOptionsSelect, FindOptionsWhere, ObjectLiteral, Repository } from "typeorm";

export class BaseService {
  protected repository: Repository<ObjectLiteral>;

  find(where: FindOptionsWhere<ObjectLiteral>, options?: FindManyOptions<ObjectLiteral>): Promise<ObjectLiteral[]> {
    options.where = where
    return this.repository.find(options);
  }

  findOne(where: FindOptionsWhere<ObjectLiteral>, options?: FindManyOptions<ObjectLiteral>): Promise<ObjectLiteral | null> {
    options.where = where
    return this.repository.findOneBy(options);
  }

  paginate(limit: number, page: number, where?: FindOptionsWhere<ObjectLiteral>): Promise<Pagination<ObjectLiteral, IPaginationMeta>> {
    const searchOptions: FindManyOptions<ObjectLiteral> = { where }
    const options: IPaginationOptions = { limit, page }
    return paginate<ObjectLiteral>(this.repository, options, searchOptions);
  }

  async save(id: number, data = {}, options = {}) {
    const model = id ? await this.repository.findOneByOrFail({ id }) : this.repository.create()
    Object.keys(data).forEach(field => {
      model[field] = data[field]
    })
    await this.repository.save(model)
    return []
  }
}