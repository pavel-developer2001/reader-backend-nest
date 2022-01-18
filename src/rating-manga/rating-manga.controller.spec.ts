import { Test, TestingModule } from '@nestjs/testing';
import { RatingMangaController } from './rating-manga.controller';
import { RatingMangaService } from './rating-manga.service';

describe('RatingMangaController', () => {
  let controller: RatingMangaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RatingMangaController],
      providers: [RatingMangaService],
    }).compile();

    controller = module.get<RatingMangaController>(RatingMangaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
