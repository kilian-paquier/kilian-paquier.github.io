import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { CookieService } from 'ngx-cookie-service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	@ViewChild('sidenav') sidenav: MatSidenav;
	faGithub = faGithub;
	faLinkedinIn = faLinkedinIn;

	constructor(private cookieService: CookieService, private scrollToService: ScrollToService) {}

	ngOnInit() {
		this.setTheme();
	}

	public changeTheme() {
		const body = document.getElementById('body');
		if (body.classList.contains('dark-theme')) {
			body.classList.remove('dark-theme');
			this.cookieService.set('theme', 'light-theme');
		} else {
			body.classList.add('dark-theme');
			this.cookieService.set('theme', 'dark-theme');
		}
	}

	public setTheme() {
		const theme = this.cookieService.get('theme');
		if (theme && theme === 'dark-theme') {
			this.changeTheme();
		}
	}

	public scrollTo(section: string) {
		this.scrollToService.scrollTo({
			target: '#' + section,
			duration: 500,
		});
	}
}
