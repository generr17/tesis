import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { VideoService } from '../services/video.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  public nombre : string
  public url: string;
  public usr: string;
  constructor(private videoService: VideoService, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.nombre = this.activateRoute.snapshot.paramMap.get("video");
    this.url = "http://localhost:3000/api/video/reproducir/"+ this.nombre;
    this.usr = this.activateRoute.snapshot.paramMap.get("usuario");
    //0987347110
  }
  
  
  reproducir(){
   
  }
  
}
