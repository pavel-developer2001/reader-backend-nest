import { Test, TestingModule } from '@nestjs/testing';
import { CommentMangaService } from './comment-manga.service';

describe('CommentMangaService', () => {
  let service: CommentMangaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentMangaService],
    }).compile();

    service = module.get<CommentMangaService>(CommentMangaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
