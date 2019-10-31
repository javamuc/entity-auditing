import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EntityAuditingTestModule } from '../../../test.module';
import { PartSaleUpdateComponent } from 'app/entities/part-sale/part-sale-update.component';
import { PartSaleService } from 'app/entities/part-sale/part-sale.service';
import { PartSale } from 'app/shared/model/part-sale.model';

describe('Component Tests', () => {
  describe('PartSale Management Update Component', () => {
    let comp: PartSaleUpdateComponent;
    let fixture: ComponentFixture<PartSaleUpdateComponent>;
    let service: PartSaleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EntityAuditingTestModule],
        declarations: [PartSaleUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PartSaleUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PartSaleUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PartSaleService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PartSale('123');
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new PartSale();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
