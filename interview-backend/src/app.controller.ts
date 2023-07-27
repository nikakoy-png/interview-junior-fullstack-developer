import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { CityDto } from './city.dto';
import { CityInterface } from './city.interface';

@Controller('cities')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getCities(
    // Using a DTO (Data Transfer Object) to query.
    @Query() query: CityDto,
  ): Promise<{ data: CityInterface[]; totalPages: number }> {
    const result = this.appService.getCities(query.query, query.page);
    return Promise.resolve(result);
  }
}
