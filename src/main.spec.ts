import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { NestApplication } from '@nestjs/core';

describe('Main (bootstrap)', () => {
  let app: NestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should run on the default port', async () => {
    const port = process.env.PORT || 3000;
    await app.listen(port);
    expect(app.getHttpServer()).toBeDefined();
  });
});