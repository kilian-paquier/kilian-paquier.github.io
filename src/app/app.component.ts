import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { CookieService } from 'ngx-cookie-service';
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

	constructor(private cookieService: CookieService, private scrollToService: ScrollToService) {}

	ngOnInit() {
		this.setTheme();
		this.initSwipe();
	}

	initSwipe() {
		const hammerSidenav = new Hammer(document.body);
		hammerSidenav.on('panright', () => {
			if (!this.sidenav.opened) this.sidenav.open();
		});
		hammerSidenav.on('panleft', () => {
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
		if (theme && theme === 'light-theme') this.changeTheme();
	}

	public scrollTo(section: string) {
		this.scrollToService.scrollTo({
			target: '#' + section,
			duration: 500,
		});
	}
}
