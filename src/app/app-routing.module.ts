import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { MenuComponent } from './menu/menu.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { DirectivoComponent } from './directivo/directivo.component';
import { EquipoComponent } from './equipo/equipo.component';
import { VideoComponent } from './video/video.component';
import { ListadoVideosComponent } from './listado-videos/listado-videos.component';
import { HabilidadesComponent } from './habilidades/habilidades.component';
import { MisVideosComponent } from './mis-videos/mis-videos.component';
import { ChatComponent } from './chat/chat.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'usuario', component: UsuarioComponent}, 
  {path: 'menu', component:MenuComponent},
  {path: 'perfil', component: PerfilComponent},
  {path: 'administrador', component: AdministradorComponent},
  {path: 'directivo', component: DirectivoComponent},
  {path: 'equipo', component: EquipoComponent},
  {path: 'video/:video/:usuario', component: VideoComponent},
  {path: 'videos', component: ListadoVideosComponent},
  {path: 'habilidades', component: HabilidadesComponent},
  { path: 'mensaje', component: ChatComponent},
  {path: 'mis-videos', component: MisVideosComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
