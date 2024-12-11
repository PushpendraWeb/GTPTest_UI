import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseService } from '../../../services/baseservice.service';
import { LoaderComponent } from '../loader/loader.component';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, LoaderComponent, RouterLink],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
    registerForm!: FormGroup;
    isPasswordVisible: boolean = false;
    constructor(private fb: FormBuilder, protected baseService: BaseService, protected router: Router) {
        if (this.baseService.IsUserLoggedIn == false) {
            this.router.navigate(['login']);
        }

    }

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
        this.getuser();
    }

    isLoading: boolean = false;

    getuser() {
        this.baseService.GetAuth('/user/profile').subscribe((res: any) => {
            console.log(res.data);
            const { full_name, mobile_no, address, zip_code, email } = res?.data?.user
            this.registerForm.patchValue({
                fullName: full_name,
                mobileNo: mobile_no,
                address: address,
                zipCode: zip_code,
                email: email,
            });
        })

    }

    onSubmit(): void {

        if (this.registerForm.valid) {
            this.isLoading = true
            this.baseService.PostAuth('/user/profile/update', { ...this.registerForm.value }).subscribe((res: any) => {

                console.log("register =>", res)
                if (res.status) {


                    this.isLoading = false
                    Swal.fire("", res.message, 'success');

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
