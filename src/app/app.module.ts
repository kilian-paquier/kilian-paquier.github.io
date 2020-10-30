import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';

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
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
