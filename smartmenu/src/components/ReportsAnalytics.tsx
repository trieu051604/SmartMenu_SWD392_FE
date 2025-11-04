import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Download, Calendar, TrendingUp, Clock, Monitor, Users } from 'lucide-react';
import { Badge } from './ui/badge';

export function ReportsAnalytics() {
  const updateData = [
    { name: 'T1', updates: 45 },
    { name: 'T2', updates: 52 },
    { name: 'T3', updates: 48 },
    { name: 'T4', updates: 61 },
    { name: 'T5', updates: 55 },
    { name: 'T6', updates: 67 },
    { name: 'T7', updates: 43 },
    { name: 'T8', updates: 38 },
    { name: 'T9', updates: 58 },
    { name: 'T10', updates: 62 },
    { name: 'T11', updates: 71 },
    { name: 'T12', updates: 59 },
  ];

  const deviceOnlineData = [
    { time: '00:00', online: 92 },
    { time: '04:00', online: 88 },
    { time: '08:00', online: 96 },
    { time: '12:00', online: 98 },
    { time: '16:00', online: 97 },
    { time: '20:00', online: 95 },
  ];

  const timeSlotPerformance = [
    { slot: '6-9h', views: 850, color: '#FF7A00' },
    { slot: '9-12h', views: 1200, color: '#009688' },
    { slot: '12-15h', views: 1450, color: '#3B82F6' },
    { slot: '15-18h', views: 980, color: '#EAB308' },
    { slot: '18-21h', views: 1100, color: '#8B5CF6' },
  ];

  const branchPerformance = [
    { name: 'Quận 1', devices: 15, uptime: 98.5, updates: 45 },
    { name: 'Quận 3', devices: 12, uptime: 97.2, updates: 38 },
    { name: 'Quận 7', devices: 20, uptime: 99.1, updates: 62 },
    { name: 'Quận 10', devices: 18, uptime: 96.8, updates: 52 },
    { name: 'Bình Thạnh', devices: 16, uptime: 98.0, updates: 48 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-gray-900">Báo cáo & Phân tích</h2>
          <p className="text-sm text-gray-500">Theo dõi hiệu suất và hoạt động hệ thống</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="30days">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn thời gian" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">7 ngày qua</SelectItem>
              <SelectItem value="30days">30 ngày qua</SelectItem>
              <SelectItem value="90days">90 ngày qua</SelectItem>
              <SelectItem value="custom">Tùy chỉnh</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Xuất PDF
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Download className="w-4 h-4 mr-2" />
            Xuất Excel
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Số lượt cập nhật menu</p>
                <h3 className="text-gray-900">1,847</h3>
                <Badge className="mt-2 bg-green-100 text-green-700">+12.5%</Badge>
              </div>
              <div className="bg-orange-50 text-orange-600 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Tỷ lệ thiết bị trực tuyến</p>
                <h3 className="text-gray-900">97.2%</h3>
                <Badge className="mt-2 bg-green-100 text-green-700">+2.1%</Badge>
              </div>
              <div className="bg-teal-50 text-teal-600 p-3 rounded-lg">
                <Monitor className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Thời gian phản hồi TB</p>
                <h3 className="text-gray-900">1.2s</h3>
                <Badge className="mt-2 bg-green-100 text-green-700">-0.3s</Badge>
              </div>
              <div className="bg-blue-50 text-blue-600 p-3 rounded-lg">
                <Clock className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Người dùng hoạt động</p>
                <h3 className="text-gray-900">1,234</h3>
                <Badge className="mt-2 bg-green-100 text-green-700">+8.3%</Badge>
              </div>
              <div className="bg-purple-50 text-purple-600 p-3 rounded-lg">
                <Users className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Updates Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Số lượt cập nhật menu theo tháng</CardTitle>
            <CardDescription>Xu hướng cập nhật menu trong năm</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={updateData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Bar dataKey="updates" fill="#FF7A00" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Device Online Rate */}
        <Card>
          <CardHeader>
            <CardTitle>Tỷ lệ thiết bị trực tuyến (%)</CardTitle>
            <CardDescription>Theo dõi tình trạng kết nối thiết bị</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={deviceOnlineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" stroke="#888" />
                <YAxis stroke="#888" domain={[85, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="online" stroke="#009688" strokeWidth={3} dot={{ fill: '#009688', r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Time Slot Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Hiệu suất theo khung giờ</CardTitle>
            <CardDescription>Lượt xem menu theo giờ</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={timeSlotPerformance}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ slot, percent }) => `${slot}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="views"
                >
                  {timeSlotPerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Branch Performance */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Hiệu suất theo chi nhánh</CardTitle>
            <CardDescription>So sánh hoạt động giữa các chi nhánh</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {branchPerformance.map((branch, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-32">
                    <p className="text-sm">{branch.name}</p>
                  </div>
                  <div className="flex-1 grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Thiết bị</p>
                      <p className="text-sm">{branch.devices}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Uptime</p>
                      <p className="text-sm">{branch.uptime}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Cập nhật</p>
                      <p className="text-sm">{branch.updates}</p>
                    </div>
                  </div>
                  <div className="w-24">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-orange-500 to-teal-500 rounded-full"
                        style={{ width: `${branch.uptime}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Date Range Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Bộ lọc nâng cao</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-600">Từ ngày</label>
              <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-600">Đến ngày</label>
              <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-600">Chi nhánh</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Tất cả chi nhánh" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả chi nhánh</SelectItem>
                  <SelectItem value="q1">Quận 1</SelectItem>
                  <SelectItem value="q3">Quận 3</SelectItem>
                  <SelectItem value="q7">Quận 7</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="w-full bg-orange-500 hover:bg-orange-600">
                Áp dụng bộ lọc
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
