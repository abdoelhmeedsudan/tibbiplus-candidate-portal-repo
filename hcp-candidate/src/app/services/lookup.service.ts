import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApiService } from './base-api.service';

export interface LookupItem {
  id: string;
  name: string;
  nameEn?: string;
  nameAr?: string;
}

export interface JobTitle extends LookupItem {
  categoryId?: string;
}

export interface Nationality extends LookupItem {
  code?: string;
}

export interface Country extends LookupItem {
  code?: string;
  dialCode?: string;
}

export interface City extends LookupItem {
  countryId?: string;
}

export interface MedicalCouncil extends LookupItem {
  countryId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LookupService extends BaseApiService {

  constructor(http: HttpClient) {
    super(http);
  
  }

  /**
   * Get all job titles
   */
  getJobTitles(): Observable<JobTitle[]> {
    return this.getPaginated<JobTitle>('JobTitles');
  }

  /**
   * Get all nationalities
   */
  getNnationalities(): Observable<Nationality[]> {
    return this.getPaginated<Nationality>('Nationalities');
  }

  /**
   * Get all countries
   */
  getCountries(): Observable<Country[]> {
    return this.getPaginated<Country>('Countries');
  }

  /**
   * Get country by ID
   */
  getCountryById(countryId: string): Observable<Country> {
    return this.get<Country>(`Countries/${countryId}`);
  }

  /**
   * Get all cities
   */
  getCities(): Observable<City[]> {
    return this.getPaginated<City>('Cities');
  }

  /**
   * Get all medical councils
   */
  getMedicalCouncils(): Observable<MedicalCouncil[]> {
    return this.getPaginated<MedicalCouncil>('MedicalCouncils');
  }

  /**
   * Get cities by country
   */
  getCitiesByCountry(countryId: string): Observable<City[]> {
    return this.getPaginated<City>(`Cities/country/${countryId}`);
  }

  /**
   * Get medical councils by country
   */
  getMedicalCouncilsByCountry(countryId: string): Observable<MedicalCouncil[]> {
    return this.getPaginated<MedicalCouncil>(`MedicalCouncils/country/${countryId}`);
  }
}
