import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent {
	@ViewChild('sidenav') sidenav: MatSidenav;

	constructor() {}

	public changeTheme() {
		const body = document.getElementById('body');
		if (body.classList.contains('dark-theme')) {
			body.classList.remove('dark-theme');
			body.classList.add('light-theme');
			localStorage.setItem('theme', 'light-theme');
		} else {
			body.classList.remove('light-theme');
			body.classList.add('dark-theme');
			localStorage.setItem('theme', 'dark-theme');
		}
	}

	public setTheme() {
		const theme = localStorage.getItem('theme');
		if (theme && theme === 'dark-theme') {
			this.changeTheme();
		}
	}

	public showSidenav() {}
}
