import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViajePage } from './viaje.page';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { provideHttpClient } from '@angular/common/http';

describe('ViajePage', () => {
  let component: ViajePage;
  let fixture: ComponentFixture<ViajePage>;

  const mock = {
    snapshot:{
      params: { destino : 'destino'}
    }
  } 

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[AngularFireAuthModule, AngularFireModule.initializeApp(environment.firebaseConfig)],
      providers:[{provide: ActivatedRoute,useValue:mock},provideHttpClient()]
    })
    fixture = TestBed.createComponent(ViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Viaje tiene ID', () => {
    component.id = component.id;
    expect(component.correo).toBeTruthy();
  });

});
