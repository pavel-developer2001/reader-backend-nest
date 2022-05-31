import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { MangaModule } from './manga/manga.module';
import { TagModule } from './tag/tag.module';
import { GenreModule } from './genre/genre.module';
import { ChapterModule } from './chapter/chapter.module';
import { ImagesChapterModule } from './images-chapter/images-chapter.module';
import { RatingMangaModule } from './rating-manga/rating-manga.module';
import { CommentMangaModule } from './comment-manga/comment-manga.module';
import { BookMarkModule } from './book-mark/book-mark.module';
import { TeamModule } from './team/team.module';
import { TeamMemberModule } from './team-member/team-member.module';
import { TeamMangaModule } from './team-manga/team-manga.module';
import { TeamInvitationModule } from './team-invitation/team-invitation.module';
import { TeamChapterModule } from './team-chapter/team-chapter.module';

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
