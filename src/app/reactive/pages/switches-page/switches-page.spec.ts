import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchesPage } from './switches-page';

describe('SwitchesPage', () => {
  let component: SwitchesPage;
  let fixture: ComponentFixture<SwitchesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchesPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwitchesPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
