import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Query,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ToolDto } from './tool.dto';
import { Tool } from './tool.schema';
import { ToolService } from './tool.service';
import { ToolTransformer } from './tool.transformer';

@ApiTags('Tools')
@Controller('tools')
export class ToolController {
  constructor(private toolService: ToolService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The record has been successfully created.',
    type: ToolDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() toolDto: ToolDto): Promise<ToolDto> {
    const tool = await this.toolService.create(toolDto);
    return ToolTransformer.modelToDto(tool);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The request has succeeded',
    type: [ToolDto],
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @ApiQuery({ name: 'tag', required: false })
  @Get()
  async findAll(
    @Query() { tag, search }: { tag?: string; search?: string },
  ): Promise<ToolDto[]> {
    let tools: Tool[];
    if (tag) {
      tools = await this.toolService.findByTag(tag);
      return tools.map(tool => ToolTransformer.modelToDto(tool));
    }
    if (search) {
      tools = await this.toolService.findBySearch(search);
      return tools.map(tool => ToolTransformer.modelToDto(tool));
    }
    tools = await this.toolService.findAll();
    return tools.map(tool => ToolTransformer.modelToDto(tool));
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The request has succeeded',
    type: ToolDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @ApiParam({ name: 'id' })
  @Get(':id')
  async findOne(@Param() { id }: { id: string }): Promise<ToolDto> {
    const tool = await this.toolService.findOne(id);
    return ToolTransformer.modelToDto(tool);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The request has succeeded',
    type: ToolDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The request has succeeded',
    type: ToolDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @ApiParam({ name: 'id' })
  @Put(':id')
  async update(
    @Param() { id }: { id: string },
    @Body() toolDto: ToolDto,
  ): Promise<void> {
    return this.toolService.update(id, toolDto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The request has succeeded',
    type: ToolDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @ApiParam({ name: 'id' })
  @Delete(':id')
  async delete(@Param() { id }: { id: string }): Promise<void> {
    return await this.toolService.delete(id);
  }
}
