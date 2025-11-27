"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import MDEditor from "@uiw/react-md-editor";

// 브라우저용으로 기본 Supabase 클라이언트를 직접 생성
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export default function PostWritePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleWrite = async () => {
    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    const { error } = await supabase.from("post").insert({
      title,
      content,
    });

    if (error) {
      console.log(error);
      alert("글 저장 중 오류 발생!!");
      return;
    }

    setTitle("");
    setContent("");

    alert("글이 작성되었습니다.");
    router.push("/");
  };

  return (
    <>
      <section className="post-write-section flex flex-col w-full ">
        <div className="inner flex flex-col gap-2 p-3 h-full">
          <h1 className="text-2xl font-bold text-center">게시글 작성</h1>
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
          <Button onClick={handleWrite}>작성</Button>
        </div>
      </section>
    </>
  );
}
