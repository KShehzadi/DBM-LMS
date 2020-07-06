import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from 'src/app/shared/AnnouncementService/announcement.service';

@Component({
  selector: 'app-all-announcements',
  templateUrl: './all-announcements.component.html',
  styleUrls: ['./all-announcements.component.css']
})
export class AllAnnouncementsComponent implements OnInit {

  constructor(private service:AnnouncementService) { }

  ngOnInit() {
    this.service.getAnnouncementList();
  }

}
