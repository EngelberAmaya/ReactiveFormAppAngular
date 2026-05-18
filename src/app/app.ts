import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenu } from './shared/components/side-menu/side-menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SideMenu],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('reactive-form-app');
  protected readonly isSideMenuOpen = signal(false);

  toggleSideMenu(): void {
    this.isSideMenuOpen.update((isOpen) => !isOpen);
  }

  closeSideMenu(): void {
    this.isSideMenuOpen.set(false);
  }
}
