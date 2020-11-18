import { Component, OnInit } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faGraduationCap, faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-flotte-camions-net-dialog',
	templateUrl: './flotte-camions-net-dialog.component.html',
})
export class FlotteCamionsNetDialogComponent implements OnInit {
	faGithub = faGithub;
	faCalendar = faCalendar;
	faCourse = faGraduationCap;
	faUsers = faUsers;

	constructor() {}

	ngOnInit(): void {}
}
