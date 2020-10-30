import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

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
}
