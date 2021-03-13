import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-about',
	templateUrl: './about.component.html',
})
export class AboutComponent implements OnInit {
	get age(): string {
		let today = new Date();
		let birthDate = new Date('1997-11-25');
		let age = today.getFullYear() - birthDate.getFullYear();
		let m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age = age - 1;
		}
		return age + ' ';
	}

	constructor() {}

	ngOnInit(): void {
		this.changeFlagClass();
	}

	changeFlagClass() {
		const icon = document.getElementById('lang');
		if (location.href.includes('/en')) {
			icon.classList.add('flag-icon-fr');
		} else {
			icon.classList.add('flag-icon-gb');
		}
	}
}
