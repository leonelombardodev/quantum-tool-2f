import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { UserPosts } from "@/components/profile/UserPosts";
import { getUserByUsername } from "@/lib/actions/userActions";
import { getUserPosts } from "@/lib/actions/postActions";
import { notFound } from "next/navigation";

interface ProfilePageProps {
  params: {
    username: string;
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = params;
  
  // Fetch user data
  const user = await getUserByUsername(username);
  if (!user) {
    notFound();
  }
  
  // Fetch user's posts
  const posts = await getUserPosts(user.id);
  
  return (
    <div className="max-w-2xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <ProfileHeader user={user} />
      <UserPosts posts={posts} />
    </div>
  );
}