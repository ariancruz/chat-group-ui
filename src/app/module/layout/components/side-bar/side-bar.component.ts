import {Component, inject} from '@angular/core';
import {GroupsService} from '../../../../services/groups.service';
import {MatListModule} from '@angular/material/list';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {SocketService} from '../../../../services/socket.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {tap} from 'rxjs';
import {SessionService} from '../../../../services/session.service';
import {EventGroup} from '../../../../enums';
import {GroupsLightTO} from '../../../../models';
import {MatButtonModule} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'l-side-bar',
  imports: [MatListModule, RouterLinkActive, RouterLink, MatButtonModule, MatIcon, MatMenuModule],
  styles: `
    :host {
      display: flex;
      background-color: white;
      border-top-right-radius: 1rem;
      margin-right: 1rem;
      flex-wrap: wrap;
      flex-direction: column;
      height: inherit;

      .activated {
        .label-link {
          color: var(--blue-500) !important;
        }

        background-color: #eee;
        border-radius: 15px;
      }
    }
  `,
  template: `
    <mat-selection-list [multiple]="false">
      @for (chat of groups.groupList(); track chat._id; ) {
        <a mat-list-item routerLinkActive="activated" [routerLink]="['/',chat._id]">
          <span class="label-link">{{ chat.name }}</span>
          <button mat-icon-button [matMenuTriggerFor]="menu" matListItemMeta>
            <mat-icon>more_vert</mat-icon>
          </button>
        </a>
      }
    </mat-selection-list>
    <mat-menu #menu="matMenu">
      <button mat-menu-item>Editar</button>
      <button mat-menu-item>Eliminar</button>
    </mat-menu>
  `,
})
export class SideBarComponent {
  groups = inject(GroupsService);
  socket = inject(SocketService);
  session = inject(SessionService);

  constructor() {
    const channel = this.session.userId() + ':';
    this.socket.on(channel + EventGroup.ADD_GROUP).pipe(
      takeUntilDestroyed(),
      tap((group: GroupsLightTO) => this.groups.addGroup(group))
    ).subscribe()
    this.socket.on(channel + EventGroup.UPDATE_GROUP).pipe(
      takeUntilDestroyed(),
      tap((group: GroupsLightTO) => this.groups.updateGroup(group))
    ).subscribe()
  }
}
