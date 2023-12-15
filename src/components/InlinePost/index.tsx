import { Post } from "../../Types/types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import "./styles.scss";

interface InlinePostPropsTypes {
  post: Post;
  index: number;
  onEdit: Function;
  onDelete: Function;
}

function InlinePost({ post, index, onDelete, onEdit }: InlinePostPropsTypes) {
  return <div className={`post-inline ${post.updating ? 'updating' : ''}`}>
    <div className={`card-image card-image-${index % 5}`}>
      <h3>{post?.title && post.title[0]}</h3>
    </div>
    <div className="card-content">
      <h2 className="card-title">{post.title}</h2>
      <p className="card-text">{post.body}</p>
    </div>
    <div className="card-actions">
      {!post.id && <span className="post-date">• Pending</span>}
      <div className="button" data-testid="edit-btn" onClick={() => onEdit(post)}>
        <FontAwesomeIcon icon={faEdit} />
      </div>
      <div className="button" data-testid="delete-button" onClick={() => onDelete(post)}>
        <FontAwesomeIcon icon={faTrash} />
      </div>
    </div>
  </div>;
}

export default InlinePost;
