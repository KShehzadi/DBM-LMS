import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import{Lecture} from 'src/app/shared/LectureModelClass/lecture.model';
import { LectureVideo } from '../LectureVideoModelClass/lecture-video.model';
import { saveAs } from 'file-saver';
import { Notes } from '../LectureNotesModelClass/notes.model';

@Injectable({
  providedIn: 'root'
})
export class LectureService {
  formData = new Lecture();
  formDataVideo = new LectureVideo();
  formDataNotes =new Notes();
  readonly rootURL = 'http://localhost:3845/api'
  list: Lecture[];
  Videoslist:LectureVideo[];
  Noteslist:Notes[];
  
  editFlag: boolean = false;

  constructor(private http:HttpClient) { }

  getLecturesList() {
    this.http.get(this.rootURL + '/Lecture/' + localStorage.getItem('CourseId'))
      .toPromise()
      .then(
        res => {
           this.list = res as Lecture[];
          // console.log(res);
        }
      );
  }

  getLecturesVideos() {
    this.http.get(this.rootURL + '/Lecture/getLectureVideos/' + localStorage.getItem('LectureId'))
      .toPromise()
      .then(
        res => {
          this.Videoslist = res as LectureVideo[];
          // console.log(res);
        }
      );
  }

  getLecturesNotes() {
    this.http.get(this.rootURL + '/Notes/getLectureNotes/' + localStorage.getItem('LectureId'))
      .toPromise()
      .then(
        res => {
          this.Noteslist = res as Notes[];
           //console.log(res);
          // alert("aa");
        }
      );
  }

  
  downloadFile(A: LectureVideo) {
    var fName;
    this.http.get(this.rootURL + '/Lecture/GetVideoFileName/' + A['id'])
      .subscribe(
        res => {
          //alert("res");
          //console.log(res);
          fName = res['fileName'];
          //alert(fName);
        }
      );
    // alert("p");
    this.http.get(this.rootURL + '/Lecture/Download/' + A['id'], { responseType: 'blob' })
      .subscribe(
        blob => {
          console.log(blob);

          saveAs(blob, fName, {
            type: 'text/plain;charset=windows-1252'
          });
        }
      );

  }

  downloadNotes(A: Notes) {
    var fName;
    this.http.get(this.rootURL + '/Notes/GetNotesFileName/' + A['id'])
      .subscribe(
        res => {
          //alert("res");
          //console.log(res);
          fName = res['fileName'];
          //alert(fName);
        }
      );
    // alert("p");
    this.http.get(this.rootURL + '/Notes/Download/' + A['id'], { responseType: 'blob' })
      .subscribe(
        blob => {
          console.log(blob);

          saveAs(blob, fName, {
            type: 'text/plain;charset=windows-1252'
          });
        }
      );

  }

  postAddLecture() {
    this.formData.courseId = localStorage.getItem('CourseId');
    return this.http.post(this.rootURL + '/Lecture', this.formData);
  }

  onUploadVideo(selectedFile) {

    const fd = new FormData();
    fd.append('image', selectedFile, selectedFile.name);
    return this.http.post(this.rootURL + '/Lecture/Upload', fd)
    // .subscribe(
    //   res => {
    //     console.log(res);
    //   }
    // );
  }

  onUploadNotes(selectedFile) {

    const fd = new FormData();
    fd.append('image', selectedFile, selectedFile.name);
    return this.http.post(this.rootURL + '/Notes/Upload', fd)
    // .subscribe(
    //   res => {
    //     console.log(res);
    //   }
    // );
  }

  postUploadNotes(formDataVideo:LectureVideo) {
    //this.formDataVideo.courseId = localStorage.getItem('CourseId');
    return this.http.post(this.rootURL + '/Notes/UploadLectureNotes/', formDataVideo);
  }

  postUploadLecture(formDataVideo:LectureVideo) {
    //this.formDataVideo.courseId = localStorage.getItem('CourseId');
    return this.http.post(this.rootURL + '/Lecture/UploadLectureVideo/', formDataVideo);
  }
}
