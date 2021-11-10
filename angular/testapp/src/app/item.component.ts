import { Component, Input,Output, EventEmitter  } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
import {MyService} from './my.service';

@Component({
    selector: 'item-comp',
    template: `
   <my-app></my-app>


                `,
    styles: [``],
	
})
export class ItemComponent { 

 
id: number | undefined;
    private subscription: Subscription;
	
   constructor(private myService: MyService,private myServiceapp: MyService,private activateRoute: ActivatedRoute,
	private router: Router){
         
        this.subscription = activateRoute.params.subscribe((params)=>{console.log(params);this.id=params['id'];console.log(params['id']); 
		if ((this.id<1)||(this.id>6)) {this.id=1;} 
		this.myService.myMethod(this.id);
		  console.log("b1");
		 this.myServiceapp.myMethod(this.id);
		   console.log("b2");
		
		})
    }
	 

}