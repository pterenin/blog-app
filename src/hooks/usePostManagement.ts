import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_POSTS, CREATE_POST, UPDATE_POST, DELETE_POST } from "../querirs/queries"
import { Post } from '../Types/types';

const usePostManagement = () => {
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const [editedPost, setEditedPost] = useState<Post | undefined>(undefined);
  const [totalCount, setTotalCount] = useState(0);
  const [postList, setPostList] = useState<Post[]>([]);

  const { loading, error, data, fetchMore } = useQuery(GET_POSTS, {
    variables: {
      options: {
        paginate: {
          page: page,
          limit: 20
        }
      }
    }
  });
  const [createPost, { data: createPostData, loading: createPostLoading, error: createPostError }] = useMutation(CREATE_POST);
  const [deletePost, { loading: deleting, error: deleteError }] = useMutation(DELETE_POST, {
    onCompleted: () => {
    }
  });
  const [updatePost, { loading: updating, error: updateError }] = useMutation(UPDATE_POST);

  useEffect(() => {
    if (data?.posts?.data) {
      setPostList([...postList, ...data.posts.data]);
      setTotalCount(data.posts.meta.totalCount);
    }
  }, [data, loading]);



  const handleDelete = async (deleingPost: Post) => {
    const updatedPosts = postList.map(post =>
      post.id === deleingPost.id ? { ...post, updating: true } : post
    );
    setPostList(updatedPosts);
    try {
      const result = await deletePost({ variables: { id: deleingPost.id } });
      setPostList(postList.filter(p => p.id != deleingPost.id));

    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdatePost = async (title: string, body: string) => {
    if (!editedPost) return;
    const updatedPosts = postList.map(post =>
      post.id === editedPost.id ? { ...post, updating: true } : post
    );
    setPostList(updatedPosts);
    try {
      await updatePost({
        variables: {
          id: editedPost.id,
          input: { title, body }
        }
      });
      const updatedPosts = postList.map(post =>
        post.id === editedPost.id ? { id: editedPost.id, title, body } : post
      );
      setPostList(updatedPosts);
    } catch (e) {
      console.error(e);
    }
  }

  const fetchNextPage = () => {
    const newPage = page + 1;
    setPage(newPage);
    fetchMore({
      variables: {
        options: {
          paginate: {
            page: newPage,
            limit: 20
          }
        }
      }
    })
  };

  const savePendig = async () => {
    const pendingPosts = postList.filter(post => { return !post.id });
    try {
      for (const post of pendingPosts) {
        const response = await createPost({
          variables: {
            input: post
          }
        });
        const createdPostId = response.data.createPost.id;
        post.id = createdPostId + Date.now();
      }
    } catch (e) {
      console.error(e);
    }
  }

  return {
    show, setShow,
    editedPost, setEditedPost,
    totalCount,
    postList, setPostList,
    handleDelete, handleUpdatePost, fetchNextPage, savePendig
  };
};

export default usePostManagement;