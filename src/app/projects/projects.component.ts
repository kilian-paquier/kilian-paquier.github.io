import { ComponentType } from '@angular/cdk/portal';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ForTheBerryDialogComponent } from './for-the-berry-dialog/for-the-berry-dialog.component';

@Component({
	selector: 'app-projects',
	templateUrl: './projects.component.html',
})
export class ProjectsComponent implements OnInit {
	constructor(private dialog: MatDialog) {}

	ngOnInit(): void {}

	openDialog(dialogComponent: string) {
		switch (dialogComponent) {
			case 'ForTheBerry':
				this.dialog.open(ForTheBerryDialogComponent, {
					autoFocus: false,
				});
				break;
			case 'ShareYourFit':
				this.dialog.open(ForTheBerryDialogComponent, {
					autoFocus: false,
				});
				break;
			case 'FlotteCamionsNet':
			case 'FlotteCamionsJEE':
			case 'GestionEPI':
			case 'DoctoPatients':
			case 'StudentList':
			case 'T.A.GEDOFIS':
			case 'Pointeuse':
		}
	}
}
