import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }   from './app.component';
import { MainComponent }   from './main.component';
import { BlockComponent }   from './block.component';
import { UpperComponent }   from './upper.component';
import {CardService} from './card.service';      
import { BottomComponent }   from './bottom.component';
import {CardComponent} from './card.component';
import {MyService } from './my.service';
import {Routes, RouterModule} from '@angular/router';
import {DataService} from './data.service';
import {SearchComponent} from './search.component';
  import {Subscription} from 'rxjs';
  import { ReactiveFormsModule }   from '@angular/forms';
  import { SearchNameService}   from './search-name.service';
	  import { Observable } from 'rxjs';
const itemRoutes: Routes = [
    { path: ':id', component: CardComponent},
 
];
 
const appRoutes: Routes =[
    
	
	 { path: ':id', component: AppComponent, children: itemRoutes},
     { path: '', redirectTo: '/1'}
];
@NgModule({
    imports:      [ BrowserModule, ReactiveFormsModule, FormsModule,RouterModule.forRoot(appRoutes) ],
    declarations: [SearchComponent, MainComponent,CardComponent, AppComponent,BlockComponent,UpperComponent,BottomComponent],
	providers:    [DataService,MyService,CardService,SearchNameService],
    bootstrap:    [ MainComponent ]
})
export class AppModule { } 