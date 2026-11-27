import { TopicId } from './navigation';
import { TOPIC_METADATA } from './topicMetadata';

export function resolveLegacyTopicRedirect(rawTopic: string): TopicId | null {
  if (rawTopic === 'backend-basics') {
    return 'db-directory';
  }
  const lessonMatch = /^backend-lesson(\d+)$/.exec(rawTopic);
  if (lessonMatch) {
    const mapped = `db-lesson${lessonMatch[1]}` as TopicId;
    if (mapped in TOPIC_METADATA) {
      return mapped;
    }
  }
  return null;
}
