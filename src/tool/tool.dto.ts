import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, IsUrl } from 'class-validator';

export class ToolDto {
  id?: string;

  @ApiProperty({ description: "Tool's title", example: 'Notion' })
  @IsString()
  title: string;

  @ApiProperty({ description: "Tool's url", example: 'https://www.notion.so' })
  @IsUrl()
  link: string;

  @ApiProperty({
    description: "Tool's description",
    example:
      'All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized.',
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    description: "Tool's tags",
    example: '[organization, planning, colaboration, writing, calendar]',
  })
  @IsArray()
  @IsString({ each: true })
  tags: string[];
}
