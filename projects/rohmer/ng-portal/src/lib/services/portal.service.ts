import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {CdkPortal} from '@angular/cdk/portal';
import {pluck} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PortalService {

  private slots$ = new BehaviorSubject<Record<string, CdkPortal>>({});

  attach(slot: string, portal: CdkPortal): void {
    this.slots$.next({
      ...this.slots$.value,
      [slot]: portal,
    });
  }
  detach(slot: string): void {
    console.log('detach');
    const slots = Object.entries(this.slots$.value)
      .filter(([key]) => key !== slot)
      .reduce(
        (prev, [key, value]) => ({
          [key]: value,
        }),
        {}
      );

    this.slots$.next(slots);
  }
  getSlotListener(slot: string): Observable<CdkPortal> {
    return this.slots$
      .pipe(
        pluck(slot),
      );
  }
}
