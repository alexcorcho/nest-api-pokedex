import { Schema, SchemaFactory,Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Pokemon extends Document{

    @Prop({
        unique:1 ,
        index:1
    })
    name:string;

    @Prop({
        unique:1,
        index:1,
    })
    no:number;
}

export const PokemonSchame = SchemaFactory.createForClass( Pokemon );
