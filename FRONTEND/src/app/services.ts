import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn:'root'})

export class Services{

    constructor(private httpClient:HttpClient)
    {

    }

    fetchuser()
    {
        return this.httpClient.get("http://localhost:3000/fetchuserdata")
    }

    deleteuser(empid:number)
    {
        return this.httpClient.request("delete",`http://localhost:3000/deleterow/${empid}`,);
    }

    edituser(rowdata:any)
    {
        return this.httpClient.request("put",`http://localhost:3000/updateUser/${rowdata.empid}`,
        {
            body:rowdata
        });
    }

    adduser(userdata:any)
    {
        return this.httpClient.request("post",`http://localhost:3000/addnewrow`,
        {
            body:userdata
        })
    }

    fetchcustomerdata()
    {
        return this.httpClient.get("http://localhost:3000/fetchcustomerdata")
    }
}