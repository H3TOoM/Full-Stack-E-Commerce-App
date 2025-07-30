/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BestSellersComponent } from './BestSellers.component';

describe('BestSellersComponent', () => {
  let component: BestSellersComponent;
  let fixture: ComponentFixture<BestSellersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestSellersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestSellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
