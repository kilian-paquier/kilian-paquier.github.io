import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { CookieService } from 'ngx-cookie-service';
import { NgwWowService } from 'ngx-wow';

declare const Hammer: any;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
	@ViewChild('sidenav') sidenav: MatSidenav;
	@ViewChild('sidenavcontent') sidenavContent: MatSidenavContent;
	progressbarValue = 0;
	faGithub = faGithub;
	faLinkedinIn = faLinkedinIn;
	height: number;
	needCalcul: boolean = true;

	constructor(
		private cookieService: CookieService,
		private scrollToService: ScrollToService,
		private wowService: NgwWowService
	) {}

	ngOnInit() {
		// this.addScript();
		this.setTheme();
		this.initSwipe();
		this.wowService.init();
	}

	initSwipe() {
		const hammerSidenav = new Hammer(document.body);
		hammerSidenav.on('swiperight', () => {
			if (!this.sidenav.opened) this.sidenav.open();
		});
		hammerSidenav.on('swipeleft', () => {
			if (this.sidenav.opened) this.sidenav.close();
		});
	}

	progress() {
		if (this.needCalcul) {
			this.height = this.sidenavContent.measureScrollOffset('bottom');
			if (this.height !== 0) {
				this.needCalcul = false;
			}
		} else {
			const currentScroll = this.sidenavContent.measureScrollOffset('top');
			this.progressbarValue = (currentScroll / this.height) * 100;
		}
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

	setTheme() {
		const theme = this.cookieService.get('theme');
		if (theme && theme === 'dark-theme') this.changeTheme();
	}

	public scrollTo(section: string) {
		this.scrollToService.scrollTo({
			target: '#' + section,
			duration: 500,
		});
	}

	addScript() {
		// const script = document.createElement('script');
		// script.src = 'https://www.google.com/recaptcha/api.js';
		// script.type = 'text/javascript';
		// script.async = true;
		// document.body.appendChild(script);
		// const script = document.createElement('script');
		// script.src = 'https://s.pageclip.co/v1/pageclip.js';
		// script.type = 'text/javascript';
		// script.async = true;
		// script.defer = true;
		// document.body.appendChild(script);
	}
}
