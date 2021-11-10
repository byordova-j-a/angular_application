 import {Subscription} from 'rxjs';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import {Injectable} from '@angular/core';
@Injectable()
export class CardService {
    myMethod$: Observable<any>;
    private myMethodSubject = new Subject<any>();

    constructor() {
        this.myMethod$ = this.myMethodSubject.asObservable();
    }

    myMethod(data) {
     
        this.myMethodSubject.next(data);
		
    }
	
}