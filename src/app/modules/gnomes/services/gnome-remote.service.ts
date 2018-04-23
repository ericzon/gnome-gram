import 'rxjs/add/operator/map'
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GNOME_URL } from '../constants';
import { IGnomesResponse } from '../interfaces/gnomes-response.interface';

@Injectable()
export class GnomeRemoteService {
    constructor(private http: HttpClient) {}

    public getList() {
        return this.http.get<IGnomesResponse>(GNOME_URL).map((response) => {
            return response.Brastlewark
        });
    }
}
