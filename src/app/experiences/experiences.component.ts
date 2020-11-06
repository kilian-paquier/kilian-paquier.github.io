import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
	selector: 'app-experiences',
	templateUrl: './experiences.component.html',
})
export class ExperiencesComponent implements OnInit {
	@ViewChildren(MatExpansionPanel) panels: QueryList<MatExpansionPanel>;

	constructor() {}

	ngOnInit(): void {}

	closeOthersPanels(panelNumber: number) {
		this.panels.forEach(panel => {
			if (panel.opened && !panel.id.toString().includes(panelNumber.toString())) panel.close();
		});
	}
}
