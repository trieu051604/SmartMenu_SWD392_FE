import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Monitor, Users, RefreshCw, AlertTriangle, TrendingUp, Activity } from 'lucide-react';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

export function AdminDashboard() {
  const stats = [
    {
      title: 'Tổng số thiết bị đang hoạt động',
      value: '248',
      change: '+12%',
      trend: 'up',
      icon: Monitor,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Tổng số người dùng',
      value: '1,234',
      change: '+8%',
      trend: 'up',
      icon: Users,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
    },
    {
      title: 'Lượt cập nhật hôm nay',
      value: '156',
      change: '+24%',
      trend: 'up',
      icon: RefreshCw,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Lỗi hệ thống gần đây',
      value: '3',
      change: '-15%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
  ];

  const userActivityData = [
    { name: 'T2', users: 120 },
    { name: 'T3', users: 150 },
    { name: 'T4', users: 180 },
    { name: 'T5', users: 165 },
    { name: 'T6', users: 210 },
    { name: 'T7', users: 190 },
    { name: 'CN', users: 140 },
  ];

  const syncData = [
    { time: '00:00', syncs: 45 },
    { time: '04:00', syncs: 30 },
    { time: '08:00', syncs: 85 },
    { time: '12:00', syncs: 120 },
    { time: '16:00', syncs: 95 },
    { time: '20:00', syncs: 75 },
  ];

  const deviceStatusData = [
    { name: 'Hoạt động', value: 248, color: '#009688' },
    { name: 'Ngoại tuyến', value: 12, color: '#FF7A00' },
    { name: 'Lỗi', value: 3, color: '#EF4444' },
  ];

  const recentActivities = [
    { user: 'Nguyễn Văn A', action: 'Cập nhật menu chi nhánh Quận 1', time: '5 phút trước', status: 'success' },
    { user: 'Trần Thị B', action: 'Tạo template mới "Menu Mùa Hè"', time: '12 phút trước', status: 'success' },
    { user: 'Lê Văn C', action: 'Xuất bản playlist đến 15 thiết bị', time: '25 phút trước', status: 'success' },
    { user: 'Phạm Thị D', action: 'Đồng bộ giá từ POS thất bại', time: '35 phút trước', status: 'error' },
    { user: 'Hoàng Văn E', action: 'Thêm 3 người dùng mới', time: '1 giờ trước', status: 'success' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-gray-900">{stat.value}</h3>
                      <Badge 
                        variant={stat.trend === 'up' ? 'default' : 'secondary'} 
                        className={`${stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}
                      >
                        {stat.change}
                      </Badge>
                    </div>
                  </div>
                  <div className={`${stat.bgColor} ${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Hoạt động người dùng theo tuần</CardTitle>
            <CardDescription>Số lượng người dùng đăng nhập hàng ngày</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Bar dataKey="users" fill="#FF7A00" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sync Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Lượt đồng bộ theo giờ</CardTitle>
            <CardDescription>Hoạt động đồng bộ dữ liệu trong 24h</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={syncData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Line type="monotone" dataKey="syncs" stroke="#009688" strokeWidth={2} dot={{ fill: '#009688', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Device Status */}
        <Card>
          <CardHeader>
            <CardTitle>Trạng thái thiết bị</CardTitle>
            <CardDescription>Tổng số: 263 thiết bị</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={deviceStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {deviceStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {deviceStatusData.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-gray-600">{item.name}</span>
                  </div>
                  <span>{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Hoạt động gần đây</CardTitle>
            <CardDescription>Các thao tác mới nhất trong hệ thống</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 pb-4 border-b last:border-b-0">
                  <div className={`w-2 h-2 rounded-full mt-2 ${activity.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
                  <div className="flex-1">
                    <p className="text-sm">{activity.action}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {activity.user} • {activity.time}
                    </p>
                  </div>
                  <Badge variant={activity.status === 'success' ? 'default' : 'destructive'} className="text-xs">
                    {activity.status === 'success' ? 'Thành công' : 'Lỗi'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Health */}
      <Card>
        <CardHeader>
          <CardTitle>Tình trạng hệ thống</CardTitle>
          <CardDescription>Hiệu suất và tài nguyên sử dụng</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">CPU</span>
                <span>45%</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Bộ nhớ</span>
                <span>68%</span>
              </div>
              <Progress value={68} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Băng thông</span>
                <span>32%</span>
              </div>
              <Progress value={32} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
