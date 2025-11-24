"use client";

import { useState } from "react";
import { Post } from "@/app/types/post";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function PostWritePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [posts, setPosts] = useState<Post[]>([]);

  const handleWrite = () => {
    if (!title.trim() || !content.trim()) return;

    const lastPostId = posts[posts.length - 1]?.id || 0;

    setPosts((post) => [
      ...post,
      {
        id: lastPostId + 1,
        title,
        content,
      },
    ]);

    setTitle("");
    setContent("");
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
      <div>{JSON.stringify(posts)}</div>
    </>
  );
}
