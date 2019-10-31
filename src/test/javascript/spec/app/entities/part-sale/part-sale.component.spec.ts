import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EntityAuditingTestModule } from '../../../test.module';
import { PartSaleComponent } from 'app/entities/part-sale/part-sale.component';
import { PartSaleService } from 'app/entities/part-sale/part-sale.service';
import { PartSale } from 'app/shared/model/part-sale.model';

describe('Component Tests', () => {
  describe('PartSale Management Component', () => {
    let comp: PartSaleComponent;
    let fixture: ComponentFixture<PartSaleComponent>;
    let service: PartSaleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EntityAuditingTestModule],
        declarations: [PartSaleComponent],
        providers: []
      })
        .overrideTemplate(PartSaleComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PartSaleComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PartSaleService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PartSale('123')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.partSales[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
