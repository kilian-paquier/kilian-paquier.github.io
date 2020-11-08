import { Component, OnInit } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
	selector: 'app-flotte-camions-jeedialog',
	templateUrl: './flotte-camions-jeedialog.component.html',
})
export class FlotteCamionsJEEDialogComponent implements OnInit {
	faGithub = faGithub;

	constructor() {}

	ngOnInit(): void {}
}
