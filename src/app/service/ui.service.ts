import { Injectable } from '@angular/core';
import { NavigationCancel, ResolveEnd, ResolveStart, Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UiService {
  loadingState = new Subject<boolean>()
  constructor(private router: Router) {
    this.initializeRouterEvents();
  }
  public activateLoading() {
    this.loadingState.next(true);
  }
  public deactivateLoading() {
    this.loadingState.next(false);
  }
  private initializeRouterEvents() {
    this.router.events.subscribe(event => {
      if (event instanceof ResolveStart) {
        this.loadingState.next(true);
      } else if (
        event instanceof ResolveEnd ||
        event instanceof NavigationCancel
      ) {
        this.loadingState.next(false);
      }
    });
  }
}
