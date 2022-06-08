import { Module } from '@nestjs/common';
import { BookMarkService } from './book-mark.service';
import { BookMarkController } from './book-mark.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookMarkEntity } from './entities/book-mark.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookMarkEntity])],
  controllers: [BookMarkController],
  providers: [BookMarkService],
})
export class BookMarkModule {}
