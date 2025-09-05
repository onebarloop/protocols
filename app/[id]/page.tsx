import { getProtocolById } from '@/db/queries/select';
import { Viewer } from '../_components/document';

export default async function ProtocolPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const protocol = await getProtocolById(id);
  return <Viewer html={protocol.html || ''} />;
}
