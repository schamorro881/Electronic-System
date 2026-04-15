import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { TuiCard } from '@taiga-ui/layout';
import { TuiButton, TuiTextfield } from '@taiga-ui/core';
import { RouterLink } from '@angular/router';
import { ComponenteQuickViewComponent } from './componente-quick-view.component';

@Component({
  selector: 'app-componentes-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    TuiCard,
    TuiButton,
    TuiTextfield,
    ComponenteQuickViewComponent
  ],
  template: `
    <div class="container overflow-hidden">
      <header class="page-header tui-space_bottom-10">
        <h1 class="tui-text_h3 text-gradient-animate" style="font-weight: 800; font-size: 2.5rem; margin-bottom: 0.5rem">Catálogo de Componentes</h1>
        <p class="tui-text_body-m sub-text">Explora nuestra base de datos Maestra de hardware electrónico.</p>
      </header>

      <div class="search-container" style="margin-bottom: 2rem;">
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

      <div class="filters-row">
        <button 
          *ngFor="let cat of categories" 
          (click)="selectCategory(cat)"
          [class.active]="selectedCategory === cat"
          class="filter-chip"
        >
          {{cat}}
        </button>
      </div>

      <div class="grid">
        <div class="comp-card glass-light" *ngFor="let item of filteredComponents">
          <div class="card-img-container">
            <img [src]="item.image" [alt]="item.name" class="comp-image" *ngIf="item.image">
            <div class="card-img-placeholder" *ngIf="!item.image">
              <span class="img-icon">
                 <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
              </span>
            </div>
            <div class="type-badge-floating">{{item.type}}</div>
          </div>
          
          <div class="card-content">
            <h3 class="tui-text_h6 card-title">{{item.name}}</h3>
            <p class="card-desc tui-space_top-2">{{item.desc}}</p>
            
            <div class="tech-badges tui-space_vertical-4">
              <span class="tech-badge" title="Encapsulado">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/></svg>
                {{item.package}}
              </span>
              <span class="tech-badge" *ngIf="item.pins" title="Pines">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 12 2 2 4-4"/></svg>
                {{item.pins}} pin
              </span>
              <span class="tech-badge" *ngIf="item.supply" title="Voltaje">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                {{item.supply}}
              </span>
            </div>
          </div>

          <div class="card-actions tui-space_top-4">
            <div class="actions-group">
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
              <button 
                tuiButton 
                type="button" 
                size="s" 
                appearance="accent"
                class="quick-btn"
                (click)="openQuickView(item)"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <app-componente-quick-view 
        *ngIf="showQuickView" 
        [item]="selectedQuickItem"
        (close)="showQuickView = false"
      ></app-componente-quick-view>
    </div>
  `,
  styles: [`
    .container { max-width: 1200px; margin: 0 auto; padding-top: 1rem; padding-bottom: 5rem; }
    
    .sub-text { color: var(--tui-text-02); }

    .filters-row {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      overflow-x: auto;
      padding-bottom: 1rem;
      margin-bottom: 3.5rem;
    }

    .filter-chip {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: var(--tui-text-02);
      padding: 0.5rem 1.25rem;
      border-radius: 100px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
      white-space: nowrap;
    }

    .filter-chip:hover {
      background: rgba(255, 255, 255, 0.08);
      color: #fff;
    }

    .filter-chip.active {
      background: var(--tui-primary);
      color: #fff;
      border-color: var(--tui-primary);
      box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
    }

    .custom-search {
      display: flex;
      align-items: center;
      padding: 1rem 1.5rem;
      border-radius: 20px;
      border: 1px solid rgba(255, 255, 255, 0.08);
      background: rgba(8, 14, 32, 0.4);
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;
    }

    .custom-search:focus-within {
      border-color: var(--cyan);
      box-shadow: 0 0 20px rgba(34, 211, 238, 0.15);
    }

    .search-icon { color: rgba(255, 255, 255, 0.3); margin-right: 1rem; }
    .search-input { flex: 1; background: transparent; border: none; outline: none; color: #fff; }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 2rem;
    }

    .comp-card {
      padding: 0;
      border-radius: 24px;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      display: flex;
      flex-direction: column;
      border: 1px solid rgba(255, 255, 255, 0.08);
      overflow: hidden;
      background: rgba(12, 22, 54, 0.4);
    }

    .comp-card:hover {
      transform: translateY(-10px) rotateX(2deg) rotateY(2deg);
      border-color: var(--cyan);
      box-shadow: 
        0 20px 40px rgba(0, 0, 0, 0.6), 
        0 0 30px rgba(34, 211, 238, 0.1);
      background: rgba(12, 22, 54, 0.8);
    }

    .card-img-container {
      height: 200px;
      background: #000;
      position: relative;
      overflow: hidden;
    }

    .comp-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s ease;
    }

    .comp-card:hover .comp-image {
      transform: scale(1.1);
    }

    .type-badge-floating {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: rgba(8, 14, 32, 0.8);
      backdrop-filter: blur(8px);
      color: var(--cyan);
      padding: 0.35rem 0.75rem;
      border-radius: 8px;
      font-size: 0.7rem;
      font-weight: 800;
      letter-spacing: 1px;
      border: 1px solid rgba(34, 211, 238, 0.3);
      z-index: 2;
    }

    .card-content { padding: 1.5rem; flex: 1; display: flex; flex-direction: column; }
    .card-title { font-weight: 700; margin-bottom: 0.5rem; color: #fff; }
    .card-desc { color: var(--tui-text-02); font-size: 0.85rem; line-height: 1.5; flex: 1; }

    .tech-badges { display: flex; gap: 0.75rem; flex-wrap: wrap; }
    .tech-badge {
      display: flex;
      align-items: center;
      gap: 0.35rem;
      font-size: 0.7rem;
      color: var(--tui-text-02);
      background: rgba(255, 255, 255, 0.04);
      padding: 0.25rem 0.6rem;
      border-radius: 6px;
      border: 1px solid rgba(255, 255, 255, 0.03);
    }

    .card-actions {
      padding: 1.5rem;
      padding-top: 0;
    }

    .actions-group {
      display: flex;
      gap: 0.5rem;
    }

    .details-btn { 
       flex: 1;
       border-radius: 12px;
       border: 1px solid rgba(255, 255, 255, 0.1);
       background: rgba(255, 255, 255, 0.02);
    }

    .quick-btn {
      width: 44px;
      min-width: 44px;
      padding: 0;
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(255, 255, 255, 0.05);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .comp-card:hover .details-btn {
       background: var(--tui-primary);
       color: #fff;
       border-color: var(--tui-primary);
       box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
    }

    .comp-card:hover .quick-btn {
       background: rgba(34, 211, 238, 0.1);
       color: var(--cyan);
       border-color: rgba(34, 211, 238, 0.3);
    }

    @media (max-width: 768px) {
      .page-header h1 {
        font-size: 1.8rem !important;
      }
      .grid {
        grid-template-columns: 1fr;
      }
      .filters-row {
        flex-wrap: nowrap;
        padding-bottom: 0.5rem;
      }
      .filter-chip {
        padding: 0.4rem 1rem;
        font-size: 0.8rem;
      }
    }
  `]
})
export class ComponentesListComponent implements OnInit {
  searchControl = new FormControl('');
  categories = ['Todos', 'IC', 'MCU', 'TRANS', 'OPAMP', 'REG', 'SENSOR'];
  selectedCategory = 'Todos';
  
