import { getProtocolById } from '@/db/queries/select';
import { Viewer } from '../components/Document';

export default async function ProtovolPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const protocol = await getProtocolById(Number(id));
  return <Viewer html={protocol.html || ''} />;
}
