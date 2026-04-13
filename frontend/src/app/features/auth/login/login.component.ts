import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TuiCard } from '@taiga-ui/layout';
import { TuiButton, TuiTextfield, TuiLabel, TuiLink } from '@taiga-ui/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    TuiCard,
    TuiButton,
    TuiTextfield,
    TuiLabel,
    TuiLink
  ],
  template: `
    <div class="auth-wrapper">
      <div class="auth-card glass">
        <header class="auth-header tui-space_bottom-10">
          <div class="auth-icon-wrap">⚡</div>
          <h1 class="tui-text_h4 text-gradient">Iniciar Sesión</h1>
          <p class="auth-subtitle">Acceso premium a tu laboratorio digital.</p>
        </header>

        <form [formGroup]="loginForm" class="tui-form">
          <div class="tui-form__row">
            <label tuiLabel class="auth-label">Correo Electrónico</label>
            <tui-textfield appearance="flat" class="auth-input">
              <input
                tuiTextfield
                formControlName="email"
                type="email"
                placeholder="nombre@ejemplo.com"
              />
            </tui-textfield>
          </div>

          <div class="tui-form__row tui-space_top-6">
            <label tuiLabel class="auth-label">Contraseña</label>
            <tui-textfield appearance="flat" class="auth-input">
              <input
                tuiTextfield
                formControlName="password"
                type="password"
                placeholder="••••••••"
              />
            </tui-textfield>
          </div>

          <div class="tui-form__buttons tui-space_top-10">
            <button
              tuiButton
              type="submit"
              size="l"
              class="auth-main-btn"
              [disabled]="loginForm.invalid"
            >
              Acceder al Sistema
            </button>
          </div>

          <div class="tui-space_top-8 auth-footer">
            <span class="tui-text_body-s">¿Nuevo en la plataforma? </span>
            <a tuiLink routerLink="/auth/register" class="auth-link">Crea una cuenta</a>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .auth-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
    }

    .auth-card {
      width: 100%;
      max-width: 440px;
      padding: 3.5rem;
      border-radius: 32px;
      position: relative;
      overflow: hidden;
    }

    .auth-card::before {
      content: '';
      position: absolute;
      top: 0; left: 15%; right: 15%;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.8), transparent);
    }

    .auth-header { text-align: center; }

    .auth-icon-wrap {
      width: 56px;
      height: 56px;
      background: linear-gradient(135deg, #6366f1, #0891b2);
      margin: 0 auto 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 16px;
      font-size: 1.75rem;
      box-shadow: 0 10px 24px rgba(34, 211, 238, 0.35);
    }

    .auth-subtitle {
      color: var(--tui-text-02);
      margin-top: 0.5rem;
      font-size: 0.95rem;
    }

    .auth-label {
      color: rgba(255, 255, 255, 0.5);
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.5rem;
      display: block;
    }

    .auth-input {
      --tui-base-02: rgba(255, 255, 255, 0.05);
      border-radius: 12px;
    }

    .auth-main-btn {
      width: 100%;
      border-radius: 12px;
      background: linear-gradient(135deg, #6366f1, #0891b2);
      box-shadow: 0 4px 20px rgba(34, 211, 238, 0.25);
    }

    .auth-footer {
      text-align: center;
      padding-top: 1.5rem;
      border-top: 1px solid rgba(34, 211, 238, 0.12);
    }

    .auth-link { font-weight: 600; color: #22d3ee; }
  `]
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });
}
