import { Injectable } from '@angular/core';

import { MAN, WOMAN } from '../constants';
import { IGnome } from '../interfaces/gnome.interface';
import { GnomeRemoteService } from './gnome-remote.service';

@Injectable()
export class GnomeService {
    constructor(private remote: GnomeRemoteService) {}

    public getGnomes() {
        return this.remote.getList();
    }

    public filterItems(criteria, allItems) {
        return (!criteria) ?
            allItems :
            allItems.filter((item) => {
                return item.name.toLowerCase().indexOf(criteria.toLowerCase()) > -1;
            });
    }

    public setGnomesGender(list: IGnome[]) {
        const avg = this.getAverageHeight(list);
        return list.map((item) => {
            item.sex = item.height >= avg ? MAN : WOMAN;

            return item;
        });
    }

    private getAverageHeight(list: IGnome[]) {
        let heights = 0;

        list.forEach((item) => {
            heights += item.height;
        });

        return heights / list.length;
    }
}
