import { NgModule } from '@angular/core';
import {PortalHostDirective} from './directives/portal-host.directive';
import {PortalSlotDirective} from './directives/portal-slot.directive';
import {PortalHostComponentStyleDirective} from './directives/portal-host-component-style.directive';



@NgModule({
  declarations: [
    PortalHostDirective,
    PortalSlotDirective,
    PortalHostComponentStyleDirective,
  ],
  exports: [
    PortalHostDirective,
    PortalSlotDirective,
    PortalHostComponentStyleDirective,
  ],
})
export class PortalModule { }
