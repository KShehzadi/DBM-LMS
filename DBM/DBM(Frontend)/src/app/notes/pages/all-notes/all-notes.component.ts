import { Component, OnInit } from '@angular/core';
import { IconName } from '@fortawesome/fontawesome-common-types';
import { MatIcon } from '@angular/material';
import { LectureService } from 'src/app/shared/LectureServiceClass/lecture.service';
import { Notes } from 'src/app/shared/LectureNotesModelClass/notes.model';





@Component({
  selector: 'app-all-notes',
  templateUrl: './all-notes.component.html',
  styleUrls: ['./all-notes.component.css']
})
export class AllNotesComponent implements OnInit {

  constructor(private service:LectureService) { }


  ngOnInit() {
    this.service.getLecturesNotes();
  }

  Download(A: Notes) {
    // alert("a");
    // console.log(A);
    //alert(A['id']);
    this.service.downloadNotes(A);
  }

}
