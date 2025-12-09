"use client";

import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import { Post } from "@/app/types/post";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export const usePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 게시물 작성
  const createPost = async (
    title: string,
    content: string
  ): Promise<Post | null> => {
    setLoading(true);
    setError(null);

    try {
      // 저장함과 동시에 데이터를 가져옴
      // INSERT INTO post (title, content) VALUES (?, ?);
      // SELECT * FROM post WHERE id = ?;
      const { data, error } = await supabase
        .from("post")
        .insert({
          title,
          content,
        })
        .select()
        .single();

      if (error) throw error;

      return data;
    } catch (err) {
      const errMsg = "글 저장 중 오류 발생!";
      setError(errMsg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // 게시물 수정
  const modifyPost = async (
    id: number,
    title: string,
    content: string
  ): Promise<Post | null> => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from("post")
        .update({ title, content })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      return data;
    } catch (err) {
      const errMsg = "글 수정 중 오류 발생!";
      setError(errMsg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createPost,
    modifyPost,
  };
};
