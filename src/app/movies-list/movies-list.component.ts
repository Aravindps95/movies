import {AfterViewInit, OnInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MoviesListService } from './movies-list-service.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

export interface moviesData {
  Title: string;
  Year: string;
  imdbRating: string;
  Director: string;
  BoxOffice: string;
  Country: string;
  Language: string;
  Genre: string;
  Arrow: string
}

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MoviesListComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['Poster', 'Title', 'Year', 'Genre', 'imdbRating', 'Director', 'BoxOffice', 'Language', 'Country', 'Arrow'];
  dataSource: MatTableDataSource<moviesData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private moviesListService: MoviesListService) {
  }

  ngOnInit() {
    this.moviesListService.getMoviesList().subscribe(movies => {
    this.dataSource = new MatTableDataSource(movies);
    });
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.Title.toLowerCase().includes(filter) || data.Year.includes(filter) || data.BoxOffice === filter || data.imdbRating.includes(filter);
    };
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * 
   *To filter the table based on Title, year, box office and imdbrating
   */
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


