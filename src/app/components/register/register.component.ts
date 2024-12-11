import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseService } from '../../../services/baseservice.service';
import { LoaderComponent } from '../loader/loader.component';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';


@Component({
    selector: 'app-register',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, LoaderComponent, RouterLink],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
    registerForm!: FormGroup;
    isPasswordVisible: boolean = false;
    constructor(private fb: FormBuilder, protected baseService: BaseService, protected router: Router) { }

    ngOnInit(): void {
        this.registerForm = this.fb.group({
            fullName: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.email]],
            mobileNo: [
                '',
                [Validators.required, Validators.pattern('^[0-9]{10}$')],
            ],
            password: ['', [Validators.required, Validators.minLength(8)]],
            address: ['', [Validators.required]],
            zipCode: [
                '',
                [Validators.required, Validators.pattern('^[0-9]{5,6}$')],
            ],
        });
    }

    isLoading: boolean = false;

    onSubmit(): void {

        if (this.registerForm.valid) {
            this.isLoading = true
            console.log(this.registerForm.value);
            this.baseService.Post('/user/register', { ...this.registerForm.value }).subscribe((res: any) => {

                console.log("register =>", res)
                if (res.status) {


                    this.isLoading = false
                    Swal.fire("", res.message, 'success');
                    this.router.navigate(['/']);
                    return

                }
                Swal.fire("", res.message, 'warning')
                this.isLoading = false
            })

        } else {
            console.error('Form is invalid');
        }
    }
    togglePasswordVisibility(): void {
        this.isPasswordVisible = !this.isPasswordVisible;
    }
    // Helper function for validation messages
    get f() {
        return this.registerForm.controls;
    }
}
