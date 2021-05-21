import { ToolDto } from './tool.dto';
import { Tool } from './tool.schema';

export class ToolTransformer {
  static modelToDto(model: Tool): ToolDto {
    const { _id, link, tags, description, title } = model;

    const toolDto: ToolDto = {
      id: _id,
      title: title,
      description: description ?? '',
      link: link,
      tags: tags,
    };

    return toolDto;
  }
}
