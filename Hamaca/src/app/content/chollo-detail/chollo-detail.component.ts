import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CholloService } from '../../services/chollo.service';
import { Injectable } from '@angular/core';
import { Chollo } from '../../models/chollo.model'

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-chollo-detail',
  standalone: true,
  imports: [],
  templateUrl: './chollo-detail.component.html',
  styleUrl: './chollo-detail.component.css'
})
export class CholloDetailComponent implements OnInit{

  id:string='';
  chollo:Chollo = new Chollo();
  localidad:any = null;
  // tematicas:string = '';

  constructor(private route:ActivatedRoute, private service:CholloService){}

  ngOnInit(): void {
    this.route.params.subscribe(param => 
      this.id = param['id']);
      console.log('Engaged');
      this.getCharacter();
  }

  getCharacter(){
    console.log("Calling..."+this.id);
    this.service.getCholloById(this.id)
    .subscribe(result => {
      this.chollo = result;
      console.log(this.chollo);
      this.localidad = this.chollo.localidad;
      // this.tematicas = this.chollo.tematicas;
    })
  }
}
