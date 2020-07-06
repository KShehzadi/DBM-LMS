import { Component, OnInit } from '@angular/core';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-announcements',
  templateUrl: './add-announcements.component.html',
  styleUrls: ['./add-announcements.component.css']
})
export class AddAnnouncementsComponent implements OnInit {

  public Editor = ClassicEditor;

  constructor() { }

  ngOnInit() {
  }

}

