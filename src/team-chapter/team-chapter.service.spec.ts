import { Test, TestingModule } from '@nestjs/testing';
import { TeamChapterService } from './team-chapter.service';

describe('TeamChapterService', () => {
  let service: TeamChapterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeamChapterService],
    }).compile();

    service = module.get<TeamChapterService>(TeamChapterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
