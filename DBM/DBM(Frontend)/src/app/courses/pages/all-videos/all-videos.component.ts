import { Component, OnInit } from '@angular/core';
import { LectureService } from 'src/app/shared/LectureServiceClass/lecture.service';
import { LectureVideo } from 'src/app/shared/LectureVideoModelClass/lecture-video.model';

@Component({
  selector: 'app-all-videos',
  templateUrl: './all-videos.component.html',
  styleUrls: ['./all-videos.component.css']
})
export class AllVideosComponent implements OnInit {

  constructor(private service:LectureService) { }

  ngOnInit() {
    this.service.getLecturesVideos();
  }
  Download(A: LectureVideo) {
    // alert("a");
    // console.log(A);
    //alert(A['id']);
    this.service.downloadFile(A);
  }
  

}
