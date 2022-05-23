import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';
import {MatDialog} from '@angular/material/dialog';
import { PerfilComponent } from '../perfil/perfil.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  usuarioActual: any;
  constructor(private router: Router,  private tokenStorageService: TokenStorageService, public dialog: MatDialog) { }
 
  ngOnInit(): void {
    this.usuarioActual = this.tokenStorageService.obtenerUsuario();
  
  }
  cerrarsesion() {
    this.tokenStorageService.cerrarsesion();
    window.location.reload();
    window.location.pathname='login';
    
  }
   
  abrirInformacionUsuario(){
    const dialogRef = this.dialog.open(PerfilComponent);
    
  }
}
