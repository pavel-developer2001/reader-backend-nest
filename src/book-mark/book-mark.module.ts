import { Module } from '@nestjs/common';
import { BookMarkService } from './book-mark.service';
import { BookMarkController } from './book-mark.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookMarkEntity } from './entities/book-mark.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forFeature([BookMarkEntity]),
  ],
  controllers: [BookMarkController],
  providers: [BookMarkService],
})
export class BookMarkModule {}
