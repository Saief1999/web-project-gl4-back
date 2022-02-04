import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Mongoose } from 'mongoose';
import * as mongoose from 'mongoose';
import { Base } from 'src/generics/db/base.model';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { softDeletePlugin } from "soft-delete-plugin-mongoose"

@Schema({ timestamps: true, versionKey: false })
export class Cinema extends Base {
    _id: string;

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
    @Prop({ type: mongoose.Schema.Types.String })
    openingTime: string;
    
    @IsOptional()
    @Prop({ type: mongoose.Schema.Types.String })
    closingTime: string;
}

export const CinemaSchema = SchemaFactory.createForClass(Cinema).plugin(softDeletePlugin)