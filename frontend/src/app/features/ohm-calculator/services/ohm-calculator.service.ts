import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { OhmCalculationRequest, OhmCalculationResponse } from '../models/ohm-calculator.models';

@Injectable({
  providedIn: 'root'
})
export class OhmCalculatorService {
  private http = inject(HttpClient);
  // Reemplaza por el endpoint correcto si cambias el puerto
  private apiUrl = `${environment.apiUrl || 'https://localhost:7198'}/api/ohm-calculator`;

  calculate(request: OhmCalculationRequest): Observable<OhmCalculationResponse> {
    return this.http.post<OhmCalculationResponse>(`${this.apiUrl}/calculate`, request);
  }
}
