import { createFeatureSelector, createSelector } from "@ngrx/store";
import { userState } from "./table.reducer";
import { tableActions } from "./table.action";


export const selectUserState = createFeatureSelector<userState>('user');

export const selectUserData = createSelector(selectUserState,(state)=>state.userDatas)
export const selectLoad = createSelector(selectUserState,(state)=>state.loading)
export const selectError = createSelector(selectUserState,(state)=>state.error)

export const selectUserById = createSelector(
  selectUserState,(state)=>state.userDatas);

export const selectUserByIdWithId = (id: any) => createSelector(
  selectUserById,   
    (userDatas) => userDatas.find(user => user.id === id)
);