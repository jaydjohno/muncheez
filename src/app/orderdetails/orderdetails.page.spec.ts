import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { OrderDetailsPage } from './orderdetails.page';

describe('OrderDetailsPage', () => {
  let component: OrderDetailsPage;
  let fixture: ComponentFixture<Tab5Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderDetailsPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
