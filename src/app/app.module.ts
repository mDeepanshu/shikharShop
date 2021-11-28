import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Routes, RouterModule } from '@angular/router';

//
import { PurchaseComponent } from './purchase/purchase.component';
import { AddItemComponent } from './add-item/add-item.component';

const routes: Routes = [
  { path: '', component: PurchaseComponent },
  { path: 'additem', component: AddItemComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    PurchaseComponent,
    AddItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatSnackBarModule,
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
