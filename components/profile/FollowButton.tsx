"use client";

import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { followUser, unfollowUser } from "@/lib/actions/followActions";
import { toast } from "sonner";

interface FollowButtonProps {
  userId: string;
  isFollowing?: boolean;
}

export function FollowButton({ userId, isFollowing = false }: FollowButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(async () => {
      try {
        if (isFollowing) {
          await unfollowUser(userId);
          toast.success("Unfollowed user");
        } else {
          await followUser(userId);
          toast.success("Followed user");
        }
      } catch (error) {
        toast.error("Something went wrong");
        console.error(error);
      }
    });
  };

  return (
    <Button
      onClick={handleFollow}
      disabled={isPending}
      variant={isFollowing ? "outline" : "default"}
      className="px-6"
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
}