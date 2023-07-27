import { Component, OnInit } from '@angular/core';
import { CitiesService } from '../cities.service';
import { CityInterface } from '../interfaces/city.interface';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {
  query: string = '';
  page: number = 1;
  cities: CityInterface[] = [];
  totalPages: number[] = [];

  constructor(private citiesService: CitiesService) { }

  ngOnInit(): void {
    this.loadCities();
  }

  error: string = '';

  loadCities(): void {
    this.citiesService.getCities(this.query, this.page)
      .subscribe(
        ({ data, totalPages }) => {
          this.cities = data;
          this.totalPages = Array.from({ length: totalPages }, (_, i) => i + 1);
          this.error = '';
        },
        (error) => {
          console.error('Error loading cities:', error);
          this.error = error.error.message || 'Failed to load cities. Please try again later.';
        }
      );
  }

  onPageChange(page: number): void {
    this.page = page;
    this.loadCities();
  }
}
