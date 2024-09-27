import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookModule } from './book/book.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot(
      'mongodb+srv://Alejo-develop:Tr4zKc4G5SCtRTag@cluster0.za1jf.mongodb.net/MagicLibraryDb?retryWrites=true&w=majority&appName=Cluster0',
    ),
    BookModule
  ],
})
export class AppModule {}

// QTkmmNhPSCmW0n58
