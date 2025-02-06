import {Component, effect, ElementRef, inject, signal, viewChild} from '@angular/core';
import {SocketService} from '../../../../services/socket.service';
import {EventsWs} from '../../../../enums';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {tap} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {MatProgressBar} from '@angular/material/progress-bar';

interface Loading {
  status: boolean
}

@Component({
  selector: 'c-ia-loader',
  imports: [
    MatProgressBar
  ],
  styles: ``,
  template: `
    @if (loading()) {
      <div class="flex align-items-center gap-3 m-3 pb-3" #spinner>
        <span class="font-light text-gray-900">Gemini</span>
        <mat-progress-bar mode="indeterminate"></mat-progress-bar>
      </div>
    }
  `,
})
export class IaLoaderComponent {
  readonly socket = inject(SocketService);
  readonly activatedRoute = inject(ActivatedRoute)

  spinner = viewChild<ElementRef<HTMLDivElement>>('spinner')

  loading = signal(false)


  constructor() {
    const {id} = this.activatedRoute.snapshot.params
    const channel = id + ':';

    this.socket.on(channel + EventsWs.IA_LOADING).pipe(
      takeUntilDestroyed(),
      tap(({status}: Loading) => this.loading.set(status))
    ).subscribe()

    effect(() => {
      if (this.loading()) {
        this.spinner()?.nativeElement.scrollIntoView({behavior: 'smooth'})
      }
    });
  }
}
