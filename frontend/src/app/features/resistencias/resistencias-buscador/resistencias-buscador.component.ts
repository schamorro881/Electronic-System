import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiCard } from '@taiga-ui/layout';

@Component({
  selector: 'app-resistencias-buscador',
  standalone: true,
  imports: [CommonModule, TuiCard],
  template: `
    <div class="main-container">
      <header class="page-header tui-space_bottom-12">
        <h1 class="tui-text_h3 text-gradient-animate" style="font-weight: 800; font-size: 2.5rem; margin-bottom: 0.5rem">Identificador de Resistencias</h1>
        <p class="tui-text_body-m sub-text">Traducción visual de códigos de colores a valores óhmicos.</p>
      </header>

      <!-- Resistor Visualizer -->
      <div class="viz-surface glass tui-space_bottom-12">
        <div class="resistor-canvas">
          <div class="resistor-body">
            <div class="band band-1" [style.background]="selectedBands[0]"></div>
            <div class="band band-2" [style.background]="selectedBands[1]"></div>
            <div class="band band-3" [style.background]="selectedBands[2]"></div>
            <div class="band spacer-band"></div>
            <div class="band band-4" [style.background]="selectedBands[3]"></div>
          </div>
        </div>
        
        <div class="value-display tui-space_top-10">
          <div class="value-main">1,000 Ω</div>
          <div class="value-extra">1 kΩ ±5%</div>
        </div>
      </div>

      <!-- Control Panel -->
      <div class="controls-grid">
         <div class="control-card glass-light" *ngFor="let bandConf of bandsConfig">
            <span class="band-label">{{bandConf.title}}</span>
            <div class="color-options tui-space_top-4">
               <div *ngFor="let c of bandConf.items"
                    class="color-swatch"
                    [style.background]="c.color"
                    [class.active]="selectedBands[bandConf.index] === c.color"
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
      margin-bottom: 3.5rem;
    }
    
    .viz-surface::before {
      content: '';
      position: absolute;
      top: -50%; left: -50%; width: 200%; height: 200%;
      background: radial-gradient(circle at center, rgba(34, 211, 238, 0.08) 0%, transparent 60%);
      z-index: 0; pointer-events: none;
    }

    .resistor-canvas {
      width: 100%;
      height: 180px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 1;
    }

    .resistor-body {
      width: 400px;
      height: 80px;
      background: linear-gradient(180deg, #d8ac85 0%, #ecd0b3 25%, #c89669 80%, #a47048 100%);
      border-radius: 40px;
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 60px;
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
    }
    
    .spacer-band { width: 40px; opacity: 0; }

    .value-display { text-align: center; position: relative; z-index: 1; }
    .value-main { 
      font-size: 3.5rem; 
      font-weight: 800; 
      color: #fff; 
      line-height: 1;
      text-shadow: 0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(99, 102, 241, 0.4);
    }
    .value-extra { 
      font-size: 1.25rem; 
      color: #22d3ee; 
      font-weight: 600; 
      margin-top: 0.75rem; 
      text-shadow: 0 0 14px rgba(34, 211, 238, 0.6);
    }

    .controls-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
    }

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

    .control-card:hover {
      background: rgba(12, 22, 54, 0.8);
      border-color: rgba(34, 211, 238, 0.45);
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(34, 211, 238, 0.15);
    }

    .band-label { 
      font-size: 0.85rem; 
      font-weight: 800; 
      color: #22d3ee; 
      text-transform: uppercase; 
      letter-spacing: 1px; 
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(34, 211, 238, 0.2);
      text-shadow: 0 0 10px rgba(34,211,238,0.4);
    }

    .color-options {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    .color-swatch {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      cursor: pointer;
      user-select: none;
      border: 3px solid rgba(255, 255, 255, 0.1);
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      box-shadow: inset 0 2px 4px rgba(255,255,255,0.4), 0 4px 8px rgba(0,0,0,0.4);
    }

    .color-swatch:hover { transform: scale(1.2); border-color: rgba(255, 255, 255, 0.5); }
    .color-swatch.active { transform: scale(1.15); border-color: #22d3ee; box-shadow: inset 0 2px 4px rgba(255,255,255,0.4), 0 0 20px rgba(34, 211, 238, 0.7); }
  `]
})
export class ResistenciasBuscadorComponent {
  digitColors = [
    { name: 'Negro', color: '#000000' },
    { name: 'Marrón', color: '#8b4513' },
    { name: 'Rojo', color: '#ff0000' },
    { name: 'Naranja', color: '#ff8c00' },
    { name: 'Amarillo', color: '#ffd700' },
    { name: 'Verde', color: '#008000' },
    { name: 'Azul', color: '#0000ff' },
    { name: 'Violeta', color: '#8a2be2' },
    { name: 'Gris', color: '#808080' },
    { name: 'Blanco', color: '#ffffff' },
  ];

  multiplierColors = [
    ...this.digitColors,
    { name: 'Oro', color: '#d4af37' },
    { name: 'Plata', color: '#c0c0c0' },
  ];

  toleranceColors = [
    { name: 'Marrón (1%)', color: '#8b4513' },
    { name: 'Rojo (2%)', color: '#ff0000' },
    { name: 'Verde (0.5%)', color: '#008000' },
    { name: 'Azul (0.25%)', color: '#0000ff' },
    { name: 'Violeta (0.1%)', color: '#8a2be2' },
    { name: 'Gris (0.05%)', color: '#808080' },
    { name: 'Oro (5%)', color: '#d4af37' },
    { name: 'Plata (10%)', color: '#c0c0c0' },
  ];

  bandsConfig = [
    { title: 'Banda 1', index: 0, items: this.digitColors },
    { title: 'Banda 2', index: 1, items: this.digitColors },
    { title: 'Multiplicador', index: 2, items: this.multiplierColors },
    { title: 'Tolerancia', index: 3, items: this.toleranceColors }
  ];

  selectedBands: string[] = ['#8b4513', '#000000', '#ff0000', '#d4af37'];

  selectColor(bandIndex: number, color: string) {
    this.selectedBands[bandIndex] = color;
  }
}
