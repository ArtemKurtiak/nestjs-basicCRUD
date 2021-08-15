import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class AppService {
  get() {
    return 'Hello'
  }
}
