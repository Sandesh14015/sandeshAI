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
  Helpful = "helpful",
}

export interface MoodClassifier {
  detectMood(text: string): Mood;
}

export class RuleBasedMoodClassifier implements MoodClassifier {
  detectMood(text: string): Mood {
    const normalized = text.toLowerCase();

    if (!normalized.trim()) {
      return Mood.Neutral;
    }

    const signals: Array<[RegExp, Mood]> = [
      [/\b(ha(?:h|ha|haha)|lol|joke|funny|amused|delight|smile)\b/, Mood.Happy],
      [/\b(consider|think|maybe|let me think|analyze|reason|evaluate)\b/, Mood.Thinking],
      [/\b(code|function|class|typescript|javascript|python|debug|algorithm|api|server|build)\b/, Mood.Coding],
      [/\b(laugh|giggle|rofl|lmao|tehehe| chuckle)\b/, Mood.Laughing],
      [/\b(sarcasm|sarcastic|dry|obviously|surely|obvious)\b/, Mood.Sarcastic],
      [/\b(confident|certain|clearly|definitely|absolutely|indeed)\b/, Mood.Confident],
      [/\b(excited|awesome|amazing|great|wonderful|fantastic|incredible)\b/, Mood.Excited],
      [/\b(sleep|tired|sleepy|nap|drowsy|yawn)\b/, Mood.Sleepy],
      [/\b(heart|cry|sad|upset|emotion|feeling|grief|love|lonely)\b/, Mood.Emotional],
      [/\b(help|helpful|support|assist|can help|sure|of course)\b/, Mood.Helpful],
    ];

    for (const [pattern, mood] of signals) {
      if (pattern.test(normalized)) {
        return mood;
      }
    }

    return Mood.Neutral;
  }
}

export class MoodService implements MoodClassifier {
  constructor(private readonly classifier: MoodClassifier = new RuleBasedMoodClassifier()) {}

  detectMood(text: string): Mood {
    return this.classifier.detectMood(text);
  }
}

export class AvatarResolver {
  static resolveMood(mood: Mood | string): Mood {
    const normalized = (mood ?? Mood.Neutral).toString().toLowerCase();

    return Object.values(Mood).find((value) => value === normalized) ?? Mood.Neutral;
  }
}
