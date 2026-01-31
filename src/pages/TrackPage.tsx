import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { CarbonGauge } from '@/components/tracker/CarbonGauge';
import { JourneyForm } from '@/components/tracker/JourneyForm';
import { WeeklyChart } from '@/components/tracker/WeeklyChart';

import { TransportType } from '@/components/tracker/TransportSelector';

interface JourneyData {
  transport: TransportType;
  distance: number;
  emissions: number;
  date: string;
}

const INITIAL_DATA: JourneyData[] = [
  // Simulating previous days for the chart
  { transport: 'car', distance: 20, emissions: 4.2, date: new Date(Date.now() - 5 * 86400000).toISOString() }, // Mon
  { transport: 'bus', distance: 15, emissions: 2.8, date: new Date(Date.now() - 4 * 86400000).toISOString() }, // Tue
  { transport: 'car', distance: 25, emissions: 5.1, date: new Date(Date.now() - 3 * 86400000).toISOString() }, // Wed
  { transport: 'train', distance: 30, emissions: 3.5, date: new Date(Date.now() - 2 * 86400000).toISOString() }, // Thu
  { transport: 'car', distance: 30, emissions: 6.2, date: new Date(Date.now() - 1 * 86400000).toISOString() }, // Fri
];

const TrackPage = () => {
  const [journeys, setJourneys] = useState<JourneyData[]>(INITIAL_DATA);
  const maxEmissions = 300;

  // calculate daily emissions for the chart
  const getWeeklyData = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const data = days.map(day => ({ day, value: 0 }));
    
    // In a real app, logic would map specific dates to days. 
    // Here we just map the mock data index to days for demo purposes
    // or we can implement real date parsing.
    
    // Simple mapper for mock data visualization
    const mockMap: Record<string, number> = {
      'Mon': 4.2, 'Tue': 2.8, 'Wed': 5.1, 'Thu': 3.5, 'Fri': 6.2, 'Sat': 1.2, 'Sun': 0.8
    };
    
    // Add current journeys to the map logic
    // This is a simplified "dumb" chart for the prototype
    return [
        { day: 'Mon', value: 4.2 },
        { day: 'Tue', value: 2.8 },
        { day: 'Wed', value: 5.1 },
        { day: 'Thu', value: 3.5 },
        { day: 'Fri', value: 6.2 },
        { day: 'Sat', value: 1.2 },
        { day: 'Sun', value: 0.8 },
    ].map(d => {
        // Add new emissions to "Today" (Assuming today is one of these or just adding to total)
        // For distinct visualization, let's just return the processed journeys if they exist
        return d;
    });
  };

  // Better Logic: Dynamic Chart Data
  const weeklyData = [
     { day: 'Mon', value: 4.2 },
     { day: 'Tue', value: 2.8 },
     { day: 'Wed', value: 5.1 },
     { day: 'Thu', value: 3.5 },
     { day: 'Fri', value: 6.2 },
     { day: 'Sat', value: 1.2 },
     { day: 'Sun', value: 0.8 },
  ];
  
  // Update "Today" (let's say today is Sunday or generic) or just add based on current session
  // For this prototype, we will sum up relevant current session additions to the last bar or "Today"
  
  const currentEmissions = journeys.reduce((sum, j) => sum + j.emissions, 0);

  const handleAddJourney = (journey: JourneyData) => {
    setJourneys([...journeys, journey]);
    // update chart data logic would go here
  };
  
  // Quick Fix to make chart dynamic based on state: 
  // We'll just append the new journey value to the last bar for demo
  const chartData = [...weeklyData];
  const lastDayIndex = 6; // Sun
  const todayEmissionsUser = journeys.slice(5).reduce((sum, j) => sum + j.emissions, 0); // items added by user
  chartData[lastDayIndex].value += todayEmissionsUser;

  return (
    <AppLayout>
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="pt-2 pb-2">
          <h1 className="text-2xl font-bold text-foreground">Carbon Tracker</h1>
          <p className="text-muted-foreground">Monitor your environmental impact</p>
        </div>

        <CarbonGauge value={currentEmissions} maxValue={maxEmissions} />
        <JourneyForm onAddJourney={handleAddJourney} />
        <WeeklyChart data={chartData} />
      </div>
    </AppLayout>
  );
};

export default TrackPage;
