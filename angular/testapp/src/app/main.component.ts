import { Component } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {MyService} from './my.service';
import {CardService} from './card.service';  
	  import { Observable } from 'rxjs';

@Component({
    selector: 'main-app',
    template: `
<div style="min-width: 1200px;height:100%">
   <router-outlet >
</router-outlet>


<div style="float:left; width:70%" >
	
	 <nav>
                    
                   <div class="page" >
 
 <p class="arrow" [style.display]="isVisible? 'block' : 'none'" [style.visibility]="isLeft? 'visible' : 'hidden'" (click)="goBack()">{{'\u1438'}}</p>

	<p [style.display]="isVisible? 'block' : 'none'"style="padding-left:1.5%;padding-right:1.5%">{{number_page}}
	</p>
	 <p class="arrow" [style.display]="isVisible? 'block' : 'none'" [style.visibility]="isRight? 'visible' : 'hidden'" (click)="goNext()">{{'\u1433'}}</p>
	
	</div>
	
                  
 </nav>
 </div>
 </div>
	`,
    styles: [`
	.page{width: auto;height:auto;margin: 4% 3% 2% 4%;	
	}
	.arrow{color:RoyalBlue;}
	.arrow:hover{color:Gray;cursor: pointer;}
	
	p{
		float:left;font-family:Verdana;margin-top:0%;margin-bottom:0%;font-weight:bold;font-size:13px;
	}
	
	`],
	
})
export class MainComponent {
number_page:number=1;
last_page:number;
next_page:number;
prev_page:number;
isLeft:boolean;
isRight:boolean;
isVisible:boolean=true;
	public constructor(private myService: MyService,private router: Router, private cardservice: CardService) {}
	ngOnInit(){
		this.cardservice.myMethod$.subscribe(message => {this.isVisible = message;
		});
      this.myService.myMethod$.subscribe((data) => {
		  if (data[0]==1){
	   this.isLeft=false;} else {this.isLeft=true;}
	    if (data[0]==data[1]){
	   this.isRight=false;} else {this.isRight=true;}
		   
               this.number_page = data[0]; this.last_page = data[1];

			
           
        });
	   }
    
	
	
	goNext(){this.next_page=++this.number_page;
		 
		
        this.router.navigate([this.next_page]);
	}
	goBack(){this.prev_page=--this.number_page;
		
		
        this.router.navigate([this.prev_page]);
	}
     

    
  

}