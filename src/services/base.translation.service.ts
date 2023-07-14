import { IPaginationMeta, IPaginationOptions, Pagination, paginate, paginateRaw, paginateRawAndEntities } from "nestjs-typeorm-paginate";
import { DataSource, EntityMetadata, FindManyOptions, FindOptionsRelations, FindOptionsSelect, FindOptionsWhere, ObjectLiteral, Repository } from "typeorm";
import { I18nContext } from "nestjs-i18n";
import { RelationMetadata } from "typeorm/metadata/RelationMetadata";
import { asyncForEach } from "src/utilities/core.utility";

export class BaseTranslationService {
  protected repository: Repository<ObjectLiteral>;

  async find(where = {}, options = {}): Promise<ObjectLiteral[]> {
    const i18nContext = I18nContext.current()
    const locale = i18nContext.lang
    const localeDefault = 'en'

    const relationMetadata: RelationMetadata = this.repository.metadata.relations.find(r => r.propertyName === 'translations')

    const translation: EntityMetadata = relationMetadata.inverseEntityMetadata
    const translationRepo = new Repository(translation.target, this.repository.manager)

    const alias = this.repository.metadata.targetName
    const translationAlias = translation.targetName
    const translationMap = relationMetadata.inverseSidePropertyPath
    const translationMapId = translationMap + '_id'

    const translatedAttributes = this.repository.target['translatedAttributes'];

    const builder = this.repository.createQueryBuilder(alias)

    const selectFields = []

    this.repository.metadata.ownColumns.map(c => {
      if (translatedAttributes.indexOf(c.propertyName) === -1) {
        const field = c.givenDatabaseName || c.propertyName
        selectFields.push([`${alias}.${field}`, `${alias}_${field}`])
      }
    })

    const translatableColumns = []
    translation.ownColumns.map(c => {
      if (translatedAttributes.indexOf(c.propertyName) > -1) {
        const field = c.givenDatabaseName || c.propertyName
        selectFields.push([`${translationAlias}.${field}`, `${alias}_${field}`])
        translatableColumns.push([`${alias}_${field}`, c.propertyName])
      }
    })

    if (selectFields.length) {
      const _select = selectFields.shift();
      builder.select(_select[0], _select[1])
      selectFields.forEach(_select => {
        builder.addSelect(_select[0], _select[1])
      })
    }

    builder.leftJoin(translation.target, translationAlias, `${alias}.id = ${translationAlias}.${translationMapId} AND locale = :locale`, { locale })

    const { entities, raw } = await builder.getRawAndEntities()

    const items = []
    await asyncForEach(entities, async (item, index) => {
      if (raw[index][`${translationAlias}_id`]) {
        translatableColumns.forEach(c => {
          if (raw[index].hasOwnProperty(c[0])) {
            item[c[1]] = raw[index][c[0]]
          }
        })
      } else {
        const translated = await translationRepo.createQueryBuilder().where({ locale: localeDefault, [translationMap]: item.id }).getOne()
        if (translated) {
          translatableColumns.forEach(c => {
            if (translated.hasOwnProperty(c[1])) {
              item[c[1]] = translated[c[1]]
            }
          })
        }
      }
      items.push(item)
    })

    return items
  }

  async findOne(where: FindOptionsWhere<ObjectLiteral>, options: FindManyOptions<ObjectLiteral> = {}): Promise<ObjectLiteral | null> {
    options.take = 1
    const items = await this.find(where, options)
    items.forEach(item => {
      console.log(item.translations)
    })
    return items.length ? items[0] : null
  }

  async findById(id: number | string): Promise<ObjectLiteral | null> {
    return this.findOne({ id })
  }

