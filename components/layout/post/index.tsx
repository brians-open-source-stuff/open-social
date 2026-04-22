import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { getTimePosted } from "@/lib/utils";
import { FiHeart, FiMessageCircle } from "react-icons/fi";
import { likePostAction } from "./like-post-action";



export default function Post({ post }) {
	return (
		<article>
			<Card>
				<CardHeader className="flex justify-between">
					<p>{post.user.profile.firstname} {post.user.profile.lastname}</p>
					<span>{getTimePosted(post.createdAt)}</span>
				</CardHeader>
				<CardContent>
					<p>{post.content}</p>
				</CardContent>
				<CardFooter>
					<form action={likePostAction}>
						<input type="hidden" name="postId" value={post.id} />
						<Button
							variant="ghost"
							type="submit"
							disabled={post.isOwnPost}
							aria-label="Like post"
						>
							<FiHeart fill={post.likedByMe ? "red" : "none"} />
							<span>{post.likeCount}</span>
						</Button>
					</form>
					<Button variant="ghost"><FiMessageCircle /></Button>
				</CardFooter>
			</Card>
		</article>
	);
}