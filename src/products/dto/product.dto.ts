import * as mongoose from 'mongoose'
import { ApiProperty } from "@nestjs/swagger";

export const ProductSchema = new mongoose.Schema({
  title: String,
  price: Number,
  madeIn: String,
  description: String,
  id: String
})

export class ProductInterface {
  @ApiProperty()
  title: string
  @ApiProperty()
  description: string
  @ApiProperty()
  madeIn: string
  @ApiProperty()
  price: number
}
