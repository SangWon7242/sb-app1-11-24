"use client";

import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export default function PostEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const loadPost = async () => {
      const { id: postId } = await params;

      setId(postId);

      // SELECT * FROM post WHERE id = ?;
      const { data: post, error } = await supabase
        .from("post")
        .select("*")
        .eq("id", postId)
        .single();

      if (error) {
        console.error("게시물 조회 에러 :", error);
        router.push("/"); // 메인페이지로 이동
        return;
      }

      if (post) {
        setTitle(post.title);
        setContent(post.content);
      }

      setLoading(false);
    };

    loadPost();
  }, [params, router]);

  // 게시물 수정 처리
  const handleEdit = async () => {
    // 제목, 내용에 대한 유효성 검사
    if (!title.trim()) return alert("제목을 입력해주세요.");
    if (!content.trim()) return alert("내용을 입력해주세요.");

    // UPDATE post SET title = ?, content = ? WHERE id = ?;
    const { error } = await supabase
      .from("post")
      .update({ title, content })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("게시물 수정 실패 :", error);
      return;
    }

    alert(`${id}번 게시물이 수정되었습니다.`);
    router.push(`/post/${id}`);
  };

  useEffect(() => {
    const saveKeyDown = (e: KeyboardEvent) => {
      // Ctrl + s, cmd + s
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault(); // 브라우저에서 ctrl + s 눌렀을 때 기본 이벤트를 막음
        handleEdit();
      }
    };

    window.addEventListener("keydown", saveKeyDown);

    // 클린업 함수
    return () => {
      window.removeEventListener("keydown", saveKeyDown);
    };
  }, [title, content]);

  return (
    <>
      <section className="post-write-section flex flex-col w-full ">
        <div className="inner flex flex-col gap-2 p-3 h-full">
          <h1 className="text-2xl font-bold text-center">게시글 수정</h1>
          <Input
            placeholder="제목을 입력해주세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="min-h-[calc(100vh-320px)]">
            <MDEditor
              value={content}
              height="100%"
              onChange={(val) => setContent(val || "")}
              preview="live" // 분할 화면으로 변경
              hideToolbar={false} // 툴바 표시/숨김
              enableScroll={true} // 스크롤 동기화
              visibleDragbar={false} // 크기 조절 바 표시
            />
          </div>
          <Button onClick={handleEdit}>수정</Button>
          <Button>
            <Link href="/">취소</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