  showQuickView = false;
  selectedQuickItem: any = null;

  allComponents = [
    { 
      id: 1, type: 'IC', name: 'NE555P', package: 'DIP-8', pins: 8, supply: '4.5-16V', image: 'assets/components/ne555.png',
      desc: 'Temporizador de precisión altamente versátil para generar pulsos u oscilaciones.' 
    },
    { 
      id: 2, type: 'MCU', name: 'ATmega328P', package: 'DIP-28', pins: 28, supply: '1.8-5.5V', image: 'assets/components/atmega328p.png',
      desc: 'Microcontrolador AVR de 8 bits con 32KB de flash, estándar en Arduino Uno.' 
    },
    { 
      id: 3, type: 'TRANS', name: '2N2222', package: 'TO-92', pins: 3, supply: '40V/800mA', image: 'assets/components/2n2222.png',
      desc: 'Transistor bipolar NPN de conmutación rápida para uso general.' 
    },
    { 
      id: 4, type: 'OPAMP', name: 'LM358', package: 'DIP-8', pins: 8, supply: '3-32V', image: 'assets/components/lm358.png',
      desc: 'Amplificador operacional dual de baja potencia y bajo consumo.' 
    },
    { 
      id: 5, type: 'REG', name: 'LM7805', package: 'TO-220', pins: 3, supply: '5V Out', image: 'assets/components/lm7805.png',
      desc: 'Regulador de voltaje lineal positivo de 5V 1.5A constante.' 
    },
    { 
      id: 6, type: 'SENSOR', name: 'DHT11', package: 'Módulo', pins: 4, supply: '3-5V', image: 'assets/components/dht11.png',
      desc: 'Sensor digital de temperatura y humedad relativa básica.' 
    },
  ];

  filteredComponents = [...this.allComponents];

  ngOnInit() {
    this.searchControl.valueChanges.subscribe(() => this.filter());
  }

  selectCategory(cat: string) {
    this.selectedCategory = cat;
    this.filter();
  }

  filter() {
    const term = (this.searchControl.value || '').toLowerCase();
    this.filteredComponents = this.allComponents.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(term) || 
                            c.type.toLowerCase().includes(term) ||
                            c.desc.toLowerCase().includes(term);
      const matchesCategory = this.selectedCategory === 'Todos' || c.type === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }

  openQuickView(item: any) {
    this.selectedQuickItem = item;
    this.showQuickView = true;
  }
}
