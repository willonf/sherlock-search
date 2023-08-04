import {Component, Injector} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  public queries = [];

  constructor(public injector: Injector) {
    // this.layoutService = injector.get(LayoutService);
  }

}
