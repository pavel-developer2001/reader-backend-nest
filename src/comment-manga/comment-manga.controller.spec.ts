import { Test, TestingModule } from '@nestjs/testing';
import { CommentMangaController } from './comment-manga.controller';
import { CommentMangaService } from './comment-manga.service';

describe('CommentMangaController', () => {
  let controller: CommentMangaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentMangaController],
      providers: [CommentMangaService],
    }).compile();

    controller = module.get<CommentMangaController>(CommentMangaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
