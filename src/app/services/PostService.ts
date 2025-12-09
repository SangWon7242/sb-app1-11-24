import { Post } from "@/app/types/post";
import { createClient } from "@/app/utils/supabase/server";

// 게시물 조회
export async function getPostById(id: number): Promise<Post | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("post")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("게시물 조회 실패 : ", error);
    return null;
  }

  return data;
}

// 게시물 리스트
export async function getPosts(): Promise<Post[]> {
  const supabase = await createClient();

  // SELECT * FROM post ORDER BY id DESC;
  // id를 기준으로 내림차순 정렬
  const { data, error } = await supabase
    .from("post")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("게시물 목록 조회 실패 : ", error);
    return [];
  }

  return data || [];
}
