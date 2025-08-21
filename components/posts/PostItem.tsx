import { Post } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageCircle, Repeat2, Share } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PostItemProps {
  post: Post;
}

export function PostItem({ post }: PostItemProps) {
  const initials = post.author.displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="border-b pb-6 last:border-0">
      <div className="flex gap-3">
        <Avatar>
          {post.author.avatarUrl ? (
            <AvatarImage src={post.author.avatarUrl} alt={post.author.displayName} />
          ) : (
            <AvatarFallback>{initials}</AvatarFallback>
          )}
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold">{post.author.displayName}</h3>
            <span className="text-muted-foreground">@{post.author.username}</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground text-sm">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </span>
          </div>
          
          <p className="mt-2 text-foreground">{post.content}</p>
          
          {post.mediaUrl && (
            <div className="mt-3 rounded-lg overflow-hidden border">
              <img 
                src={post.mediaUrl} 
                alt="Post media" 
                className="w-full h-auto object-cover"
              />
            </div>
          )}
          
          <div className="mt-4 flex justify-between max-w-md">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <MessageCircle className="w-4 h-4 mr-1" />
              <span>{post.commentsCount}</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-green-500">
              <Repeat2 className="w-4 h-4 mr-1" />
              <span>{post.repostsCount}</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-red-500">
              <Heart className="w-4 h-4 mr-1" />
              <span>{post.likesCount}</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <Share className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}