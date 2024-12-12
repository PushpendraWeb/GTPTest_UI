import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../../services/baseservice.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoaderComponent } from '../loader/loader.component';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-supplier-dashboard',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, CommonModule, LoaderComponent, RouterLink],
    templateUrl: './supplier-dashboard.component.html',
    styleUrl: './supplier-dashboard.component.css'
})
export class SupplierDashboardComponent implements OnInit {
    imgurl: any;
    productForm!: FormGroup;
    constructor(private fb: FormBuilder, protected base: BaseService, protected router: Router) {
        if (this.base.IsUserLoggedIn == false) {
            this.router.navigate(['login']);
        }
        this.imgurl = this.base.imgurl;
        this.getproductslist()

        this.productForm = this.fb.group({
            id: ['0'],
            productName: ['', [Validators.required]],
            title: ['', [Validators.required]],
            description: ['', [Validators.required]],
            quantity: ['', [Validators.required, Validators.minLength(1)]],
            MRP: ['', [Validators.required]],
            productImage: [''],
            discount: ['', [Validators.required]]
        });
    }

    Productlist: any;
    getproductslist() {
        this.base.GetAuth('/user/profile').subscribe((res: any) => {
            this.Productlist = res?.data?.products;

        });
    }

    ngOnInit(): void {
        console.log("product =>", this.productForm.value)


    }

    prductedit(id: any) {

        this.base.GetAuth('/get-by-id-product/' + id).subscribe((res: any) => {
            console.log(res);
            const { MRP, discount, id, main_image, product_details, product_name, quantity, sale_price, title } = res.data.productData
            this.productForm.patchValue({
                productName: product_name,
                title: title,
                description: product_details,
                quantity: quantity,
                MRP: MRP,
                id: id,
                productImage: main_image,
                discount: discount,
            });
        })
    }
    onSubmit() {
        console.log("formm =>", this.productForm.value)
        if (this.productForm.valid) {
            if (this.productForm.value.id == 0) {
                this.base.PostAuth('/add-product', { ...this.productForm.value }).subscribe((res: any) => {
                    if (res.status) {
                        Swal.fire("", res.message, 'success')
                        this.getproductslist();
                        return
                    }
                    Swal.fire("", res.message, 'error')
                })
            } else {
                this.base.PostAuth('/update-product', { ...this.productForm.value }).subscribe((res: any) => {
                    if (res.status) {
                        
                        Swal.fire("", res.message, 'success')
                        this.getproductslist();
                        return
                    }
                    Swal.fire("", res.message, 'error')
                })
            }

        }
    }

    uploadFile(files: any) {
        this.base.Postimg("upload-image", files).subscribe((res: any) => {
            this.productForm.patchValue({
                productImage: res.image
            });
        })
    }


}
