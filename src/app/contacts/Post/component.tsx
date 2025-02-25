import type { Post } from "@/types/app";
import styles from "./styles.module.scss";

interface PostProps {
  post: Post;
}

const PostComponent = ({ post }: PostProps) => {
  return (
    <div className={styles.post}>
      <div className={styles["post__author"]}>{post.author}</div>
      <div>{post.title}</div>
    </div>
  );
};

export default PostComponent;
