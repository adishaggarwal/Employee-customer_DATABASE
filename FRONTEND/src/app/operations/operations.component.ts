import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/DataModels/enum-role';
import { Services } from 'src/app/services';
import * as cloneDeep from 'lodash/cloneDeep';
import { error } from 'protractor';
import { Router } from '@angular/router';


@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {
  buttonname:string;
  columns:string[]=[];
  userdata:any;
  copydata:any;
  iseditable:boolean[]=[];
  editbtn:string;
  deletebtn:string;
  rolearr:string[]=[];
  customerarr:any;
  showedit:boolean[]=[];
  showdelete:boolean[]=[];
  Role=Role;
  valid:boolean;
  addrow:boolean;
  

  constructor(private services:Services,private router:Router) { }

  ngOnInit(): void {
    this.addrow=false;
    this.buttonname='LOAD DATA';
    this.valid=true;
    this.columns=["First Name", "Middle Name", "Last Name", "Phone Number", "E-mail","Role", "Address","Customer_ID", "Edit", "Delete"];
    for(let i in Role)
    {
      if(isNaN(Number(i)))
      {

      }
      else{
          this.rolearr.push(Role[i]);
      }
    }
     this.fetchcustomers();
  }

  loaddata()
  {
    this.buttonname='REFRESH DATA';
    this.services.fetchuser()
    .subscribe(response => {
      this.userdata=response;
      this.copydata=cloneDeep(response); 
      console.log(response);
    },error => {
      console.log("ERROR" ,  error);
    },() => {
      this.editbtn='EDIT';
      this.deletebtn='DELETE';
      this.addrow=true;      
      for(let i in this.userdata)
      {
        this.iseditable[i]=false;
        this.showedit[i]=true;
        this.showdelete[i]=true;
      }
    })
  }

  changerole(row:number,optionsel:any)
  {
    this.userdata[row].role=  +optionsel.value +1;
    console.log(typeof this.userdata[row].role);
  }
  changecustomer(row:number,optionsel:any)
  {
    this.userdata[row].customer_id=  +optionsel.value;
    console.log("customer id is changed to "+ this.userdata[row].customer_id);
  }

  deletedata(row:number)
  {
    if(this.deletebtn=='DELETE')
    {
      this.services.deleteuser(this.userdata[row].empid)
      .subscribe(Response =>{
  
      },error => {
          console.log(error);
      } ,() =>{
          this.userdata.splice(row,1);
          this.copydata.splice(row,1);
          this.iseditable.splice(row,1);
          this.showedit.splice(row,1);
          this.showdelete.splice(row,1);
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

          }
          else
          {
            this.showdelete[+i]=false;
            this.showedit[+i]=false;
          }
        }
      }
      else if(this.editbtn=='ADD NOW')
      {
        let len=this.userdata.length;
        console.log(this.userdata[len-1]);
        this.services.adduser(this.userdata[len-1])
        .subscribe(Response =>{

        }, error =>{
            console.log(error);
        },() =>{
          this.iseditable[len-1]=false;
          this.deletebtn='DELETE';
          this.editbtn='EDIT';
          this.copydata[row]=cloneDeep(this.userdata[row]);
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

          }
          else
          {
            this.showdelete[+i]=true;
            this.showedit[+i]=true;
          }
        }

        });
        
      }
    }

    adduser()
    {
       let len=this.userdata.length;
       let id=this.userdata[len-1].empid +1;
       this.iseditable[len]=true;
       this.deletebtn='DISCARD';
       this.editbtn='ADD NOW';
       this.showdelete[len]=true;
       this.showedit[len]=true;
       for(let i in this.userdata)
       {
         if(i==""+len)
         {

         }
         else
         {
           this.showdelete[+i]=false;
           this.showedit[+i]=false;
         }
       }

      this.userdata.push({empid:id,
        firstname: '',
        middlename: '',
        lastname: '',
        email: '',
        phoneno: 0,
        role: 1,
        address: '',
        customer_id:1})
    }

    fetchcustomers()
    {
      this.services.fetchcustomerdata()
      .subscribe(Response =>{
        this.customerarr=Response;
      },error =>{
        console.log(error);
      },()=>{
        console.log(this.customerarr);
      })
    }

    getcustomerwebsite(customerid1:number)
    {
      for(let i=0;i<this.customerarr.length;i++)
      {
        if(this.customerarr[i].customer_id==customerid1)
        {
          return this.customerarr[i].website;
        }
      }
    }
    
   

}
