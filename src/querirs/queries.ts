import { gql } from '@apollo/client';

export const GET_POSTS = gql`
    query GetPosts($options: PageQueryOptions) {
        posts(options: $options) {
            data {
                id
                title
                body
            }
            meta {
                totalCount
            }
        }
    }
`;

export const CREATE_POST = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      title
      body
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      id
      title
      body
    }
  }
`;