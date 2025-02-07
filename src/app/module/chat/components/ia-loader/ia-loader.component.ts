import {Component, effect, ElementRef, inject, signal, viewChild} from '@angular/core';
import {SocketService} from '../../../../services/socket.service';
import {EventsWs} from '../../../../enums';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {merge, switchMap, tap} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {MatProgressBar} from '@angular/material/progress-bar';
import {SessionService} from '../../../../services/session.service';

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
    @if (loadingIa()) {
      <div class="flex align-items-center gap-3 m-3 pb-3" #spinner>
        <span class="font-light text-gray-900">Gemini</span>
        <mat-progress-bar mode="indeterminate"></mat-progress-bar>
      </div>
    }
    @if (typing()) {
      <span class="text-center ml-8 pl-8 text-gray-400 font-italic">{{ typing() }} esta escribiendo ...</span>
    }
  `,
})
export class IaLoaderComponent {
  readonly socket = inject(SocketService);
  readonly activatedRoute = inject(ActivatedRoute);
  readonly sessionService = inject(SessionService);


  spinner = viewChild<ElementRef<HTMLDivElement>>('spinner');

  loadingIa = signal(false);
  typing = signal<string | null>(null);


  constructor() {
    const userId = this.sessionService.userId();
    this.activatedRoute.params.pipe(
      takeUntilDestroyed(),
      switchMap(({id}) => {
        const channelIa = id + ':' + EventsWs.IA_LOADING;
        const channelTyping = EventsWs.TYPING + ':' + id + ':' + userId;

        const loading$ = this.socket.on(channelIa).pipe(
          tap(({status}: Loading) => this.loadingIa.set(status))
        );

        const typing$ = this.socket.on(channelTyping).pipe(
          tap(({name}: { name: string }) => this.typing.set(name))
        );

        return merge(loading$, typing$);
      })
    ).subscribe();

    effect(() => {
      if (this.loadingIa()) {
        this.spinner()?.nativeElement.scrollIntoView({behavior: 'smooth'});
      }
    });
    effect(() => {
      if (this.typing()) {
        setTimeout(() => this.typing.set(null), 500);
      }
    });
  }
}
