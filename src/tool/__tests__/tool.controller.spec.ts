// WIP
import { Test } from '@nestjs/testing';

import { ToolController } from '../tool.controller';
import { ToolDto } from '../tool.dto';
import { ToolService } from '../tool.service';
import {
  toolDtoMock,
  toolMock,
  toolListDtoMock,
  toolListMock,
} from './tool.mock';

describe('ToolController', () => {
  let toolController: ToolController;
  let toolService: ToolService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ToolController],
      providers: [
        {
          provide: ToolService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(toolListMock),
            findOne: jest
              .fn()
              .mockImplementation((id: string) =>
                Promise.resolve({ ...toolMock, _id: id }),
              ),
            create: jest
              .fn()
              .mockImplementation((toolDto: ToolDto) =>
                Promise.resolve({ _id: 'uuid', ...toolDto }),
              ),
            update: jest
              .fn()
              .mockImplementation((toolDto: ToolDto) =>
                Promise.resolve({ _id: 'uuid', ...toolDto }),
              ),
            delete: jest.fn().mockResolvedValue(null),
          },
        },
      ],
    }).compile();

    toolService = moduleRef.get<ToolService>(ToolService);
    toolController = moduleRef.get<ToolController>(ToolController);
  });

  describe('findAll', () => {
    it('should return an array of tools', async () => {
      expect(toolController.findAll()).resolves.toEqual(toolListDtoMock);
    });
  });

  describe('findOne', () => {
    it('should return one tool with id id1test', async () => {
      expect(toolController.findOne({ id: 'id1test' })).resolves.toEqual({
        ...toolDtoMock,
        id: 'id1test',
      });
    });
  });
});
