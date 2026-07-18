import { AvatarResolver, Mood } from "@/lib/mood";

const moodAvatarMap: Record<Mood, string> = {
  [Mood.Neutral]: "/avatars/neutral.png",
  [Mood.Happy]: "/avatars/happy.png",
  [Mood.Thinking]: "/avatars/thinking.png",
  [Mood.Coding]: "/avatars/coding.png",
  [Mood.Laughing]: "/avatars/laughing.png",
  [Mood.Sarcastic]: "/avatars/sarcastic.png",
  [Mood.Confident]: "/avatars/confident.png",
  [Mood.Excited]: "/avatars/excited.png",
  [Mood.Sleepy]: "/avatars/sleepy.png",
  [Mood.Emotional]: "/avatars/emotional.png",
  // A dedicated helpful asset is optional; neutral remains the graceful fallback.
  [Mood.Helpful]: "/avatars/neutral.png",
};

export class AvatarService {
  static getAvatarPath(mood?: Mood | string): string {
    const resolvedMood = AvatarResolver.resolveMood(mood ?? Mood.Neutral);
    return moodAvatarMap[resolvedMood] ?? moodAvatarMap[Mood.Neutral];
  }
}

export { Mood };
