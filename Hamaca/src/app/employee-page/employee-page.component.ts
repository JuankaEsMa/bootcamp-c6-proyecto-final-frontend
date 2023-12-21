import { Component, OnInit } from '@angular/core';
import { Chollo } from '../models/chollo.model';
import { Router, RouterLink } from '@angular/router';
import { CholloService } from '../services/chollo.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-client-page',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, RouterLink],
  templateUrl: './employee-page.component.html',
  styleUrl: './employee-page.component.css'
})
export class EmployeePageComponent implements OnInit{

  chollos:Array<Chollo> = [];
  chollo:any = null;

  displayedColumns: string[] = ['Id', 'Titulo', 'Imagen', 'Descripcion', 'PrecioPersona','CantidadPersonas', 'FechaCaducidad', 'Localidad', 'Seleccionar'];

  constructor(private cholloService:CholloService, private router:Router){}

  ngOnInit(): void {
    this.obtenerChollos();
  }

  obtenerChollos(){
    this.cholloService.getChollos().subscribe(body => {
      this.chollos = body.Chollos;
    })
  }

  eliminar(idChollo:any){
    this.cholloService.deleteCholloById(idChollo).subscribe((data:any) => {
      this.ngOnInit();
      console.log(this.chollos);
    })
  }

  seleccionar(idChollo:any){
    this.router.navigate(['/employee-form-edit/'+idChollo]);
  }
}
