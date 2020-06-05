import { Component, OnInit } from '@angular/core';
import { CustomerServices } from 'src/app/customerservices';
import * as cloneDeep from 'lodash/cloneDeep';
import { error } from 'protractor';
import { Router } from '@angular/router';
import "@angular/compiler";
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  buttonname:string;
  columns:string[]=[];
  userdata:any;
  copydata:any;
  iseditable:boolean[]=[];
  editbtn:string;
  deletebtn:string;
  showedit:boolean[]=[];
  showdelete:boolean[]=[];
  displayusers:boolean[]=[];
  valid:boolean;
  addrow:boolean;
  displaydata:boolean;
  theusers:any;

  constructor(private services:CustomerServices) { }

  ngOnInit(): void {
    this.addrow=false;
    this.displaydata=false;
    this.buttonname='LOAD DATA';
    this.valid=true;
    this.columns=["Customer_id", "Website","Edit","Delete","Users"];
  }

  loaddata()
  {
    
    this.services.fetchcustomer()
    .subscribe(response => {
      this.userdata=response;
      this.copydata=cloneDeep(response); 
    },error => {
      console.log("ERROR" ,  error);
    },() => {
      this.buttonname='REFRESH DATA';
      this.editbtn='EDIT';
      this.deletebtn='DELETE';
      this.addrow=true;      
      for(let i in this.userdata)
      {
        this.iseditable[i]=false;
        this.showedit[i]=true;
        this.showdelete[i]=true;
        this.displayusers[i]=true;
      }
    })
  }


  deletedata(row:number)
  {
    if(this.deletebtn=='DELETE')
    {
      this.services.deleteuser(this.userdata[row].customer_id)
      .subscribe(Response =>{
  
      },error => {
          console.log(error);
      } ,() =>{
          this.userdata.splice(row,1);
          this.copydata.splice(row,1);
          this.iseditable.splice(row,1);
          this.showedit.splice(row,1);
          this.showdelete.splice(row,1);
          this.displayusers.splice(row,1);
      })
    }
    else if(this.deletebtn=='DISCARD')
    {
      let len=this.userdata.length;
      this.userdata.splice(len-1,1);
      this.iseditable[len-1]=false;
          this.deletebtn='DELETE';
          this.editbtn='EDIT';
          for(let i in this.userdata)
          {
            let n=len-1
            if(i==""+n)
            {
   
            }
            else
            {
              this.showdelete[+i]=true;
              this.showedit[+i]=true;
              this.displayusers[+i]=true;
            }
          }
    }
    else
    {
      this.editbtn="EDIT";
        this.deletebtn="DELETE";
        this.iseditable[row]=false;
        this.userdata[row]=cloneDeep(this.copydata[row]);

        for(let i in this.userdata)
        {
          if(i==""+row)
          {

          }
          else
          {
            this.showdelete[+i]=true;
            this.showedit[+i]=true;
            this.displayusers[+i]=true;
          }
        } 
    }
    }

    
    editdata(row:number)
    {
      if(this.editbtn=='EDIT')
      {
        this.editbtn="SAVE";
        this.deletebtn="CANCEL";
        this.iseditable[row]=true;

        for(let i in this.userdata)
        {
          if(i==""+row)
          {
            this.displayusers[+i]=false;
          }
          else
          {
            this.showdelete[+i]=false;
            this.showedit[+i]=false;
            this.displayusers[+i]=false;
          }
        }
      }
      else if(this.editbtn=='ADD NOW')
      {
        let len=this.userdata.length;
        this.services.adduser(this.userdata[len-1])
        .subscribe(Response =>{

        }, error =>{
            console.log(error);
        },() =>{
          console.log("hello");
          this.iseditable[len-1]=false;
          this.deletebtn='DELETE';
          this.editbtn='EDIT';
          this.copydata[row]=cloneDeep(this.userdata[row]);
          for(let i in this.userdata)
          {
            let n=len-1
            if(i==""+n)
            {
              this.displayusers[+i]=true;
            }
            else
            {
              this.showdelete[+i]=true;
              this.showedit[+i]=true;
              this.displayusers[+i]=true;
            }
          }

        });
      }
      else
      {
        console.log(this.userdata[row]);
        this.services.edituser(this.userdata[row])
        .subscribe(Response => {

        },error =>{
          console.log(error);
        }, ()=>{

          this.editbtn="EDIT";
        this.deletebtn="DELETE";
        this.iseditable[row]=false;
        this.copydata[row]=cloneDeep(this.userdata[row]);

        for(let i in this.userdata)
        {
          if(i==""+row)
          {
            this.displayusers[+i]=true;
          }
          else
          {
            this.showdelete[+i]=true;
            this.showedit[+i]=true;
            this.displayusers[+i]=true;
          }
        }

        });
        
      }
    }

    adduser()
    {
       let len=this.userdata.length;
       let id=this.userdata[len-1].customer_id +1;
       this.iseditable[len]=true;
       this.deletebtn='DISCARD';
       this.editbtn='ADD NOW';
       this.showdelete[len]=true;
       this.showedit[len]=true;
       this.displayusers[len]=false;
       for(let i in this.userdata)
       {
         if(i==""+len)
         {

         }
         else
         {
           this.showdelete[+i]=false;
           this.showedit[+i]=false;
           this.displayusers[+i]=false;
         }
       }

      this.userdata.push({
        customer_id:id,
        Website:''})
    }

    showusers(custid:number)
    {
      
      this.services.showusers(custid).
      subscribe(Response =>{
        console.log(Response);
        this.theusers=Response;
      }, error =>{
        console.log(error);
      },()=>{
        this.displaydata=true;
      })
    }
    
   

}


