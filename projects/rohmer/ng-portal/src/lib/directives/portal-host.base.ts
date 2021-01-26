import {
  ApplicationRef,
  ComponentFactoryResolver,
  ElementRef,
  Injector,
} from '@angular/core';
import {PortalService} from '../services/portal.service';
import {CdkPortal, DomPortalOutlet, PortalOutlet} from '@angular/cdk/portal';
import {ReplaySubject, Subject} from 'rxjs';
import {distinctUntilChanged, switchMap, takeUntil, tap} from 'rxjs/operators';

export abstract class AbstractPortalHostDirective {
  protected destroyed$ = new Subject();
  protected portalOutlet: PortalOutlet|null = null;
  protected slot$ = new ReplaySubject<string>();

  attached = false;

  protected constructor(
    protected hostRef: ElementRef,
    protected portalService: PortalService,
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected injector: Injector,
    protected appRef: ApplicationRef,
  ) {
  }

  protected afterViewInit(): void {
    this.portalOutlet = new DomPortalOutlet(
      this.hostRef.nativeElement,
      this.componentFactoryResolver,
      this.appRef,
      this.injector
    );
    this.slot$
      .pipe(
        distinctUntilChanged(),
        tap(() => this.updateContentAttachment(null)),
        switchMap(slot => this.portalService.getSlotListener(slot)),
        takeUntil(this.destroyed$)
      )
      .subscribe(
        (portal) => this.updateContentAttachment(portal),
        () => {
        },
        () => this.updateContentAttachment(null)
      );
  }

  protected onDestroy(): void {
    this.destroyed$.next();
  }
  protected updateContentAttachment(portal: CdkPortal|null): void {
    if (this.portalOutlet?.hasAttached()) {
      this.portalOutlet.detach();
    }
    if (portal) {
      this.portalOutlet?.attach(portal);
    }
    this.attached = this.portalOutlet?.hasAttached() ?? false;
  }
}
