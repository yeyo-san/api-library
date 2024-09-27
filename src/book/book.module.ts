import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Book, BookSchema } from './entities/book.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Book', schema: BookSchema}])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
