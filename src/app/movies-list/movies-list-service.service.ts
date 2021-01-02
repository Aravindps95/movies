import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject } from 'rxjs';
import * as moviesData from '../../assets/json/data.json';
@Injectable({
  providedIn: 'root'
})
export class MoviesListService {
  public moviesList = new BehaviorSubject<any>(null);

  constructor() { }

  /**
   * Return the movies list from data.json as an observable
   */
  getMoviesList(): Observable<any> {
    this.moviesList.next((moviesData as any).default);
    return this.moviesList.asObservable();
  }
}
