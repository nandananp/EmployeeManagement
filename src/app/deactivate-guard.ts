import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';
export interface cancomponentDeactivate{
  CanDeactivate: ()=> boolean | Observable<boolean>
}
export const deactivateGuard: CanDeactivateFn<cancomponentDeactivate> =
 (component) => {
  return component.CanDeactivate? component.CanDeactivate() : true;
};
