import {Component, inject, model} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MessagesService} from '../../../../services/messages.service';
import {GeminiDirective} from '../../directives/gemini.directive';
import {ActivatedRoute} from '@angular/router';
import {takeUntilDestroyed, toObservable, toSignal} from '@angular/core/rxjs-interop';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs';
import {NgTemplateOutlet} from '@angular/common';
import {SocketService} from '../../../../services/socket.service';
import {GroupsService} from '../../../../services/groups.service';
import {SessionService} from '../../../../services/session.service';
import {EventsWs} from '../../../../enums';

@Component({
  selector: 'c-text-input',
  imports: [
    FormsModule,
    MatIcon,
    MatIconButton,
    GeminiDirective,
    NgTemplateOutlet,
  ],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss',
})
export class TextInputComponent {

  value = model<string>('');
  showIcon = model<boolean>(false);

  private readonly socket = inject(SocketService);
  private readonly message = inject(MessagesService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly groupsService = inject(GroupsService);
  private readonly sessionService = inject(SessionService);

  private readonly group = toSignal(this.groupsService.group)

  constructor() {

    const userId = this.sessionService.userId();
    const name = this.sessionService.userAuth()?.name

    this.activatedRoute.params.pipe(
      takeUntilDestroyed(),
      tap(() => this.clear())
    ).subscribe()
    toObservable(this.value).pipe(
      takeUntilDestroyed(),
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe((value) => {
      const id= this.group()?._id;
      if (value !== '' && userId) {
        const users = this.group()?.users
          .map(m => m._id)
        //  .filter(f => f !== userId);
        this.socket.emit(EventsWs.TYPING, {id, users, name});
      }
    })
  }

  send(): void {
    this.message.send(this.value(), this.showIcon());
    this.clear();
  }

  showIa($event: boolean): void {
    this.showIcon.set($event);
  }

  private clear(): void {
    this.value.set('');
    this.showIcon.set(false);
  }
}
