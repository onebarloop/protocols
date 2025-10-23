import { getSession } from '@/lib/auth/get-session';

export default async function ProtocolsPage() {
  await getSession();

  return <div>Protocols Page</div>;
}
