"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import MDEditor from "@uiw/react-md-editor";
import { useSaveShortCut } from "@/app/hooks/useSaveShortCut";
import { usePost } from "@/app/hooks/usePost";

export default function PostWritePage() {
  const router = useRouter();

  const { createPost } = usePost();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleWrite = async () => {
    if (!title.trim()) return alert("제목을 입력해주세요.");
    if (!content.trim()) return alert("내용을 입력해주세요.");

    createPost(title, content);

    setTitle("");
    setContent("");

    alert("글이 작성되었습니다.");
    router.push("/");
  };

  useSaveShortCut(handleWrite, [title, content]);

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
