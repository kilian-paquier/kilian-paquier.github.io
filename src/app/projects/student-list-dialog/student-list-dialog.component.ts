import { Component, OnInit } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
	selector: 'app-student-list-dialog',
	templateUrl: './student-list-dialog.component.html',
})
export class StudentListDialogComponent implements OnInit {
	faGithub = faGithub;

	constructor() {}

	ngOnInit(): void {}
}
