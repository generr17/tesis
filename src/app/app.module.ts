import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { RegistroComponent } from './registro/registro.component';
import { UsuarioComponent } from './usuario/usuario.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import { EquipoComponent } from './equipo/equipo.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatNativeDateModule} from '@angular/material/core';
import { MenuComponent } from './menu/menu.component';
import { ConvocatoriasComponent } from './convocatorias/convocatorias.component';
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { PerfilComponent } from './perfil/perfil.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { DirectivoComponent } from './directivo/directivo.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { MensajeComponent } from './mensaje/mensaje.component';
import { VideoComponent } from './video/video.component';
import { FileUploadModule } from 'ng2-file-upload';
import { ListadoVideosComponent } from './listado-videos/listado-videos.component';
import {ButtonModule } from 'ng-cdbangular';
import {CardModule } from 'ng-cdbangular';
import { IframeModule } from 'ng-cdbangular';
import { ViewModule} from 'ng-cdbangular';
import {FooterModule } from  'ng-cdbangular';
import { FooterComponent } from './footer/footer.component';
import { MetodoDePagoComponent } from './metodo-de-pago/metodo-de-pago.component';
import {MatTableModule} from '@angular/material/table';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { HabilidadesComponent } from './habilidades/habilidades.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { SuscripcionesComponent } from './suscripciones/suscripciones.component';
import { PagoSuscripcionComponent } from './pago-suscripcion/pago-suscripcion.component';
import { ChatComponent } from './chat/chat.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CargandoComponent } from './cargando/cargando.component';
import { MisVideosComponent } from './mis-videos/mis-videos.component';
import { PoliticaUsoComponent } from './politica-uso/politica-uso.component';
import { RenovarComponent } from './renovar/renovar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    UsuarioComponent,
    EquipoComponent,
    MenuComponent,
    ConvocatoriasComponent,
    PerfilComponent,
    AdministradorComponent,
    DirectivoComponent,
    MensajeComponent,
    VideoComponent,
    ListadoVideosComponent,
    FooterComponent,
    MetodoDePagoComponent,
    HabilidadesComponent,
    SuscripcionesComponent,
    PagoSuscripcionComponent,
    ChatComponent,
    CargandoComponent,
    MisVideosComponent,
    PoliticaUsoComponent,
    RenovarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule, 
    MatDatepickerModule,
    MatRadioModule,
    MatMenuModule,
    MatListModule,
    MatNativeDateModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatSelectModule,
    FileUploadModule, 
    ButtonModule,
    CardModule,
    IframeModule, 
    ViewModule,
    FooterModule,
    MatTableModule,
    MatSnackBarModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatBadgeModule,
    MatProgressSpinnerModule
    
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
