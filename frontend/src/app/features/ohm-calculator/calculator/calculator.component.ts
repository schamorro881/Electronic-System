import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { TuiButton } from '@taiga-ui/core';
import { OhmCalculatorService } from '../services/ohm-calculator.service';
import { OhmCalculationResponse } from '../models/ohm-calculator.models';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

type CalcMode = 'OHM' | 'LED';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TuiButton],
  template: `
    <div class="calc-wrapper">

      <!-- Page Header -->
      <header class="page-header">
        <div class="header-left">
          <div class="header-icon">⚡</div>
          <div>
            <h1 class="page-title">Suite de Electrónica</h1>
            <p class="page-subtitle">Calculadora profesional de circuitos</p>
          </div>
        </div>
        <div class="mode-pills">
          <button class="pill" [class.active]="mode === 'OHM'" (click)="setMode('OHM')">
            <span class="pill-dot"></span>Ley de Ohm
          </button>
          <button class="pill" [class.active]="mode === 'LED'" (click)="setMode('LED')">
            <span class="pill-dot led"></span>Mago de LEDs
          </button>
        </div>
      </header>

      <!-- Main Grid -->
      <div class="main-grid">

        <!-- LEFT: Inputs Card -->
        <div class="card inputs-card">
          <div class="card-label">Parámetros de entrada</div>

          <!-- OHM FORM -->
          <form *ngIf="mode === 'OHM'" [formGroup]="ohmForm" class="field-grid">
            <div class="field-wrap" [class.locked]="isLocked('voltage')">
              <label class="field-label">Voltaje</label>
              <div class="field-box" [class.focused]="false">
                <input formControlName="voltage" type="text" class="field-input" placeholder="12v, 5m…" />
                <span class="field-unit">V</span>
              </div>
            </div>
            <div class="field-wrap" [class.locked]="isLocked('current')">
              <label class="field-label">Corriente</label>
              <div class="field-box">
                <input formControlName="current" type="text" class="field-input" placeholder="20mA, 1A…" />
                <span class="field-unit">A</span>
              </div>
            </div>
            <div class="field-wrap" [class.locked]="isLocked('resistance')">
              <label class="field-label">Resistencia</label>
              <div class="field-box">
                <input formControlName="resistance" type="text" class="field-input" placeholder="4.7k, 330…" />
                <span class="field-unit">Ω</span>
              </div>
            </div>
            <div class="field-wrap" [class.locked]="isLocked('power')">
              <label class="field-label">Potencia</label>
              <div class="field-box">
                <input formControlName="power" type="text" class="field-input" placeholder="100mW, 2W…" />
                <span class="field-unit">W</span>
              </div>
            </div>
          </form>

          <!-- LED FORM -->
          <form *ngIf="mode === 'LED'" [formGroup]="ledForm" class="led-form">
            <div class="field-full">
              <label class="field-label">Presets de LED</label>
              <div class="led-presets">
                <button type="button" class="led-chip" *ngFor="let p of ledPresets"
                        [style.--chip-color]="p.color" (click)="applyLedPreset(p)">
                  {{ p.name }}
                </button>
              </div>
            </div>
            <div class="field-grid">
              <div class="field-wrap">
                <label class="field-label">Voltaje Fuente</label>
                <div class="field-box">
                  <input formControlName="sourceVoltage" type="text" class="field-input" placeholder="12, 5…" />
                  <span class="field-unit">V</span>
                </div>
              </div>
              <div class="field-wrap">
                <label class="field-label">Caída LED (Vf)</label>
                <div class="field-box">
                  <input formControlName="ledForwardVoltage" type="text" class="field-input" placeholder="Vf" />
                  <span class="field-unit">V</span>
                </div>
              </div>
              <div class="field-wrap field-full-col">
                <label class="field-label">Corriente LED (If)</label>
                <div class="field-box">
                  <input formControlName="ledForwardCurrent" type="text" class="field-input" placeholder="mA" />
                  <span class="field-unit">A</span>
                </div>
              </div>
            </div>
          </form>

          <!-- Safety Banner -->
          <div class="safety-bar" *ngIf="result?.safetyAdvice"
               [class.warn]="result!.power > 0.2 && result!.power <= 0.5"
               [class.danger]="result!.power > 0.5">
            <span class="safety-icon">⚠️</span>
            <div>
              <div class="safety-title">{{ result?.componentRecommendation }}</div>
              <div class="safety-text">{{ result?.safetyAdvice }}</div>
            </div>
          </div>

          <!-- Reset -->
          <button class="reset-btn" (click)="onReset()">
            <span>↺</span> Limpiar mesa
          </button>
        </div>

        <!-- RIGHT: Circuit + Results -->
        <div class="right-col">

          <!-- Circuit Diagram Card -->
          <div class="card circuit-card">
            <div class="card-row-header">
              <span class="card-label">Diagrama del circuito</span>
              <span class="formula-tag" *ngIf="result">{{ result.formulaApplied }}</span>
            </div>
            <div class="svg-wrap">
              <svg viewBox="0 0 400 200" class="circuit-svg">
                <path d="M 100 50 L 300 50 L 300 150 L 100 150 Z" fill="none" class="wire-base" />
                <path d="M 100 50 L 300 50 L 300 150 L 100 150 Z" fill="none" class="wire-flow"
                      [style.stroke-dasharray]="flowDashArray"
                      [style.animation-duration]="flowSpeed + 's'" />

                <!-- Voltage Source -->
                <g [style.filter]="sourceGlow">
                  <rect x="90" y="85" width="20" height="30" fill="rgba(0,0,0,0.6)" stroke="#a5b4fc" stroke-width="1.5" rx="2"/>
                  <line x1="90" y1="95" x2="110" y2="95" stroke="#a5b4fc" stroke-width="2"/>
                  <line x1="95" y1="105" x2="105" y2="105" stroke="#a5b4fc" stroke-width="2"/>
                  <rect x="30" y="92" width="54" height="18" rx="9" fill="rgba(15,23,42,0.9)"/>
                  <text x="57" y="105" fill="#a5b4fc" text-anchor="middle" class="svg-label">
                    {{ result?.voltage ? (result!.voltage | number:'1.0-2') + 'V' : 'V' }}
                  </text>
                </g>

                <!-- Resistor -->
                <g>
                  <rect x="285" y="85" width="30" height="30" fill="rgba(0,0,0,0.6)" stroke="#fbbf24" stroke-width="1.5" rx="3"/>
                  <line x1="288" y1="90" x2="312" y2="108" stroke="#fbbf24" stroke-width="1.5"/>
                  <line x1="288" y1="108" x2="312" y2="90" stroke="#fbbf24" stroke-width="1.5"/>
                  <rect x="318" y="92" width="74" height="18" rx="9" fill="rgba(15,23,42,0.9)"/>
                  <text x="355" y="105" fill="#fbbf24" text-anchor="middle" class="svg-label">
                    {{ result?.resistance ? formatResistance(result!.resistance) : 'R' }}
                  </text>
                </g>

                <!-- Current (Top) -->
                <rect x="158" y="24" width="84" height="18" rx="9" fill="rgba(15,23,42,0.9)"/>
                <text x="200" y="37" fill="#4ade80" text-anchor="middle" class="svg-label">
                  {{ result?.current ? (result!.current | number:'1.0-3') + 'A' : 'I' }}
                </text>

                <!-- Power Heat Glow -->
                <circle cx="200" cy="150" [attr.r]="heatRadius" [style.fill]="heatColor" class="heat-glow"/>

                <!-- Power (Bottom) -->
                <rect x="158" y="160" width="84" height="18" rx="9" fill="rgba(15,23,42,0.9)"/>
                <text x="200" y="173" fill="#f472b6" text-anchor="middle" class="svg-label">
                  {{ result?.power ? (result!.power | number:'1.0-2') + 'W' : 'P' }}
                </text>
              </svg>
            </div>
          </div>

          <!-- History Card -->
          <div class="card history-card" *ngIf="history.length > 0">
            <div class="card-row-header">
              <span class="card-label">Historial</span>
              <button class="clear-btn" (click)="clearHistory()">Limpiar</button>
            </div>
            <div class="history-list">
              <div class="history-item" *ngFor="let h of history" (click)="loadHistoryItem(h)">
                <div class="h-values">
                  <span class="h-chip v">{{ h.voltage | number:'1.0-2' }}V</span>
                  <span class="h-chip i">{{ h.current | number:'1.0-3' }}A</span>
                  <span class="h-chip r">{{ formatResistance(h.resistance) }}</span>
                  <span class="h-chip p">{{ h.power | number:'1.0-2' }}W</span>
                </div>
                <span class="h-formula">{{ h.formulaApplied }}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  `,
  styles: [`
    /* ── Layout ── */
    .calc-wrapper {
      max-width: 960px;
      margin: 0 auto;
      padding: 2rem 1.5rem;
      font-family: 'Inter', sans-serif;
    }

    /* ── Page Header ── */
    .page-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .header-left {
      display: flex;
      align-items: center;
      gap: 0.9rem;
    }
    .header-icon {
      width: 42px; height: 42px;
      background: linear-gradient(135deg, #22d3ee22, #6366f133);
      border: 1px solid rgba(34,211,238,0.3);
      border-radius: 12px;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.25rem;
    }
    .page-title {
      font-size: 1.25rem;
      font-weight: 800;
      color: #f1f5f9;
      margin: 0;
      line-height: 1.2;
    }
    .page-subtitle {
      font-size: 0.72rem;
      color: #64748b;
      margin: 0;
      margin-top: 2px;
      letter-spacing: 0.3px;
    }

    /* ── Mode Pills ── */
    .mode-pills {
      display: flex;
      gap: 0.5rem;
      background: rgba(0,0,0,0.35);
      padding: 4px;
      border-radius: 12px;
      border: 1px solid rgba(255,255,255,0.06);
    }
    .pill {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 0.4rem 1rem;
      border-radius: 9px;
      border: none;
      background: transparent;
      color: #64748b;
      font-size: 0.8rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.25s;
    }
    .pill.active {
      background: rgba(34,211,238,0.15);
      color: #22d3ee;
      border: 1px solid rgba(34,211,238,0.3);
    }
    .pill-dot {
      width: 6px; height: 6px;
      border-radius: 50%;
      background: #64748b;
      transition: background 0.25s;
    }
    .pill.active .pill-dot { background: #22d3ee; box-shadow: 0 0 6px #22d3ee; }
    .pill-dot.led { background: #f472b6; }
    .pill.active .pill-dot.led { background: #f472b6; box-shadow: 0 0 6px #f472b6; }

    /* ── Grid ── */
    .main-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      align-items: start;
    }

    /* ── Cards ── */
    .card {
      background: rgba(15,23,42,0.55);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 20px;
      padding: 1.25rem;
      backdrop-filter: blur(12px);
      box-shadow: 0 8px 32px rgba(0,0,0,0.3);
    }
    .card-label {
      font-size: 0.68rem;
      font-weight: 800;
      color: #22d3ee;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      margin-bottom: 1rem;
      display: block;
    }
    .card-row-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.75rem;
    }
    .card-row-header .card-label { margin-bottom: 0; }

    /* ── Input Fields ── */
    .inputs-card { }
    .field-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.75rem;
    }
    .field-full-col { grid-column: span 2; }
    .field-wrap {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }
    .field-wrap.locked { opacity: 0.4; pointer-events: none; }
    .field-label {
      font-size: 0.68rem;
      font-weight: 700;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.8px;
    }
    .field-box {
      display: flex;
      align-items: center;
      background: rgba(0,0,0,0.3);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 12px;
      padding: 0.55rem 0.85rem;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .field-box:focus-within {
      border-color: rgba(34,211,238,0.5);
      box-shadow: 0 0 0 3px rgba(34,211,238,0.1);
    }
    .field-input {
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      color: #f1f5f9;
      font-size: 0.95rem;
      font-weight: 600;
      min-width: 0;
    }
    .field-input::placeholder { color: #334155; }
    .field-unit {
      font-size: 0.8rem;
      font-weight: 800;
      color: #22d3ee;
      margin-left: 0.5rem;
      flex-shrink: 0;
    }

    /* ── LED Form ── */
    .led-form { display: flex; flex-direction: column; gap: 0.75rem; }
    .field-full { display: flex; flex-direction: column; gap: 0.35rem; }
    .led-presets { display: flex; flex-wrap: wrap; gap: 0.4rem; }
    .led-chip {
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      border: 1px solid rgba(255,255,255,0.15);
      background: color-mix(in srgb, var(--chip-color) 25%, transparent);
      color: #fff;
      font-size: 0.75rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
      text-shadow: 0 1px 2px rgba(0,0,0,0.6);
    }
    .led-chip:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.3); }

    /* ── Safety Banner ── */
    .safety-bar {
      display: flex;
      align-items: flex-start;
      gap: 0.65rem;
      padding: 0.75rem 1rem;
      margin-top: 0.75rem;
      border-radius: 12px;
      background: rgba(16,185,129,0.08);
      border: 1px solid rgba(16,185,129,0.25);
      transition: all 0.4s;
    }
    .safety-bar.warn { background: rgba(245,158,11,0.08); border-color: rgba(245,158,11,0.25); }
    .safety-bar.danger { background: rgba(239,68,68,0.08); border-color: rgba(239,68,68,0.25); animation: pulse-danger 2s infinite; }
    .safety-icon { font-size: 0.95rem; margin-top: 1px; flex-shrink: 0; }
    .safety-title { font-size: 0.8rem; font-weight: 700; color: #f1f5f9; }
    .safety-text { font-size: 0.72rem; color: #94a3b8; margin-top: 2px; }

    /* ── Reset Button ── */
    .reset-btn {
      width: 100%;
      margin-top: 1rem;
      padding: 0.6rem 1rem;
      border-radius: 10px;
      border: 1px solid rgba(255,255,255,0.07);
      background: rgba(255,255,255,0.04);
      color: #64748b;
      font-size: 0.78rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
    }
    .reset-btn:hover { background: rgba(239,68,68,0.1); border-color: rgba(239,68,68,0.3); color: #fca5a5; }

    /* ── Right Column ── */
    .right-col {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    /* ── Circuit Card ── */
    .circuit-card { }
    .svg-wrap {
      background: rgba(0,0,0,0.3);
      border-radius: 14px;
      padding: 1rem 0.5rem;
      overflow: hidden;
    }
    .circuit-svg {
      width: 100%;
      height: auto;
      display: block;
    }
    .wire-base { stroke: rgba(255,255,255,0.08); stroke-width: 5; stroke-linecap: round; }
    .wire-flow { stroke: #22d3ee; stroke-width: 3; stroke-linecap: round; stroke-dasharray: 8, 24; animation: flow linear infinite; }
    .svg-label { font-size: 16px; font-weight: 700; font-family: 'Inter', monospace; }
    .heat-glow { filter: blur(10px); opacity: 0.75; transition: all 0.5s; }
    .formula-tag {
      font-size: 0.68rem;
      font-family: monospace;
      color: #475569;
      background: rgba(0,0,0,0.3);
      padding: 2px 8px;
      border-radius: 6px;
    }

    /* ── History ── */
    .history-card { }
    .clear-btn {
      font-size: 0.68rem;
      font-weight: 700;
      color: #64748b;
      background: none;
      border: none;
      cursor: pointer;
      padding: 2px 6px;
      border-radius: 6px;
      transition: all 0.2s;
    }
    .clear-btn:hover { color: #f87171; background: rgba(239,68,68,0.1); }
    .history-list {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      max-height: 180px;
      overflow-y: auto;
    }
    .history-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem 0.75rem;
      border-radius: 10px;
      background: rgba(255,255,255,0.02);
      border: 1px solid rgba(255,255,255,0.04);
      cursor: pointer;
      transition: all 0.2s;
      gap: 0.5rem;
    }
    .history-item:hover { background: rgba(34,211,238,0.06); border-color: rgba(34,211,238,0.2); transform: translateX(4px); }
    .h-values { display: flex; gap: 0.35rem; flex-wrap: wrap; }
    .h-chip {
      font-size: 0.68rem;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 6px;
    }
    .h-chip.v { color: #a5b4fc; background: rgba(99,102,241,0.12); }
    .h-chip.i { color: #4ade80; background: rgba(74,222,128,0.12); }
    .h-chip.r { color: #fbbf24; background: rgba(251,191,36,0.12); }
    .h-chip.p { color: #f472b6; background: rgba(244,114,182,0.12); }
    .h-formula { font-size: 0.65rem; color: #334155; font-family: monospace; flex-shrink: 0; }

    /* ── Animations ── */
    @keyframes flow { to { stroke-dashoffset: -80; } }
    @keyframes pulse-danger {
      0%, 100% { box-shadow: 0 0 0 rgba(239,68,68,0); }
      50% { box-shadow: 0 0 12px rgba(239,68,68,0.2); }
    }

    /* ── Scrollbar ── */
    .history-list::-webkit-scrollbar { width: 4px; }
    .history-list::-webkit-scrollbar-track { background: transparent; }
    .history-list::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }

    /* ── Mobile Responsive ── */
    @media (max-width: 992px) {
      .main-grid {
        grid-template-columns: 1fr !important;
      }
      .field-grid {
        grid-template-columns: 1fr !important;
      }
      .field-full-col {
        grid-column: span 1 !important;
      }
      .page-header {
        flex-direction: column !important;
        align-items: flex-start !important;
      }
      .mode-pills {
        width: 100% !important;
        justify-content: stretch !important;
        margin-top: 1rem;
      }
      .pill {
        flex: 1 !important;
        justify-content: center !important;
      }
      .card {
        padding: 1rem !important;
      }
    }
  `],
  providers: [OhmCalculatorService]
})
export class CalculatorComponent implements OnInit, OnDestroy {
  mode: CalcMode = 'OHM';
  
