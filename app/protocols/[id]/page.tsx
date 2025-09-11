import { getProtocolById } from '@/db/queries/select';
import { Viewer } from '@/components/custom/document';
import { notFound } from 'next/navigation';

export default async function ProtocolPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const fetchProtocol = async (id: string) => {
    try {
      return await getProtocolById(id);
    } catch (error) {
      return null;
    }
  };

  const protocol = await fetchProtocol(id);

  if (!protocol) {
    notFound();
  }

  return <Viewer html={protocol.html || ''} />;
}
