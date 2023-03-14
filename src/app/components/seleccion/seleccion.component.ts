import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {SeleccionService} from './../../services/seleccion.service';
@Component({
  selector: 'app-seleccion',
  templateUrl: './seleccion.component.html',
  styleUrls: ['./seleccion.component.css']
})
export class SeleccionComponent implements OnInit {
  public arraySeleccion:any;
  public checkoutForm;
  public checkoutForm2;
  public opt:any;
  public estados=[
    {
      "id":"null",
      "name":"All"
    },
    {
      "id":"1",
      "name":"Enabled"
    },
    {
      "id":"0",
      "name":"Disabled"
    },
  
]
valorItem=0;
  items: any;
  constructor(private seleccionService:SeleccionService,private formBuilder: FormBuilder){
    this.checkoutForm = this.formBuilder.group({
      name: '',
      state:'1'
    });
    this.checkoutForm2 = this.formBuilder.group({
      verState: 'null'
    });
  }
  
  ngOnInit(): void {
    this.listaSelecciones();
  }

   agregar = () => {
    const elem = document.getElementById("estados");
    console.log(elem)
   
  };

  listaSelecciones(){
    this.valorItem = 0;
    this.seleccionService.getSeleccion().subscribe(
      data=>{
        console.log(data)
        this.arraySeleccion = data
        this.valorItem = 0;
      }
    );
  }
  filtroSeleccion(state:any){
    console.log("verstatett",state)
    this.seleccionService.getSeleccionFiltro(state).subscribe(
      data=>{
        console.log(data)
        this.arraySeleccion = data
      }
    );
  }
  onChange(event: any){
    console.log("filtrooooo",event.target.value)
    this.opt = event.target.value;
    switch(this.opt){
      case "null":
        this.listaSelecciones();
      break;
      case "default":
        this.listaSelecciones();
      break;
      default:
        this.filtroSeleccion(this.opt);
      break
    }
  }

  onSubmit(name:any) {
    this.checkoutForm2.reset({
      verState:'null'
    });
      this.seleccionService.addItem(this.checkoutForm.value).subscribe(
      data=>{
        console.log("responseeeee",data)
        //this.checkoutForm.reset();
        this.listaSelecciones();
      }
    ); 
  }
  deleteItem(id:any){
    console.log("this.opt",this.opt)
    this.seleccionService.deleteItem(id).subscribe(
      data=>{
        switch(this.opt){
          case "null":
            this.listaSelecciones();
          break;
          case undefined:
            this.listaSelecciones();
          break;
          default:
            this.filtroSeleccion(this.opt);
          break
        }
      }
    );
  }

  setItem(event: any,data:any){
    let stateVal = event.target.checked;
    data.state = stateVal?'1':'0';
     this.seleccionService.UpdateItem(data).subscribe(
      data=>{
        console.log(data);

         switch(this.opt){
      case "null":
        this.listaSelecciones();
      break;
      case undefined:
        this.listaSelecciones();
      break;
      default:
        this.filtroSeleccion(this.opt);
      break
    }
      }
    );
  }

}
