import { Component, OnInit } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
	selector: 'app-flotte-camions-net-dialog',
	templateUrl: './flotte-camions-net-dialog.component.html',
})
export class FlotteCamionsNetDialogComponent implements OnInit {
	faGithub = faGithub;

	constructor() {}

	ngOnInit(): void {}
}
