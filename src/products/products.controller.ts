import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductInterface } from "./dto/product.dto";
import { ApiTags } from "@nestjs/swagger";


interface ProductSchema {
  title: string,
  description: string,
  madeIn: string,
  price: number
}

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async getAllProducts(): Promise<ProductSchema[]> {
    return this.productsService.getProducts();
  }

  @Post()
  createProduct(@Body() body: ProductInterface): any {
    if (!body.price || !body.madeIn || !body.description || !body.title) {
      throw new BadRequestException();
    }
    return this.productsService.createProduct(body)
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return await this.productsService.deleteProduct(id)
  }

  @Get(':id')
  async getProductById(@Param('id') id: string):Promise<any> {
    return await this.productsService.getProductById(id);
  }

  @Patch(':id')
  updateProduct(@Param('id') id: string, @Body() data: ProductInterface): any {
    return this.productsService.updateProduct(id, data)
  }
}
