import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EntityAuditingTestModule } from '../../../test.module';
import { ConditionDefinitionDetailComponent } from 'app/entities/condition-definition/condition-definition-detail.component';
import { ConditionDefinition } from 'app/shared/model/condition-definition.model';

describe('Component Tests', () => {
  describe('ConditionDefinition Management Detail Component', () => {
    let comp: ConditionDefinitionDetailComponent;
    let fixture: ComponentFixture<ConditionDefinitionDetailComponent>;
    const route = ({ data: of({ conditionDefinition: new ConditionDefinition('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EntityAuditingTestModule],
        declarations: [ConditionDefinitionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ConditionDefinitionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ConditionDefinitionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.conditionDefinition).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
