import { Test, TestingModule } from '@nestjs/testing';
import { TeamInvitationService } from './team-invitation.service';

describe('TeamInvitationService', () => {
  let service: TeamInvitationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeamInvitationService],
    }).compile();

    service = module.get<TeamInvitationService>(TeamInvitationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
