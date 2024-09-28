import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiKeyGuard } from '../guard/api-key.guard';
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
  async findOne(@Param('id') id: string) {
    return await this.bookService.findById(id);
  }

  @Post('title')
  async findOneByTitle(@Body() body: {title: string}) {
    const {title} = body
    return await this.bookService.findOneByTitle(title);
  }

  @Get('author/:author')
  async findByAuthor(@Param('author') author: string) {
    return await this.bookService.findOneByAuthor(author);
  }

  @Get('genre/:genre')
  async findByGenre(@Param('genre') genre: string) {
    return await this.bookService.findOneByGenre(genre);
  }

  @Get('date/:date')
  async findByDate(@Param() date: string) {
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
