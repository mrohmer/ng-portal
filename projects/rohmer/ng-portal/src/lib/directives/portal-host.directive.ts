import {
  AfterViewInit,
  ApplicationRef,
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  Host,
  Injector,
  Input,
  OnDestroy
} from '@angular/core';
import {AbstractPortalHostDirective} from './portal-host.base';
import {PortalService} from '../services/portal.service';

@Directive({
  selector: '[rpPortalHost]',
  exportAs: 'rpPortalHost',
})
export class PortalHostDirective extends AbstractPortalHostDirective implements AfterViewInit, OnDestroy {
  @Input()
  set rpPortalHost(value: string) {
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
