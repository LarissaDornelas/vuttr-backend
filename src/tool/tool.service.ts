import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Tool } from './tool.schema';

@Injectable()
export class ToolService {
  constructor(
    @InjectModel(Tool.name)
    private toolModel: Model<Tool>,
  ) {}

  async create(body: any): Promise<Tool> {
    const createdCat = new this.toolModel(body);
    return createdCat.save();
  }

  async findAll(): Promise<Tool[]> {
    return this.toolModel.find().exec();
  }
}
