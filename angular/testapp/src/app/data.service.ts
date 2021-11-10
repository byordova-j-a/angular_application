import {Injectable} from '@angular/core';
@Injectable()
export class DataService{
  
 private data: string[];
      
    getData(): string[] {
          
        return this.data;
    }
   
   loadData(currentpage:number,certain_name:string|undefined,truefals:{name:string,checked:boolean}[],format:string|null){
	   
	   let arr=[];
	   truefals.forEach((item)=>{
		   if (item.checked==true) {arr.push(`"${item.name}"`);}
		   
		   
	   });
	   let query_3;
	   
	   if (arr.length!=0){
		   
		   let a=arr.join(",");
		   query_3=`,genre_in:[${a}]`;
		   
	   } else query_3=``;
	 
	   let query_4;
   if (format===null) {query_4=``;}else {query_4=`,format_in: ${format}`;}
	   
let query_1=`query ($page: Int, $perPage: Int) {
  Page (page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media (seasonYear:2020,sort: TITLE_ROMAJI`;
	let query_2;
	if ((certain_name== undefined)||(certain_name=== "")){query_2=`)`;}
	else {query_2=`,search:"${certain_name}")`;}
	
  let query = `${query_1}${query_3}${query_4}${query_2} {
      
      title{
        romaji
		 english
        native
       }
        genres
     startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      episodes
      duration
      format
       season
      status
    }
  }
}`;


 let variables = {
    page: currentpage,
	perPage:5
};

let url = 'https://graphql.anilist.co',
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    };

return fetch(url, options).then(handleResponse)
                   .then(handleData).catch(handleError);
				   
 function handleData(a) { 

 
 let lastpage= a.data.Page.pageInfo.lastPage; 
  let totalpage= a.data.Page.pageInfo.total;
  let perrpage=variables.perPage;
 let titleroj= [];
  let titleeng= [];
   let titlenativ= [];
 let obj:any ={};
 let count_serial= [];
 let format=[];
 let status=[];
 let season=[];
 let genres=[];
 let n;
 if (currentpage<lastpage)
    n=perrpage;
else  n=totalpage - (lastpage-1)*perrpage;
 if (totalpage!=0){
	for(let i=0;i<n;i++)
	{
		let rj=a.data.Page.media[i].title.romaji?a.data.Page.media[i].title.romaji:"нет данных";
		
		titleroj.push(rj);
		let en=a.data.Page.media[i].title.english?a.data.Page.media[i].title.english:"нет данных";
		
		titleeng.push(en);
		let nat=a.data.Page.media[i].title.native?a.data.Page.media[i].title.native:"нет данных";
		
		titlenativ.push(nat);
		let cs=a.data.Page.media[i].episodes?a.data.Page.media[i].episodes:"нет данных";
		count_serial.push(cs);
		let fr=a.data.Page.media[i].format?a.data.Page.media[i].format:"нет данных";
		format.push(fr);
		let dr=a.data.Page.media[i].status?a.data.Page.media[i].status:"нет данных";
		status.push(dr);
		let sd=a.data.Page.media[i].season?a.data.Page.media[i].season:"нет данных";
		season.push(sd);
		let gr;
	if (a.data.Page.media[i].genres==[]) {gr=["нет данных"];} else
		{gr=a.data.Page.media[i].genres;}
		genres.push(gr);
		
		
 }}else {titleroj=null; count_serial=null;format=null;
 status=null;season=null;genres=null;}
		
	 
	 
	 
	obj[0]=titleroj;
	obj[1]=count_serial;
	obj[2]=format;
	obj[3]=lastpage;
	obj[4]=totalpage;
	obj[5]=status;
	obj[6]=season;
	obj[7]=titleeng;
	obj[8]=genres;
	obj[9]=titlenativ;
 
 
    return obj;
        
 } 
				   
		 function handleResponse(response) {    return response.json().then(function (json)
 {        return response.ok ? json : Promise.reject(json);  
 });}		   
				  
 function handleError(error) {    alert('Error, check console'); 
 console.error(error);}
 



				   
 }
  
  
  
  
}