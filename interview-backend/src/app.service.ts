import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CityInterface } from './city.interface';
import * as fs from 'fs';

@Injectable()
export class AppService {
  // create a variable where the list of cities will be stored and specify
  // what attributes each sheet object will have using a custom [CityInterface] interface.
  private cities: CityInterface[] = [];

  constructor() {
    this.loadCitiesFromFile();
  }

  // Asynchronous function that reads data from a cities.json file using [fs] and populates the cities variable.
  // Also in [Promise] specify that the function does not return anything.
  // If something goes wrong, we throw an error.
  private async loadCitiesFromFile(): Promise<void> {
    try {
      const data = await fs.promises.readFile('../cities.json', 'utf8');
      this.cities = JSON.parse(data) as CityInterface[];
    } catch (error) {
      console.error('Error with reading cities data!', error.message);
    }
  }

  // We filter the data by the query parameter using the custom function [filterCities].
  // Use [Math.ceil] to round the number of pages.
  async getCities(
    query: string,
    page: number,
  ): Promise<{ data: CityInterface[]; totalPages: number }> {
    // Also check the extreme case if the user manages to pass a negative number as the selected page.
    if (page < 1) {
      throw new HttpException(
        'Page number cannot be negative or equal 0!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const filteredCities = this.filterCities(query);
    const totalPages = Math.ceil(filteredCities.length / 5);
    const skip = (page - 1) * 5;
    const data = filteredCities.slice(skip, skip + 5);
    return { data, totalPages };
  }

  // Translate all characters in the city name into small letters to successfully filter them by query.
  // Then filter the list using the filter function.
  // If the parameter for the city name filter is empty, we return the full list.
  private filterCities(query: string): CityInterface[] {
    if (!query) {
      return this.cities;
    }
    query = query.toLowerCase();
    return this.cities.filter((city) =>
      city.cityName.toLowerCase().includes(query),
    );
  }
}
