import {AfterViewInit, Directive, Host, Input, OnDestroy, TemplateRef, ViewContainerRef} from '@angular/core';
import {PortalService} from '../services/portal.service';
import {TemplatePortal} from '@angular/cdk/portal';
import {ReplaySubject, Subject} from 'rxjs';
import {distinctUntilChanged, pairwise, startWith, takeUntil} from 'rxjs/operators';

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
        // pairwise => no complete cleanup needed
      );
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

}
