import { Test, TestingModule } from '@nestjs/testing';
import { RatingMangaService } from './rating-manga.service';

describe('RatingMangaService', () => {
  let service: RatingMangaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RatingMangaService],
    }).compile();

    service = module.get<RatingMangaService>(RatingMangaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
