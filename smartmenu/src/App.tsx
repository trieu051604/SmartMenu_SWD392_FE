import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { Layout } from './components/Layout';
import { AdminDashboard } from './components/AdminDashboard';
import { UserManagement } from './components/UserManagement';
import { TemplateManagement } from './components/TemplateManagement';
import { MenuPriceManagement } from './components/MenuPriceManagement';
import { PlaylistManagement } from './components/PlaylistManagement';
import { ScheduleManagement } from './components/ScheduleManagement';
import { ReportsAnalytics } from './components/ReportsAnalytics';
import { AuditLogs } from './components/AuditLogs';
import { StoreStaffView } from './components/StoreStaffView';
import { SmartTVDisplay } from './components/SmartTVDisplay';
import { Toaster } from './components/ui/sonner';
import { Button } from './components/ui/button';
import { Monitor } from 'lucide-react';

type UserRole = 'admin' | 'brand-manager' | 'store-staff' | null;

export default function App() {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showTVDisplay, setShowTVDisplay] = useState(false);

  const handleLogin = (role: 'admin' | 'brand-manager' | 'store-staff') => {
    setUserRole(role);
    setCurrentPage('dashboard');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  // If showing TV Display
  if (showTVDisplay) {
    return (
      <div className="relative">
        <Button
          onClick={() => setShowTVDisplay(false)}
          className="absolute top-4 right-4 z-50 bg-white text-gray-900 hover:bg-gray-100"
        >
          Thoát chế độ hiển thị
        </Button>
        <SmartTVDisplay />
      </div>
    );
  }

  // If not logged in, show login page
  if (!userRole) {
    return (
      <>
        <div className="fixed bottom-4 right-4 z-50">
          <Button
            onClick={() => setShowTVDisplay(true)}
            className="bg-gradient-to-r from-orange-500 to-teal-500 hover:from-orange-600 hover:to-teal-600 shadow-lg"
            size="lg"
          >
            <Monitor className="w-5 h-5 mr-2" />
            Xem chế độ SmartTV
          </Button>
        </div>
        <LoginPage onLogin={handleLogin} />
        <Toaster />
      </>
    );
  }

  // Render page content based on current page and user role
  const renderPageContent = () => {
    // Admin pages
    if (userRole === 'admin') {
      switch (currentPage) {
        case 'dashboard':
          return <AdminDashboard />;
        case 'users':
          return <UserManagement />;
        case 'templates':
          return <TemplateManagement userRole="admin" />;
        case 'menu-prices':
          return <MenuPriceManagement />;
        case 'playlists':
          return <PlaylistManagement />;
        case 'schedule':
          return <ScheduleManagement />;
        case 'devices':
          return <DeviceManagement />;
        case 'reports':
          return <ReportsAnalytics />;
        case 'audit-logs':
          return <AuditLogs />;
        default:
          return <AdminDashboard />;
      }
    }

    // Brand Manager pages
    if (userRole === 'brand-manager') {
      switch (currentPage) {
        case 'dashboard':
          return <AdminDashboard />;
        case 'templates':
          return <TemplateManagement userRole="brand-manager" />;
        case 'menu-prices':
          return <MenuPriceManagement />;
        case 'playlists':
          return <PlaylistManagement />;
        case 'schedule':
          return <ScheduleManagement />;
        case 'preview':
          return <PreviewPublish />;
        case 'reports':
          return <ReportsAnalytics />;
        default:
          return <AdminDashboard />;
      }
    }

    // Store Staff pages
    if (userRole === 'store-staff') {
      switch (currentPage) {
        case 'playlists-view':
        case 'approval':
          return <StoreStaffView />;
        default:
          return <StoreStaffView />;
      }
    }

    return <AdminDashboard />;
  };

  return (
    <>
      <Layout 
        currentPage={currentPage} 
        onNavigate={handleNavigate}
        userRole={userRole}
      >
        {renderPageContent()}
      </Layout>
      <Toaster />
      
      {/* TV Display Quick Access */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setShowTVDisplay(true)}
          className="bg-gradient-to-r from-orange-500 to-teal-500 hover:from-orange-600 hover:to-teal-600 shadow-lg"
        >
          <Monitor className="w-4 h-4 mr-2" />
          Xem SmartTV
        </Button>
      </div>
    </>
  );
}

// Device Management Component (placeholder)
function DeviceManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900">Quản lý Thiết bị</h2>
        <p className="text-sm text-gray-500">Theo dõi và quản lý tất cả thiết bị SmartTV</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { id: 1, name: 'TV Quầy 1 - Q1', status: 'online', location: 'Chi nhánh Quận 1', uptime: '99.8%' },
          { id: 2, name: 'TV Quầy 2 - Q1', status: 'online', location: 'Chi nhánh Quận 1', uptime: '98.5%' },
          { id: 3, name: 'TV Quầy 1 - Q3', status: 'offline', location: 'Chi nhánh Quận 3', uptime: '95.2%' },
          { id: 4, name: 'TV Quầy 2 - Q3', status: 'online', location: 'Chi nhánh Quận 3', uptime: '99.1%' },
          { id: 5, name: 'TV Quầy 1 - Q7', status: 'online', location: 'Chi nhánh Quận 7', uptime: '97.8%' },
          { id: 6, name: 'TV Quầy 2 - Q7', status: 'error', location: 'Chi nhánh Quận 7', uptime: '92.3%' },
        ].map((device) => (
          <div key={device.id} className="bg-white p-6 rounded-lg border">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg mb-1">{device.name}</h3>
                <p className="text-sm text-gray-600">{device.location}</p>
              </div>
              <div className={`w-3 h-3 rounded-full ${
                device.status === 'online' ? 'bg-green-500' : 
                device.status === 'offline' ? 'bg-gray-400' : 'bg-red-500'
              }`} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Uptime</span>
                <span>{device.uptime}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Trạng thái</span>
                <span className={
                  device.status === 'online' ? 'text-green-600' : 
                  device.status === 'offline' ? 'text-gray-600' : 'text-red-600'
                }>
                  {device.status === 'online' && 'Trực tuyến'}
                  {device.status === 'offline' && 'Ngoại tuyến'}
                  {device.status === 'error' && 'Lỗi'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Preview & Publish Component (placeholder)
function PreviewPublish() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900">Xem trước & Xuất bản</h2>
        <p className="text-sm text-gray-500">Kiểm tra và xuất bản nội dung lên thiết bị</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center">
            <div className="text-white text-center">
              <Monitor className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-2">Chế độ xem trước</p>
              <p className="text-sm text-gray-400">Chọn playlist để xem trước nội dung</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="mb-4">Cài đặt xuất bản</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 mb-2 block">Chọn Playlist</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>Menu Mùa Hè 2024</option>
                  <option>Khuyến Mãi Đặc Biệt</option>
                  <option>Menu Combo Trưa</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-2 block">Thiết bị đích</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>Tất cả thiết bị (248)</option>
                  <option>Chi nhánh Quận 1 (15)</option>
                  <option>Chi nhánh Quận 3 (12)</option>
                </select>
              </div>
              <Button className="w-full bg-teal-600 hover:bg-teal-700">
                Xem thử trên thiết bị thử nghiệm
              </Button>
              <Button className="w-full bg-orange-500 hover:bg-orange-600">
                Xuất bản đến toàn bộ thiết bị
              </Button>
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <p className="text-sm text-green-800">
              ✓ Xuất bản thành công đến 248 thiết bị
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
