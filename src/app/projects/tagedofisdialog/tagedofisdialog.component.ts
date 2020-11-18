import { Component, OnInit } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faHandsHelping } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-tagedofisdialog',
	templateUrl: './tagedofisdialog.component.html',
})
export class TAGEDOFISDialogComponent implements OnInit {
	faGithub = faGithub;
	faCalendar = faCalendar;
	faCourse = faHandsHelping;

	constructor() {}

	ngOnInit(): void {}
}
