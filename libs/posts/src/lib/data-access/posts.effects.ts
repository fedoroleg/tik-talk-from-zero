import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { map, switchMap } from "rxjs";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { postsActions } from "./posts.actions";
import { Post } from "@tt/common-models";
import { environments } from "@tt/environments";

const API_URL = environments.api_url

export const getPostsEffect = createEffect((actions$ = inject(Actions), http = inject(HttpClient)) => {
  return actions$.pipe(
    ofType(postsActions.getPosts),
    switchMap(() => {
      return http.get<Post[]>(`${API_URL}post/`).pipe(
        map(posts => {
          return postsActions.getPostsSuccess({posts: posts})
        })
      )
    })
  )
}, {functional: true})