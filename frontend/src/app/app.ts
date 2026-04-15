import { Component, inject, effect, CUSTOM_ELEMENTS_SCHEMA, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { TuiRoot } from '@taiga-ui/core';
import { LayoutService } from './core/services/layout.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, TuiRoot],
  templateUrl: './app.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class App implements AfterViewInit {
  layoutService = inject(LayoutService);
  
  @ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;

  constructor() {
    // Sync collapsed state with a class on the :root element for global CSS variables
    effect(() => {
      if (this.layoutService.isCollapsed()) {
        document.documentElement.classList.add('sidebar-collapsed');
      } else {
        document.documentElement.classList.remove('sidebar-collapsed');
      }
    });
  }

  ngAfterViewInit() {
    if (this.bgVideo?.nativeElement) {
      this.playVideo(this.bgVideo.nativeElement);
    }
  }

  onVideoReady(video: HTMLVideoElement) {
    this.playVideo(video);
  }

  private playVideo(video: HTMLVideoElement) {
    video.muted = true;
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.warn('Autoplay prevented. Video will start after interaction.', error);
        const startVideo = () => {
          video.play();
          window.removeEventListener('click', startVideo);
        };
        window.addEventListener('click', startVideo);
      });
    }
  }
}
