import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EntityAuditingTestModule } from '../../../test.module';
import { PriceListComponent } from 'app/entities/price-list/price-list.component';
import { PriceListService } from 'app/entities/price-list/price-list.service';
import { PriceList } from 'app/shared/model/price-list.model';

describe('Component Tests', () => {
  describe('PriceList Management Component', () => {
    let comp: PriceListComponent;
    let fixture: ComponentFixture<PriceListComponent>;
    let service: PriceListService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EntityAuditingTestModule],
        declarations: [PriceListComponent],
        providers: []
      })
        .overrideTemplate(PriceListComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PriceListComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PriceListService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PriceList('123')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.priceLists[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