  ohmForm = new FormGroup({
    voltage: new FormControl<string | null>(''),
    current: new FormControl<string | null>(''),
    resistance: new FormControl<string | null>(''),
    power: new FormControl<string | null>(''),
  });

  ledForm = new FormGroup({
    sourceVoltage: new FormControl<string | null>(''),
    ledForwardVoltage: new FormControl<string | null>(''),
    ledForwardCurrent: new FormControl<string | null>('20mA'),
  });

  ledPresets = [
    { name: 'Rojo', color: '#ff0000', vf: '1.8v' },
    { name: 'Verde', color: '#00ff00', vf: '2.1v' },
    { name: 'Azul', color: '#0000ff', vf: '3.2v' },
    { name: 'Blanco', color: '#ffffff', vf: '3.3v' },
    { name: 'Amarillo', color: '#ffff00', vf: '2.0v' }
  ];

  result: OhmCalculationResponse | null = null;
  history: OhmCalculationResponse[] = [];
  
  // Animation/SVG state
  flowDashArray: string = '0, 400';
  flowSpeed: number = 2; // seconds
  sourceGlow: string = 'none';
  heatColor: string = 'transparent';
  heatRadius: number = 0;

  private destroy$ = new Subject<void>();

  constructor(private ohmCalculatorService: OhmCalculatorService) {}

