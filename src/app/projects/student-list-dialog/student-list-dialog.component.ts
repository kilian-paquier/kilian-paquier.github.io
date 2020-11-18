import { Component, OnInit } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faHandsHelping, faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-student-list-dialog',
	templateUrl: './student-list-dialog.component.html',
})
export class StudentListDialogComponent implements OnInit {
	faGithub = faGithub;
	faCalendar = faCalendar;
	faCourse = faHandsHelping;
	faUsers = faUsers;

	constructor() {}

	ngOnInit(): void {}
}
