import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Post } from "@tt/common-models";

export const postsActions = createActionGroup({
  source: 'posts',
  events: {
    getPosts: emptyProps(),
    getPostsSuccess: props<{posts: Post[]}>(),
  }
})