import { createClient } from "@/app/utils/supabase/server";

export default async function PostListPage() {
  const supabase = await createClient();

  // SELECT * FROM post;
  const { data, error } = await supabase.from("post").select("*");

  if (error) {
    console.log(error);
    return;
  }

  return (
    <section>
      <h1>글 목록</h1>
      <nav className="post-list">
        <ul>
          {data.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
