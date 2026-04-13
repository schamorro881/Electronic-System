import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  isCollapsed = signal<boolean>(false);

  toggleSidebar() {
    this.isCollapsed.update(val => !val);
  }

  setCollapsed(val: boolean) {
    this.isCollapsed.set(val);
  }
}
