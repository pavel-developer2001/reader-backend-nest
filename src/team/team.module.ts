import { forwardRef, Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TeamEntity } from './entities/team.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { TeamMemberModule } from 'src/team-member/team-member.module';
import { TeamMangaModule } from 'src/team-manga/team-manga.module';
import { TeamInvitationModule } from 'src/team-invitation/team-invitation.module';
import { TeamChapterEntity } from 'src/team-chapter/entities/team-chapter.entity';
import { TeamMangaEntity } from 'src/team-manga/entities/team-manga.entity';
import { TeamMemberEntity } from 'src/team-member/entities/team-member.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TeamEntity,
      TeamChapterEntity,
      TeamMangaEntity,
      TeamMemberEntity,
    ]),
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
