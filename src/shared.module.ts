import {ModuleWithProviders, NgModule} from "@angular/core";
import {AutoFocusDirective} from "./utilities/auto-focus.directive";
import {ToastrService} from "ngx-toastr";

@NgModule({
  declarations: [
    AutoFocusDirective,
  ],
  imports: [],
  exports: []
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
