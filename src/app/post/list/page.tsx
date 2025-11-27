import { createClient } from "@/app/utils/supabase/server";
import Link from "next/link";

export default async function PostListPage() {
  const supabase = await createClient();

  // SELECT * FROM post;
  const { data, error } = await supabase.from("post").select("*");

  if (error) {
    console.error("게시물 리스트 조회 에러 :", error);
    return;
  }

  return (
    <section>
      <h1>글 목록</h1>
      <nav className="post-list">
        <ul>
          {data.map((post) => (
            <li key={post.id}>
              <Link href={`/post/${post.id}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
