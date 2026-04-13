import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { TuiTextfield, TuiButton, TuiLabel } from '@taiga-ui/core';
import { OhmCalculatorService } from '../services/ohm-calculator.service';
import { OhmCalculationResponse } from '../models/ohm-calculator.models';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TuiTextfield, TuiButton],
  template: `
    <div class="calc-container">
      <header class="calc-header tui-space_bottom-12">
        <h1 class="tui-text_h3 text-gradient-animate" style="font-weight: 800; font-size: 2.5rem; margin-bottom: 0.5rem">Calculadora de Ley de Ohm</h1>
        <p class="tui-text_body-m sub-text">Parámetros fundamentales: Voltaje, Corriente y Resistencia.</p>
      </header>

      <div class="calc-layout">
        <!-- Input Form -->
        <div class="form-side glass">
          <form [formGroup]="calcForm" class="tui-form" (ngSubmit)="onCalculate()">
            <div class="input-group">
               <label class="input-label">Voltaje (V)</label>
               <div class="custom-input-box">
                  <input formControlName="voltage" type="number" class="calc-input" placeholder="0.00" />
                  <span class="unit">V</span>
               </div>
            </div>

            <div class="input-group" style="margin-top: 2rem;">
               <label class="input-label">Corriente (I)</label>
               <div class="custom-input-box">
                  <input formControlName="current" type="number" class="calc-input" placeholder="0.00" />
                  <span class="unit">A</span>
               </div>
            </div>

            <div class="input-group" style="margin-top: 2rem;">
               <label class="input-label">Resistencia (R)</label>
               <div class="custom-input-box">
                  <input formControlName="resistance" type="number" class="calc-input" placeholder="0.00" />
                  <span class="unit">Ω</span>
               </div>
            </div>

            <div class="tui-form__buttons" style="margin-top: 3rem;">
               <button tuiButton size="l" type="submit" class="calc-btn" [disabled]="isLoading">
                  {{ isLoading ? 'Calculando...' : 'Calcular Parámetro Faltante' }}
               </button>
               <button tuiButton size="l" type="button" class="reset-btn" (click)="onReset()">Limpiar</button>
            </div>
          </form>
        </div>

        <!-- Result / Formula Side -->
        <div class="formula-side glass-light">
           <h4 class="section-title">Fórmula Aplicada</h4>
           <div class="formula-box tui-space_top-8">
              <span class="formula text-gradient-animate">{{ result?.formulaApplied || 'Esperando Datos...' }}</span>
           </div>

           <div class="result-breakdown tui-space_top-10">
              <h4 class="section-title">Resultados</h4>

              <div *ngIf="result?.voltage" class="res-item tui-space_top-4">
                 <span class="res-label">Voltaje Calculado (V)</span>
                 <span class="res-value" style="color: #22d3ee;">{{ result!.voltage | number:'1.2-2' }} V</span>
              </div>
              <div *ngIf="result?.current" class="res-item tui-space_top-4">
                 <span class="res-label">Corriente Calculada (I)</span>
                 <span class="res-value" style="color: #22d3ee;">{{ result!.current | number:'1.2-2' }} A</span>
              </div>
              <div *ngIf="result?.resistance" class="res-item tui-space_top-4">
                 <span class="res-label">Resistencia Calculada (R)</span>
                 <span class="res-value" style="color: #22d3ee;">{{ result!.resistance | number:'1.2-2' }} Ω</span>
              </div>

              <div class="res-item tui-space_top-4">
                 <span class="res-label">Potencia Disipada (P)</span>
                 <span class="res-value">{{ result?.power ? (result!.power | number:'1.2-2') : '0.00' }} W</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .calc-container { max-width: 1000px; margin: 0 auto; padding-top: 2rem; }

    .sub-text { color: var(--tui-text-02); }

    .calc-layout { display: grid; grid-template-columns: 1.2fr 1fr; gap: 2.5rem; }

    .form-side, .formula-side {
      padding: 3.5rem;
      border-radius: 32px;
      border: 1px solid rgba(34, 211, 238, 0.15);
      box-shadow: inset 0 1px 1px rgba(255,255,255,0.06), 0 20px 40px rgba(0,0,0,0.4);
    }
    .formula-side { display: flex; flex-direction: column; }

    .input-label {
      font-size: 0.8rem;
      font-weight: 800;
      color: rgba(255, 255, 255, 0.6);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.75rem;
      display: block;
    }

    .custom-input-box {
      display: flex;
      align-items: center;
      padding: 1rem 1.5rem;
      border-radius: 16px;
      background: rgba(0,0,0,0.2);
      border: 1px solid rgba(255, 255, 255, 0.05);
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
      transition: all 0.3s;
    }

    .custom-input-box:focus-within {
      border-color: rgba(34, 211, 238, 0.6);
      box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.08), 0 0 20px rgba(34, 211, 238, 0.2);
      transform: translateY(-2px);
    }

    .calc-input {
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      color: var(--tui-text-01);
      font-size: 1.25rem;
      font-family: inherit;
    }

    .calc-input::placeholder { color: rgba(255, 255, 255, 0.2); }
    .unit { color: #22d3ee; font-weight: 800; font-size: 1.1rem; text-shadow: 0 0 10px rgba(34,211,238,0.5); }

    .calc-btn {
      width: 100%; border-radius: 16px; margin-bottom: 1rem;
      background: linear-gradient(135deg, rgba(99,102,241,0.2), rgba(8,145,178,0.2));
      color: #22d3ee;
      border: 1px solid rgba(34, 211, 238, 0.4);
      transition: all 0.3s;
    }
    .calc-btn:hover {
      background: linear-gradient(135deg, rgba(99,102,241,0.4), rgba(8,145,178,0.4));
      color: #fff;
      box-shadow: 0 10px 24px rgba(34, 211, 238, 0.3);
      transform: translateY(-3px);
    }

    .reset-btn {
      width: 100%; border-radius: 16px; transition: all 0.3s; opacity: 0.7;
      background: rgba(255,255,255,0.05); color: #fff; border: 1px solid transparent;
    }
    .reset-btn:hover { opacity: 1; background: rgba(255,255,255,0.1); }

    .section-title { font-size: 0.85rem; font-weight: 800; color: #22d3ee; text-transform: uppercase; letter-spacing: 1px; text-shadow: 0 0 12px rgba(34,211,238,0.4); }

    .formula-box {
      padding: 3rem;
      background: rgba(0,0,0, 0.2);
      border-radius: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(34, 211, 238, 0.3);
      box-shadow: inset 0 0 30px rgba(34, 211, 238, 0.08), 0 0 20px rgba(34, 211, 238, 0.1);
    }

    .formula { font-size: 3rem; font-weight: 800; line-height: 1; letter-spacing: 2px; white-space: nowrap; }

    .res-item { display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; border-top: 1px solid rgba(255,255,255,0.05); }
    .res-label { color: #cbd5e1; font-weight: 600; }
    .res-value { font-size: 1.5rem; font-weight: 800; color: #4ade80; text-shadow: 0 0 15px rgba(74, 222, 128, 0.4); }
  `],
  providers: [OhmCalculatorService]
})
export class CalculatorComponent {
  calcForm = new FormGroup({
    voltage: new FormControl<number | null>(null),
    current: new FormControl<number | null>(null),
    resistance: new FormControl<number | null>(null),
  });

  isLoading = false;
  result: OhmCalculationResponse | null = null;

  constructor(private ohmCalculatorService: OhmCalculatorService) {}

  onCalculate(): void {
    const { voltage, current, resistance } = this.calcForm.value;

    // Validar que exactamente 2 campos tengan valor (frontend UX)
    const filledFields = [voltage, current, resistance].filter(v => v !== null && v !== undefined).length;
    if (filledFields !== 2) {
      alert("Por favor ingrese exactamente 2 parámetros para calcular el faltante.");
      return;
    }

    this.isLoading = true;

    this.ohmCalculatorService.calculate({
      voltage: voltage ?? null,
      current: current ?? null,
      resistance: resistance ?? null
    }).subscribe({
      next: (res) => {
        this.result = res;
        // Retornamos también los datos al formulario para UX visual (opcional)
        this.calcForm.patchValue({
          voltage: res.voltage,
          current: res.current,
          resistance: res.resistance
        });
      },
      error: (err) => {
        console.error('Error calculando:', err);
        alert(err.error?.message || "Ocurrió un error al calcular.");
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  onReset(): void {
    this.calcForm.reset();
    this.result = null;
  }
}
