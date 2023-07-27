import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/cities (GET) should return 200 HTTP CODE', async () => {
    const response = await request(app.getHttpServer()).get(
      '/cities?query=B&page=1',
    );

    expect(response.status).toBe(HttpStatus.OK);
  });
  it('/cities (GET) should return 400 HTTP CODE', async () => {
    const response = await request(app.getHttpServer()).get(
      '/cities?query=B&page=-1',
    );

    expect(response.status).toBe(HttpStatus.BAD_REQUEST);
  });
});
