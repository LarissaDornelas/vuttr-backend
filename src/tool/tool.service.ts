import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ToolDto } from './tool.dto';

import { Tool } from './tool.schema';

@Injectable()
export class ToolService {
  constructor(
    @InjectModel(Tool.name)
    private toolModel: Model<Tool>,
  ) {}

  async create(toolDto: ToolDto): Promise<Tool> {
    const createdTool = new this.toolModel(toolDto);

    return createdTool.save();
  }

  async findAll(): Promise<Tool[]> {
    return this.toolModel.find().exec();
  }

  async findOne(id: string): Promise<Tool> {
    const tool = this.toolModel.findById(id);

    if (!tool) throw new NotFoundException();

    return tool;
  }

  async update(id: string, toolDto: ToolDto): Promise<void> {
    const tool = await this.toolModel.findOne({ _id: id });

    if (!tool) throw new NotFoundException();

    await this.toolModel.updateOne({ _id: id }, toolDto);
  }

  async delete(id: string): Promise<void> {
    const tool = this.toolModel.findById(id);
    if (!tool) throw new NotFoundException();

    await this.toolModel.deleteOne({ _id: id });
  }
}
