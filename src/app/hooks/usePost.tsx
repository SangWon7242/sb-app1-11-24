"use client";

import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export const usePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPost = async (
    title: string,
    content: string
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.from("post").insert({
        title,
        content,
      });

      if (error) throw error;

      return true;
    } catch (err) {
      const errMsg = "글 저장 중 오류 발생!";
      setError(errMsg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createPost,
  };
};
