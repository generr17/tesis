import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { AuthService } from '../services/auth.service';
import { EquipoService } from '../services/equipo.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.scss']
})
export class AdministradorComponent implements OnInit {
  
  rol:string = '';
  tokenS: any;
  constructor( private authService: AuthService, private tokenStorage: TokenStorageService, private equipoService:EquipoService) { }
  
  ngOnInit(): void {
    this.tokenS = this.tokenStorage.obtenerToken();
  

  }
}