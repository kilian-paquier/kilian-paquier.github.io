import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-contact',
	templateUrl: './contact.component.html',
})
export class ContactComponent implements OnInit {
	contactForm: FormGroup;
	submitted: boolean = false;
	loading: boolean = false;

	constructor(
		private formBuilder: FormBuilder,
		private httpClient: HttpClient,
		private recaptchaV3Service: ReCaptchaV3Service,
		private snackBar: MatSnackBar
	) {}

	ngOnInit(): void {
		this.contactForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			name: ['', Validators.required],
			company: [''],
			message: ['', [Validators.required, Validators.maxLength(500)]],
		});
	}

	get form() {
		return this.contactForm.controls;
	}

	onSubmit() {
		this.submitted = true;

		if (this.contactForm.invalid) {
			return;
		}

		this.loading = true;
		this.recaptchaV3Service.execute('onSubmit').subscribe(
			token => {
				this.httpClient
					.post(environment.formspree_url, this.contactForm.value, {
						headers: new HttpHeaders({
							'Content-Type': 'application/json',
							Accept: 'application/json',
						}),
					})
					.subscribe(response => {
						// @ts-ignore ok
						if (response.ok) {
							if (location.href.includes('/en')) {
								this.snackBar.open('Message has been sent', 'Close', {
									duration: 2000,
								});
							} else {
								this.snackBar.open('Message envoyé', 'Fermer', {
									duration: 2000,
								});
							}
							this.contactForm.reset();
							this.submitted = false;
						} else {
							if (location.href.includes('/en')) {
								this.snackBar.open("Message hasn't been sent", 'Close', {
									duration: 2000,
								});
							} else {
								this.snackBar.open('Message non envoyé', 'Fermer', {
									duration: 2000,
								});
							}
						}
						this.loading = false;
					});
			},
			error => {
				if (location.href.includes('/en')) {
					this.snackBar.open("Message hasn't been sent", 'Close', {
						duration: 2000,
					});
				} else {
					this.snackBar.open('Message non envoyé', 'Fermer', {
						duration: 2000,
					});
				}
				console.error(error);
				this.loading = false;
			}
		);
	}
}
