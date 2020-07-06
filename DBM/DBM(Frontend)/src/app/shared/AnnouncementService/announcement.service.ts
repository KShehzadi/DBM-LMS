import { Injectable } from '@angular/core';
import { Announcement } from '../AnnouncementModelClass/announcement.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
    formData: Announcement;
    list:Announcement[];
    readonly rootURL = 'http://localhost:3845/api/';
  constructor(private http: HttpClient) { }

  postAddAnnouncement(formData: Announcement) {
    return this.http.post(this.rootURL + 'Announcement/', formData);
  }
  getAnnouncementList() {
    this.http.get(this.rootURL + 'Announcement/' + localStorage.getItem('CourseId'))
      .toPromise()
      .then(
        res => {
           this.list = res as Announcement[];
           console.log(res);
        }
      );
  }

 
  
}
