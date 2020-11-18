import { Component, OnInit } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faGraduationCap, faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-share-your-fit-dialog',
	templateUrl: './share-your-fit-dialog.component.html',
})
export class ShareYourFitDialogComponent implements OnInit {
	faGithub = faGithub;
	faCalendar = faCalendar;
	faCourse = faGraduationCap;
	faUsers = faUsers;

	constructor() {}

	ngOnInit(): void {}
}
