import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import StatsCards from "../../components/StatsCards";
import QuickActions from "../../components/QuickActions";
import ScheduleCalendar from "../../components/ScheduleCalendar";
import UpcomingPosts from "../../components/UpcomingPosts";
import ConnectedAccounts from "../../components/ConnectedAccounts";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#f9fafe]">
      <Sidebar />
      <main className="flex-1 p-4 sm:p-6 md:p-8 ml-0 lg:ml-64">
        <Header />
        <StatsCards />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <QuickActions />
          </div>
          <div>
            <ScheduleCalendar />
          </div>
        </div>
        <UpcomingPosts />
        <ConnectedAccounts />
      </main>
    </div>
  );
}
