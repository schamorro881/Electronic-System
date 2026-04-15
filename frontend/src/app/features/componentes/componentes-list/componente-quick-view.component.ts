import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-componente-quick-view',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="overlay" (click)="close.emit()"></div>
    <div class="drawer glass">
      <div class="drawer-header">
        <h2 class="tui-text_h4 text-gradient-animate">{{item?.name}}</h2>
        <button class="close-btn" (click)="close.emit()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
      </div>
      
      <div class="drawer-content" *ngIf="item">
        <div class="image-preview">
          <img [src]="item.image" [alt]="item.name" class="full-img">
        </div>
        
        <div class="meta-section tui-space_top-6">
          <div class="type-badge">{{item.type}}</div>
          <p class="desc tui-space_top-4">{{item.desc}}</p>
        </div>

        <div class="specs-grid tui-space_top-8">
           <div class="spec-item">
              <span class="label">Encapsulado</span>
              <span class="value">{{item.package}}</span>
           </div>
           <div class="spec-item" *ngIf="item.pins">
              <span class="label">Pines</span>
              <span class="value">{{item.pins}}</span>
           </div>
           <div class="spec-item" *ngIf="item.supply">
              <span class="label">Alimentación</span>
              <span class="value">{{item.supply}}</span>
           </div>
        </div>

        <div class="actions-row tui-space_top-10">
           <button class="primary-action" (click)="close.emit()">
              Volver al Catálogo
           </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(4px);
      z-index: 1000;
    }

    .drawer {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      width: 450px;
      max-width: 90vw;
      z-index: 1001;
      padding: 2.5rem;
      display: flex;
      flex-direction: column;
      border-left: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: -20px 0 50px rgba(0, 0, 0, 0.5);
    }

    .drawer-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2.5rem;
    }

    .close-btn {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #fff;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s;
    }

    .close-btn:hover { background: rgba(239, 68, 68, 0.2); color: #ef4444; border-color: rgba(239, 68, 68, 0.3); }

    .image-preview {
      width: 100%;
      height: 250px;
      border-radius: 20px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.08);
      background: #000;
    }

    .full-img { width: 100%; height: 100%; object-fit: cover; }

    .type-badge {
      display: inline-block;
      background: rgba(34, 211, 238, 0.1);
      color: var(--cyan);
      padding: 0.4rem 1rem;
      border-radius: 10px;
      font-size: 0.8rem;
      font-weight: 800;
      border: 1px solid rgba(34, 211, 238, 0.2);
    }

    .desc { color: var(--tui-text-02); line-height: 1.6; font-size: 1rem; }

    .specs-grid {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .spec-item {
      display: flex;
      justify-content: space-between;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    .label { color: var(--tui-text-02); font-size: 0.9rem; }
    .value { color: #fff; font-weight: 700; }

    .primary-action {
      width: 100%;
      background: var(--tui-primary);
      color: #fff;
      border: none;
      padding: 1rem;
      border-radius: 12px;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
      transition: all 0.3s;
    }

    .primary-action:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4); }

    @media (max-width: 768px) {
      .drawer {
        width: 100vw;
        max-width: 100vw;
        padding: 1.5rem;
      }
      .drawer-header {
        margin-bottom: 1.5rem;
      }
      .image-preview {
        height: 180px;
      }
    }
  `]
})
export class ComponenteQuickViewComponent {
  @Input() item: any;
  @Output() close = new EventEmitter<void>();
}
