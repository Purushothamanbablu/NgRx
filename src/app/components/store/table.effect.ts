import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tableActions } from './table.action';
import { tap } from 'rxjs/operators';
import { catchError, map, mergeMap, of } from 'rxjs';

const url = 'http://localhost:4000/students';

@Injectable()
export class tableView {
  constructor(private action$: Actions, private http: HttpClient) {}

  user$ = createEffect(() =>
    this.action$.pipe(
      ofType(tableActions.loadUser.user),
      tap(() => {
        console.log('Dispatching user creation request...');
      }),
      mergeMap(() =>
        this.http.get<{ id: any; name: string; address: string }[]>(url).pipe(
          map((UserData) => tableActions.loadUser.userSuccess({ UserData })),
          catchError((error) => {
            console.error('Error loading users:', error);
            return of(tableActions.createNewUser.newUserFailure({ error }));
          })
        )
      )
    )
  );

  newUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(tableActions.createNewUser.newUser),
      mergeMap((action: any) => {
        console.log(action);
        return this.http
          .post<{ name: string; address: string; id: any }>(
            url,
            action.userDatas
          )
          .pipe(
            map((userDatas) =>
              tableActions.createNewUser.newUserSuccess({ userDatas })
            ),
            catchError((error) => {
              console.error('Error creating user:', error);
              return of(tableActions.createNewUser.newUserFailure({ error }));
            })
          );
      })
    )
  );

  editUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(tableActions.editUserData.editUser),
      mergeMap((action: any) => {
        return this.http
          .put<{ name: string; address: string; id: any }>(
            `${url}/${action.userDatas.id}`,
            action.userDatas
          )
          .pipe(
            map((userDatas) =>
              tableActions.editUserData.editUserSuccess({ userDatas })
            ),
            catchError((error) => {
              console.error('Error editing user:', error);
              return of(tableActions.editUserData.editUserFailure({ error }));
            })
          );
      })
    )
  );
  deleteUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(tableActions.deleteUserData.deleteUser),
      mergeMap((action: any) => {
        return this.http.delete(`${url}/${action.id}`).pipe(
          map(() =>
            tableActions.deleteUserData.deleteUserSuccess({ id: action.id })
          ),
          catchError((error) => {
            console.error('Error deleting user:', error);
            return of(tableActions.deleteUserData.deleteUserFailure({ error }));
          })
        );
      })
    )
  );
}
