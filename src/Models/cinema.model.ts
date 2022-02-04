import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Mongoose } from 'mongoose';
import * as mongoose from 'mongoose';
import { Base } from 'src/generics/db/base.model';
import { IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export type CinemaDocument = Cinema & Document;

@Schema()
export class Cinema extends Base {

    @IsNotEmpty()
    @Prop({ type: mongoose.Schema.Types.String })
    name: string;
    
    @IsOptional()
    @Prop({ type: mongoose.Schema.Types.String })
    description: string;

    @IsOptional()
    @Prop({ type: mongoose.Schema.Types.String })
    address: string;

    @IsOptional()
    @IsNumber()
    @Prop({ type: mongoose.Schema.Types.Number })
    phone: number;

    @IsOptional()
    @IsDate()
    @Prop({ type: mongoose.Schema.Types.Date })
    openingTime: Date;
    
    @IsOptional()
    @IsDate()
    @Prop({ type: mongoose.Schema.Types.Date })
    closingTime: Date;
}

export const CinemaSchema = SchemaFactory.createForClass(Cinema);