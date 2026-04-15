import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiCard } from '@taiga-ui/layout';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-resistencias-buscador',
  standalone: true,
  imports: [CommonModule, TuiCard, FormsModule],
  template: `
    <div class="main-container">
      <header class="page-header tui-space_bottom-8">
        <h1 class="tui-text_h3 text-gradient-animate" style="font-weight: 800; font-size: 2.5rem; margin-bottom: 0.5rem">Identificador de Resistencias</h1>
        <p class="tui-text_body-m sub-text">Traducción visual y Cálculo Inverso. (Soporte E12, E24, E96)</p>
      </header>

      <!-- Band Config Tabs -->
      <div class="band-selector tui-space_bottom-8">
         <button class="band-btn" [class.active]="bandCount === 4" (click)="setBandCount(4)">4 Bandas</button>
         <button class="band-btn" [class.active]="bandCount === 5" (click)="setBandCount(5)">5 Bandas</button>
         <button class="band-btn" [class.active]="bandCount === 6" (click)="setBandCount(6)">6 Bandas</button>
      </div>

      <!-- Resistor Visualizer -->
      <div class="viz-surface glass tui-space_bottom-8">
        <div class="toast-notification" [class.show]="toastVisible">{{toastMessage}}</div>
        
        <div class="resistor-canvas">
          <div class="resistor-body">
            <div class="band band-1" [style.background]="selectedBands[0]"></div>
            <div class="band band-2" [style.background]="selectedBands[1]"></div>
            <div class="band band-3" *ngIf="bandCount >= 5" [style.background]="selectedBands[2]"></div>
            
            <div class="band spacer-band"></div>

            <div class="band band-mult" [style.background]="selectedBands[bandCount >= 5 ? 3 : 2]"></div>
            <div class="band band-tol" [style.background]="selectedBands[bandCount >= 5 ? 4 : 3]"></div>
            
            <div class="band band-ppm" *ngIf="bandCount === 6" [style.background]="selectedBands[5]"></div>
          </div>
        </div>
        
        <div class="value-display tui-space_top-10">
          <div class="value-main">{{ mainValueDisplay }}</div>
          <div class="value-extra" *ngIf="extraValueDisplay">{{ extraValueDisplay }}</div>
          <div class="value-range" *ngIf="minRangeDisplay">Rango medible: <b>{{ minRangeDisplay }}</b> a <b>{{ maxRangeDisplay }}</b></div>
        </div>

        <div class="uses-container" *ngIf="recommendedUses && recommendedUses.length > 0">
           <div class="uses-title">Aplicaciones Típicas:</div>
           <div class="uses-badges">
              <span class="use-badge" *ngFor="let uso of recommendedUses">{{uso}}</span>
           </div>
        </div>
      </div>

      <!-- Reverse Calculator Input -->
      <div class="reverse-calc-container glass-light tui-space_bottom-10">
         <div class="reverse-calc-content">
            <span class="reverse-label">¿Conoces el valor óhmico? Encuentra sus colores:</span>
            <div class="input-group">
                <input type="text" [(ngModel)]="reverseSearchValue" placeholder="Ej: 4.7k, 1M, 330" (keyup.enter)="reverseSearch()">
                <button class="search-btn" (click)="reverseSearch()">Buscar</button>
            </div>
         </div>
      </div>

      <!-- Control Panel -->
      <div class="controls-grid">
         <div class="control-card glass-light" *ngFor="let bandConf of getBandsConfig()">
            <span class="band-label">{{bandConf.title}}</span>
            <div class="color-options tui-space_top-4">
               <div *ngFor="let c of bandConf.items"
                    class="color-swatch"
                    [style.background]="c.color"
                    [class.active]="selectedBands[bandConf.index] === c.color"
                    [class.disabled]="isColorDisabled(bandConf.index, c.color)"
                    (click)="selectColor(bandConf.index, c.color)"
                    [title]="c.name">
               </div>
            </div>
         </div>
      </div>
    </div>
  `,
  styles: [`
    .main-container { max-width: 900px; margin: 0 auto; padding-top: 2rem; padding-bottom: 5rem; }
    
    .sub-text { color: var(--tui-text-02); }

    .band-selector {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 2rem;
    }
    
    .band-btn {
      background: rgba(34, 211, 238, 0.1);
      border: 1px solid rgba(34, 211, 238, 0.2);
      color: #22d3ee;
      padding: 0.5rem 1.5rem;
      border-radius: 20px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .band-btn:hover { background: rgba(34, 211, 238, 0.2); }
    .band-btn.active { background: #22d3ee; color: #0a1228; box-shadow: 0 0 15px rgba(34, 211, 238, 0.4); border-color: #22d3ee; }

    .toast-notification {
      position: absolute;
      top: 20px;
      left: 50%;
      transform: translateX(-50%) translateY(-20px);
      background: rgba(34, 211, 238, 0.15);
      border: 1px solid rgba(34, 211, 238, 0.4);
      color: #fff;
      padding: 0.5rem 1rem;
      border-radius: 12px;
      font-size: 0.85rem;
      opacity: 0;
      pointer-events: none;
      transition: all 0.3s ease;
      backdrop-filter: blur(8px);
      z-index: 10;
    }
    .toast-notification.show { opacity: 1; transform: translateX(-50%) translateY(0); }

    .viz-surface {
      padding: 4rem 2rem;
      border-radius: 32px;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: rgba(15, 23, 42, 0.4);
      border: 1px solid rgba(34, 211, 238, 0.18);
      box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.08), 0 20px 50px rgba(0,0,0,0.5);
      position: relative;
      overflow: hidden;
      margin-bottom: 2rem;
    }
    
    .viz-surface::before {
      content: '';
      position: absolute;
      top: -50%; left: -50%; width: 200%; height: 200%;
      background: radial-gradient(circle at center, rgba(34, 211, 238, 0.08) 0%, transparent 60%);
      z-index: 0; pointer-events: none;
    }

    .resistor-canvas { width: 100%; height: 180px; display: flex; align-items: center; justify-content: center; position: relative; z-index: 1; }

    .resistor-body {
      width: 440px;
      height: 80px;
      background: linear-gradient(180deg, #d8ac85 0%, #ecd0b3 25%, #c89669 80%, #a47048 100%);
      border-radius: 40px;
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 45px;
      gap: 16px;
      box-shadow: inset 0 -5px 15px rgba(0,0,0,0.3), inset 0 5px 15px rgba(255,255,255,0.4), 0 20px 40px rgba(0,0,0,0.5);
    }

    .resistor-body::before, .resistor-body::after {
      content: '';
      position: absolute;
      width: 90px;
      height: 8px;
      background: linear-gradient(180deg, #94a3b8 0%, #e2e8f0 30%, #475569 100%);
      box-shadow: 0 10px 20px rgba(0,0,0,0.4);
      z-index: -1;
    }
    .resistor-body::before { left: -90px; border-radius: 4px 0 0 4px; }
    .resistor-body::after { right: -90px; border-radius: 0 4px 4px 0; }

    .band {
      width: 22px;
      height: 100%;
      box-shadow: 2px 0 5px rgba(0,0,0,0.2), inset 1px 0 3px rgba(255,255,255,0.3);
      position: relative;
      transition: background 0.3s ease;
    }
    
    .spacer-band { width: 20px; opacity: 0; flex-grow: 1; }

    .value-display { text-align: center; position: relative; z-index: 1; }
    .value-main { font-size: 3.5rem; font-weight: 800; color: #fff; line-height: 1; text-shadow: 0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(99, 102, 241, 0.4); }
    .value-extra { font-size: 1.25rem; color: #22d3ee; font-weight: 600; margin-top: 0.75rem; text-shadow: 0 0 14px rgba(34, 211, 238, 0.6); }
    .value-range { font-size: 0.95rem; color: #94a3b8; margin-top: 0.5rem; }
    .value-range b { color: #fff; }

    .uses-container { margin-top: 1.8rem; display: flex; flex-direction: column; align-items: center; width: 100%; position: relative; z-index: 1; }
    .uses-title { font-size: 0.85rem; color: #22d3ee; text-transform: uppercase; letter-spacing: 1px; font-weight: 800; margin-bottom: 0.75rem; text-shadow: 0 0 10px rgba(34,211,238,0.4); }
    .uses-badges { display: flex; flex-wrap: wrap; gap: 0.75rem; justify-content: center; max-width: 85%; }
    .use-badge { 
      background: rgba(34, 211, 238, 0.1); 
      border: 1px solid rgba(34, 211, 238, 0.3); 
      padding: 0.4rem 1rem; 
      border-radius: 20px; 
      color: #fff; 
      font-size: 0.85rem; 
      box-shadow: 0 4px 10px rgba(0,0,0,0.2); 
      backdrop-filter: blur(8px);
      transition: all 0.3s ease;
    }
    .use-badge:hover { background: rgba(34, 211, 238, 0.25); transform: translateY(-3px); box-shadow: 0 8px 15px rgba(34, 211, 238, 0.3); }

    .reverse-calc-container {
      padding: 1.5rem;
      border-radius: 20px;
      background: rgba(10, 18, 40, 0.65);
      backdrop-filter: blur(14px);
      border: 1px solid rgba(34, 211, 238, 0.15);
      display: flex;
      justify-content: center;
      margin-bottom: 2.5rem;
    }

    .reverse-calc-content { display: flex; flex-direction: column; align-items: center; gap: 0.75rem; width: 100%; max-width: 400px; }
    .reverse-label { color: #22d3ee; font-weight: 600; font-size: 0.95rem; }
    
    .input-group { display: flex; width: 100%; gap: 0.5rem; }
    .input-group input {
      flex: 1;
      padding: 0.75rem 1rem;
      border-radius: 12px;
      border: 1px solid rgba(34,211,238,0.3);
      background: rgba(0,0,0,0.3);
      color: #fff;
      font-size: 1rem;
      outline: none;
      transition: all 0.3s ease;
    }
    .input-group input:focus { border-color: #22d3ee; box-shadow: 0 0 10px rgba(34,211,238,0.2); }
    
    .search-btn {
      padding: 0 1.5rem;
      border-radius: 12px;
      background: linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%);
      color: #fff;
      font-weight: 800;
      border: none;
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .search-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 15px rgba(34,211,238,0.3); }

    .controls-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; }

    .control-card {
      padding: 1.5rem;
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      background: rgba(10, 18, 40, 0.65);
      backdrop-filter: blur(14px);
      border: 1px solid rgba(34, 211, 238, 0.15);
      box-shadow: 0 8px 24px rgba(0,0,0,0.4);
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .control-card:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(34, 211, 238, 0.15); }

    .band-label { font-size: 0.85rem; font-weight: 800; color: #22d3ee; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid rgba(34, 211, 238, 0.2); text-shadow: 0 0 10px rgba(34,211,238,0.4); }
    .color-options { display: flex; flex-wrap: wrap; gap: 12px; }
    .color-swatch {
      width: 32px; height: 32px; border-radius: 50%; cursor: pointer; user-select: none;
      border: 3px solid rgba(255, 255, 255, 0.1); transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      box-shadow: inset 0 2px 4px rgba(255,255,255,0.4), 0 4px 8px rgba(0,0,0,0.4);
    }
    .color-swatch:hover:not(.disabled) { transform: scale(1.2); border-color: rgba(255, 255, 255, 0.5); }
    .color-swatch.active { transform: scale(1.15); border-color: #22d3ee; box-shadow: inset 0 2px 4px rgba(255,255,255,0.4), 0 0 20px rgba(34, 211, 238, 0.7); }
    .color-swatch.disabled { opacity: 0.15; cursor: not-allowed; transform: scale(0.9); border-color: rgba(239, 68, 68, 0.4); }

    @media (max-width: 768px) {
      .page-header h1 {
        font-size: 1.8rem !important;
      }
      .band-selector {
        flex-wrap: wrap;
      }
      .viz-surface {
        padding: 2rem 1rem;
      }
      .resistor-body {
        transform: scale(0.6);
      }
      .resistor-canvas {
        height: 120px; /* accommodate scaled body */
      }
      .value-main {
        font-size: 2.2rem;
      }
      .controls-grid {
        grid-template-columns: 1fr;
      }
      .input-group {
        flex-direction: column;
      }
      .search-btn {
        padding: 0.75rem;
      }
    }
  `]
})
export class ResistenciasBuscadorComponent {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/resistencias`;

  bandCount: number = 4;
  selectedBands: string[] = ['#8b4513', '#000000', '#ff0000', '#d4af37']; // Índices cambian según modo
  
  reverseSearchValue: string = '';
  toastVisible: boolean = false;
  toastMessage: string = '';

  mainValueDisplay: string = 'Calculando...';
  extraValueDisplay: string = '';
  minRangeDisplay: string = '';
  maxRangeDisplay: string = '';
  recommendedUses: string[] = [];

  digitColors = [
    { name: 'Negro', color: '#000000' }, { name: 'Marrón', color: '#8b4513' }, { name: 'Rojo', color: '#ff0000' },
    { name: 'Naranja', color: '#ff8c00' }, { name: 'Amarillo', color: '#ffd700' }, { name: 'Verde', color: '#008000' },
    { name: 'Azul', color: '#0000ff' }, { name: 'Violeta', color: '#8a2be2' }, { name: 'Gris', color: '#808080' },
    { name: 'Blanco', color: '#ffffff' }
  ];

  multiplierColors = [
    ...this.digitColors,
    { name: 'Oro', color: '#d4af37' }, { name: 'Plata', color: '#c0c0c0' }
  ];

  toleranceColors4Band = [
    { name: 'Marrón (1%)', color: '#8b4513' }, { name: 'Rojo (2%)', color: '#ff0000' },
    { name: 'Oro (5%)', color: '#d4af37' }, { name: 'Plata (10%)', color: '#c0c0c0' },
  ];

  toleranceColorsPrecision = [
    { name: 'Marrón (1%)', color: '#8b4513' }, { name: 'Rojo (2%)', color: '#ff0000' },
    { name: 'Verde (0.5%)', color: '#008000' }, { name: 'Azul (0.25%)', color: '#0000ff' },
    { name: 'Violeta (0.1%)', color: '#8a2be2' }, { name: 'Gris (0.05%)', color: '#808080' }
  ];

  ppmColors = [
    { name: 'Marrón (100ppm)', color: '#8b4513' }, { name: 'Rojo (50ppm)', color: '#ff0000' },
    { name: 'Naranja (15ppm)', color: '#ff8c00' }, { name: 'Amarillo (25ppm)', color: '#ffd700' },
    { name: 'Azul (10ppm)', color: '#0000ff' }, { name: 'Violeta (5ppm)', color: '#8a2be2' }
  ];

  constructor() {
    this.calculateValue();
  }

  setBandCount(count: number) {
    this.bandCount = count;
    // Defaults por modo
    if (count === 4) this.selectedBands = ['#8b4513', '#000000', '#ff0000', '#d4af37'];
    if (count === 5) this.selectedBands = ['#8b4513', '#000000', '#000000', '#ff0000', '#8b4513'];
    if (count === 6) this.selectedBands = ['#8b4513', '#000000', '#000000', '#ff0000', '#8b4513', '#8b4513'];
    
    this.calculateValue();
  }

  getBandsConfig() {
    let conf = [
      { title: 'Banda 1', index: 0, items: this.digitColors.filter(c => c.name !== 'Negro') },
      { title: 'Banda 2', index: 1, items: this.digitColors }
    ];

    if (this.bandCount >= 5) {
      conf.push({ title: 'Banda 3', index: 2, items: this.digitColors });
    }

    conf.push({ title: 'Multiplicador', index: this.bandCount >= 5 ? 3 : 2, items: this.multiplierColors });
    conf.push({ title: 'Tolerancia', index: this.bandCount >= 5 ? 4 : 3, items: this.bandCount === 4 ? this.toleranceColors4Band : this.toleranceColorsPrecision });

    if (this.bandCount === 6) {
      conf.push({ title: 'C.T. (PPM)', index: 5, items: this.ppmColors });
    }

    return conf;
  }

  showToast(message: string) {
    this.toastMessage = message;
    this.toastVisible = true;
    setTimeout(() => this.toastVisible = false, 3000);
  }

  isColorDisabled(bandIndex: number, color: string): boolean {
    if (bandIndex === 0 && color === '#000000') return true;

    if (this.bandCount === 4) {
      const currentTolerance = this.selectedBands[3];
      const isE12 = currentTolerance === '#c0c0c0'; // Plata
      
      if (bandIndex === 0 || bandIndex === 1) {
        const band1Test = bandIndex === 0 ? color : this.selectedBands[0];
        const band2Test = bandIndex === 1 ? color : this.selectedBands[1];

        if (!band1Test || !band2Test) return false;

        const d1 = this.digitColors.findIndex(c => c.color === band1Test);
        const d2 = this.digitColors.findIndex(c => c.color === band2Test);

        if (d1 === -1 || d2 === -1) return false;
        const value = d1 * 10 + d2;

        const E12_VALUES = [10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82];
        const E24_VALUES = [...E12_VALUES, 11, 13, 16, 20, 24, 30, 36, 43, 51, 62, 75, 91];

        if (isE12 && !E12_VALUES.includes(value)) return true;
        if (!isE12 && !E24_VALUES.includes(value)) return true;
      }
    } else {
        // En 5 o 6 bandas (usa E96), por motivos de UX no bloquearemos tan rígidamente E96 porque es mas permisivo,
        // pero sí la regla de que Banda 1 no sea Negro.
    }

    return false;
  }

  selectColor(bandIndex: number, color: string) {
    if (this.isColorDisabled(bandIndex, color)) return;

    this.selectedBands[bandIndex] = color;
    
    if (this.bandCount === 4) {
       let autocorrected = false;
       if (this.isColorDisabled(0, this.selectedBands[0])) { this.enforceValidBand(0); autocorrected = true; }
       if (this.isColorDisabled(1, this.selectedBands[1])) { this.enforceValidBand(1); autocorrected = true; }
       if (autocorrected) {
          this.showToast('Valor ajustado a la serie estándar más cercana');
       }
    }

    this.calculateValue();
  }

  private enforceValidBand(bandIndex: number) {
    const validColor = this.digitColors.find(c => !this.isColorDisabled(bandIndex, c.color));
    if (validColor) {
        this.selectedBands[bandIndex] = validColor.color;
    }
  }

  reverseSearch() {
    if (!this.reverseSearchValue) return;
    
    const req = {
       inputValue: this.reverseSearchValue,
       bandCount: this.bandCount
    };

    this.http.post<any>(`${this.apiUrl}/calculate-color`, null).subscribe(); // wake backend trick 
    this.http.post<any>(`${this.apiUrl}/reverse-calculate`, req).subscribe({
       next: (res) => {
          if (res.band1Hex !== '#000000' || res.band2Hex !== '#000000') {
             this.selectedBands[0] = res.band1Hex;
             this.selectedBands[1] = res.band2Hex;
             
             if (this.bandCount === 4) {
                this.selectedBands[2] = res.multiplierHex;
                this.selectedBands[3] = res.toleranceHex;
             } else {
                this.selectedBands[2] = res.band3Hex;
                this.selectedBands[3] = res.multiplierHex;
                this.selectedBands[4] = res.toleranceHex;
                if (this.bandCount === 6) this.selectedBands[5] = res.ppmHex;
             }
             this.calculateValue();
             this.showToast('¡Colores cargados para ' + this.reverseSearchValue + '!');
          } else {
             this.showToast('No se entendió el valor ingresado.');
          }
       },
       error: (err) => {
          this.showToast('Error al buscar el valor.');
       }
    });
  }

  private calculateValue() {
    const request: any = {
      bandCount: this.bandCount,
      band1Hex: this.selectedBands[0],
      band2Hex: this.selectedBands[1],
    };

    if (this.bandCount === 4) {
      request.multiplierHex = this.selectedBands[2];
      request.toleranceHex = this.selectedBands[3];
    } else {
      request.band3Hex = this.selectedBands[2];
      request.multiplierHex = this.selectedBands[3];
      request.toleranceHex = this.selectedBands[4];
      if (this.bandCount === 6) request.ppmHex = this.selectedBands[5];
    }

    this.http.post<any>(`${this.apiUrl}/calculate-color`, request).subscribe({
      next: (response) => {
        this.mainValueDisplay = response.mainValueDisplay;
        this.extraValueDisplay = response.extraValueDisplay;
        this.minRangeDisplay = response.minRangeDisplay;
        this.maxRangeDisplay = response.maxRangeDisplay;
        this.recommendedUses = response.recommendedUses || [];
      },
      error: (err) => {
        console.error('Error calculating resistor value via backend:', err);
        this.mainValueDisplay = 'Error';
        this.extraValueDisplay = '';
        this.minRangeDisplay = '';
        this.maxRangeDisplay = '';
        this.recommendedUses = [];
      }
    });
  }
}
