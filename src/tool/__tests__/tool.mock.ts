import { ToolDto } from '../tool.dto';
import { Tool, ToolDoc } from '../tool.schema';

export const toolDtoMock: ToolDto = {
  title: 'Notion',
  description:
    'All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ',
  link: 'https://notion.so',
  tags: ['organization', 'planning', 'collaboration', 'writing', 'calendar'],
};

export const toolMock: Tool = {
  _id: '60a46cc097beaf6e9c013b52',
  title: 'Notion',
  description:
    'All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ',
  link: 'https://notion.so',
  tags: ['organization', 'planning', 'collaboration', 'writing', 'calendar'],
};

export const toolListDtoMock: ToolDto[] = [
  {
    id: '60a7f00b129f5f00153f0d26',
    title: 'Notion',
    description:
      'All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ',
    link: 'https://notion.so',
    tags: ['organization', 'planning', 'collaboration', 'writing', 'calendar'],
  },
  {
    id: '60a7f015129f5f00153f0d27',
    title: 'json-server',
    description:
      'Fake REST API based on a json schema. Useful for mocking and creating APIs for front-end devs to consume in coding challenges.',
    link: 'https://github.com/typicode/json-server',
    tags: ['api', 'json', 'schema', 'node', 'github', 'rest'],
  },
  {
    id: '60a7f01d129f5f00153f0d28',
    title: 'fastify',
    description:
      'Extremely fast and simple, low-overhead web framework for NodeJS. Supports HTTP2.',
    link: 'https://www.fastify.io/',
    tags: ['web', 'framework', 'node', 'http2', 'https', 'localhost'],
  },
];

export const toolListMock: Tool[] = [
  {
    _id: '60a7f00b129f5f00153f0d26',
    title: 'Notion',
    description:
      'All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ',
    link: 'https://notion.so',
    tags: ['organization', 'planning', 'collaboration', 'writing', 'calendar'],
  },
  {
    _id: '60a7f015129f5f00153f0d27',
    title: 'json-server',
    description:
      'Fake REST API based on a json schema. Useful for mocking and creating APIs for front-end devs to consume in coding challenges.',
    link: 'https://github.com/typicode/json-server',
    tags: ['api', 'json', 'schema', 'node', 'github', 'rest'],
  },
  {
    _id: '60a7f01d129f5f00153f0d28',
    title: 'fastify',
    description:
      'Extremely fast and simple, low-overhead web framework for NodeJS. Supports HTTP2.',
    link: 'https://www.fastify.io/',
    tags: ['web', 'framework', 'node', 'http2', 'https', 'localhost'],
  },
];

export const toolConstructorMock = (toolMock: Tool): Tool => ({
  ...toolMock,
});
