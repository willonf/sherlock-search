import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Subject, takeUntil} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  private urlBase = environment.urlBase;
  private collection = environment.collection;
  private searchRoute: string = environment.searchRoute
  private fullURL = `${this.urlBase}${this.collection}${this.searchRoute}`


  public formGroup: UntypedFormGroup;
  public unsubscribe = new Subject();
  private parameters: HttpParams = new HttpParams();
  private body: {} = null;

  public queries = [];

  constructor(public formBuilder: UntypedFormBuilder, public http: HttpClient, public toast: ToastrService) {
  }

  public ngOnInit(): void {
    this.createFormGroup();
  }

  public createFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      topic: [null],
    });
  }

  private getOptions(responseType?: any): any {
    const httpOptions = {};

    if (this.parameters) {
      httpOptions["params"] = this.parameters;
    }
    if (responseType) {
      httpOptions["responseType"] = responseType;
    }
    return httpOptions;
  }

  public clearParameters(): void {
    this.parameters = new HttpParams();
  }

  public addParameter(key: string, value: any): void {
    if (this.parameters.has(key)) {
      this.parameters = this.parameters.set(key, value);
    } else {
      this.parameters = this.parameters.append(key, value);
    }
  }

  public mountBody() {
    if (this.formGroup.value.topic) {
      this.body = {
        query: {
          simple_query_string: {
            query: this.formGroup.value.topic
          }
        }
      }
    }
  }

  public cleanBody() {
    this.body = null;
  }

  public search() {
    this.mountBody();
    this.http.post(this.fullURL, this.body, this.getOptions())
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: (response) => {
          this.queries = response['hits']['hits']
        },
        error: () => {
          this.toast.warning('Erro!')
        },
        complete: () => {
          this.cleanBody();
        }
      })
  }

}
