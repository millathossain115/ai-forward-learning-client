import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { TopicId } from '@/config/navigation';
import { TOPIC_METADATA } from '@/config/topicMetadata';
import { resolveLegacyTopicRedirect } from '@/config/topicRedirects';
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
  const canonical = resolveLegacyTopicRedirect(topic) ?? topic;
  const meta = TOPIC_METADATA[canonical as TopicId];
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
  const redirected = resolveLegacyTopicRedirect(topic);
  if (redirected) {
    redirect(`/topics/${redirected}`);
  }
  if (!(topic in TOPIC_METADATA)) {
    notFound();
  }

  return <TopicRenderer topicId={topic as TopicId} />;
}
