import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EntityAuditingTestModule } from '../../../test.module';
import { PartSaleDetailComponent } from 'app/entities/part-sale/part-sale-detail.component';
import { PartSale } from 'app/shared/model/part-sale.model';

describe('Component Tests', () => {
  describe('PartSale Management Detail Component', () => {
    let comp: PartSaleDetailComponent;
    let fixture: ComponentFixture<PartSaleDetailComponent>;
    const route = ({ data: of({ partSale: new PartSale('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EntityAuditingTestModule],
        declarations: [PartSaleDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PartSaleDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PartSaleDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.partSale).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
