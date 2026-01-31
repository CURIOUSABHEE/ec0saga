import { ReactNode } from 'react';
import { BottomNav } from './BottomNav';
import { Sidebar } from './Sidebar';
import { useEffect } from 'react';
import { toast } from 'sonner';

const ecoTips = [
  "Turn off lights when leaving a room.",
  "Use a reusable water bottle.",
  "Take shorter showers to save water.",
  "Unplug electronics when not in use.",
  "Walk or bike instead of driving.",
  "Eat more plant-based meals.",
  "Shop locally to reduce transport emissions.",
  "Use cold water for laundry.",
  "Dry clothes on a line instead of a dryer.",
  "Plant a tree or support reforestation."
];

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  useEffect(() => {
    const interval = setInterval(() => {
      const randomTip = ecoTips[Math.floor(Math.random() * ecoTips.length)];
      toast.info("Eco Tip", {
        description: randomTip,
        duration: 4000, // Show for a bit longer so they can read it
      });
    }, 2000); // Every 2 seconds

    return () => clearInterval(interval);
  }, []);

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
