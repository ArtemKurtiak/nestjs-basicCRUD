import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Schema, Types } from "mongoose";
import { ProductInterface } from "./dto/product.dto";


@Injectable()
export class ProductsService {
  constructor(@InjectModel("Product") public productModel: Model<ProductInterface>) {
  }

  formatProductSchema(schema) {
    return {
      id: schema._id,
      title: schema.title,
      description: schema.description,
      madeIn: schema.madeIn,
      price: schema.price
    }
  }

  async getProducts() {
    const products = await this.productModel.find();
    return products.map((el) => {
      return this.formatProductSchema(el)
    });
  }

  async createProduct(body) {
    const newProduct = new this.productModel({ ...body });
    return this.formatProductSchema(await newProduct.save());
  }

  async deleteProduct(id) {
    try {
      const result = await this.productModel.deleteOne({_id: id});
      if (result.deletedCount) {
        return null;
      } else {
        throw new NotFoundException('Product not found');
      }
    } catch (e) {
      throw new NotFoundException('Product not found');
    }

  }

  async getProductById(id) {
    try {
      const product = await this.productModel.findById(id);
      return await this.formatProductSchema(product);
    } catch (e) {
      throw new NotFoundException("Product not found");
    }
  }

  async updateProduct(id, data) {
    try {
      await this.productModel.findByIdAndUpdate(id, {
        ...data
      });
      return this.formatProductSchema(await this.productModel.findById(id));
    } catch (e) {
      throw new NotFoundException('Product not found');
    }
  }

}
