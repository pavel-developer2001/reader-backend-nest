import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { MangaModule } from './manga/manga.module';
import { MangaEntity } from './manga/entities/manga.entity';
import { TagModule } from './tag/tag.module';
import { TagEntity } from './tag/entities/tag.entity';
import { GenreModule } from './genre/genre.module';
import { GenreEntity } from './genre/entities/genre.entity';
import { ChapterModule } from './chapter/chapter.module';
import { ChapterEntity } from './chapter/entities/chapter.entity';
import { ImagesChapterModule } from './images-chapter/images-chapter.module';
import { ImagesChapterEntity } from './images-chapter/entities/images-chapter.entity';
import { RatingMangaModule } from './rating-manga/rating-manga.module';
import { RatingMangaEntity } from './rating-manga/entities/rating-manga.entity';
import { CommentMangaModule } from './comment-manga/comment-manga.module';
import { CommentMangaEntity } from './comment-manga/entities/comment-manga.entity';
import { BookMarkModule } from './book-mark/book-mark.module';
import { BookMarkEntity } from './book-mark/entities/book-mark.entity';
import { TeamModule } from './team/team.module';
import { TeamEntity } from './team/entities/team.entity';
import { TeamMemberModule } from './team-member/team-member.module';
import { TeamMemberEntity } from './team-member/entities/team-member.entity';
import { TeamMangaModule } from './team-manga/team-manga.module';
import { TeamMangaEntity } from './team-manga/entities/team-manga.entity';
import { TeamInvitationModule } from './team-invitation/team-invitation.module';
import { TeamInvitationEntity } from './team-invitation/entities/team-invitation.entity';
import { TeamChapterModule } from './team-chapter/team-chapter.module';
import { TeamChapterEntity } from './team-chapter/entities/team-chapter.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    CloudinaryModule,
    MangaModule,
    TagModule,
    GenreModule,
    ChapterModule,
    ImagesChapterModule,
    RatingMangaModule,
    CommentMangaModule,
    BookMarkModule,
    TeamModule,
    TeamMemberModule,
    TeamMangaModule,
    TeamInvitationModule,
    TeamChapterModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
