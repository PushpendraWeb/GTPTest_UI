import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BaseService } from '../../../services/baseservice.service';
import { SocketService } from '../../../services/socket-service.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
    selector: 'app-product-details',
    standalone: true,
    imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
    templateUrl: './product-details.component.html',
    styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
    getParams: any
    imgurl: any
    pollings: any[] = []
    pollForm: FormGroup;
    actRoute = inject(ActivatedRoute)
    baseService = inject(BaseService)
    constructor(protected socket: SocketService, public fb: FormBuilder) {
        this.imgurl = this.baseService.imgurl;

        this.pollForm = this.fb.group({
            userName: ['', [Validators.required]],
            message: ['', [Validators.required]]
        })
    }



    ngOnInit(): void {
        this.getParams = this.actRoute.snapshot.paramMap.get("id");
        this.byIdProduct()
        this.listenPollings()

    }
    listenPollings() {
        this.socket.listen(`polling:${this.getParams}`).subscribe((res: any) => {
            console.log("posfsdkl =>", res)

            this.pollings = res.polls

        })
    }
    byIdProductData: any
    byIdProduct() {
        this.baseService.Get("/get-by-id-product/" + this.getParams).subscribe((res: any) => {
            if (res.status) {
                console.log("polinfgs  and data", res);

                const { productData, pollings } = res.data;
                this.byIdProductData = productData
                this.pollings = pollings
            }

        })
    }
    buyProduct(id: number) {
        const data = { id: id, quantity: 1 }
        this.baseService.Post("/update-product-quentity", data).subscribe((res) => {
            if (res.status == true) {
                Swal.fire('', "Successfully Buy Product")
            } else {
                Swal.fire("Out of Stock")
            }
        })
    }
    onSubmit() {
        this.baseService.Post('/pollings/poll', { ...this.pollForm.value, productId: this.getParams }).subscribe((res) => {
            if (res.status) {

            }
        })
    }
}
