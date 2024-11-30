import { TestBed } from '@angular/core/testing';
import { FirebaseService } from './firebase.service';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FirebaseService', () => {
  let service: FirebaseService;

  beforeEach(() => {
    
    TestBed.configureTestingModule({
      imports:[AngularFireAuthModule, AngularFireModule.initializeApp(environment.firebaseConfig)],
      providers:[FirebaseService,AngularFireAuth],
      schemas:[NO_ERRORS_SCHEMA]
    });
    service = TestBed.inject(FirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
