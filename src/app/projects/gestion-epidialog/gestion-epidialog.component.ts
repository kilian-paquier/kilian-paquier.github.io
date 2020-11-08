import { Component, OnInit } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
	selector: 'app-gestion-epidialog',
	templateUrl: './gestion-epidialog.component.html',
})
export class GestionEPIDialogComponent implements OnInit {
	faGithub = faGithub;

	constructor() {}

	ngOnInit(): void {}
}
