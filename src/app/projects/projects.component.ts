import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DoctoPatientsDialogComponent } from './docto-patients-dialog/docto-patients-dialog.component';
import { FlotteCamionsJEEDialogComponent } from './flotte-camions-jeedialog/flotte-camions-jeedialog.component';
import { FlotteCamionsNetDialogComponent } from './flotte-camions-net-dialog/flotte-camions-net-dialog.component';
import { ForTheBerryDialogComponent } from './for-the-berry-dialog/for-the-berry-dialog.component';
import { GestionEPIDialogComponent } from './gestion-epidialog/gestion-epidialog.component';
import { PointeuseDialogComponent } from './pointeuse-dialog/pointeuse-dialog.component';
import { ShareYourFitDialogComponent } from './share-your-fit-dialog/share-your-fit-dialog.component';
import { StudentListDialogComponent } from './student-list-dialog/student-list-dialog.component';
import { TAGEDOFISDialogComponent } from './tagedofisdialog/tagedofisdialog.component';

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
				this.dialog.open(ShareYourFitDialogComponent, {
					autoFocus: false,
				});
				break;
			case 'FlotteCamionsNet':
				this.dialog.open(FlotteCamionsNetDialogComponent, {
					autoFocus: false,
				});
				break;
			case 'FlotteCamionsJEE':
				this.dialog.open(FlotteCamionsJEEDialogComponent, {
					autoFocus: false,
				});
				break;
			case 'GestionEPI':
				this.dialog.open(GestionEPIDialogComponent, {
					autoFocus: false,
				});
				break;
			case 'DoctoPatients':
				this.dialog.open(DoctoPatientsDialogComponent, {
					autoFocus: false,
				});
				break;
			case 'StudentList':
				this.dialog.open(StudentListDialogComponent, {
					autoFocus: false,
				});
				break;
			case 'TAGEDOFIS':
				this.dialog.open(TAGEDOFISDialogComponent, {
					autoFocus: false,
				});
				break;
			case 'Pointeuse':
				this.dialog.open(PointeuseDialogComponent, {
					autoFocus: false,
				});
				break;
		}
	}
}
