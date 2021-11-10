import { Input,Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CardService} from './card.service'; 
import { ActivatedRoute} from '@angular/router';    
 import {Subscription} from 'rxjs';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import {Location} from '@angular/common';

@Component({
    selector: 'card-comp',
    template: ` 
	<div style="min-width: 1200px;">
	<div class="ar"  (click)="goToList()" >
  <p 
class="arrow" style="transform: scale(-1, 1);margin:0px 0px 0px 0px">{{'\u2794'}}</p> <p
class="arrow" style="font-weight:normal;margin:0px 0px 0px 3px;">Вернуться </p>
</div>
<div class="upper"> {{anime_name}}</div>


   <div class="main">
   <div class="block">
   <p style="width:17%;">Количество серий</p> <p style="margin-right:3%;width:11.5%;color:RoyalBlue">{{count_episods}}</p>
   <p style="margin-left:3%;width:10%">Формат</p> <p style="width:11.5%;color:RoyalBlue">{{anime_format}}</p>
   </div>
    <div class="block">
   <p style="width:17%;">Статус</p> <p style="margin-right:3%;margin-right:3%;width:11.5%;color:RoyalBlue">{{status}}</p>
   <p style="margin-left:3%;width:10%">Сезон</p> <p style="width:11.5%;color:RoyalBlue">
    {{season}}</p>
   </div>
   <div class="block" style="margin: 0% 0% 1% 0%">
   <p>Название на разных языках</p>
   </div>
    <div class="block">
   <p style="width:17%;">Romaji</p> <p style="margin-right:3%;width:26%;color:RoyalBlue">{{anime_name}}</p>
   </div>
     <div class="block">
   <p style="width:17%;">English</p> <p style="margin-right:3%;width:26%;color:RoyalBlue">{{eng_name}}</p>
   </div>
     <div class="block">
   <p style="width:17%;">Native</p> <p style="margin-right:3%;width:26%;color:RoyalBlue">{{nat_name}}</p>
   </div>
   <div class="block" style="margin: 0% 0% 1% 0%">
   <p>Жанры</p>
   </div>
   <div class="block" style="width:width:57%;margin: 0% 0% 0% 0%">
   <p style="color:RoyalBlue;white-space: normal"
 *ngFor="let item of genres">{{item}}&nbsp;</p>
   </div>
   </div>
</div>
   
	`,
    styles: [`
	.main{overflow: auto; margin: 1.5% 0% 0% 3%;width: auto;}
	.block{overflow: auto; margin: 1% 0% 3% 0%;clear:both;}
	.arrow{height:auto;width:auto;float:left;position:relative; bottom:15%; color:RoyalBlue}
	.ar{overflow: auto; margin: 3.5% 3% 0% 3%;}
	.ar:hover p{color:Gray;cursor: pointer;}
	p{
		float:left;font-family:Verdana;margin-top:0%;margin-bottom:0%;font-size:13px;
	}
	.upper{width: auto;height:auto;margin: 3% 3% 2% 3%;clear:both;font-weight:bold;font-size:large;font-family:Verdana	
	}

	.little_bottomblock{float:left;width:12%}
	.bottomblock{overflow:auto; margin-top:3%;clear:both;}
	`]
})
export class CardComponent { 


   id: any;
    anime_name: any;
	stringgenres;
    certain_page; 
	status;
	count_episods;
	genres;
	season;
	nat_name;
	eng_name;
	end_date;
	anime_format;
    private routeSubscription: Subscription;
    private querySubscription: Subscription;
    constructor(private _location: Location,private route: ActivatedRoute,private cardservice:CardService,private router: Router){}
     ngOnInit(){    
      this.routeSubscription = this.route.params.subscribe((params)=>{this.id=params['id'];
	  if (this.id==='card') {this.cardservice.myMethod(false);}}
	  
	  
	  );
	  
        this.querySubscription = this.route.queryParams.subscribe(
            (queryParam: any) => {
                this.anime_name = queryParam['anime_name'];
                this.count_episods = queryParam['count_episods'];
				this.status = queryParam['status'];
				this.genres = queryParam['genres'];
				this.season = queryParam['season'];
				this.nat_name = queryParam['nat_name'];
				this.eng_name = queryParam['eng_name'];
				this.anime_format = queryParam['anime_format'];
				this.stringgenres=this.genres.join(', ');
				this.genres=this.stringgenres.split(' ');
			
            }
        );
    }

   goToList(){
	
		this.cardservice.myMethod(true); 
		

		
		
       this._location.back();
		
	}
 
}