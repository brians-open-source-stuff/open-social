import PostForm from "@/components/forms/post-form"
import Post from "@/components/layout/post";
import { Separator } from "@/components/ui/separator";
import { getFeedPosts } from "@/data/post-dto"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Feed"
}

export default async function Feed() {
  const posts = await getFeedPosts();
  return (
    <section className="lg:w-lg mx-auto">
      <PostForm />
      <Separator className="my-8" />
      <section className="flex flex-col gap-8">
        {posts.map(post => <Post key={post.id} post={post} />)}
      </section>
    </section>
  );
}
