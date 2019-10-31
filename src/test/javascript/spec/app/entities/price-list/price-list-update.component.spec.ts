import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EntityAuditingTestModule } from '../../../test.module';
import { PriceListUpdateComponent } from 'app/entities/price-list/price-list-update.component';
import { PriceListService } from 'app/entities/price-list/price-list.service';
import { PriceList } from 'app/shared/model/price-list.model';

describe('Component Tests', () => {
  describe('PriceList Management Update Component', () => {
    let comp: PriceListUpdateComponent;
    let fixture: ComponentFixture<PriceListUpdateComponent>;
    let service: PriceListService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EntityAuditingTestModule],
        declarations: [PriceListUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PriceListUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PriceListUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PriceListService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PriceList('123');
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
        const entity = new PriceList();
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
