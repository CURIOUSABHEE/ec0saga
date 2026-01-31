import { ReactNode } from 'react';
import { BottomNav } from './BottomNav';
import { Sidebar } from './Sidebar';

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <main className="flex-1 pb-24 md:pb-0 overflow-y-auto h-screen">
        {children}
      </main>
      <BottomNav />
    </div>
  );
};
