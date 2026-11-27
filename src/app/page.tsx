import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { TOPIC_METADATA } from '@/config/topicMetadata';
import { resolveLegacyTopicRedirect } from '@/config/topicRedirects';
import TopicRenderer from '@/components/TopicRenderer';
import TopicSkeleton from '@/components/TopicSkeleton';

async function HomeContent({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const { topic } = await searchParams;
  if (topic) {
    const redirected = resolveLegacyTopicRedirect(topic);
    if (redirected) {
      redirect(`/topics/${redirected}`);
    }
    if (topic in TOPIC_METADATA) {
      redirect(`/topics/${topic}`);
    }
  }
  return <TopicRenderer topicId="foundations" />;
}

export default function Home({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  return (
    <Suspense fallback={<TopicSkeleton />}>
      <HomeContent searchParams={searchParams} />
    </Suspense>
  );
}
