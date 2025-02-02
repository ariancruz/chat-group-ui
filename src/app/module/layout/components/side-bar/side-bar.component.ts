import {Component, inject} from '@angular/core';
import {GroupsService} from '../../../../services/groups.service';
import {MatListModule} from '@angular/material/list';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'l-side-bar',
  imports: [MatListModule, RouterLinkActive, RouterLink],
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
        </a>
      }
    </mat-selection-list>
  `,
})
export class SideBarComponent {
    groups = inject(GroupsService);
}
