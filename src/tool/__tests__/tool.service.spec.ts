import { getModelToken } from '@nestjs/mongoose';
import * as sinon from 'sinon';
import { Test, TestingModule } from '@nestjs/testing';
import { Model, Query } from 'mongoose';
import { Tool, ToolDoc } from '../tool.schema';
import { ToolService } from '../tool.service';
import {
  toolConstructorMock,
  toolDtoMock,
  toolListMock,
  toolMock,
} from './tool.mock';

describe('ToolService', () => {
  let service: ToolService;
  let model: Model<ToolDoc>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ToolService,
        {
          provide: getModelToken('Tool'),
          useValue: {
            new: jest.fn().mockResolvedValue(toolMock),
            constructor: jest.fn().mockResolvedValue(toolMock),
            find: jest.fn(),
            findOne: jest.fn(),
            updateOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            deleteOne: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ToolService>(ToolService);
    model = module.get<Model<ToolDoc>>(getModelToken('Tool'));
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(() => jest.clearAllMocks());

  it('Should return all tools', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(toolListMock),
    } as any);
    const tools = await service.findAll();
    expect(tools).toEqual(toolListMock);
  });

  it('Should return all tools by tag', async () => {
    const tag = 'test';
    const expectedResult = toolListMock.map(tool => ({
      ...tool,
      tags: [...tool.tags, tag],
    }));

    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(expectedResult),
    } as any);
    const tools = await service.findByTag(tag);
    expect(tools).toEqual(expectedResult);
  });

  it('Should return all tools by search', async () => {
    const search = 'test';
    const expectedResult = [
      {
        ...toolListMock[0],
        tags: [...toolListMock[0].tags, search],
      },
      {
        ...toolListMock[1],
        title: search,
      },
      {
        ...toolListMock[2],
        description: search,
      },
    ];

    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(expectedResult),
    } as any);
    const tools = await service.findBySearch(search);
    expect(tools).toEqual(expectedResult);
  });

  it('Should return one tool', async () => {
    jest.spyOn(model, 'findOne').mockReturnValue({
      exec: callback => {
        callback(null, toolMock);
      },
    } as any);

    sinon.stub(model, 'findOne').returns(toolMock);

    const tool = await service.findOne(toolMock._id);

    expect(tool).toEqual(toolMock);
  });

  it('should create a new tool', async () => {
    jest
      .spyOn(model, 'create')
      .mockImplementationOnce(() => Promise.resolve(toolMock));

    const tool = await service.create(toolDtoMock);

    expect(tool).toEqual(toolMock);
  });

  it('should update a tool', async () => {
    jest.spyOn(model, 'findOne').mockReturnValue({
      exec: callback => {
        callback(null, toolMock);
      },
    } as any);

    jest.spyOn(model, 'updateOne').mockReturnValue({
      exec: callback => {
        callback(null, toolMock);
      },
    } as any);

    sinon.stub(model, 'updateOne').returns(toolMock);

    expect(
      await service.update(toolMock._id, {
        ...toolDtoMock,
        title: 'test',
      }),
    ).toEqual(undefined);
  });

  it('should delete a tool', async () => {
    jest.spyOn(model, 'findOne').mockReturnValue({
      exec: callback => {
        callback(null, toolMock);
      },
    } as any);

    jest.spyOn(model, 'deleteOne').mockReturnValue({
      exec: callback => {
        callback(null);
      },
    } as any);

    sinon.stub(model, 'deleteOne').returns(toolMock);

    expect(await service.delete(toolMock._id)).toEqual(undefined);
  });
});
