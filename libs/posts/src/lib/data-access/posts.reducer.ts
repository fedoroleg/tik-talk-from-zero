import { createFeature, createReducer, on } from "@ngrx/store";
import { LoadingStatus, Post } from "@tt/common-models";
import { postsActions } from "./posts.actions";

export type PostsState = {
  posts: Post[],
  loadingStatus: LoadingStatus;
  error: null;
}

export const postsInitialState: PostsState = {
  posts: [],
  loadingStatus: 'init',
  error: null
}

export const postsFeatureKey = 'posts';

export const postsFeature = createFeature({
  name: postsFeatureKey,
  reducer: createReducer(
    postsInitialState,
    on(postsActions.getPosts, (state) => ({...state, loadingStatus: 'loading' as const})),
    on(postsActions.getPostsSuccess, (state, {posts}) => ({...state, loadingStatus: 'loaded' as const, posts})),
  )
})