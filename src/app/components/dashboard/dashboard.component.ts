import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BaseService } from '../../../services/baseservice.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export class DashboardComponent {


    constructor(public base: BaseService, public router: Router) {

    }



    sinout() {
        this.base.Logout();
    }


}
