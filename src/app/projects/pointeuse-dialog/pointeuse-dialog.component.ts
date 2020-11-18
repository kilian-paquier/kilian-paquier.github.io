import { Component, OnInit } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-pointeuse-dialog',
	templateUrl: './pointeuse-dialog.component.html',
})
export class PointeuseDialogComponent implements OnInit {
	faGithub = faGithub;
	faCalendar = faCalendar;
	faCourse = faGraduationCap;

	constructor() {}

	ngOnInit(): void {}
}
