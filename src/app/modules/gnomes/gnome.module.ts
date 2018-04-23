import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { GnomeService } from './services/gnome.service';
import { GnomeRemoteService } from './services/gnome-remote.service';

@NgModule({
    providers: [
        GnomeService,
        GnomeRemoteService
    ],
    imports: [
        HttpClientModule
    ]
})
export class GnomeModule {}
