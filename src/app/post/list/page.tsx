import Link from "next/link";
import styles from "./List.module.css";
import { getPosts } from "@/app/services/PostService";

export default async function PostListPage() {
  const posts = await getPosts();

  if (!posts) {
    return <div>게시물 목록 조회 실패</div>;
  }

  return (
    <section className={styles["post-list"]}>
      <div className="inner container mx-auto flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-center my-5">글 목록</h1>
        <nav className={styles["post-menu-wrap"]}>
          <ul className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5">
            {posts.map((post) => (
              <li key={post.id} className={styles["post-item"]}>
                <Link
                  href={`/post/${post.id}`}
                  className="flex h-full flex-col"
                >
                  <div className={styles["post-thumbnail"]}>이미지</div>
                  <div className={styles["post-title"]}>{post.title}</div>
                  <div className={styles["post-content"]}>{post.content}</div>
                  <div className={styles["post-info-box"]}>
                    <div className={styles["profile-img"]}>^-^</div>
                    <div className={styles["profile-name"]}>
                      <span className="text-[#868e96]">by</span>
                      <span className="font-bold ml-2">유저1</span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
