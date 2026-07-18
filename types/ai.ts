import type { Mood } from "@/lib/mood";

export interface AiResponse {
  response: string;
  mood: Mood;
}
