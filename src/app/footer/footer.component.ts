import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
	public initYear = 2019;
	public year = new Date().getFullYear();

	constructor() {}

	ngOnInit(): void {}
}
