import { TestBed, ComponentFixture, async, inject } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { GnomeService } from '../services/gnome.service';
import { HttpClientModule } from '@angular/common/http';
import { GnomeRemoteService } from '../services/gnome-remote.service';
import { GnomeRemoteServiceMock } from './mocks/gnome-remote.service.mock';

describe('Gnome service', () => {
    let service, remote;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule
            ],
            providers: [
                GnomeService,
                { provide: GnomeRemoteService, useClass: GnomeRemoteServiceMock }
            ]
        })
    }));

    beforeEach(() => {
        service = TestBed.get(GnomeService);
        remote = TestBed.get(GnomeRemoteService);
    });

    it('should be created when dependencies are initialized', () => {
        expect(service).toBeDefined();
        expect(remote).toBeDefined();
        expect(service instanceof GnomeService).toBe(true);
        expect(remote instanceof GnomeRemoteServiceMock).toBe(true);
    });

    it('should filter items when criteria is not empty', () => {
        const criteria = 'aaa';
        const items = [{
            name: 'abcd'
        },  {
            name: 'aacd'
        },  {
            name: 'aaad'
        }];

        const filtered = service.filterItems(criteria, items);

        expect(filtered.length).toBe(1);
        expect(filtered[0].name).toBe('aaad');
    });

    it('should return empty list when criteria doesnt match any', () => {
        const criteria = 'xyxy';
        const items = [{
            name: 'abcd'
        },  {
            name: 'aacd'
        },  {
            name: 'aaad'
        }];

        const filtered = service.filterItems(criteria, items);

        expect(filtered.length).toBe(0);
    });

    it('should return whole list when criteria is not defined', () => {
        const criteria = '';
        const items = [{
            name: 'abcd'
        },  {
            name: 'aacd'
        },  {
            name: 'aaad'
        }];

        const filtered = service.filterItems(criteria, items);

        expect(filtered.length).toBe(3);
    });

    it('should calculate height average when list of heights is provided', () => {
        const list: any = [{
            height: 150,
        },  {
            height: 250,
        },  {
            height: 200
        }];

        const avg = service.getAverageHeight(list);

        expect(avg).toBe(200);
    });

    it('should set gnome sex when list of gnomes is provided', () => {
        const list: any = [{
            height: 150,
        },  {
            height: 250,
        },  {
            height: 200
        }];

        const expected = [{
            height: 150,
            sex: 'woman'
        },  {
            height: 250,
            sex: 'man'
        },  {
            height: 200,
            sex: 'man'
        }];

        const gender = service.setGnomesGender(list);

        expect(gender).toEqual(expected);
    });
});
