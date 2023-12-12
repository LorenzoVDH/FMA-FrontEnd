import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';

import { LayoutComponent } from './components/layout/layout.component';
import { NavigationMenuComponent } from './components/navigationmenu/navigationmenu.component';
import { StartpageComponent } from '../startpage/startpage.component';
import { PopupComponent } from './components/popup/popup.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { OverviewComponent } from './components/overview/overview.component';

@NgModule({
  declarations: [
    LayoutComponent,
    NavigationMenuComponent,
    StartpageComponent,
    PopupComponent,
    PaginatorComponent,
    OverviewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    FormsModule
  ],
  exports: [
    LayoutComponent,
    PaginatorComponent,
    OverviewComponent
  ]
})
export class SharedModule { }
