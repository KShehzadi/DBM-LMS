import { Component, OnInit } from '@angular/core';
import { IconName } from '@fortawesome/fontawesome-common-types';
import { MatIcon } from '@angular/material';
import { LectureService } from 'src/app/shared/LectureServiceClass/lecture.service';
import { Lecture } from 'src/app/shared/LectureModelClass/lecture.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-lectures',
  templateUrl: './lectures.component.html',
  styleUrls: ['./lectures.component.css']
})
export class LecturesComponent implements OnInit {

  constructor(private service:LectureService, private router: Router) { }

  

  ngOnInit() {
    this.service.getLecturesList();
  }
  ViewVideo(C: Lecture) {
    this.service.formData = C;
    alert(C.id);
    //localStorage.setItem('CourseName', String(C.name));
    localStorage.setItem('LectureId', String(C.id));
    this.router.navigate(['/LectureVideos']);
  }
  

  

}
