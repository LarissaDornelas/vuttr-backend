import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ToolDto } from './tool.dto';
import { ToolService } from './tool.service';
import { ToolTransformer } from './tool.transformer';

@ApiTags('Tool')
@Controller('tool')
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
  @Get()
  async findAll(): Promise<ToolDto[]> {
    const tools = await this.toolService.findAll();
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
  @Delete(':id')
  async delete(@Param() { id }: { id: string }): Promise<void> {
    return await this.toolService.delete(id);
  }
}
