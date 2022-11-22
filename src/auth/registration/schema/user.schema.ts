import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDoc = HydratedDocument<User>;

@Schema() 
export class User {

    @Prop({required: true})
    email: string;
    
    @Prop({required: true})
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);