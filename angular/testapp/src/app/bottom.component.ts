import { Input,Component } from '@angular/core';
      
@Component({
    selector: 'bottom-comp',
    template: ` 
	
 <div class="page" >




	<p style="padding-left:1.5%;padding-right:1.5%">{{number_page}}
	</p>
	 <p class="arrow">{{'\u1433'}}</p>
	
	</div>
	
	`,
    styles: [`
	.page{width: auto;height:auto;margin: 4% 3% 2% 4%;	
	}
	.arrow{color:RoyalBlue;}
	.arrow:hover{color:Gray;}
	p{
		float:left;font-family:Verdana;margin-top:0%;margin-bottom:0%;font-weight:bold;font-size:13px;
	}
	
	`]
})
export class BottomComponent{ 
    @Input() number_page:number=1;
	
	
}