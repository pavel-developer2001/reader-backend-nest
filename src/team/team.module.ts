import { forwardRef, Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TeamEntity } from './entities/team.entity';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { TeamMemberModule } from 'src/team-member/team-member.module';
import { TeamMangaModule } from 'src/team-manga/team-manga.module';
import { TeamInvitationModule } from 'src/team-invitation/team-invitation.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forFeature([TeamEntity]),
    forwardRef(() => CloudinaryModule),
    TeamMemberModule,
    TeamMangaModule,
    TeamInvitationModule,
  ],
  controllers: [TeamController],
  providers: [TeamService],
  exports: [TeamService],
})
export class TeamModule {}
