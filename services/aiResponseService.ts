import { MoodService } from "@/lib/mood";
import type { AiResponse } from "@/types/ai";

export class AiResponseService {
  constructor(private readonly moodService = new MoodService()) {}

  buildResponse(message: string): AiResponse {
    return {
      response: message,
      mood: this.moodService.detectMood(message),
    };
  }
}
