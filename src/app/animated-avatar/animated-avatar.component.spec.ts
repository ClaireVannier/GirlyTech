import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedAvatarComponent } from './animated-avatar.component';

describe('AnimatedAvatarComponent', () => {
  let component: AnimatedAvatarComponent;
  let fixture: ComponentFixture<AnimatedAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimatedAvatarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimatedAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
