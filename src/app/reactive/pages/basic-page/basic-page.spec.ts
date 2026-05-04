import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicPage } from './basic-page';

describe('BasicPage', () => {
  let component: BasicPage;
  let fixture: ComponentFixture<BasicPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
