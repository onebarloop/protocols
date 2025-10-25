import { getSession } from '@/lib/auth/get-session';
import { getAllProtocols } from '@/lib/dal/queries';
import ProtocolsGrid from '@/components/custom/protocols-grid';

export default async function ProtocolsPage() {
  await getSession();
  const protocols = await getAllProtocols();

  return (
    <section className="max-w-8xl mx-auto">
      <h1 className="mb-6 text-2xl">Protocols Overview</h1>
      <ProtocolsGrid protocols={protocols} />
    </section>
  );
}
