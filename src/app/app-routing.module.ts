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
  { path: 'footer', outlet: 'footer', component: FooterComponent },
  { path: 'nav', outlet: 'nav', component: NavComponent },
  { path: 'projects', outlet: 'projects', component: ProjectsComponent },
  { path: 'skills', outlet: 'skills', component: SkillsComponent },
  { path: 'about', outlet: 'about', component: AboutComponent },
  { path: 'education', outlet: 'education', component: EducationComponent },
  { path: 'interets', outlet: 'interests', component: InterestsComponent },
  { path: 'contact', outlet: 'contact', component: ContactComponent },
  { path: 'experiences', outlet: 'experiences', component: ExperiencesComponent }
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
