
import FormModal from "../FormModal";
import BlogPostList from "../BlogPostList";
import usePostManagement from "../../hooks/usePostManagement";
import { Post } from "../../Types/types"
import "./styles.scss";
import Layout from "../Layout";


function AppContainer() {

  const {
    show, setShow,
    editedPost, setEditedPost,
    totalCount,
    postList, setPostList,
    handleDelete, handleUpdatePost, fetchNextPage, savePendig
  } = usePostManagement();

  const addPost = (post: Post) => {
    setPostList([post, ...postList]);
  }

  const handleEditClick = (post: Post) => {
    setEditedPost(post);
    handleShow();
  }

  const handleClose = () => {
    setShow(false);
    setEditedPost(undefined);
  };
  const handleShow = () => setShow(true);

  return (
    <div className="app-container">
      <Layout savePendig={savePendig} handleShow={handleShow} />
      <div className="content">
        <BlogPostList
          onEdit={handleEditClick}
          onDelete={handleDelete}
          totalCount={totalCount}
          fetchNextPage={fetchNextPage}
          postList={postList} />
      </div>
      <FormModal
        updatePost={handleUpdatePost}
        post={editedPost}
        show={show}
        handleClose={handleClose}
        addPost={addPost} />
    </div >
  );
}

export default AppContainer;
