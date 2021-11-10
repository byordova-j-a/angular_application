import { Component } from '@angular/core';
      
@Component({
    selector: 'upper-comp',
    template: `<div >
	<p><ng-content></ng-content>
	</p>
	
	</div>
	
	`,
    styles: [`
	div{width: auto;height:auto;margin: 4% 3% 2% 3%;clear:both;	
	}
	p{
		font-family:Verdana;margin-top:0%;margin-bottom:0%;font-size:large;font-weight:bold;
	}
	`]
})
export class UpperComponent { 
    

}