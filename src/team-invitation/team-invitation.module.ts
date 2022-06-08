import { Module } from '@nestjs/common';
import { TeamInvitationService } from './team-invitation.service';
import { TeamInvitationEntity } from './entities/team-invitation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TeamInvitationEntity])],
  providers: [TeamInvitationService],
  exports: [TeamInvitationService],
})
export class TeamInvitationModule {}
