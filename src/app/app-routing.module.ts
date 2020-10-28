import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { EducationComponent } from './education/education.component';
import { ExperiencesComponent } from './experiences/experiences.component';
import { FooterComponent } from './footer/footer.component';
import { InterestsComponent } from './interests/interests.component';
import { NavComponent } from './nav/nav.component';
import { ProjectsComponent } from './projects/projects.component';
import { SkillsComponent } from './skills/skills.component';

const routes: Routes = [
  { path: '', outlet: 'footer', component: FooterComponent },
  { path: '', outlet: 'nav', component: NavComponent },
  { path: '', outlet: 'projects', component: ProjectsComponent },
  { path: '', outlet: 'skills', component: SkillsComponent },
  { path: '', outlet: 'about', component: AboutComponent },
  { path: '', outlet: 'education', component: EducationComponent },
  { path: '', outlet: 'interests', component: InterestsComponent },
  { path: '', outlet: 'contact', component: ContactComponent },
  { path: '', outlet: 'experiences', component: ExperiencesComponent },
  { path: '**', redirectTo: '' }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
