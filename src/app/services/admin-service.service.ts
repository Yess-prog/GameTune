import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private http: HttpClient) { }
   getAllUsers(){
    return this.http.get<any[]>('http://localhost:3000/Users');
  }
  deleteU(idU:any){
     return this.http.post('http://localhost:3000/deleteUser',{idU});
  }
  deleteV(idV:any){
     return this.http.post('http://localhost:3000/deleteSale',{ idV} );

  }
  getAllSales(){
    return this.http.get<any[]>('http://localhost:3000/Sales');
  }
  
}
