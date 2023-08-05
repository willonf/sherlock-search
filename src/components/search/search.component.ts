import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

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

  public queries = [1, 2, 3, 4, 5];

  constructor(public formBuilder: UntypedFormBuilder) {
  }

  public ngOnInit(): void {
    this.createFormGroup();
  }

  public createFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      query: [null],
    });
  }

  public search() {
    let body = {
      query: {
        simple_query_string: {
          query: "jovem OR sério"
        }
      }
    }
  }

}
