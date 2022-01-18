import { Test, TestingModule } from '@nestjs/testing';
import { TeamMangaService } from './team-manga.service';

describe('TeamMangaService', () => {
  let service: TeamMangaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeamMangaService],
    }).compile();

    service = module.get<TeamMangaService>(TeamMangaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
