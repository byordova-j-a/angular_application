import { Input,Output, Component } from '@angular/core';
import {DataService} from './data.service';
import { ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {MyService} from './my.service';
 import { Observable } from 'rxjs';
 import {CardService} from './card.service'; 
 import { SearchNameService}   from './search-name.service';   
 
 
  export class Onegenre{
    constructor(public name: string, 
                public checked: boolean)
    { }
}
 
@Component({
    selector: 'my-app',
    template: `
<div style="float:left; width:70%;" >
 <upper-comp [style.display]="isVisible? 'block' : 'none'"  >Аниме 2020-го года</upper-comp>

<block-comp *ngFor="let item of name;let i = index" [anime_name]="name[i]" [count_episods]="count[i]"
 [certain_page]="certain_page" [status]="status[i]"  [genres]="genres[i]"
 [season]="season[i]" [eng_name]="eng_name[i]" [nat_name]="nat_name[i]"
 
[anime_format]="format[i]" [style.display]="isVisible? 'block' : 'none'"  > </block-comp> </div>


<search-app  [class.blockclass]="isVisible"
	[class.noneclass]="!isVisible"></search-app>
   <router-outlet >


   </router-outlet>
<p> {{myData}}</p>

                `,
    styles: [`.arrow{height:15px;margin:0px 15px;width:auto;float:left;}
			.arrow:hover{color:Gray;cursor: pointer;}
			.blockclass{display:block; height:100%; float:right; width:29%;}
			.noneclass{display: none;}
	`],


})
export class AppComponent { 
    name=[];myData;
	status=[];
	season=[];
	certain_format:string|null=null;
	allGenres=[
      "Action",
      "Adventure",
      "Comedy",
      "Drama",
      "Ecchi",
      "Fantasy",
      "Horror",
      "Mahou Shoujo",
      "Mecha",
      "Music",
      "Mystery",
      "Psychological",
      "Romance",
      "Sci-Fi",
      "Slice of Life",
      "Sports",
      "Supernatural",
      "Thriller"
    ];
	
	genres:string[]=[];
	certain_name: string="";
	nat_name=[];
	eng_name=[];
	arr_genres:Onegenre[]=[];
	count=[];
	format=[];
 certain_page:number=1;
	last_page;
	total_anime;
	isVisible:boolean=true;
	id: number | undefined;
    private subscription: Subscription;
	 public constructor(private dataService: DataService,private myService: MyService,private activateRoute: ActivatedRoute,
	private router: Router,private cardservice:CardService,private searchname:SearchNameService){
		for(let i=0;i++;i<18){
			this.arr_genres.push(new Onegenre(this.allGenres[i],false));
		}
		
		
	}
   
	 ngOnInit(){
		 		this.searchname.FormatsMethod$.subscribe(message=>{
			this.certain_format=message;
			
			this.certain_page=1; this.router.navigate([this.certain_page]);
			(this.dataService.loadData(this.certain_page,this.certain_name,this.arr_genres,this.certain_format)).then(this.GetBlockData);
			
		});
		 
		this.searchname.GenresMethod$.subscribe(message=>{
			this.arr_genres=message;
			
			this.certain_page=1; this.router.navigate([this.certain_page]);
			(this.dataService.loadData(this.certain_page,this.certain_name,this.arr_genres,this.certain_format)).then(this.GetBlockData);
			
		});
		 this.GetBlockData=this.GetBlockData.bind(this);
		  this.searchname.Methodname$.subscribe(message => {this.certain_name=message;
		this.certain_page=1; this.router.navigate([this.certain_page]);
	
		 (this.dataService.loadData(this.certain_page,this.certain_name,this.arr_genres,this.certain_format)).then(this.GetBlockData).then(a=>{this.searchname.Methodcount(a);});
		 
		 
		 });
		 
	 this.cardservice.myMethod$.subscribe(message => {this.isVisible = message;
		});
          this.subscription = this.activateRoute.params.subscribe((params)=>{this.id=params['id']; 
		if ((this.id<1)||(this.id>this.last_page)) {this.certain_page=1;} else this.certain_page=this.id;
		
	
		
		  
		
		  
		  
		  (this.dataService.loadData(this.certain_page,this.certain_name,this.arr_genres,this.certain_format)).then(this.GetBlockData);
		   
		  });    
		
            
    }
		 
		GetBlockData(a){
		   if (this.name.length!==0){this.name.length=0};
		   if (this.eng_name.length!==0){this.eng_name.length=0};
		   if (this.nat_name.length!==0){this.nat_name.length=0};
		    if (this.count.length!==0){this.count.length=0};
			 if (this.format.length!==0){this.format.length=0};
		    if (this.genres.length!==0){this.genres.length=0};
			if (this.season.length!==0){this.season.length=0};
			if (this.status.length!==0){this.status.length=0};
		   if (a[0]){a[0].forEach((item)=>this.name.push(item));}
		if (a[1]){a[1].forEach((item)=>this.count.push(item));}
		if (a[2]){a[2].forEach((item)=>this.format.push(item));}
		if (a[3]){this.last_page=a[3];}
		this.total_anime=a[4];
		if (a[5]){a[5].forEach((item)=>this.status.push(item));}
		
		if (a[6]){a[6].forEach((item)=>this.season.push(item));}
	
		if (a[7]){a[7].forEach((item)=>this.eng_name.push(item));}
		if (a[8]){a[8].forEach((item)=>this.genres.push(item));}
		if (a[9]){a[9].forEach((item)=>this.nat_name.push(item));}
		
	
		
		
		   	this.myService.myMethod([this.certain_page,this.last_page]);
			return this.total_anime;
		}
	

}