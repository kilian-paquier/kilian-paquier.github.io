import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { SkillsComponent } from './skills/skills.component';
import { ProjectsComponent } from './projects/projects.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ExperiencesComponent } from './experiences/experiences.component';
import { InterestsComponent } from './interests/interests.component';
import { ContactComponent } from './contact/contact.component';
import { EducationComponent } from './education/education.component';
import { AboutComponent } from './about/about.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CookieService } from 'ngx-cookie-service';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { ImagesComponent } from './images/images.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ForTheBerryDialogComponent } from './projects/for-the-berry-dialog/for-the-berry-dialog.component';
import { ShareYourFitDialogComponent } from './projects/share-your-fit-dialog/share-your-fit-dialog.component';
import { FlotteCamionsNetDialogComponent } from './projects/flotte-camions-net-dialog/flotte-camions-net-dialog.component';
import { FlotteCamionsJEEDialogComponent } from './projects/flotte-camions-jeedialog/flotte-camions-jeedialog.component';
import { GestionEPIDialogComponent } from './projects/gestion-epidialog/gestion-epidialog.component';
import { DoctoPatientsDialogComponent } from './projects/docto-patients-dialog/docto-patients-dialog.component';
import { StudentListDialogComponent } from './projects/student-list-dialog/student-list-dialog.component';
import { TAGEDOFISDialogComponent } from './projects/tagedofisdialog/tagedofisdialog.component';
import { PointeuseDialogComponent } from './projects/pointeuse-dialog/pointeuse-dialog.component';

@NgModule({
	declarations: [
		AppComponent,
		FooterComponent,
		SkillsComponent,
		ProjectsComponent,
		ExperiencesComponent,
		InterestsComponent,
		ContactComponent,
		EducationComponent,
		AboutComponent,
		ImagesComponent,
		ForTheBerryDialogComponent,
		ShareYourFitDialogComponent,
		FlotteCamionsNetDialogComponent,
		FlotteCamionsJEEDialogComponent,
		GestionEPIDialogComponent,
		DoctoPatientsDialogComponent,
		StudentListDialogComponent,
		TAGEDOFISDialogComponent,
		PointeuseDialogComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		MatIconModule,
		MatToolbarModule,
		MatButtonModule,
		MatRippleModule,
		MatListModule,
		FlexLayoutModule,
		MatSidenavModule,
		FontAwesomeModule,
		ScrollToModule.forRoot(),
		MatTooltipModule,
		MatGridListModule,
		MatCardModule,
		MatExpansionModule,
		MatProgressBarModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		FormsModule,
		MatInputModule,
		MatDialogModule,
	],
	providers: [CookieService],
	bootstrap: [AppComponent],
})
export class AppModule {}
