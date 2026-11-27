import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TopicId } from '@/config/navigation';
import { TOPIC_METADATA } from '@/config/topicMetadata';
import TopicRenderer from '@/components/TopicRenderer';

export function generateStaticParams() {
  return Object.keys(TOPIC_METADATA).map((topic) => ({ topic }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>;
}): Promise<Metadata> {
  const { topic } = await params;
  const meta = TOPIC_METADATA[topic as TopicId];
  if (!meta) {
    return { title: 'Topic Not Found | FORWARD LEARNING' };
  }
  return {
    title: `${meta.title} | FORWARD LEARNING`,
    description: meta.description,
  };
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  if (!(topic in TOPIC_METADATA)) {
    notFound();
  }

  return <TopicRenderer topicId={topic as TopicId} />;
}
