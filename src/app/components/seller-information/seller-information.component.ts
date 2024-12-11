import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from '../../../services/baseservice.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seller-information',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seller-information.component.html',
})
export class SellerInformationComponent implements OnInit {
  getParams: any
  imgurl: any
  actRoute = inject(ActivatedRoute);
  baseService = inject(BaseService)

  constructor() {
    this.getParams = this.actRoute.snapshot.paramMap.get("id");
    this.imgurl = this.baseService.imgurl;
  }
  ngOnInit(): void {
    this.getSellerInformation()
  }
  sellerproduct: any
  sellerProductsData: any
  getSellerInformation() {
    this.baseService.Get('/users/' + this.getParams).forEach((res) => {
      this.sellerproduct = res.data.sellerData;
      this.sellerProductsData = res.data.productByseller
      console.log("sellerproduufdfhjd", this.sellerproduct)
    })
  }

}
