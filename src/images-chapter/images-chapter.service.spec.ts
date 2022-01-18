import { Test, TestingModule } from '@nestjs/testing';
import { ImagesChapterService } from './images-chapter.service';

describe('ImagesChapterService', () => {
  let service: ImagesChapterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImagesChapterService],
    }).compile();

    service = module.get<ImagesChapterService>(ImagesChapterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
