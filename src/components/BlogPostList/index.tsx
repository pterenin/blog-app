
import InlinePost from "../InlinePost";
import { Post } from "../../Types/types"
import InfiniteScroll from 'react-infinite-scroll-component';
import "./styles.scss";

interface BlogPostListProps {
  postList: Post[];
  fetchNextPage: () => void;
  totalCount: number;
  onEdit: Function;
  onDelete: Function;
}

function BlogPostList({ postList, fetchNextPage, totalCount, onEdit, onDelete }: BlogPostListProps) {

  return (
    <div className="list-container" id="scrollableDiv">
      <h2>Posts</h2>
      <InfiniteScroll
        dataLength={postList.length}
        next={fetchNextPage}
        hasMore={totalCount > postList.length}
        loader={<p>Loading...</p>}
        scrollableTarget="scrollableDiv"
      >
        {postList.map((post, i) => {
          return <InlinePost
            onDelete={onDelete}
            onEdit={onEdit}
            key={post.id + '' + i}
            index={i}
            post={post} />
        })}
      </InfiniteScroll>
    </div>
  );
}

export default BlogPostList;
