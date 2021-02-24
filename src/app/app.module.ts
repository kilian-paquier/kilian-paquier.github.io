import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { RecaptchaFormsModule, RecaptchaModule, RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { CookieService } from 'ngx-cookie-service';
import { NgwWowModule } from 'ngx-wow';
import { environment } from 'src/environments/environment.sample';
import { AboutComponent } from './about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { EducationComponent } from './education/education.component';
import { ExperiencesComponent } from './experiences/experiences.component';
import { FooterComponent } from './footer/footer.component';
import { ImagesComponent } from './images/images.component';
import { InterestsComponent } from './interests/interests.component';
import { DoctoPatientsDialogComponent } from './projects/docto-patients-dialog/docto-patients-dialog.component';
import { FlotteCamionsJEEDialogComponent } from './projects/flotte-camions-jeedialog/flotte-camions-jeedialog.component';
import { FlotteCamionsNetDialogComponent } from './projects/flotte-camions-net-dialog/flotte-camions-net-dialog.component';
import { ForTheBerryDialogComponent } from './projects/for-the-berry-dialog/for-the-berry-dialog.component';
import { GestionEPIDialogComponent } from './projects/gestion-epidialog/gestion-epidialog.component';
import { PointeuseDialogComponent } from './projects/pointeuse-dialog/pointeuse-dialog.component';
import { ProjectsComponent } from './projects/projects.component';
import { ShareYourFitDialogComponent } from './projects/share-your-fit-dialog/share-your-fit-dialog.component';
import { StudentListDialogComponent } from './projects/student-list-dialog/student-list-dialog.component';
import { TAGEDOFISDialogComponent } from './projects/tagedofisdialog/tagedofisdialog.component';
import { SkillsComponent } from './skills/skills.component';

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
		HttpClientModule,
		RecaptchaModule,
		RecaptchaFormsModule,
		RecaptchaV3Module,
		MatSnackBarModule,
		NgwWowModule,
	],
	providers: [CookieService, { provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.captcha_key }],
	bootstrap: [AppComponent],
})
export class AppModule {}
