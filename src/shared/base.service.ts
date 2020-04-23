import { Types } from 'mongoose';
import 'automapper-ts/dist/automapper';
import { Typegoose, ModelType, InstanceType } from 'typegoose';
import { Injectable } from '@nestjs/common';
import { promises } from 'fs';
import { ObjectId } from 'bson';
import { ToDoList } from 'api/user/models/user.model';

@Injectable()
export class BaseService<T extends Typegoose> {
    protected _model: ModelType<T>;
    protected _mapper: AutoMapperJs.AutoMapper;

    private get modelName(): string {
        return this._model.modelName;
    }

    private get viewModelName(): string {
        return `${this._model.modelName}Vm`;
    }

    async map<K>(
        object: Partial<InstanceType<T>> | Partial<InstanceType<T>>[],
        isArray: boolean = false,
        sourceKey?: string,
        destinationKey?: string
    ): Promise<K> {
        const _sourceKey = isArray ? `${sourceKey || this.modelName}[]` : sourceKey || this.modelName;
        const _destinationKey = isArray ? `${destinationKey || this.viewModelName}[]` : destinationKey || this.viewModelName;
        return this._mapper.map(_sourceKey, _destinationKey, object);
    }

    async findAll(filter = {}): Promise<InstanceType<T>[]> {
        return this._model.find(filter).select('-password -email').exec();
    }

    
    async findOne(filter = {}): Promise<InstanceType<T>> {
        return this._model.findOne(filter).exec();
    }


    async findById(id: string): Promise<InstanceType<T>> {
        return this._model.findById(this.toObjectID(id)).exec();
    }

    async create(item: InstanceType<T>): Promise<InstanceType<T>> {
        item['createdAt'] = new Date();
        item['updatedAt'] = new Date();
        return this._model.create(item);
    }

    async delete(id: string): Promise<InstanceType<T>> {
        return this._model.findByIdAndRemove(this.toObjectID(id)).exec();
    }

    async update(id: string, item: InstanceType<T>): Promise<InstanceType<T>> {
        item['updatedAt'] = new Date();
        return this._model.findByIdAndUpdate(this.toObjectID(id), item, { new: true }).exec();
    }

   

 

    async setTypeOptionsDefault(id: string, TypeOptionsDefault: string): Promise<InstanceType<T>> {
        return this._model.update({ _id: id }, { $set: { eventTypeOptionsDefault: TypeOptionsDefault } })
    }


    async clearCollection(filter = {}): Promise<void> {
        return this._model.deleteMany(filter).exec();
    }

    private toObjectID(id: string): Types.ObjectId {
        return Types.ObjectId(id);
    }

}