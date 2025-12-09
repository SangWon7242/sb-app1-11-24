import { redirect } from "next/navigation";
import { getPostById } from "@/app/services/PostService";
import PostEditPage from "./PostEditPage";

export default async function PostEditForm({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const post = await getPostById(Number(id));

  if (!post) {
    redirect("/post/list");
  }

  return <PostEditPage post={post} />;
}
