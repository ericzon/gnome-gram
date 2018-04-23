import { Subscription } from 'rxjs/Subscription';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';

import { DetailPage } from '../detail/detail';
import { IGnome } from '../../app/modules/gnomes/interfaces/gnome.interface';
import { GnomeService } from '../../app/modules/gnomes/services/gnome.service';

@Component({
    selector: 'page-list',
    templateUrl: 'list.html'
})
export class ListPage implements OnInit, OnDestroy {
    private items: IGnome[];
    private allItems: IGnome[];
    private loader;
    private searchInput: string;
    private itemsSubscription: Subscription;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private service: GnomeService,
        public loadingCtrl: LoadingController
    ) {
        this.loader = this.loadingCtrl.create({
            content: 'Please wait...',
            duration: 1100
        });
    }

    public ngOnInit() {
        this.getGnomes();
    }

    public onInput($event) {
        this.searchInput = $event.target.value;
        this.items = this.service.filterItems(this.searchInput, this.allItems);
    }

    public onCancel($event) {
        this.searchInput = '';
        this.items = this.service.filterItems(this.searchInput, this.allItems);
    }

    public getGnomes() {
        this.loader.present();
        this.itemsSubscription = this.service.getGnomes().subscribe(result => {
            const processedResult = this.service.setGnomesGender(result);

            this.allItems = processedResult;
            this.items = processedResult;
        });
    }

    public ngOnDestroy() {
        this.itemsSubscription && this.itemsSubscription.unsubscribe();
    }

    public itemTapped(event, item) {
        this.navCtrl.push(DetailPage, { item });
    }
}
