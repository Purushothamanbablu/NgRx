import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './components/store/table.reducer';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTableComponent } from './components/add-table/add-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { tableView } from './components/store/table.effect';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
@NgModule({
  declarations: [
    AppComponent,
    AddTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,CommonModule,ReactiveFormsModule,
    StoreModule.forRoot({ user: userReducer }),  
    EffectsModule.forRoot([tableView]), 
    HttpClientModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25, 
      autoPause: true,
      trace: true,
      traceLimit: 75, 
    })
    


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

