import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-about',
	templateUrl: './about.component.html',
})
export class AboutComponent implements OnInit {
	public age: string;

	constructor() {}

	ngOnInit(): void {
		this.age = this.calculAge();
	}

	public openCurriculumVitae() {}

	calculAge(): string {
		let today = new Date();
		let birthDate = new Date('25/11/1997');
		let age = today.getFullYear() - birthDate.getFullYear();
		let m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age = age - 1;
		}
		return ' ' + age + ' ';
	}
}
