import { forwardRef, Module } from '@nestjs/common';
import { MangaService } from './manga.service';
import { MangaController } from './manga.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MangaEntity } from './entities/manga.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { TagModule } from 'src/tag/tag.module';
import { GenreModule } from 'src/genre/genre.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forFeature([MangaEntity]),
    forwardRef(() => CloudinaryModule),
    TagModule,
    GenreModule,
    UserModule,
  ],
  controllers: [MangaController],
  providers: [MangaService],
  exports: [MangaService],
})
export class MangaModule {}
