import { createClient } from "@/app/utils/supabase/server";
import { notFound } from "next/navigation";

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const supabase = await createClient();
  const { id } = await params;

  // SELECT * FROM post WHERE id = id;
  const { data: post, error } = await supabase
    .from("post")
    .select("*")
    .eq("id", id) // WHERE id = id;
    .single(); // single() : 배열이 아닌 단일 객체를 반환

  if (error) {
    console.error("게시물 조회 에러 :", error);
    notFound();
  }

  if (!post) {
    notFound();
  }

  return (
    <section>
      <div>번호 : {post.id}</div>
      <div>작성날짜 : {post.created_at}</div>
      <div>제목 : {post.title}</div>
      <div>내용 : {post.content}</div>
    </section>
  );
}
