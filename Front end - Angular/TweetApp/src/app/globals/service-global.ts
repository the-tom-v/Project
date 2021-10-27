import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ServiceGlobal {

    constructor() { }

    getServiceList(): { [key: string]: string } {
        return {
            USER_REGISTER: environment.servername + '/api/v1.0/tweets/register',
            USER_LOGIN: environment.servername + '/api/v1.0/tweets/login',
            USER_FORGOT_PASSWORD: environment.servername + '/api/v1.0/tweets/forgot',
            VIEW_ALL_TWEET: environment.servername + '/api/v1.0/tweets/all/',
            VIEW_ALL_USERS: environment.servername + '/api/v1.0/tweets/users/all',
            GET_USER_TWEET: environment.servername + '/api/v1.0/tweets/',
            POST_TWEET: environment.servername + '/api/v1.0/tweets/',
            LIKE_TWEET: environment.servername + '/api/v1.0/tweets/'
        };
    }
}
