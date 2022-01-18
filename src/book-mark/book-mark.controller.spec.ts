import { Test, TestingModule } from '@nestjs/testing';
import { BookMarkController } from './book-mark.controller';
import { BookMarkService } from './book-mark.service';

describe('BookMarkController', () => {
  let controller: BookMarkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookMarkController],
      providers: [BookMarkService],
    }).compile();

    controller = module.get<BookMarkController>(BookMarkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
