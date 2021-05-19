import { Body, Controller, Get, Post } from '@nestjs/common';
import { ToolService } from './tool.service';

@Controller('tool')
export class ToolController {
  constructor(private toolService: ToolService) {}

  @Get()
  findAll(): any {
    return this.toolService.findAll();
  }

  @Post()
  create(@Body() body: any): any {
    return this.toolService.create(body);
  }
}
