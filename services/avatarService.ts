export enum Mood {
  Neutral = "neutral",
  Happy = "happy",
  Thinking = "thinking",
  Coding = "coding",
  Laughing = "laughing",
  Sarcastic = "sarcastic",
  Confident = "confident",
  Excited = "excited",
  Sleepy = "sleepy",
  Emotional = "emotional",
}

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
};

export class AvatarService {
  static getAvatarPath(mood: Mood | string): string {
    const normalizedMood = (mood ?? Mood.Neutral).toString().toLowerCase();
    const moodKey = Object.values(Mood).find((value) => value === normalizedMood) ?? Mood.Neutral;
    return moodAvatarMap[moodKey as Mood] ?? moodAvatarMap[Mood.Neutral];
  }
}
