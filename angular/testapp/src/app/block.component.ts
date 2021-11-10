import { Input, Component, OnInit } from '@angular/core';
      import { ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {MyService} from './my.service';
import {CardService} from './card.service';       
 
@Component({
    selector: 'block-comp',
    template: `
	

	<div class="mainblock">
	<div class="upblock">
	<p class="headint">{{anime_name}} </p>
<div (click)="goToCard()" class="arr">
<p   
class="arrow" style="position:relative; bottom:15%;">
 {{'\u2794'}}</p>
</div>

 </div>
<div class="bottomblock"> 
<p class="little_bottomblock">Количество серий</p>
<p class="little_bottomblock" style="margin-right:3%;width:11.5%;color:RoyalBlue">{{count_episods}}</p>

<p class="little_bottomblock" style="margin-left:3%;width:10%">Формат</p>

<p class="little_bottomblock" style="width:11.5%;color:RoyalBlue">{{anime_format}}</p>

</div>

</div>


`,
    styles: [`.mainblock{ width: auto; height:auto%;min-height:70px;border-bottom: 1px solid LightGray;margin: 0% 3% 0% 3%;padding: 2% 0% 2% 0%;
				
			
	}
	p{font-family:Verdana;margin-top:0%;margin-bottom:0%;}
	.headint{width:auto;float:left;font-weight:bold;font-size:medium}
	
	.little_bottomblock{float:left;width:17%}
	.bottomblock{overflow:auto; margin-top:3%;clear:both;}
	.upblock{ overflow:auto; float:left;padding:1% 0% 3% 0%;}
	.bottomblock p{font-size:13px;}
	.arrow{height:15px;margin:0px 15px;width:auto;float:left;color:RoyalBlue}
	.arr{float:left}
	.arr:hover p{color:Gray;cursor: pointer;}
	`]
})
export class BlockComponent  { 
    isVisible:boolean=true;
    @Input() anime_name:string= "";
	@Input() count_episods:number=0;
	@Input() anime_format:string= "";
	@Input() i:number=1;
	@Input() status:string;
	@Input() season;
	@Input() eng_name;
	@Input() nat_name;
	@Input() genres:string[];
	@Input() certain_page:number;
	public constructor(
	private router: Router, private cardservice: CardService){
		
		
	}
	 
	
	 goToCard(){
		 
		this.isVisible=false;
		this.cardservice.myMethod(this.isVisible); 
	
		
        this.router.navigate([this.certain_page,"card"],
		{
                queryParams:{
					'certain_page':this.certain_page,
                    'anime_name': this.anime_name, 
                    'count_episods': this.count_episods,
					'status': this.status,
					'genres': this.genres,
					'anime_format': this.anime_format,
					'season': this.season,
					'eng_name':this.eng_name,
					'nat_name':this.nat_name
					
                }
            }
		
		);
		
	}
	

}