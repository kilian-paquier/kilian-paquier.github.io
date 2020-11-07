import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-contact',
	templateUrl: './contact.component.html',
})
export class ContactComponent implements OnInit {
	contactForm: FormGroup;
	submitted: boolean = false;
	loading: boolean = false;

	constructor(private formBuilder: FormBuilder) {}

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

		// stop here if form is invalid
		if (this.contactForm.invalid) {
			return;
		}
	}
}
