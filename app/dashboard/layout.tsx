import { Metadata } from 'next';

// 제목, 설명을 추가합니다. 여기에 추가하면 모든 페이지에 해당 내용이 상속됩니다.
export const metadata: Metadata = {
  title: {
    template: '%s | Acme Dashboard',
    default: 'next tutorial',
  },
  description: 'The official Next.js ',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

import SideNav from '@/app/ui/dashboard/sidenav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
