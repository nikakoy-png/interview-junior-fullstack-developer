import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CityInterface } from "./interfaces/city.interface";
import {environment} from "./environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  constructor(private http: HttpClient) { }

  getCities(query: string, page: number) {
    const url = `${environment.apiUrl}?query=${query}&page=${page}`;
    return this.http.get<{ data: CityInterface[]; totalPages: number }>(url);
  }
}
