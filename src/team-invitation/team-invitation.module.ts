import { Module } from '@nestjs/common';
import { TeamInvitationService } from './team-invitation.service';
import { TeamInvitationEntity } from './entities/team-invitation.entity';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forFeature([TeamInvitationEntity]),
  ],
  providers: [TeamInvitationService],
  exports: [TeamInvitationService],
})
export class TeamInvitationModule {}
