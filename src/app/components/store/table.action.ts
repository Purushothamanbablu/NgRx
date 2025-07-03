import { createAction, props } from '@ngrx/store';

export enum fullDatasType {
  user = '[add-table] initial data loading...',
  userSuccess = '[add-table] Data fetched success',
  userFailure = '[add-table] Data failure',

  newUser = '[add-table] newUser',
  newUserSuccess = '[add-table] Created successfully',
  newUserFailure = '[add-table] This is a failure',

  editUser = '[add-table] editUser',
  editUserSuccess = '[add-table] Edited successfully',
  editUserFailure = '[add-table] This is a failure',

  deleteUser = '[add-table] deleteUser',
  deleteUserSuccess = '[add-table] Deleted successfully',
  deleteUserFailure = '[add-table] This is a failure',
}

const user = createAction(fullDatasType.user);
const userSuccess = createAction(
  fullDatasType.userSuccess,
  props<{ UserData: { id:any; name: string; address: string; }[] }>()
);
const userFailure = createAction(
  fullDatasType.userFailure,
  props<{ error: any }>()
);

const newUser = createAction(
  fullDatasType.newUser,
  props<{ userDatas: { name: string; address: string } }>()
);
const newUserSuccess = createAction(
  fullDatasType.newUserSuccess,
  props<{ userDatas: { id:any; name: string; address: string } }>()
);
const newUserFailure = createAction(
  fullDatasType.newUserFailure,
  props<{ error: any }>()
);

const editUser = createAction(
  fullDatasType.editUser,
  props<{ userDatas: { id: any; name: string; address: string } }>()
);
const editUserSuccess = createAction(
  fullDatasType.editUserSuccess,
  props<{ userDatas: { id: any; name: string; address: string } }>()
);
const editUserFailure = createAction(
  fullDatasType.editUserFailure,
  props<{ error: any }>()
);

const deleteUser = createAction(
  fullDatasType.deleteUser,
  props<{ id: any }>()
);  
const deleteUserSuccess = createAction(
  fullDatasType.deleteUserSuccess,
  props<{ id: any }>()
);
const deleteUserFailure = createAction(
  fullDatasType.deleteUserFailure,
  props<{ error: any }>()
);

export const tableActions = {
  loadUser: { user, userSuccess, userFailure },
  createNewUser: { newUser, newUserSuccess, newUserFailure },
  editUserData: { editUser, editUserSuccess, editUserFailure },
deleteUserData: { deleteUser, deleteUserSuccess, deleteUserFailure } ,  

};
