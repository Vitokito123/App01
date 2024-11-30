import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { VehiculoService } from './vehiculo.service'; 

describe('VehiculoService', () => {
  let service: VehiculoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule], // Agrega HttpClientModule aquí
      providers: [VehiculoService]
    });
    service = TestBed.inject(VehiculoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});