import { Component, inject, OnInit } from '@angular/core';
import { BaseService } from '../../../services/baseservice.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-products',
    standalone: true,
    imports: [RouterModule, CommonModule],
    templateUrl: './products.component.html',
    styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

    imgurl: any
    baseService = inject(BaseService)
    constructor() {
        this.imgurl = this.baseService.imgurl;
    }

    ngOnInit(): void {
        this.getAllData();
        this.getSellerDetails()
    }
    allRandomData: any
    getAllData() {
        this.baseService.Get("/get-random-product").subscribe((res) => {
            this.allRandomData = res

        })
    }
    seller: any
    getSellerDetails() {
        this.baseService.Get('/users').subscribe((res) => {
            if (res.status == true) {
                this.seller = res.data

            } else {
                Swal.fire("please! try again")
            }

        })
    }
}
