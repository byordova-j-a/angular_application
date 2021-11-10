import { Input,Output, Component } from '@angular/core';
import {DataService} from './data.service';
import { ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {MyService} from './my.service';
 import { Observable } from 'rxjs';
 import {CardService} from './card.service';   
import { FormGroup, FormControl, Validators} from '@angular/forms'; 
 import { SearchNameService}   from './search-name.service';
 
 
 export class Onegenre{
    constructor(public name: string, 
                public checked: boolean)
    { }
}

 
 
@Component({
    selector: 'search-app',
    template: `

<div class="main">
<div class="searchblock" style="margin: 9.5% 3% 2% 8%;">
<p style="font-size:large;font-weight:bold;">Фильтры</p>
</div>

<div class="searchblock" style="margin: 8% 3% 2% 8%;">
<p [style.color]="IsVisible? 'DarkGrey' : 'white'" style="font-size:10px;">Название </p>
<input [style.borderBottom]="isblue? '1px solid RoyalBlue':'1px solid DarkGrey' " type="text" name="search_name" id="inpu" [(ngModel)]="search_name" placeholder="Название"

 #searchname="ngModel" 
 (input)="onTitileVviod()"
 (change)="onTitleChange()" />
 </div>


  <div class="searchblock" style="margin: 8% 3% 4% 8%;">
  <p style="font-size:10px;color:DarkGrey;">Жанры</p>
<div class="selectBox"  (click)="showCheckboxes()">
      <select id="selected" [style.borderBottom]="checblue? '1px solid RoyalBlue':'1px solid DarkGrey'"	  >
        <option>Выбраны {{count_check}}</option>
      </select>
      <div class="overSelect"></div>
    </div>
	
    <div id="checkboxes"   >


<label  *ngFor="let g of allgenres; let i=index;" for="{{i}}">
<input class="Check" type="checkbox"  id="{{i}}"  name="g.checked"  [(ngModel)]="g.checked" (click)="SendGenre(i)"/>
		{{g.name}}</label>
		
       </div></div>
	   <div class="searchblock" style="margin: 0% 3% 2% 8%;">
	  <p style="font-weight:bold;font-size:small;">Формат</p>
	   <div class="cr">
	   <label *ngFor="let f of allformats; let i=index;" for="radio-{{i}}">
	    <input class="Radio" type="radio"  id="radio-{{i}}"
		name="radio"[(ngModel)]="value"   [value]="f.name" 
		(click)="SendFormat(i)"
		/>{{f.name}}<br></label>
  </div>
  
  </div>


</div>


                `,
    styles: [`.main{width:100%;overflow: auto;
	height:100%; border-left: 1px solid LightGray;}
	p{font-family:Verdana;margin-top:0%;margin-bottom:0%;}
	.searchblock{width: auto;height:auto;clear:both;}
	input[type=text] {
		border: none;
		width: 90%;
  border-bottom: 1px solid LightGray;

font-family:Verdana;
caret-color: RoyalBlue;
padding:4px 0px;
font-size:small;
}
input::placeholder {
  color: DarkGrey;
 font-family:Verdana;
}


input[type="text"]:focus {
	

  border:none;
  outline: none;
   border-bottom: 1px solid RoyalBlue  !important;
} 
.Radio {
margin-left: 0;
vertical-align:-15%;
margin-right:24px;
width: 20px; 
   -ms-transform: scale(1.5); 
    -webkit-transform: scale(1.5);
    transform: scale(1.5);

}
.Check {
	margin-left: 10px;
	margin-right:11px;
	width: 11px; 
vertical-align:-15%;
   -ms-transform: scale(1.5); 
    -webkit-transform: scale(1.5); 
    transform: scale(1.5);

}



.selectBox {
  position: relative;
  width: auto;height:auto;
}

#selected {
	 border:none;
	 padding:4px 0px;
	 border-bottom:1px solid DarkGrey;
  width: 90%;
font-family:Verdana;
font-size:small;

-webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}


.overSelect {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  
}

.cr{
	margin:2% 0% 4% 0%;
	overflow: auto;width:auto%;
}

.cr label{
	font-family:Verdana;
padding:6px 0px;
font-size:small;
  display: block;
}


#checkboxes {
	  width: 90%;
  display: none;
  border:none;

  box-shadow: 3px 5px  7px LightGray, -3px 5px  7px LightGray;
 padding:7px 0px;
 margin:0px 0px 0px 0px;
}

#checkboxes label {
	  font-family:Verdana;
padding:3px;
font-size:small;
  display: block;
}




	`],


})
export class SearchComponent { 
count_check=0;
checblue:boolean=false;
g;
isblue:boolean=false;
radioclick=[];

active:boolean=false;
myForm : FormGroup;
expanded = false;
  search_name: string = "";
  count:number;
  allFormats=["TV",
  "TV_SHORT",
  "MOVIE",
  "SPECIAL",
  "OVA",
  "ONA"
  ];
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
	IsVisible:boolean=false;
	allformats=[];
  allgenres=[];
  trufalsearr:boolean[]=[];

    
constructor(private searchname:SearchNameService){
             
 
    }
  
  
 SendGenre(i:number){
	 this.allgenres[i].checked=!this.allgenres[i].checked;

 this.trufalsearr[i]=!this.trufalsearr[i];
 if (this.trufalsearr[i]==true) this.count_check++; else this.count_check--;
  this.searchname.GenresMethod(this.allgenres); 
 }
 SendFormat(i:number){
	 
	 let radioo = document.getElementById(`radio-${i}`) as HTMLInputElement;
	 if (this.radioclick[i]==0) {this.radioclick.forEach((elem,index,arr)=>{
 if (index==i) {arr[index]=1;} else arr[index]=0; }); 
 this.searchname.FormatsMethod(this.allformats[i].name); } else
	 {radioo.checked=false; this.radioclick[i]=0; 
 this.searchname.FormatsMethod(null);}

	 
	 
 }
 
 showCheckboxes() {
	
  let checkboxes = document.getElementById("checkboxes");
 

  
  if (!this.expanded) {
    checkboxes.style.display = "block";
	this.checblue=true;

    this.expanded = true;
  } else {
    checkboxes.style.display = "none";
	if (this.count_check!=0) { this.checblue=true;} else
		{this.checblue=false;}

    this.expanded = false;
	
	
	
  }
}
  
	
	onTitleChange(){
          let input = document.getElementById('inpu');
  
			 this.searchname.Methodname(this.search_name);
		
} 
onTitileVviod()
{ if (this.search_name!="") {this.IsVisible=true; this.isblue=true;} else {this.IsVisible=false; this.isblue=false;}
	this.active=true;
	
}

   
	 ngOnInit(){
		 this.allFormats.forEach((elem)=>{let a=new Onegenre(elem,false);
			 this.allformats.push(a); this.radioclick.push(0);});
		 this.allGenres.forEach((elem)=>{let a=new Onegenre(elem,false);
			 this.allgenres.push(a);this.trufalsearr.push(false);
		 });
		 
		 
		 let input = document.getElementById('inpu');
		  this.searchname.Methodcount$.subscribe(message =>{this.count=message; 
		  if(this.search_name!==""){
		  this.search_name=`Выбраны ${this.count}`;}
		 
		  })
		  document.querySelector('input').addEventListener('keydown', function(e) {
    if (e.keyCode === 13) {
     
       input.blur();
    }
  });

	

	 }
	 
	 
	 
}