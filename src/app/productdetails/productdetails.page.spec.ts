import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { ProductDetailsPage } from './productdetails.page';

describe('ProductDetailsPage', () => {
  let component: ProductDetailsPage;
  let fixture: ComponentFixture<Tab5Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDetailsPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
