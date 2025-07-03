import { createReducer, on, State } from '@ngrx/store';
import { tableActions } from './table.action';

export interface userState {
  userDatas: { id: any; name: string; address: string }[];
  loading: boolean;
  error: any;
}

export const initialStage: userState = {
  userDatas: [],
  loading: false,
  error: null,
};

export const userReducer = createReducer(
  initialStage,
  on(tableActions.loadUser.user, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(tableActions.loadUser.userSuccess, (state, { UserData }) => ({
    ...state,
    userDatas: UserData,
    loading: false,
    error: null,
  })),
  on(tableActions.loadUser.userFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(tableActions.createNewUser.newUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(tableActions.createNewUser.newUserSuccess, (state, { userDatas }) => ({
    ...state,
    userDatas: [...state.userDatas, userDatas],
    loading: false,
  })),
  on(tableActions.createNewUser.newUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(tableActions.editUserData.editUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(tableActions.editUserData.editUserSuccess, (state, { userDatas }) => ({
    ...state,
    userDatas: state.userDatas.map((user) =>
      user.id === userDatas.id ? { ...user, ...userDatas } : user
    ),
    loading: false,
    error: null,
  })),
  on(tableActions.editUserData.editUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(tableActions.deleteUserData.deleteUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(tableActions.deleteUserData.deleteUserSuccess, (state, { id }) => ({
    ...state,
    userDatas: state.userDatas.filter((user) => user.id !== id),
    loading: false,
    error: null,
  })),
  on(tableActions.deleteUserData.deleteUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
