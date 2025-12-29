import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg 
      [attr.width]="size" 
      [attr.height]="size" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      [attr.stroke-width]="strokeWidth" 
      stroke-linecap="round" 
      stroke-linejoin="round"
      [class]="class"
    >
      <ng-container [ngSwitch]="name">
        <!-- Rocket -->
        <g *ngSwitchCase="'rocket'">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.1 4-2 4-2" />
          <path d="M12 15v5s3.03-.55 4-2c1.1-1.62 2-4 2-4" />
        </g>

        <!-- Palette -->
        <g *ngSwitchCase="'palette'">
          <path d="M13.5 4.5 11 2a3.93 3.93 0 0 0-3 1.1C4.2 6.9 2 16.25 2 16.25l.8.8A3.93 3.93 0 0 0 5 19l2.5-2.5" />
          <path d="M14.5 5.5 19 10" />
          <path d="M6 13a4 4 0 0 0 4 4" />
          <path d="M16 16a4 4 0 0 1-4 4h-2" />
          <path d="M22 12a10.06 10.06 0 0 1-3 7" />
        </g>

        <!-- Shield -->
        <path *ngSwitchCase="'shield'" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        
        <!-- Shield Check -->
        <g *ngSwitchCase="'shield-check'">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </g>

        <!-- Map Pin -->
        <g *ngSwitchCase="'map-pin'">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </g>

        <!-- Briefcase -->
        <g *ngSwitchCase="'briefcase'">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </g>

        <!-- Dollar Sign -->
        <g *ngSwitchCase="'dollar'">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </g>

        <!-- Rupee -->
        <g *ngSwitchCase="'rupee'">
          <path d="M6 3h12" />
          <path d="M6 8h12" />
          <path d="m6 13 8.5 8" />
          <path d="M6 13h3" />
          <path d="M9 13c6.667 0 6.667-10 0-10" />
        </g>

        <!-- Search -->
        <g *ngSwitchCase="'search'">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </g>

        <!-- Check Circle -->
        <g *ngSwitchCase="'check-circle'">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </g>

        <!-- Clock -->
        <g *ngSwitchCase="'clock'">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </g>

        <!-- Chevron Right -->
        <polyline *ngSwitchCase="'chevron-right'" points="9 18 15 12 9 6" />

        <!-- Share-2 -->
        <g *ngSwitchCase="'share-2'">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </g>

        <!-- Bookmark -->
        <path *ngSwitchCase="'bookmark'" d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />

        <!-- Plus -->
        <g *ngSwitchCase="'plus'">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </g>

        <!-- Eye -->
        <g *ngSwitchCase="'eye'">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </g>

        <!-- Message-Square -->
        <path *ngSwitchCase="'message-square'" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />

        <!-- Layout -->
        <g *ngSwitchCase="'layout'">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </g>
        
        <!-- Default Circle -->
        <circle *ngSwitchDefault cx="12" cy="12" r="10" />
      </ng-container>
    </svg>
  `
})
export class IconComponent {
  @Input() name: string = '';
  @Input() size: number = 24;
  @Input() strokeWidth: number = 2;
  @Input() class: string = '';
}
