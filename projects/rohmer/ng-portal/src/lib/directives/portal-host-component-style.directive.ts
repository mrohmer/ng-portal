import {
  AfterViewInit, ApplicationRef,
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  Host,
  Injector,
  Input,
  OnDestroy
} from '@angular/core';
import {PortalService} from '../services/portal.service';
import {AbstractPortalHostDirective} from './portal-host.base';
import {PortalHostDirective} from './portal-host.directive';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'rp-portal-host',
  providers: [{ provide: PortalHostDirective, useExisting: PortalHostComponentStyleDirective }],
  exportAs: 'rpPortalHost',
})
export class PortalHostComponentStyleDirective extends AbstractPortalHostDirective implements AfterViewInit, OnDestroy {
  @Input()
  set slot(value: string) {
    this.slot$.next(value);
  }

  constructor(
    @Host() hostRef: ElementRef,
    portalService: PortalService,
    componentFactoryResolver: ComponentFactoryResolver,
    injector: Injector,
    appRef: ApplicationRef,
  ) {
    super(hostRef, portalService, componentFactoryResolver, injector, appRef);
  }

  ngAfterViewInit(): void {
    this.afterViewInit();
  }

  ngOnDestroy(): void {
    this.onDestroy();
  }
}
