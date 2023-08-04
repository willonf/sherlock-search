import {HttpClient, HttpParams, HttpUserEvent} from "@angular/common/http";
import {catchError, map, tap} from "rxjs/operators";
import {from, Observable, throwError} from "rxjs";
import {environment} from '../environments/environment'
import {PaginatedResult} from "../dto/paginated-result";

export class BaseService<T> {
  public urlBase: string;
  public urlSocket: string;
  public fullUrl: string;

  private parameters: HttpParams = new HttpParams();

  constructor(public http: HttpClient,
              public path: string) {

    this.urlBase = environment.urlBase;
    this.urlSocket = environment.urlSocket;
    this.fullUrl = `${this.urlBase}${path}`;
  }

  public clearParameter(): void {
    this.parameters = new HttpParams();
  }

  public addParameter(key: string, value: any): void {
    if (this.parameters.has(key)) {
      this.parameters = this.parameters.set(key, value);
    } else {
      this.parameters = this.parameters.append(key, value);
    }
  }

  private getOptions(responseType?: any): any {
    const httpOptions: any = {};

    if (this.parameters) {
      httpOptions["params"] = this.parameters;
    }
    if (responseType) {
      httpOptions["responseType"] = responseType;
    }
    return httpOptions;
  }

  public getAll(route?: string): Observable<T[]> {
    const url = route ? `${this.fullUrl}${route}/` : `${this.fullUrl}`;
    return this.http.get<T[]>(url, this.getOptions())
      .pipe(
        tap(response => response as HttpUserEvent<T[]>),
        catchError(ex => from([]))
      );
  }

  public getPaginated(route?: string): Observable<PaginatedResult<T>> {
    const url = route ? `${this.fullUrl}${route}/` : `${this.fullUrl}`;
    return this.http.get<PaginatedResult<T>>(url, this.getOptions())
      .pipe(
        tap(response => response as HttpUserEvent<PaginatedResult<T>>),
        catchError(ex => from([]))
      );
  }


  public getPaginatedFromDetailRoute<K>(id: number, route: string): Observable<PaginatedResult<K>> {
    const url = `${this.fullUrl}${id}/${route}/`;
    return this.http.get<PaginatedResult<K>>(url, this.getOptions())
      .pipe(
        tap(response => response as HttpUserEvent<PaginatedResult<K>>),
        catchError(ex => from([]))
      );
  }

  public getPaginatedFromListRoute<K>(route: string): Observable<PaginatedResult<K>> {
    const url = `${this.fullUrl}${route}/`;
    return this.http.get<PaginatedResult<K>>(url, this.getOptions())
      .pipe(
        tap(response => response as HttpUserEvent<PaginatedResult<K>>),
        catchError(ex => from([]))
      );
  }

  public getFromDetailRoute<K>(id: number, route: string): Observable<K> {
    const url = `${this.fullUrl}${id}/${route}/`;
    return this.http.get<K>(url, this.getOptions())
      .pipe(
        tap(response => response as HttpUserEvent<K>),
        catchError(ex => from([]))
      );
  }

  public getFromListRoute<K>(route: string): Observable<K> {
    const url = `${this.fullUrl}${route}/`;
    return this.http.get<K>(url, this.getOptions())
      .pipe(
        tap(response => response as HttpUserEvent<K>),
        catchError(ex => from([]))
      );
  }

  public postFromDetailRoute<E, K>(id: number, route: string, entity: E): Observable<K> {
    const url = `${this.fullUrl}${id}/${route}/`;
    return this.http.post<K>(url, entity, this.getOptions())
      .pipe(
        tap(response => response as HttpUserEvent<K>),
        catchError(ex => from([]))
      );
  }

  public postFromListRoute<E, K>(route: string, entity: E): Observable<K> {
    const url = `${this.fullUrl}${route}/`;
    return this.http.post<K>(url, entity, this.getOptions())
      .pipe(
        tap(response => response as HttpUserEvent<K>),
        catchError(ex => from([]))
      );
  }

  public patchFromDetailRoute<E, K>(id: number, route: string, entity: E): Observable<K> {
    const url = `${this.fullUrl}${id}/${route}/`;
    return this.http.patch<K>(url, entity, this.getOptions())
      .pipe(
        tap(response => response as HttpUserEvent<K>),
        catchError(ex => from([]))
      );
  }

  public patchFromListRoute<E, K>(route: string, entity: E): Observable<K> {
    const url = `${this.fullUrl}${route}/`;
    return this.http.patch<K>(url, entity, this.getOptions())
      .pipe(
        tap(response => response as HttpUserEvent<K>),
        catchError(ex => from([]))
      );
  }

  public save(entity: T): Observable<T> {
    this.clearParameter();
    return this.http.post<T>(this.fullUrl, entity, this.getOptions())
      .pipe(
        tap(response => response as HttpUserEvent<T>),
        catchError(ex => from([]))
      );
  }

  public getById(id: number | string, route?: string): Observable<T> {
    const url = route ? `${this.fullUrl}${id}/${route}/` : `${this.fullUrl}${id}/`;
    return this.http.get<T>(url, this.getOptions())
      .pipe(
        tap(response => response as HttpUserEvent<T>),
        catchError(ex => from([]))
      );
  }

  public delete(id: number | string): Observable<any> {
    this.clearParameter();
    const url = `${this.fullUrl}${id}/`;
    return this.http.delete<any>(url, this.getOptions())
      .pipe(
        tap(response => response as HttpUserEvent<any>),
        catchError(ex => from([]))
      );
  }

  public update(id: number | string, entity: any): Observable<any> {
    this.clearParameter();
    const url = `${this.fullUrl}${id}/`;
    return this.http.patch<T>(url, entity, this.getOptions())
      .pipe(
        tap(response => response as HttpUserEvent<T>),
        catchError(ex => throwError(ex))
      );
  }

  public options(): Observable<any> {
    return this.http.options<T>(this.fullUrl, this.getOptions())
      .pipe(
        tap(response => response as HttpUserEvent<any>),
        map(response => response["actions"]["POST"]),
        catchError(ex => from([]))
      );
  }
}
