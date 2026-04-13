import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiBadge } from '@taiga-ui/kit';

@Component({
  selector: 'app-componente-detail',
  standalone: true,
  imports: [
    CommonModule,
    TuiBadge
  ],
  template: `
    <div class="container tui-container">
      <header class="tui-space_bottom-10" style="padding-top: 2rem;">
        <div class="title-row tui-space_bottom-2">
          <h1 class="tui-text_h3 text-gradient-animate" style="font-weight: 800;">NE555P - Temporizador de Precisión</h1>
          <div tuiBadge appearance="success" style="background: rgba(74, 222, 128, 0.2); color: #4ade80; border: 1px solid rgba(74, 222, 128, 0.5);">En Stock</div>
        </div>
        <div class="tui-text_body-m" style="color: rgba(255,255,255,0.4); font-weight: 600; letter-spacing: 1px;">Referencia: IC-555-DIP8</div>
      </header>

      <div class="main-grid">
        <div class="details-column">
          <div class="detail-card glass" style="margin-bottom: 2.5rem;">
            <h4 class="section-title">Descripción General</h4>
            <p class="description-text tui-space_top-4">
              El temporizador IC 555 es un circuito integrado monobestable, astable o de retardo de tiempo. 
              Es uno de los integrados más populares de la historia.
            </p>
          </div>

          <div class="detail-card glass">
            <h4 class="section-title">Especificaciones Técnicas</h4>
            <table class="specs-table">
               <tr><td>Voltaje de Operación</td><td>4.5V - 16V</td></tr>
               <tr><td>Corriente de Salida</td><td>200mA</td></tr>
               <tr><td>Consumo de Corriente</td><td>3mA - 10mA</td></tr>
               <tr><td>Encapsulado</td><td>DIP-8 / SOP-8</td></tr>
            </table>
          </div>
        </div>

        <div class="sidebar-column">
           <div class="detail-card glass-light" style="margin-bottom: 2.5rem;">
              <h4 class="section-title">Categorías</h4>
              <div class="tags-row tui-space_top-4">
                 <div tuiBadge style="background: rgba(99, 102, 241, 0.2); color: #818cf8; border: 1px solid rgba(99, 102, 241, 0.4);">Oscilador</div>
                 <div tuiBadge style="background: rgba(99, 102, 241, 0.2); color: #818cf8; border: 1px solid rgba(99, 102, 241, 0.4);">Timer</div>
                 <div tuiBadge style="background: rgba(99, 102, 241, 0.2); color: #818cf8; border: 1px solid rgba(99, 102, 241, 0.4);">PWM</div>
              </div>
           </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container { max-width: 1200px; margin: 0 auto; padding-bottom: 4rem; }
    .title-row { display: flex; align-items: center; gap: 1.5rem; }
    .main-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 3rem; }
    .specs-table { width: 100%; border-collapse: collapse; margin-top: 1.5rem; }
    .specs-table td { padding: 1rem 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #cbd5e1; }
    .specs-table td:last-child { text-align: right; font-weight: 800; color: #fff; }
    .tags-row { display: flex; flex-wrap: wrap; gap: 0.75rem; }
    
    .detail-card { 
       padding: 2.5rem; 
       border-radius: 24px; 
       border: 1px solid rgba(34, 211, 238, 0.15);
       box-shadow: inset 0 1px 1px rgba(255,255,255,0.06), 0 20px 40px rgba(0,0,0,0.4);
    }
    
    .section-title { font-size: 0.85rem; font-weight: 800; color: #22d3ee; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid rgba(34,211,238,0.2); padding-bottom: 1rem; margin-bottom: 1rem; text-shadow: 0 0 12px rgba(34,211,238,0.4); }
    .description-text { line-height: 1.8; color: #cbd5e1; font-size: 1.05rem; }
    .specs-table td { padding: 1rem 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #cbd5e1; }
    .specs-table td:last-child { text-align: right; font-weight: 800; color: #22d3ee; text-shadow: 0 0 10px rgba(34,211,238,0.4); }
  `]
})
export class ComponenteDetailComponent {}
