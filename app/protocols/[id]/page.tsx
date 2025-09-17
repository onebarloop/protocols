import { getProtocolById } from '@/lib/dal/queries';
import { Viewer } from '@/components/custom/document';
import { notFound } from 'next/navigation';

export default async function ProtocolPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const protocol = await getProtocolById(id);

  if (!protocol) {
    notFound();
  }

  return <Viewer html={protocol.html || ''} />;
}
