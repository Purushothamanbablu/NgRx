import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUserData } from '../store/table.selectors';
import { tableActions } from '../store/table.action';

@Component({
  selector: 'app-add-table',
  templateUrl: './add-table.component.html',
  styleUrl: './add-table.component.scss',
})
export class AddTableComponent implements OnInit {
  formData: FormGroup;
  userData$: Observable<{ id: any; name: string; address: string }[]>;
  editMode: boolean = false;
  editUserId: any = null;
  successAlert: boolean = false;
  updateAlert: boolean = false;
  deleteAlert: boolean = false;

  constructor(private fb: FormBuilder, private store: Store) {
    this.formData = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
    });

    this.userData$ = this.store.select(selectUserData);
  }

  ngOnInit() {
    this.store.dispatch(tableActions.loadUser.user());
  }

  savedata() {
    if (this.formData.valid) {
      const formValueName = this.formData.value.name;
      const formValueAddress = this.formData.value.address;

      if (this.editMode && this.editUserId !== null) {
        this.store.dispatch(
          tableActions.editUserData.editUser({
            userDatas: {
              id: this.editUserId,
              name: formValueName,
              address: formValueAddress,
            },
          })
        );
        this.updateAlert = true;
        setTimeout(() => {
          this.updateAlert = false;
        }, 3000);
        this.editMode = false;
        this.editUserId = null;
      } else {
        this.store.dispatch(
          tableActions.createNewUser.newUser({
            userDatas: { name: formValueName, address: formValueAddress },
          })
        );
        this.successAlert = true;
        setTimeout(() => {
          this.successAlert = false;
        }, 3000);
      }

      this.formData.reset();
    }
  }

  Edit(user: { id: any; name: string; address: string }) {
    this.formData.patchValue({
      name: user.name,
      address: user.address,
    });
    this.editUserId = user.id;
    this.editMode = true;
  }

  Delete(user: { id: any; name: string; address: string }) {
    if (user) {
      const confirm = window.confirm(
        `Are you sure you want to delete ${user.name}'s Data?`
      );
      if (confirm) {
        this.store.dispatch(
          tableActions.deleteUserData.deleteUser({ id: user.id })
        );
        this.deleteAlert = true;
        setTimeout(() => {
          this.deleteAlert = false;
        }, 3000);
      }
    }
    this.editMode = false;
    this.editUserId = null;
  }
}
