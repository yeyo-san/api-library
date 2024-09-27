import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiKeyGuard } from 'src/guard/api-key.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('books')
@UseGuards(ApiKeyGuard)
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto) { 
    return await this.bookService.create(createBookDto);
  }

  @Get()
  async findAll() {
    return await this.bookService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    return await this.bookService.findOneById(id);
  }

  @Post('title')
  async findOneByTitle(@Body() body: {title: string}) {
    const {title} = body
    return await this.bookService.findOneByTitle(title);
  }

  @Post('author')
  async findOneByAuthor(@Body() body: {author: string}) {
    const {author} = body
    return await this.bookService.findOneByAuthor(author);
  }

  @Post('genre')
  async findOneByGenre(@Body() body: {genre: string}) {
    const {genre} = body
    return await this.bookService.findOneByGenre(genre);
  }

  @Post('date')
  async findOneByDate(@Body() body: {date: string}) {
    const {date} = body
    return await this.bookService.findOneByDate(date);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return await this.bookService.update(id, updateBookDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.bookService.remove(id);
  }
}
