import { Document, Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

import { Entity, EntityIdType } from './entity.interface';
import { Repository } from './repository.interface';

export abstract class BaseMongoRepository<
  EntityType extends Entity<EntityIdType>,
  DocumentType extends Document
> implements Repository<EntityType>
{
  constructor(
    protected readonly model: Model<DocumentType>,
    private readonly createEntity: (document: DocumentType) => EntityType
  ) {}

  public async findAll(): Promise<EntityType[] | null> {
    const documents = await this.model.find().exec();

    if (!documents || documents.length === 0) return null;

    const entities = documents.map((document) =>
      this.createEntityFromDocument(document)
    ) as EntityType[];

    return entities;
  }

  protected createEntityFromDocument(
    document: DocumentType
  ): EntityType | null {
    if (!document) {
      return null;
    }
    const entity = this.createEntity(document.toObject({ versionKey: false }));
    entity.id = document._id.toString(); //TODO: норм ли так добавлять id юзера

    return entity;
  }

  public async findById(id: EntityType['id']): Promise<EntityType | null> {
    const document = await this.model.findById(id).exec();

    if (!document) return null;

    return this.createEntityFromDocument(document);
  }

  public async save(entity: EntityType): Promise<EntityType> {
    const newEntity = new this.model(entity.toPOJO());
    await newEntity.save();

    entity.id = newEntity._id.toString();
    return entity;
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
