import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginLevelComponent } from './login-level.component';

describe('LoginLevelComponent', () => {
  let component: LoginLevelComponent;
  let fixture: ComponentFixture<LoginLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginLevelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
