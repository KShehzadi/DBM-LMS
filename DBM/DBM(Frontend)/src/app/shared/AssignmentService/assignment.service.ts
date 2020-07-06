import { Injectable } from '@angular/core';
import { Assignment } from '../CourseAssignementModelClass/assignment.model';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { saveAs } from 'file-saver';
import { DatePipe } from '@angular/common';
import { AssignmentSubmission } from '../CourseAssignmentSubmissionModelClass/assignment-submission.model';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  formData: Assignment;
  formDataSubmitAssignment: AssignmentSubmission;
  readonly rootURL = 'http://localhost:3845/api/';
  s: String = null;
  list: Assignment[];

  


  constructor(public http: HttpClient) { }


  postAddAssignment(formData: Assignment) {
    return this.http.post(this.rootURL + 'Assignment/SaveAssignment/' + localStorage.getItem('CourseId'), formData);
  }

  postSubmitAssignment(formDataSubmitAssignment: Assignment) {
    return this.http.post(this.rootURL + 'AssignmentSubmission/SubmitAssignment/' + localStorage.getItem('AssignmentId'), formDataSubmitAssignment);
  }

  getAssignmentList() {
    this.http.get(this.rootURL + 'Assignment/' + localStorage.getItem('CourseId'))
      .toPromise()
      .then(
        res => {
          var tempLst;
          tempLst = res as Assignment[];
          var len = tempLst.length;
          alert(len);
          // alert(res[0]['submissionDate']);
          var datePipe = new DatePipe('en-US');
          //res[0]['submissionDate'] = datePipe.transform(res[0]['submissionDate'], 'short');
          for (let i = 0; i < len; i++) {
            // console.log ("Block statement execution no." + i);
            res[i]['submissionDate'] = datePipe.transform(res[i]['submissionDate'], 'short');
          }
          // alert(res[0]['submissionDate']);
          this.list = res as Assignment[];
          //console.log(res);
        }
      )
  }

  downloadFile(A: Assignment) {
    var fName;
    this.http.get(this.rootURL + 'Assignment/GetAssignmentFileName/' + A['id'])
      .subscribe(
        res => {
          //alert("res");
          //console.log(res);
          fName = res['fileName'];
          //alert(fName);
        }
      );
    // alert("p");
    this.http.get(this.rootURL + 'Assignment/Download/' + A['id'], { responseType: 'blob' })
      .subscribe(
        blob => {
          console.log(blob);

          saveAs(blob, fName, {
            type: 'text/plain;charset=windows-1252'
          });
        }
      );

    // return this.http.request(new HttpRequest(
    //   'GET',
    //   `${this.apiDownloadUrl}?file=${file}`,
    //   null,
    //   {
    //     reportProgress: true,
    //     responseType: 'blob'
    //   }));
  }

  onUploadAssignment(selectedFile) {

    const fd = new FormData();
    fd.append('image', selectedFile, selectedFile.name);
    return this.http.post(this.rootURL + 'Assignment/Upload', fd)
  }

  onSubmitAssignment(selectedFile) {
    const fd = new FormData();
    fd.append('SubmittedAssignments', selectedFile, selectedFile.name);
    return this.http.post(this.rootURL + 'AssignmentSubmission/Upload', fd);
  }

  // postFile(fileToUpload: File) {
  //   const endpoint = 'assets/UploadedImage/';
  //   const formData2: FormData = new FormData();
  //   formData2.append('fileKey', fileToUpload, fileToUpload.name);
  //   return this.http.post(endpoint, formData2);

  // }
}
