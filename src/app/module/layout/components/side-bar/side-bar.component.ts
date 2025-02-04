import {Component, inject} from '@angular/core';
import {GroupsService} from '../../../../services/groups.service';
import {MatListModule, MatSelectionListChange} from '@angular/material/list';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {SocketService} from '../../../../services/socket.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {tap} from 'rxjs';
import {SessionService} from '../../../../services/session.service';
import {EventsWs} from '../../../../enums';
import {GroupsLightTO} from '../../../../models';
import {MatButtonModule} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialog} from '@angular/material/dialog';
import {ManagerGroupModalComponent} from '../manager-group-modal/manager-group-modal.component';

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
    <div class="flex flex-row align-items-center mx-3">
      <h5 class="flex-1">Mis grupos</h5>
      <button mat-icon-button (click)="addGroup()">
        <mat-icon>add_circle</mat-icon>
      </button>
    </div>
    <mat-divider/>
    <mat-selection-list [multiple]="false" hideSingleSelectionIndicator (selectionChange)="updateSelected($event)">
      @for (chat of groups.groupList(); track chat._id; ) {
        <mat-list-option routerLinkActive="activated" [routerLink]="['/',chat._id]" [value]="chat">
          <div class="flex flex-row justify-content-between align-items-center">
            <span class="label-link">{{ chat.name }}</span>
            <button mat-icon-button [matMenuTriggerFor]="menu" matListItemMeta
                    (click)="menuSelected($event, chat)">
              <mat-icon>more_vert</mat-icon>
            </button>
          </div>
        </mat-list-option>
      }
    </mat-selection-list>
    <mat-menu #menu="matMenu">
      <button mat-menu-item (click)="editGroup()">
        <mat-icon>edit</mat-icon>
        Editar
      </button>
      <button mat-menu-item (click)="deleteGroup()">
        <mat-icon>delete</mat-icon>
        Eliminar
      </button>
    </mat-menu>
  `,
})
export class SideBarComponent {
  groups = inject(GroupsService);
  socket = inject(SocketService);
  session = inject(SessionService);
  readonly dialog = inject(MatDialog);

  private menuSelect: GroupsLightTO | null = null;

  constructor() {
    const channel = this.session.userId() + ':';
    this.socket.on(channel + EventsWs.ADD_GROUP).pipe(
      takeUntilDestroyed(),
      tap((group: GroupsLightTO) => this.groups.addGroup(group))
    ).subscribe()
    this.socket.on(channel + EventsWs.UPDATE_GROUP).pipe(
      takeUntilDestroyed(),
      tap((group: GroupsLightTO) => this.groups.updateGroup(group))
    ).subscribe()
  }

  updateSelected($event: MatSelectionListChange): void {
    const selected = $event.options[0].value;
    this.groups.setSelected(selected);
  }

  menuSelected($event: Event, chat: GroupsLightTO): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.menuSelect = chat;
  }


  editGroup(): void {
    this.dialog.open(ManagerGroupModalComponent, {data: this.menuSelect});
  }


  deleteGroup(): void {
    if (this.menuSelect) {
      this.groups.delete(this.menuSelect._id)
    }
  }

  addGroup(): void {
    this.dialog.open(ManagerGroupModalComponent);
  }
}
