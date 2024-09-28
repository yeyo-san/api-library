import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './entities/book.entity';
import { Model, Types } from 'mongoose';
import { BaseService } from '../common/base.service';

@Injectable()
export class BookService extends BaseService<Book> {
  constructor(@InjectModel(Book.name) private readonly bookModel: Model<Book>) {
    super(bookModel);
  }

  private validateAviableBooks(books: Book[]): void {
    if (books.length === 0) {
      throw new BadRequestException('No books available at this time');
    }
  }

  private validateBooksFound(book: Book | Book[] | null, value: string, field: string): void {
    if (!book) {
      throw new NotFoundException(`Book with ${field} "${value}" not found`);
    }
  }

  private validateMongoId(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    return await super.create(createBookDto);
  }

  async findAll(): Promise<Book[]> {
    const books = await super.findAll();
    this.validateAviableBooks(books);
    return books;
  }

  async findById(id: string): Promise<Book> {
    this.validateMongoId(id); 
    const book = await super.findById(id);
    this.validateBooksFound(book, id, 'id'); 
    return book;
}

  async findOneByTitle(title: string): Promise<Book> {
    const book = await this.bookModel.findOne({title}).exec()
    this.validateBooksFound(book, title, 'title');
    return book;
  }

  async findOneByAuthor(author: string): Promise<Book[]> {
    const book = await this.bookModel.find({author}).exec()
    this.validateAviableBooks(book);
    return book;
  }

  async findOneByGenre(genre: string): Promise<Book[]> {
    const book = await this.bookModel.find({genre}).exec()
    this.validateAviableBooks(book);
    return book;
  }
  
  async findOneByDate(publicationDate: string): Promise<Book[]> {
    const book = await this.bookModel.find({publicationDate}).exec()
    this.validateAviableBooks(book);
    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    return await super.update(id, updateBookDto);
  }

  async remove(id: string): Promise<Book> {
    return await super.delete(id);
  }
}
