import { Component, OnInit } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
	selector: 'app-docto-patients-dialog',
	templateUrl: './docto-patients-dialog.component.html',
})
export class DoctoPatientsDialogComponent implements OnInit {
	faGithub = faGithub;

	constructor() {}

	ngOnInit(): void {}
}
