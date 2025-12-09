"use client";

import { Post } from "@/app/types/post";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { usePost } from "@/app/hooks/usePost";
import { useSaveShortCut } from "@/app/hooks/useSaveShortCut";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import MDEditor from "@uiw/react-md-editor";

export default function PostEditPage({ post }: { post: Post }) {
  const router = useRouter();
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const { modifyPost } = usePost();

  // 게시물 수정 처리
  const handleEdit = async () => {
    const id = post.id;

    // 제목, 내용에 대한 유효성 검사
    if (!title.trim()) return alert("제목을 입력해주세요.");
    if (!content.trim()) return alert("내용을 입력해주세요.");

    const newPost = await modifyPost(id, title, content);

    if (!newPost) return alert("글 수정에 실패했습니다.");

    alert(`${id}번 게시물이 수정되었습니다.`);
    router.push(`/post/${id}`);
  };

  useSaveShortCut(handleEdit, [title, content]);

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
