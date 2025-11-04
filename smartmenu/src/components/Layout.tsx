import { ReactNode, useState } from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { 
  LayoutDashboard, 
  Users, 
  Layout as LayoutIcon, 
  UtensilsCrossed, 
  List, 
  Calendar, 
  Monitor, 
  BarChart3, 
  Settings, 
  Bell, 
  Menu,
  LogOut,
  User,
  Moon,
  Sun
} from 'lucide-react';
import { Badge } from './ui/badge';

interface LayoutProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  userRole: 'admin' | 'brand-manager' | 'store-staff';
}

export function Layout({ children, currentPage, onNavigate, userRole }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const menuItems = {
    admin: [
      { id: 'dashboard', label: 'Tổng quan', icon: LayoutDashboard },
      { id: 'users', label: 'Người dùng', icon: Users },
      { id: 'templates', label: 'Template', icon: LayoutIcon },
      { id: 'menu-prices', label: 'Menu & Giá', icon: UtensilsCrossed },
      { id: 'playlists', label: 'Playlist', icon: List },
      { id: 'schedule', label: 'Lịch phát', icon: Calendar },
      { id: 'devices', label: 'Thiết bị', icon: Monitor },
      { id: 'reports', label: 'Báo cáo', icon: BarChart3 },
      { id: 'audit-logs', label: 'Nhật ký hệ thống', icon: Settings },
    ],
    'brand-manager': [
      { id: 'dashboard', label: 'Tổng quan', icon: LayoutDashboard },
      { id: 'templates', label: 'Quản lý Template', icon: LayoutIcon },
      { id: 'menu-prices', label: 'Menu & Giá', icon: UtensilsCrossed },
      { id: 'playlists', label: 'Quản lý Playlist', icon: List },
      { id: 'schedule', label: 'Lịch phát Playlist', icon: Calendar },
      { id: 'preview', label: 'Xem trước & Xuất bản', icon: Monitor },
      { id: 'reports', label: 'Báo cáo & Phân tích', icon: BarChart3 },
    ],
    'store-staff': [
      { id: 'playlists-view', label: 'Xem Playlist', icon: List },
      { id: 'approval', label: 'Phê duyệt & Xuất bản', icon: Calendar },
    ],
  };

  const currentMenuItems = menuItems[userRole];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <Monitor className="w-5 h-5 text-white" />
                </div>
                <span className="text-orange-600">SmartMenu</span>
              </div>
            )}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-600"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {currentMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-orange-50 text-orange-600' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {sidebarOpen && (
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-orange-500 to-teal-500 rounded-lg text-white">
              <Monitor className="w-5 h-5" />
              <div className="flex-1">
                <div className="text-sm">SmartMenu Pro</div>
                <div className="text-xs opacity-80">Phiên bản 2.0</div>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-gray-900">
                {currentMenuItems.find(item => item.id === currentPage)?.label || 'SmartMenu'}
              </h1>
              <p className="text-sm text-gray-500">
                {userRole === 'admin' && 'Quản trị viên'}
                {userRole === 'brand-manager' && 'Quản lý thương hiệu'}
                {userRole === 'store-staff' && 'Nhân viên cửa hàng'}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDarkMode(!darkMode)}
                className="text-gray-600"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>

              <Button variant="ghost" size="icon" className="relative text-gray-600">
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-orange-500 text-white border-2 border-white">
                  3
                </Badge>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-teal-100 text-teal-700">NV</AvatarFallback>
                    </Avatar>
                    <div className="text-left hidden md:block">
                      <div className="text-sm text-gray-900">Nguyễn Văn A</div>
                      <div className="text-xs text-gray-500">
                        {userRole === 'admin' && 'Admin'}
                        {userRole === 'brand-manager' && 'Brand Manager'}
                        {userRole === 'store-staff' && 'Staff'}
                      </div>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="w-4 h-4 mr-2" />
                    Hồ sơ
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    Cài đặt
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
