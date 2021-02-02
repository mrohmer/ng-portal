import {AfterViewInit, Directive, Host, Input, OnDestroy, TemplateRef, ViewContainerRef} from '@angular/core';
import {PortalService} from '../services/portal.service';
import {TemplatePortal} from '@angular/cdk/portal';
import {ReplaySubject, Subject} from 'rxjs';
import {distinctUntilChanged, last, pairwise, startWith, take, takeUntil} from 'rxjs/operators';

@Directive({
  selector: 'ng-template[rpPortalSlot]',
  exportAs: 'rpPortalSlot',
})
export class PortalSlotDirective implements AfterViewInit, OnDestroy {
  private destroyed$ = new Subject();
  private slot$ = new ReplaySubject<string>();

  @Input()
  set rpPortalSlot(slot: string) {
    this.slot$.next(slot);
  }

  constructor(
    @Host() private templateRef: TemplateRef<any>,
    private portalService: PortalService,
    private viewContainerRef: ViewContainerRef,
  ) {
  }

  ngAfterViewInit(): void {
    const portal = new TemplatePortal(
      this.templateRef,
      this.viewContainerRef
    );
    this.slot$
      .pipe(
        takeUntil(this.destroyed$),
        startWith(undefined),
        distinctUntilChanged(),
        pairwise(),
      )
      .subscribe(
        ([oldSlot, newSlot]) => {
          if (oldSlot) {
            this.portalService.detach(oldSlot);
          }
          if (newSlot) {
            this.portalService.attach(newSlot, portal);
          }
        },
        // no error handling needed
        // cleanup done in ngOnDestroy
      );
  }

  ngOnDestroy(): void {
    this.slot$
      .pipe(
        take(1),
        takeUntil(this.destroyed$),
      )
      .subscribe(slot => slot && this.portalService.detach(slot));
    this.destroyed$.next();
  }
}
