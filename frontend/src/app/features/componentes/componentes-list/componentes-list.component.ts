import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { TuiCard } from '@taiga-ui/layout';
import { TuiButton, TuiTextfield } from '@taiga-ui/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-componentes-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    TuiCard,
    TuiButton,
    TuiTextfield
  ],
  template: `
    <div class="container overflow-hidden">
      <header class="page-header tui-space_bottom-10">
        <h1 class="tui-text_h3 text-gradient-animate" style="font-weight: 800; font-size: 2.5rem; margin-bottom: 0.5rem">Catálogo de Componentes</h1>
        <p class="tui-text_body-m sub-text">Explora nuestra base de datos Maestra de hardware electrónico.</p>
      </header>

      <div class="search-container" style="margin-bottom: 3.5rem;">
        <div class="custom-search glass">
          <span class="search-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </span>
          <input
            type="text"
            [formControl]="searchControl"
            class="search-input"
            placeholder="Encuentra un componente por nombre, categoría o referencia..."
          />
        </div>
      </div>

      <div class="grid">
        <div class="comp-card glass-light" *ngFor="let item of filteredComponents">
          <div class="card-img-placeholder">
            <span class="img-icon">
               <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
            </span>
          </div>
          
          <div class="card-header">
            <div class="type-badge">{{item.type}}</div>
            <h3 class="tui-text_h6 card-title">{{item.name}}</h3>
          </div>
          
          <p class="tui-space_vertical-4 card-desc">
            {{item.desc}}
          </p>
          
          <div class="card-meta">
            <span class="meta-tag">Encapsulado: {{item.package}}</span>
          </div>

          <div class="card-actions tui-space_top-6">
            <button 
              tuiButton 
              type="button" 
              size="s" 
              appearance="secondary"
              class="details-btn"
              [routerLink]="['/componentes', item.id]"
            >
              Ficha Técnica
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container { max-width: 1200px; margin: 0 auto; padding-top: 1rem; padding-bottom: 5rem; }
    
    .sub-text { color: var(--tui-text-02); }

    .custom-search {
      display: flex;
      align-items: center;
      padding: 1.25rem 2rem;
      border-radius: 24px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.15), 0 10px 30px rgba(0,0,0,0.3);
      transition: all 0.3s ease;
    }

    .custom-search:focus-within {
      border-color: rgba(34, 211, 238, 0.6);
      box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 0 30px rgba(34, 211, 238, 0.2);
      transform: translateY(-2px);
    }

    .search-icon {
      color: rgba(255, 255, 255, 0.4);
      display: flex;
      align-items: center;
      margin-right: 1.25rem;
      transition: all 0.3s;
    }
    
    .custom-search:focus-within .search-icon {
      color: #22d3ee;
      filter: drop-shadow(0 0 8px rgba(34, 211, 238, 0.7));
    }

    .search-input {
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      color: var(--tui-text-01);
      font-size: 1.15rem;
      font-family: inherit;
    }
    
    .search-input::placeholder {
      color: rgba(255, 255, 255, 0.3);
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }

    .comp-card {
      padding: 1.5rem;
      border-radius: 24px;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      display: flex;
      flex-direction: column;
      border: 1px solid rgba(34, 211, 238, 0.15);
      box-shadow: 0 4px 20px rgba(0,0,0,0.4);
    }

    .comp-card:hover {
      background: rgba(12, 22, 54, 0.82);
      transform: translateY(-8px);
      border-color: rgba(34, 211, 238, 0.5);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 24px rgba(34, 211, 238, 0.18);
    }

    .card-img-placeholder {
      height: 180px;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 16px;
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(255, 255, 255, 0.03);
      overflow: hidden;
      position: relative;
    }

    .img-icon {
      color: rgba(255, 255, 255, 0.1);
      transition: all 0.4s ease;
    }

    .comp-card:hover .img-icon {
       color: #6366f1;
       transform: scale(1.1);
       filter: drop-shadow(0 0 15px rgba(99, 102, 241, 0.5));
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
    }

    .type-badge {
      font-size: 0.75rem;
      font-weight: 800;
      background: rgba(34, 211, 238, 0.12);
      color: #22d3ee;
      padding: 0.35rem 0.75rem;
      border-radius: 8px;
      text-transform: uppercase;
      letter-spacing: 1px;
      border: 1px solid rgba(34, 211, 238, 0.3);
      box-shadow: 0 0 10px rgba(34, 211, 238, 0.15);
      text-shadow: 0 0 8px rgba(34,211,238,0.5);
    }

    .card-title { font-weight: 700; margin: 0; }
    
    .card-desc { 
      color: var(--tui-text-02); 
      font-size: 0.9rem;
      line-height: 1.5;
      flex: 1;
    }

    .card-meta {
      font-size: 0.8rem;
      color: rgba(255, 255, 255, 0.3);
    }

    .card-actions {
      border-top: 1px solid rgba(34, 211, 238, 0.12);
      padding-top: 1.25rem;
    }

    .details-btn { 
       width: 100%; 
       border-radius: 12px;
       transition: all 0.3s;
       opacity: 0.8;
    }
    
    .comp-card:hover .details-btn {
       opacity: 1;
       background: rgba(99, 102, 241, 0.15);
       color: #818cf8;
       box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
    }
  `]
})
export class ComponentesListComponent implements OnInit {
  searchControl = new FormControl('');

  allComponents = [
    { id: 1, type: 'IC', name: 'NE555P', desc: 'Temporizador de precisión altamente versátil para generar pulsos u oscilaciones.', package: 'DIP-8' },
    { id: 2, type: 'MCU', name: 'ATmega328P', desc: 'Microcontrolador AVR de 8 bits con 32KB de flash, estándar en Arduino Uno.', package: 'DIP-28' },
    { id: 3, type: 'TRANS', name: '2N2222', desc: 'Transistor bipolar NPN de conmutación rápida para uso general.', package: 'TO-92' },
    { id: 4, type: 'OPAMP', name: 'LM358', desc: 'Amplificador operacional dual de baja potencia y bajo consumo.', package: 'DIP-8' },
    { id: 5, type: 'REG', name: 'LM7805', desc: 'Regulador de voltaje lineal positivo de 5V 1.5A constante.', package: 'TO-220' },
    { id: 6, type: 'SENSOR', name: 'DHT11', desc: 'Sensor digital de temperatura y humedad relativa básica.', package: 'Módulo' },
  ];

  filteredComponents = [...this.allComponents];

  ngOnInit() {
    this.searchControl.valueChanges.subscribe(value => {
      const term = (value || '').toLowerCase();
      this.filteredComponents = this.allComponents.filter(c => 
        c.name.toLowerCase().includes(term) || 
        c.type.toLowerCase().includes(term) ||
        c.desc.toLowerCase().includes(term)
      );
    });
  }
}
