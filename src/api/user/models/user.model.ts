import { BaseModel, schemaOptions } from "shared/base.model";
import { UserRole } from "./user-role.enum";
import { prop, ModelType, arrayProp } from "typegoose";

export class ToDoList {


    @prop({ default: Date.now() })
    createdAt?: Date;
}

export class User extends BaseModel {

    @prop({
        required: [true, 'Email is required'],
        minlength: [6, 'Must be at least six characters'],
        // unique: true
    })
    email: string;

    @prop({ enum: UserRole, default: UserRole.User })
    role?: UserRole;

    @prop()
    firstName?: string;

    @prop()
    lastName?: string;

    @prop()
    token?: string;

    @prop()
    address?: string;

    @prop()
    phone?: string;

    @prop()
    phonetype?: string;
    


    @prop()
    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    static get model(): ModelType<User> {
        return new User().getModelForClass(User, { schemaOptions });
    }

    static get modelName(): string {
        return this.model.modelName;
    }
}