import { NotFoundException } from '@nestjs/common';
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
            findByTag: jest.fn().mockImplementation((tag: string) =>
              Promise.resolve([
                {
                  ...toolListMock[0],
                  tags: [...toolListMock[0].tags, tag],
                },
                {
                  ...toolListMock[1],
                  tags: [...toolListMock[1].tags, tag],
                },
                {
                  ...toolListMock[2],
                  tags: [...toolListMock[2].tags, tag],
                },
              ]),
            ),
            findBySearch: jest.fn().mockImplementation((search: string) =>
              Promise.resolve([
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
              ]),
            ),
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
              .mockImplementation((id: string, toolDto: ToolDto) =>
                Promise.resolve({ _id: id, ...toolDto }),
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
    it('Should return an array of tools', async () => {
      await expect(toolController.findAll({})).resolves.toEqual(
        toolListDtoMock,
      );
    });

    it('Should return an array of tools that contains one specific tag ', async () => {
      const tag = 'test';
      const expectedResult = toolListDtoMock.map(tool => ({
        ...tool,
        tags: [...tool.tags, tag],
      }));

      await expect(toolController.findAll({ tag })).resolves.toEqual(
        expectedResult,
      );
    });

    it('Should return an array of tools that contains the word searched ', async () => {
      const search = 'test';
      const expectedResult = [
        {
          ...toolListDtoMock[0],
          tags: [...toolListDtoMock[0].tags, search],
        },
        {
          ...toolListDtoMock[1],
          title: search,
        },
        {
          ...toolListDtoMock[2],
          description: search,
        },
      ];

      await expect(toolController.findAll({ search })).resolves.toEqual(
        expectedResult,
      );
    });
  });

  describe('findOne', () => {
    it('Should return one tool with id id1test', async () => {
      await expect(toolController.findOne({ id: 'id1test' })).resolves.toEqual({
        ...toolDtoMock,
        id: 'id1test',
      });
    });

    it('Should throws not found error', async () => {
      toolService.findOne = jest
        .fn()
        .mockImplementation(() => Promise.reject(new NotFoundException()));

      await expect(
        toolController.findOne({ id: 'id1test' }),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('create', () => {
    it('Should create a new tool', async () => {
      await expect(toolController.create(toolDtoMock)).resolves.toEqual({
        ...toolDtoMock,
        id: 'uuid',
      });
    });
  });

  describe('update', () => {
    it('Should update a tool', async () => {
      const id = 'uuid';
      await expect(toolController.update({ id }, toolDtoMock)).resolves.toEqual(
        {
          ...toolDtoMock,
          _id: id,
        },
      );
    });

    it('Should update a tool', async () => {
      const id = 'uuid';
      await expect(toolController.update({ id }, toolDtoMock)).resolves.toEqual(
        {
          ...toolDtoMock,
          _id: id,
        },
      );
    });

    it('Should throws not found error', async () => {
      toolService.update = jest
        .fn()
        .mockImplementation(() => Promise.reject(new NotFoundException()));

      await expect(
        toolController.update({ id: 'id1test' }, toolDtoMock),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('delete', () => {
    it('Should delete a tool', async () => {
      const id = 'uuid';
      await expect(toolController.delete({ id })).resolves.toEqual(null);
    });

    it('Should throws not found error', async () => {
      toolService.delete = jest
        .fn()
        .mockImplementation(() => Promise.reject(new NotFoundException()));

      await expect(
        toolController.delete({ id: 'id1test' }),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });
});
