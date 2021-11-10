import {Subscription} from 'rxjs';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import {Injectable} from '@angular/core';
@Injectable()
export class SearchNameService {
     Methodname$: Observable<any>;
	  Methodcount$: Observable<any>;
	  GenresMethod$: Observable<any>;
	  FormatsMethod$: Observable<any>;
    private MethodSubjectname = new Subject<any>();
	private MethodSubjectcount = new Subject<any>();
	private GenresMethodSubject = new Subject<any>();
	private FormatsMethodSubject = new Subject<any>();
    constructor() {
        this. Methodname$ = this.MethodSubjectname.asObservable();
		this. Methodcount$ = this.MethodSubjectcount.asObservable();
		this.GenresMethod$ = this.GenresMethodSubject.asObservable();
		this.FormatsMethod$ = this.FormatsMethodSubject.asObservable();
    }

    Methodname(data) {
       
        this.MethodSubjectname.next(data);
		
    }
	 Methodcount(data) {
      
        this.MethodSubjectcount.next(data);
		
    }
	GenresMethod(data) {
       
        this.GenresMethodSubject.next(data);
	
		
    }
	FormatsMethod(data) {
      
        this.FormatsMethodSubject.next(data);
		
		
    }
}