  async paginate(limit: number, page: number) {
    const i18nContext = I18nContext.current()
    const locale = i18nContext.lang
    const localeDefault = 'en'

    const relationMetadata: RelationMetadata = this.repository.metadata.relations.find(r => r.propertyName === 'translations')
    const translation: EntityMetadata = relationMetadata.inverseEntityMetadata
    const translationRepo = new Repository(translation.target, this.repository.manager)

    const alias = this.repository.metadata.targetName
    const translationAlias = translation.targetName
    const translationMap = relationMetadata.inverseSidePropertyPath
    const translationMapId = translationMap + '_id'

    const translatedAttributes = this.repository.target['translatedAttributes'];

    const builder = this.repository.createQueryBuilder(alias)

    const selectFields = []

    this.repository.metadata.ownColumns.map(c => {
      if (translatedAttributes.indexOf(c.propertyName) === -1) {
        const field = c.givenDatabaseName || c.propertyName
        selectFields.push([`${alias}.${field}`, `${alias}_${field}`])
      }
    })

    const translatableColumns = []
    translation.ownColumns.map(c => {
      if (translatedAttributes.indexOf(c.propertyName) > -1) {
        const field = c.givenDatabaseName || c.propertyName
        selectFields.push([`${translationAlias}.${field}`, `${alias}_${field}`])
        translatableColumns.push([`${alias}_${field}`, c.propertyName])
      }
    })

    if (selectFields.length) {
      const _select = selectFields.shift();
      builder.select(_select[0], _select[1])
      selectFields.forEach(_select => {
        builder.addSelect(_select[0], _select[1])
      })
    }

    builder.leftJoin(translation.target, translationAlias, `${alias}.id = ${translationAlias}.${translationMapId} AND locale = :locale`, { locale })

    const options: IPaginationOptions = { limit, page }
    const [pagination, raw] = await paginateRawAndEntities<ObjectLiteral>(builder, options);

    const items = []
    await asyncForEach(pagination.items, async (item, index) => {
      if (raw[index][`${translationAlias}_id`]) {
        translatableColumns.forEach(c => {
          if (raw[index].hasOwnProperty(c[0])) {
            item[c[1]] = raw[index][c[0]]
          }
        })
      } else {
        const translated = await translationRepo.createQueryBuilder().where({ locale: localeDefault, [translationMap]: item.id }).getOne()
        if (translated) {
          translatableColumns.forEach(c => {
            if (translated.hasOwnProperty(c[1])) {
              item[c[1]] = translated[c[1]]
            }
          })
        }
      }
      items.push(item)
    })

    return new Pagination(items, pagination.meta, pagination.links)
  }

  async save(id: number, data = {}, options = {}) {
    const isEdit = !!id
    const model = isEdit ? await this.repository.findOneByOrFail({ id }) : this.repository.create()
    Object.keys(data).forEach(field => {
      if (field === 'id') return
      model[field] = data[field]
    })
    await this.repository.save(model)

    const i18nContext = I18nContext.current()
    const locale = i18nContext.lang
    const localeDefault = 'en'

    const translatedAttributes = this.repository.target['translatedAttributes'];

    const relationMetadata: RelationMetadata = this.repository.metadata.relations.find(r => r.propertyName === 'translations')
    const translation: EntityMetadata = relationMetadata.inverseEntityMetadata
    const translationRepo = new Repository(translation.target, this.repository.manager)

    const translationMap = relationMetadata.inverseSidePropertyPath
    const translationMapId = translationMap + '_id'

    let modelTranslation
    if (isEdit) {
      modelTranslation = await translationRepo.findOneBy({ [translationMapId]: model.id, locale })
    }
    if (!modelTranslation) {
      modelTranslation = translationRepo.create()
      modelTranslation[translationMap] = model.id
      modelTranslation.locale = locale
    }
    translation.ownColumns.map(c => {
      if (translatedAttributes.indexOf(c.propertyName) > -1) {
        if (typeof data[c.propertyName] !== 'undefined') {
          modelTranslation[c.propertyName] = data[c.propertyName]
        }
      }
    })
    await translationRepo.save(modelTranslation)

    return []
  }
}