  ngOnInit(): void {
    this.loadHistory();
    
    this.ohmForm.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged((p, c) => JSON.stringify(p) === JSON.stringify(c)),
      takeUntil(this.destroy$)
    ).subscribe(() => this.calculateOhm());

    this.ledForm.valueChanges.pipe(
      debounceTime(400),
      takeUntil(this.destroy$)
    ).subscribe(() => this.calculateLed());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setMode(m: CalcMode) {
    this.mode = m;
    this.onReset();
  }

  applyLedPreset(p: any) {
    this.ledForm.patchValue({
      ledForwardVoltage: p.vf,
      ledForwardCurrent: '20mA'
    });
  }

  isLocked(fieldName: string): boolean {
    if (this.mode !== 'OHM') return false;
    const values = this.ohmForm.value;
    const filledFields = Object.keys(values).filter(key => !!values[key as keyof typeof values]);
    if (filledFields.length >= 2) {
      return !values[fieldName as keyof typeof values];
    }
    return false;
  }

  isInput(fieldName: string): boolean {
    const form: any = this.mode === 'OHM' ? this.ohmForm : this.ledForm;
    const control = form.get(fieldName);
    return !!control?.value && !this.isLocked(fieldName);
  }

  isResult(fieldName: string): boolean {
    return this.result !== null && this.isLocked(fieldName);
  }

