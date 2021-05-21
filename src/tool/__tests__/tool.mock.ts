import { ToolDto } from '../tool.dto';
import { Tool } from '../tool.schema';

export const toolDtoMock: ToolDto = {
  id: '60a46cc097beaf6e9c013b52',
  title: 'test',
  description: '',
  link: 'test',
  tags: [],
};

export const toolMock: Tool = {
  _id: '60a46cc097beaf6e9c013b52',
  title: 'test',
  description: '',
  link: 'test',
  tags: [],
};

export const toolListDtoMock: ToolDto[] = [{ ...toolDtoMock }];

export const toolListMock: Tool[] = [
  {
    ...toolMock,
  },
];
