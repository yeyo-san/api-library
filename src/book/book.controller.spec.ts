import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

describe('BookController', () => {
  let bookController: BookController;
  let bookService: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        {
          provide: BookService,
          useValue: {
            create: jest.fn((createBookDto: CreateBookDto) => createBookDto),
            findAll: jest.fn(() => []),
            findById: jest.fn((id: string) => `book ${id}`),
            findOneByTitle: jest.fn((title: string) => [title]),
            findOneByAuthor: jest.fn((author: string) => [`book by ${author}`]),
            findOneByGenre: jest.fn((genre: string) => [`book by ${genre}`]),
            findOneByDate: jest.fn((date: string) => [`book by ${date}`]),
            update: jest.fn((id: string, updateBookDto: UpdateBookDto) => ({
              id,
              ...updateBookDto,
            })),
            remove: jest.fn((id: string) => `Book with id ${id} deleted`),
          },
        },
      ],
    }).compile();

    bookController = module.get<BookController>(BookController);
    bookService = module.get<BookService>(BookService);
  });

  describe('create', () => {
    it('Should create a book and return it', async () => {
      const createBookDto: CreateBookDto = {
        title: 'New Book',
        author: 'Author',
        publicationDate: '01/01/01',
        genre: 'genre',
      };
      const result = await bookController.create(createBookDto);
      expect(result).toEqual(createBookDto);
      expect(bookService.create).toHaveBeenLastCalledWith(createBookDto);
    });
  });

  describe('findAll', () => {
    it('Should find all books', async () => {
      const result = await bookController.findAll();
      expect(result).toEqual([]);
      expect(bookService.findAll).toHaveBeenCalledWith();
    });
  });

  describe('findOneById', () => {
    it('should return a single book by id', async () => {
      const id = '60d5ec49f0d3e212f06b30bc'
      const result = await bookController.findOne(id);
      expect(result).toEqual('book 60d5ec49f0d3e212f06b30bc');
      expect(bookService.findById).toHaveBeenCalledWith(id);
    });
  });

  describe('findOneByTitle', () => {
    it('should return a single book by title', async () => {
      const body = { title: 'book 1' };
      const result = await bookController.findOneByTitle(body);
      expect(result).toEqual(['book 1']); // Cambia a un array
      expect(bookService.findOneByTitle).toHaveBeenCalledWith('book 1');
    });
  });

  describe('findByAuthor', () => {
    it('should return books by author', async () => {
      const author = 'Author Name';
      const result = await bookController.findByAuthor(author);
      expect(result).toEqual(['book by Author Name']);
      expect(bookService.findOneByAuthor).toHaveBeenCalledWith(author);
    });
  });

  describe('findByGenre', () => {
    it('should return books by author', async () => {
      const genre = 'genre Name';
      const result = await bookController.findByGenre(genre);
      expect(result).toEqual(['book by genre Name']);
      expect(bookService.findOneByGenre).toHaveBeenCalledWith(genre);
    });
  });

  describe('findByDate', () => {
    it('should return books by date', async () => {
      const date = '01/01/2023';
      const result = await bookController.findByDate(date);
      expect(result).toEqual(['book by 01/01/2023']); 
      expect(bookService.findOneByDate).toHaveBeenCalledWith(date);
    });
  });

  describe('update', () => {
    it('should update a book and return the updated book', async () => {
      const updateBookDto: UpdateBookDto = {
          title: 'Updated Book', author: 'New Author',
          publicationDate: '',
          genre: 'book genre'
      };
      const result = await bookController.update('1', updateBookDto);
      expect(result).toEqual({
        id: '1',
        ...updateBookDto,
      });
      expect(bookService.update).toHaveBeenCalledWith('1', updateBookDto); 
    });
  });

  describe('remove', () => {
    it('should delete a book and return a confirmation message', async () => {
      const result = await bookController.remove('1');
      expect(result).toEqual('Book with id 1 deleted');
      expect(bookService.remove).toHaveBeenCalledWith('1'); 
    })
  })
});
