import { Post } from "@/types";
import { PostItem } from "@/components/posts/PostItem";

interface UserPostsProps {
  posts: Post[];
}

export function UserPosts({ posts }: UserPostsProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No posts yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}