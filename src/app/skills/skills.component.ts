import { Component, OnInit } from '@angular/core';
declare const $: any;

@Component({
	selector: 'app-skills',
	templateUrl: './skills.component.html',
})
export class SkillsComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {
		$('[data-toggle="tooltip"]').tooltip();
	}
}
