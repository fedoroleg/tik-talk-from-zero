import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { CommentCreateDto, Post, PostComment, PostCreateDTO } from "@tt/common-models";

export const postsActions = createActionGroup({
  source: 'posts',
  events: {
    getPosts: emptyProps(),
    getPostsSuccess: props<{posts: Post[]}>(),
    addPost: props<{post: PostCreateDTO}>(),
    addPostSuccess: props<{post: Post}>(),
    addComment: props<{comment: CommentCreateDto}>(),
    addCommentSuccess: props<{comment: PostComment}>(),
  }
})