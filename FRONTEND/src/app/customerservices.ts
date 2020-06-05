import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn:'root'})

export class CustomerServices{

    constructor(private httpClient:HttpClient)
    {

    }

    fetchcustomer()
    {
        return this.httpClient.get("http://localhost:3000/fetchcustomerdata");
    }

    deleteuser(customerid:number)
    {
        return this.httpClient.request("delete",`http://localhost:3000/deletecustomer/${customerid}`,);
    }

    edituser(rowdata:any)
    {
        console.log(rowdata.customer_id);
        console.log(rowdata.website);
        return this.httpClient.request("put",`http://localhost:3000/updatecustomer/${rowdata.customer_id}`,
        {
            body:rowdata
        });
        
    }

    adduser(userdata:any)
    {
        return this.httpClient.request("post",`http://localhost:3000/addnewcustomer`,
        {
            body:userdata
        })
    }

    showusers(custid:number)
    {
        return this.httpClient.get(`http://localhost:3000/showusers/${custid}`)
    }
}