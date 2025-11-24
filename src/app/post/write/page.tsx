"use client";

import { useState } from "react";
import { Post } from "@/app/types/post";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export default function PostWritePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleWrite = async () => {
    if (!title.trim() || !content.trim()) return;

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
      <section className="post-write-section">
        <h1 className="text-2xl font-bold">게시글 작성</h1>
        <Input
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="내용을 입력해주세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button onClick={handleWrite}>작성</Button>
      </section>
    </>
  );
}
