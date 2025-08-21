import { User } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FollowButton } from "@/components/profile/FollowButton";
import { CalendarIcon, MapPinIcon, LinkIcon } from "lucide-react";

interface ProfileHeaderProps {
  user: User;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const initials = user.displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="border-b pb-6 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <Avatar className="w-24 h-24">
          {user.avatarUrl ? (
            <AvatarImage src={user.avatarUrl} alt={user.displayName} />
          ) : (
            <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
          )}
        </Avatar>
        
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">{user.displayName}</h1>
              <p className="text-muted-foreground">@{user.username}</p>
            </div>
            <FollowButton userId={user.id} />
          </div>
          
          {user.bio && (
            <p className="mt-4 text-foreground">{user.bio}</p>
          )}
          
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPinIcon className="w-4 h-4" />
              <span>San Francisco, CA</span>
            </div>
            <div className="flex items-center gap-1">
              <LinkIcon className="w-4 h-4" />
              <a href="#" className="text-primary hover:underline">
                yourwebsite.com
              </a>
            </div>
            <div className="flex items-center gap-1">
              <CalendarIcon className="w-4 h-4" />
              <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className="mt-4 flex gap-6">
            <div>
              <span className="font-bold">{user.followingCount}</span>
              <span className="text-muted-foreground ml-1">Following</span>
            </div>
            <div>
              <span className="font-bold">{user.followersCount}</span>
              <span className="text-muted-foreground ml-1">Followers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}