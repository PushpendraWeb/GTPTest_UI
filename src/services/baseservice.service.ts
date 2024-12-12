import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { APIConstants } from '../app/modal/apiConstants';
import { Login } from '../app/modal/login';
import { Constants } from '../app/modal/constants';

declare var $: any;

export interface ICustomerWindow extends Window {
    __customer_global_stuff: string;
}

function getWindow(): any {
    return window;
}

@Injectable({
    providedIn: 'root'
})
export class BaseService {
    Admin: any;
    vendor: any;
    public setmenu = false;
    public IsUserLoggedIn = false;
    public header = false;
    public UserProfile: any;
    public loading: any;
    public sulg: any;
    public proimag: any;
    public control: any;
    public img_url: any;
    public roles: any;
    public type: any;
    public freeplan = false;
    public salg: any = [];
    public Invoiceview = false;
    public invoicelength = 0;
    public invoiceId: any;
    environment: any;
    socketENV: any
    imgurl: any;

    get netiveWindow(): ICustomerWindow {
        return getWindow();
    }

    constructor(private http: HttpClient, private router: Router) {
        this.environment = 'http://localhost:2000';
        this.socketENV = 'ws://localhost:2000';
        this.imgurl = 'http://localhost:2000/images/';
        // this.environment = 'http://13.127.167.24:2000';
        // this.socketENV = 'ws://13.127.167.24:2000';
        // this.imgurl = 'http://13.127.167.24:2000/images/';
    }

    public Get(routePath: string) {
        return this.http.get<any>(`${this.environment}${routePath}`, this.getHeader());
    }

    public GetImage(routePath: string) {
        return this.http.get<any>(`${this.environment}${routePath}`, this.getHeader());
    }

    public Post(routePath: string, data: any) {
        return this.http.post<any>(`${this.environment}${routePath}`, data, this.getHeader());
    }

    public GetAuth(routePath: string) {
        return this.http.get<any>(`${this.environment}${routePath}`, this.getHeader(true));
    }

    public PostAuth(routePath: string, data: any) {
        return this.http.post<any>(`${this.environment}${routePath}`, data, this.getHeader(true));
    }

    public PutAuth(routePath: string, data: any) {
        return this.http.put<any>(`${this.environment}${routePath}`, data, this.getHeader(true));
    }

    public Delete(routePath: string) {
        return this.http.delete<any>(`${this.environment}${routePath}`, this.getHeader(true));
    }

    public Postimg(API: string, body: any) {
        const formData: FormData = new FormData();
        const file = body[0];
        formData.append('file', file, file.name);

        return this.http.post(`${this.environment}/${API}`, formData
        );
    }

    public Login(lModel: Login) {
        const data = { "email": lModel.email, "password": lModel.password };
        const loginHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>(`${this.environment}${APIConstants.Login}`, data, { headers: loginHeader });
    }

    public Logout() {
        this.IsUserLoggedIn = false;
        localStorage.clear();
        this.router.navigate(['/login']);
        return true;
    }

    public GetAuthToken() {
        const currentUser: any = this.GetLoggedInUser();
        return currentUser
    }

    public GetLoggedInUser(): any | null {
        if (typeof localStorage !== 'undefined') {
            const authData = localStorage.getItem(Constants.AuthData);
            if (authData) {
                const currentUser: any = JSON.parse(authData)?.token;
                this.IsUserLoggedIn = true;
                return currentUser;
            }
        }
        this.IsUserLoggedIn = false;
        return null;
    }

    private getHeader(isAuth: boolean = false) {
        const token = this.GetAuthToken();
        let reqHeader: any;

        if (isAuth) {
            reqHeader = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': token
            });
        } else {
            reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
        }
        return { headers: reqHeader };
    }
}
