import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TuiLink } from '@taiga-ui/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, TuiLink],
  template: `
    <div class="home-wrapper">
      <!-- Hero Section -->
      <section class="hero-section tui-space_bottom-15">
        <div class="hero-content">
          <h1 class="hero-title text-gradient-animate">
            Ingeniería Electrónica<br>
            <span class="highlight">Hecha Simple.</span>
          </h1>
          <p class="hero-subtitle tui-space_top-6">
            Gestiona tus componentes, calcula parámetros críticos y agiliza tu prototipado con nuestra suite premium de herramientas.
          </p>
        </div>
        <div class="hero-illustration">
          <img src="/assets/images/hero_circuit_3d.png" alt="3D Circuit Illustration" class="floating-img" />
        </div>
      </section>
      
      <!-- Action Grid -->
      <div class="grid">
        <div class="action-card glass-light" routerLink="/ohm-calculator">
          <div class="card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          </div>
          <h3 class="tui-text_h5 tui-space_top-4">Ley de Ohm</h3>
          <p class="card-desc tui-space_vertical-4">
            Cálculos instantáneos de Voltaje, Corriente y Resistencia.
          </p>
          <div class="card-footer">
            <a tuiLink routerLink="/ohm-calculator">Abrir Calculadora</a>
          </div>
        </div>
        
        <div class="action-card glass-light" routerLink="/resistencias">
          <div class="card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/></svg>
          </div>
          <h3 class="tui-text_h5 tui-space_top-4">Código de Colores</h3>
          <p class="card-desc tui-space_vertical-4">
            Identificación visual de valores óhmicos por bandas.
          </p>
          <div class="card-footer">
            <a tuiLink routerLink="/resistencias">Identificar Ahora</a>
          </div>
        </div>
        
        <div class="action-card glass-light" routerLink="/componentes">
          <div class="card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="16.5" x2="7.5" y1="9.4" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" x2="12" y1="22" y2="12"/></svg>
          </div>
          <h3 class="tui-text_h5 tui-space_top-4">Catálogo Pro</h3>
          <p class="card-desc tui-space_vertical-4">
            Datasheets y especificaciones de componentes críticos.
          </p>
          <div class="card-footer">
            <a tuiLink routerLink="/componentes">Explorar</a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-wrapper {
      max-width: 1200px;
      margin: 0 auto;
      padding-top: 2rem;
    }

    .hero-section {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
      min-height: 400px;
    }

    .hero-content {
      flex: 1;
      max-width: 700px;
    }
    
    .hero-illustration {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      max-width: 400px;
    }

    .floating-img {
      width: 100%;
      height: auto;
      filter: drop-shadow(0 0 40px rgba(99, 102, 241, 0.4));
      mix-blend-mode: screen;
      -webkit-mask-image: radial-gradient(circle, black 45%, rgba(0,0,0,0) 70%);
      mask-image: radial-gradient(circle, black 45%, rgba(0,0,0,0) 70%);
      animation: float 6s ease-in-out infinite;
    }

    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
      100% { transform: translateY(0px); }
    }

    .hero-title {
      font-size: 4rem;
      line-height: 1.1;
      margin-bottom: 1rem;
      text-shadow: 0 0 60px rgba(99, 102, 241, 0.25), 0 2px 20px rgba(0, 0, 0, 0.5);
    }

    .hero-subtitle {
      font-size: 1.25rem;
      color: #cbd5e1;
      line-height: 1.6;
      text-shadow: 0 1px 8px rgba(0, 0, 0, 0.6);
    }

    .highlight {
      color: #818cf8;
      text-shadow: 0 0 30px rgba(129, 140, 248, 0.5);
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 2rem;
    }

    .action-card {
      padding: 2.5rem;
      border-radius: 24px;
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      display: flex;
      flex-direction: column;
      position: relative;
      overflow: hidden;
      background: rgba(10, 18, 40, 0.72);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(34, 211, 238, 0.2);
      box-shadow:
        0 8px 32px rgba(0, 0, 0, 0.5),
        0 1px 0 rgba(255, 255, 255, 0.06) inset;
    }

    /* Cyan glowing top accent line */
    .action-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 10%;
      right: 10%;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.7), transparent);
    }

    .action-card:hover {
      transform: translateY(-10px);
      background: rgba(12, 22, 54, 0.85);
      border-color: rgba(34, 211, 238, 0.5);
      box-shadow:
        0 24px 48px rgba(0, 0, 0, 0.6),
        0 0 30px rgba(34, 211, 238, 0.18),
        0 1px 0 rgba(255, 255, 255, 0.08) inset;
    }

    .action-card:hover::before {
      background: linear-gradient(90deg, transparent, rgba(34, 211, 238, 1), transparent);
    }

    .action-card:hover .card-icon {
       transform: scale(1.15);
       filter: drop-shadow(0 0 18px rgba(34, 211, 238, 0.9));
    }

    .card-icon {
      color: #22d3ee;
      transition: all 0.3s ease;
      filter: drop-shadow(0 0 10px rgba(34, 211, 238, 0.45));
      margin-bottom: 0.5rem;
    }

    .card-desc {
      color: #94a3b8;
      font-size: 1rem;
      flex: 1;
      line-height: 1.6;
    }

    .card-footer {
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid rgba(34, 211, 238, 0.15);
    }

    @media (max-width: 768px) {
      .hero-section {
        flex-direction: column;
        text-align: center;
        min-height: auto;
        padding-bottom: 2rem;
        gap: 0;
      }
      .hero-title {
        font-size: 2.5rem;
      }
      .hero-subtitle {
        font-size: 1.1rem;
      }
      .hero-illustration {
        max-width: 280px;
        margin-top: 1.5rem;
      }
      .grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HomeComponent {}
