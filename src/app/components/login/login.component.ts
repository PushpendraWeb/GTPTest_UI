import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BaseService } from '../../../services/baseservice.service';
import { Constants } from '../../../app/modal/constants';
import { Router, RouterLink } from '@angular/router';
@Component({
    selector: 'app-login',
    standalone: true, // Declare as a standalone component
    imports: [ReactiveFormsModule, CommonModule, RouterLink], // Import necessary modules
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;

    constructor(private fb: FormBuilder, protected baseService: BaseService, private router: Router) { }

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
        });
    }

    onSubmit(): void {
        if (this.loginForm.valid) {
            this.baseService.Login(this.loginForm.value).subscribe((res) => {
                try {
                    localStorage.setItem(Constants.AuthData, JSON.stringify(res.data));
                    this.baseService.GetAuthToken();
                    this.router.navigate(['dashboard']);
                } catch (error: any) {
                    console.log(error)
                    alert(error.messages)
                }
            })
        } else {
            console.log('Form is invalid');
        }
    }
}