  private calculateOhm() {
    const { voltage, current, resistance, power } = this.ohmForm.value;
    const filledCount = [voltage, current, resistance, power].filter(v => !!v).length;
    
    if (filledCount === 2) {
      this.ohmCalculatorService.calculate({
        voltage: voltage || null,
        current: current || null,
        resistance: resistance || null,
        power: power || null
      }).subscribe({
        next: (res) => this.handleResponse(res),
        error: () => this.handleError()
      });
    } else {
      this.clearResults();
    }
  }

  private calculateLed() {
    const { sourceVoltage, ledForwardVoltage, ledForwardCurrent } = this.ledForm.value;
    if (sourceVoltage && ledForwardVoltage && ledForwardCurrent) {
      this.ohmCalculatorService.calculateLed({
        sourceVoltage, ledForwardVoltage, ledForwardCurrent
      }).subscribe({
        next: (res) => this.handleResponse(res),
        error: () => this.handleError()
      });
    }
  }

  private handleResponse(res: OhmCalculationResponse) {
    this.result = res;
    this.updateViz(res);
    this.addToHistory(res);
  }

  private updateViz(res: OhmCalculationResponse) {
    // Current flow (Speed inversely proportional to I, capped)
    const currentVal = res.current || 0.1;
    this.flowSpeed = Math.max(0.1, Math.min(5, 1 / (currentVal * 5)));
    this.flowDashArray = '10, 30';

    // Voltage Glow
    const vGlow = Math.min(30, (res.voltage || 0) * 1.5);
    this.sourceGlow = `drop-shadow(0 0 ${vGlow}px #6366f1)`;

    // Power Heat
    const pVal = res.power || 0;
    this.heatRadius = Math.min(40, pVal * 15);
    this.heatColor = pVal > 1 ? '#ef4444' : (pVal > 0.25 ? '#f53794' : '#f59e0bc8');
  }

