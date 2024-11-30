import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment'; // Asegúrate de que tengas la configuración en environment
import { ViajeService } from './viaje.service';

describe('ViajeService', () => {
  let service: ViajeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebaseConfig) // Proporciona la configuración de Firebase
      ],
      providers: [ViajeService]
    });
    service = TestBed.inject(ViajeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
