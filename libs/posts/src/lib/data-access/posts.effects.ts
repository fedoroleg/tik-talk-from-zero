import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { postsActions } from './posts.actions';
import { Post, PostComment } from '@tt/common-models';
import { environments } from '@tt/environments';

const API_URL = environments.api_url;

export const getPostsEffect = createEffect(
  (actions$ = inject(Actions), http = inject(HttpClient)) => {
    return actions$.pipe(
      ofType(postsActions.getPosts),
      switchMap(() => {
        return http.get<Post[]>(`${API_URL}post/`).pipe(
          map((posts) => {
            return postsActions.getPostsSuccess({ posts: posts });
          })
        );
      })
    );
  },
  { functional: true }
);

export const addPostEffect = createEffect(
  (actions$ = inject(Actions), http = inject(HttpClient)) => {
    return actions$.pipe(
      ofType(postsActions.addPost),
      switchMap(({ post }) => {
        return http.post<Post>(`${environments.api_url}post/`, post).pipe(
          map((post) => {
            return postsActions.addPostSuccess({ post });
          })
        );
      })
    );
  },
  { functional: true }
);

export const addComment = createEffect(
  (actions$ = inject(Actions), http = inject(HttpClient)) => {
    return actions$.pipe(
      ofType(postsActions.addComment),
      switchMap(({ comment }) => {
        return http
          .post<PostComment>(`${environments.api_url}comment/`, comment)
          .pipe(map((comment) => postsActions.addCommentSuccess({ comment })));
      })
    );
  },
  { functional: true }
);