  private handleError() {
    this.clearResults();
  }

  private clearResults() {
    this.result = null;
    this.flowDashArray = '0, 400';
    this.sourceGlow = 'none';
    this.heatColor = 'transparent';
    this.heatRadius = 0;
  }

  onReset() {
    this.ohmForm.reset();
    this.ledForm.reset({ ledForwardCurrent: '20mA' });
    this.clearResults();
  }

  private addToHistory(res: OhmCalculationResponse) {
    // Evitar duplicados consecutivos
    if (this.history.length > 0 && 
        this.history[0].resistance === res.resistance && 
        this.history[0].power === res.power) return;

    this.history.unshift(res);
    if (this.history.length > 5) this.history.pop();
    localStorage.setItem('ohm_history', JSON.stringify(this.history));
  }

  private loadHistory() {
    const saved = localStorage.getItem('ohm_history');
    if (saved) this.history = JSON.parse(saved);
  }

  loadHistoryItem(h: OhmCalculationResponse) {
    this.mode = 'OHM';
    this.ohmForm.patchValue({
      voltage: h.voltage.toString(),
      current: h.current.toString(),
      resistance: h.resistance.toString(),
      power: h.power.toString()
    }, { emitEvent: false });
    this.result = h;
    this.updateViz(h);
  }

  clearHistory() {
    this.history = [];
    localStorage.removeItem('ohm_history');
  }

  formatResistance(r: number): string {
    if (r >= 1000000) return (r / 1000000).toFixed(2) + 'MΩ';
    if (r >= 1000) return (r / 1000).toFixed(2) + 'kΩ';
    return r.toFixed(2) + 'Ω';
  }
}
