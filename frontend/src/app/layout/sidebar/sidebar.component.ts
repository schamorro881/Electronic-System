import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TuiLink } from '@taiga-ui/core';
import { LayoutService } from '../../core/services/layout.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, TuiLink],
  template: `
    <nav class="sidebar glass" [class.collapsed]="layoutService.isCollapsed()">
      <div class="sidebar-header tui-space_bottom-10">
        <div class="brand">
          <a routerLink="/home" class="logo">
            <div class="logo-icon">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>
            </div>
            <span class="logo-text text-gradient" *ngIf="!layoutService.isCollapsed()">Electronic System</span>
          </a>
        </div>
        
        <button class="toggle-btn glass-light" (click)="layoutService.toggleSidebar()">
           <span class="chevron" [class.rotate]="layoutService.isCollapsed()">◀</span>
        </button>
      </div>

      <div class="nav-links">
        <a
          routerLink="/home"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }"
          class="nav-item"
          [title]="layoutService.isCollapsed() ? 'Dashboard' : ''"
        >
          <span class="icon-wrap"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></span> 
          <span class="label" *ngIf="!layoutService.isCollapsed()">Dashboard</span>
        </a>
        
        <div class="section-label tui-space_top-8 tui-space_bottom-4" *ngIf="!layoutService.isCollapsed()">GESTIÓN</div>
        <div class="divider" *ngIf="layoutService.isCollapsed()"></div>
        
        <a
          routerLink="/componentes"
          routerLinkActive="active"
          class="nav-item"
          [title]="layoutService.isCollapsed() ? 'Componentes' : ''"
        >
          <span class="icon-wrap"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="16.5" x2="7.5" y1="9.4" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" x2="12" y1="22" y2="12"/></svg></span> 
          <span class="label" *ngIf="!layoutService.isCollapsed()">Componentes</span>
        </a>
        
        <div class="section-label tui-space_top-8 tui-space_bottom-4" *ngIf="!layoutService.isCollapsed()">HERRAMIENTAS</div>
        <div class="divider" *ngIf="layoutService.isCollapsed()"></div>
        
        <a
          routerLink="/resistencias"
          routerLinkActive="active"
          class="nav-item"
          [title]="layoutService.isCollapsed() ? 'Resistencias' : ''"
        >
          <span class="icon-wrap"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/></svg></span> 
          <span class="label" *ngIf="!layoutService.isCollapsed()">Código Colores</span>
        </a>
        <a
          routerLink="/ohm-calculator"
          routerLinkActive="active"
          class="nav-item"
          [title]="layoutService.isCollapsed() ? 'Ley de Ohm' : ''"
        >
          <span class="icon-wrap"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></span> 
          <span class="label" *ngIf="!layoutService.isCollapsed()">Ley de Ohm</span>
        </a>
      </div>

      <div class="spacer"></div>

      <div class="footer-auth tui-space_top-6">
        <a tuiLink routerLink="/auth/login" class="login-link glass-light" [title]="layoutService.isCollapsed() ? 'Iniciar Sesión' : ''">
          <span class="icon-wrap login-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></span> 
          <span class="label" *ngIf="!layoutService.isCollapsed()">Iniciar Sesión</span>
        </a>
      </div>
    </nav>
  `,
  styles: [`
    .sidebar {
      width: 280px;
      height: 100vh;
      display: flex;
      flex-direction: column;
      padding: 2.5rem 1.75rem;
      position: fixed;
      left: 0;
      top: 0;
      background: rgba(8, 14, 32, 0.82);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border-right: 1px solid rgba(99, 102, 241, 0.18);
      box-shadow: 4px 0 40px rgba(0, 0, 0, 0.5), 1px 0 0 rgba(99, 102, 241, 0.1);
      z-index: 100;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .sidebar.collapsed {
      width: 88px;
      padding: 2.5rem 1rem;
    }

    .sidebar-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 40px;
    }

    .collapsed .sidebar-header {
      flex-direction: column;
      gap: 1.5rem;
    }

    .brand {
      display: flex;
      align-items: center;
      overflow: hidden;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;
    }

    .logo-icon {
      flex-shrink: 0;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #6366f1, #a855f7);
      border-radius: 10px;
      font-size: 1.25rem;
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
    }

    .logo-text {
      font-size: 1.25rem;
      font-weight: 800;
      white-space: nowrap;
      letter-spacing: -0.02em;
    }

    .toggle-btn {
      width: 28px;
      height: 28px;
      padding: 0;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--tui-text-02);
      transition: all 0.3s;
    }

    .toggle-btn:hover {
      background: rgba(255, 255, 255, 0.1);
      color: var(--tui-text-01);
    }

    .chevron {
      font-size: 0.75rem;
      transition: transform 0.4s;
    }

    .chevron.rotate {
      transform: rotate(180deg);
    }

    .section-label {
      font-size: 0.75rem;
      font-weight: 800;
      color: rgba(255, 255, 255, 0.25);
      letter-spacing: 0.1em;
      padding-left: 1rem;
    }

    .divider {
      height: 1px;
      background: rgba(255, 255, 255, 0.05);
      margin: 1.5rem 0.5rem;
    }

    .nav-links {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-top: 1.5rem;
    }

    .nav-item {
      display: flex;
      align-items: center;
      padding: 1rem 1.25rem;
      border-radius: 14px;
      color: var(--tui-text-02);
      text-decoration: none;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      white-space: nowrap;
    }

    .collapsed .nav-item {
      justify-content: center;
      padding: 1rem;
    }

    .icon-wrap { 
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0; 
      color: var(--tui-text-02);
      transition: all 0.3s;
    }
    
    .nav-item:hover .icon-wrap {
      color: #818cf8;
      filter: drop-shadow(0 0 8px rgba(129, 140, 248, 0.5));
    }
    
    .label { margin-left: 1rem; transition: opacity 0.3s; }

    .nav-item:hover {
      background: rgba(255, 255, 255, 0.05);
      color: var(--tui-text-01);
      transform: translateX(4px);
    }

    .collapsed .nav-item:hover {
      transform: scale(1.1);
    }

    .nav-item.active {
      background: rgba(99, 102, 241, 0.18);
      color: #a5b4fc;
      font-weight: 600;
      box-shadow:
        inset 0 0 0 1px rgba(99, 102, 241, 0.3),
        0 4px 16px rgba(99, 102, 241, 0.15);
      border-left: 3px solid #818cf8;
    }
    
    .nav-item.active .icon-wrap {
      color: #a5b4fc;
      filter: drop-shadow(0 0 10px rgba(165, 180, 252, 0.9));
    }

    .spacer { flex: 1; }

    .login-link {
      display: flex;
      align-items: center;
      padding: 0.875rem 1rem;
      border-radius: 14px;
      color: var(--tui-text-01);
      text-decoration: none;
      transition: all 0.3s;
      font-size: 0.95rem;
      font-weight: 500;
    }

    .collapsed .login-link {
       justify-content: center;
       padding: 1rem;
    }

    .login-icon { margin-right: 1rem; }
    .collapsed .login-icon { margin-right: 0; }

    .login-link:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: translateY(-2px);
    }
  `]
})
export class SidebarComponent {
  layoutService = inject(LayoutService);
}
