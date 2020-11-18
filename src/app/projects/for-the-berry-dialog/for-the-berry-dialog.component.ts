import { Component, OnInit } from '@angular/core';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faGraduationCap, faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-for-the-berry-dialog',
	templateUrl: './for-the-berry-dialog.component.html',
})
export class ForTheBerryDialogComponent implements OnInit {
	faCalendar = faCalendar;
	faCourse = faGraduationCap;
	faUsers = faUsers;

	constructor() {}

	ngOnInit(): void {}
}
