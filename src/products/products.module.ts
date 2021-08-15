import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductSchema } from "./dto/product.dto";


@Module({
  imports: [MongooseModule.forFeature([{name: 'Product', schema: ProductSchema}])],
  providers: [ProductsService],
  controllers: [ProductsController]
})

export class ProductsModule {}
