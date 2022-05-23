import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  fileName = '';
  constructor() { }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {

    const file:File = event.target.files[0];

    if (file) {

        this.fileName = file.name;

        const formData = new FormData();

        formData.append("thumbnail", file);

       // const upload$ = this.http.post("/api/thumbnail-upload", formData);

        //upload$.subscribe();
    }
  }
}
