import { RouterLink, RouterLinkActive } from '@angular/router';
import { reactiveRoutes } from './../../../reactive/reactive.routes';
import { Component } from '@angular/core';

interface MenuItem {
  title: string;
  route: string;
}

const reactiveItems = reactiveRoutes[0].children ?? [];

@Component({
  selector: 'app-side-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu.html',
  styleUrl: './side-menu.css',
})
export class SideMenu {

  reactiveMenu: MenuItem[] = reactiveItems
    .filter((item) => item.path !== '**')
    .map((item) => ({
      route: `reactive/${item.path}`,
      title: `${item.title}`,
    }));

  authMenu: MenuItem[] = [{
    title: 'Registro',
    route: './auth',
  }];

  countryMenu: MenuItem[] = [{
    title: 'Países',
    route: './country',
  }]
}
