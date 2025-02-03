import {Component, computed, effect, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {rxResource} from '@angular/core/rxjs-interop';
import {GroupsService} from '../../../../services/groups.service';
import {of} from 'rxjs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {UserHttpService} from '../../../../http/user.http.service';
import {MatListModule} from '@angular/material/list';

interface DialogData {
  _id?: string;
  name?: string;
}

@Component({
  selector: 'm-manager-group-modal',
  imports: [
    ReactiveFormsModule, MatButtonModule,
    MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose,
    MatFormFieldModule, MatInputModule, MatIconModule, MatListModule
  ],
  templateUrl: './manager-group-modal.component.html',
  styleUrl: './manager-group-modal.component.scss'
})
export class ManagerGroupModalComponent {

  readonly dialogRef = inject(MatDialogRef<ManagerGroupModalComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly groups = inject(GroupsService);
  readonly userHttpService = inject(UserHttpService);

  form: FormGroup = new FormGroup({
    _id: new FormControl(null),
    name: new FormControl('', Validators.required),
    users: new FormControl([], [Validators.required, Validators.minLength(1)])
  })

  hasId = computed(() => !!this.data?._id)

  userRx = rxResource({
    loader: () => this.userHttpService.findAll()
  })

  groupRx = rxResource({
    loader: () => {
      if (this.data._id) {
        return this.groups.findById(this.data._id)
      }
      return of(undefined)
    }
  })

  updateFormEff = effect(() => {
    const gr = this.groupRx.value()

    if (gr) {
      const {_id, name, users} = gr;
      this.form.patchValue({_id, name, users: users.map(u => u._id)})
    }
  })

  save(): void {
    const {value} = this.form;
    this.hasId() ?
      this.groups.update(value) :
    this.groups.create(value)
  }
}
