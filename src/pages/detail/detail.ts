import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { IGnome } from '../../app/modules/gnomes/interfaces/gnome.interface';
import { GnomeService } from '../../app/modules/gnomes/services/gnome.service';

@Component({
    selector: 'page-detail',
    templateUrl: './detail.html'
})
export class DetailPage {
    item: IGnome;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private service: GnomeService
    ) {
        this.item = navParams.get('item');
    }
}
