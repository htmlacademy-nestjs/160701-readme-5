import { Document, Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

import { Entity, EntityIdType } from './entity.interface';
import { Repository } from './repository.interface';

const ContentIdPopulate = {
  path: 'contentId',
  options: { strictPopulate: false },
};
export abstract class BaseMongoRepository<
  EntityType extends Entity<EntityIdType>,
  DocumentType extends Document
> implements Repository<EntityType>
{
  constructor(
    protected readonly model: Model<DocumentType>,
    private readonly createEntity: (document: DocumentType) => EntityType
  ) {}

  public async findAll(): Promise<EntityType[]> {
    const documents = await this.model
      .find()
      .populate(ContentIdPopulate)
      .exec();

    const entities = documents.map((document) =>
      this.createEntityFromDocument(document)
    );

    return entities;
  }

  protected createEntityFromDocument(document: DocumentType): EntityType {
    const entity = this.createEntity(document.toObject({ versionKey: false }));

    return entity;
  }

  public async findById(id: EntityType['id']): Promise<EntityType | null> {
    const document = await this.model
      .findById(id)
      .populate(ContentIdPopulate)
      .exec();

    if (!document) return null;

    return this.createEntityFromDocument(document as DocumentType);
  }

  public async save(entity: EntityType): Promise<EntityType> {
    const newEntity = await this.model.create(entity.toPOJO());
    const document = await this.model
      .findById(newEntity._id)
      .populate(ContentIdPopulate)
      .exec();

    if (!document) {
      throw new NotFoundException('Document not found');
    }

    return this.createEntityFromDocument(document as DocumentType);
  }

  public async update(
    id: EntityType['id'],
    entity: EntityType
  ): Promise<EntityType> {
    const updatedDocument = await this.model
      .findByIdAndUpdate(id, entity.toPOJO(), {
        new: true,
        runValidators: true,
      })
      .populate(ContentIdPopulate)
      .exec();

    if (!updatedDocument) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }

    return entity;
  }

  public async deleteById(id: EntityType['id']): Promise<void> {
    const deletedDocument = await this.model.findByIdAndDelete(id).exec();

    if (!deletedDocument) {
      throw new NotFoundException(`Entity with id ${id} not found.`);
    }
  }
}
