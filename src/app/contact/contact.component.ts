import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare const grecaptcha: any;

@Component({
	selector: 'app-contact',
	templateUrl: './contact.component.html',
})
export class ContactComponent implements OnInit {
	contactForm: FormGroup;
	submitted: boolean = false;
	loading: boolean = false;

	constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) {}

	ngOnInit(): void {
		this.contactForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			name: ['', Validators.required],
			company: [''],
			message: ['', Validators.required],
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

		grecaptcha.ready(function () {
			grecaptcha.execute('6LfynOAZAAAAAFiMDcBIVTNKik0oyn0Mkw8FyEvc', { action: 'submit' }).then((token: any) => {
				this.httpClient
					.post(
						'https://www.google.com/recaptcha/api/siteverify',
						{
							secret: '6LfynOAZAAAAALfgcr3LVxXC4EEljlyDF7PjOIuh',
							response: token,
						},
						{}
					)
					.pipe()
					.subscribe((response: any) => {
						console.log(response);
					});
			});
		});

		// const API = environment.pageclip_key;
		// const pageclip = new Pageclip(API);
		// const values = this.contactForm.value;
		// console.log(values);
		// pageclip
		// 	.send(values)
		// 	.then((response: { status: any; data: any }) => {
		// 		console.log(response.status, response.data);
		// 	})
		// 	.then(() => {
		// 		return pageclip.fetch();
		// 	})
		// 	.then((response: { status: any; data: any }) => {
		// 		console.log(response.status, response.data);
		// 	});
	}
}
