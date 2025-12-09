import { formatDate } from "@/app/utils/dateForatter";
import MarkdownViewer from "@/components/MarkdownViewer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getPostById } from "@/app/services/PostService";
import { redirect } from "next/navigation";

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostById(Number(id));

  if (!post) {
    redirect("/post/list");
  }

  return (
    <section>
      <div>번호 : {post.id}</div>
      <div>작성날짜 : {formatDate(post.created_at)}</div>
      <div>제목 : {post.title}</div>
      <div>내용</div>
      <MarkdownViewer content={post.content} />
      <Button>
        <Link href={`/post/edit/${post.id}`}>수정</Link>
      </Button>
    </section>
  );
}
