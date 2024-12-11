import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import io from 'socket.io-client';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2'
import { BaseService } from './baseservice.service';






@Injectable({
    providedIn: 'root'
})
export class SocketService {

    socket: any;
    public IsUserLoggedIn: boolean = false;




    constructor(private router: Router, private http: HttpClient,
        private baseService: BaseService
    ) {
        // accessign user data from local storage



        try {
            this.socket = io(baseService.socketENV);

        } catch (error: any) {

            console.error('Socket connection error:', error);
        }
    }

    listen(eventName: string) {
        return new Observable((subscriber) => {
            //  this.socket.off(eventName);
            this.socket.on(eventName, (data: any) => {
                subscriber.next(data);
            });
        })
    }

    emit(eventName: string, data: any) {
        this.socket.emit(eventName, data);
    }

    public Logout() {
        this.IsUserLoggedIn = false;
        // localStorage.clear();
        this.router.navigate(['/login']);
        return true;
    }




    // Sweet alert ==============

}


