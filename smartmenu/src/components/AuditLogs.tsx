import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, Download, Filter } from 'lucide-react';

export function AuditLogs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [userFilter, setUserFilter] = useState('all');
  const [moduleFilter, setModuleFilter] = useState('all');

  const logs = [
    {
      id: 1,
      time: '03/11/2024 14:30:25',
      user: 'Nguyễn Văn A',
      action: 'Cập nhật menu chi nhánh Quận 1',
      module: 'Menu & Giá',
      result: 'success',
      ip: '192.168.1.100',
    },
    {
      id: 2,
      time: '03/11/2024 14:28:12',
      user: 'Trần Thị B',
      action: 'Tạo template mới "Menu Mùa Hè"',
      module: 'Template',
      result: 'success',
      ip: '192.168.1.105',
    },
    {
      id: 3,
      time: '03/11/2024 14:25:45',
      user: 'Lê Văn C',
      action: 'Xuất bản playlist đến 15 thiết bị',
      module: 'Playlist',
      result: 'success',
      ip: '192.168.1.110',
    },
    {
      id: 4,
      time: '03/11/2024 14:20:33',
      user: 'Phạm Thị D',
      action: 'Đồng bộ giá từ POS',
      module: 'Menu & Giá',
      result: 'error',
      ip: '192.168.1.115',
    },
    {
      id: 5,
      time: '03/11/2024 14:15:18',
      user: 'Hoàng Văn E',
      action: 'Thêm người dùng mới: phamthif@email.com',
      module: 'Người dùng',
      result: 'success',
      ip: '192.168.1.100',
    },
    {
      id: 6,
      time: '03/11/2024 14:10:52',
      user: 'Đặng Thị F',
      action: 'Xóa template "Menu Cũ"',
      module: 'Template',
      result: 'success',
      ip: '192.168.1.120',
    },
    {
      id: 7,
      time: '03/11/2024 14:05:27',
      user: 'Vũ Văn G',
      action: 'Cập nhật lịch phát playlist',
      module: 'Lịch phát',
      result: 'success',
      ip: '192.168.1.125',
    },
    {
      id: 8,
      time: '03/11/2024 14:00:11',
      user: 'Bùi Thị H',
      action: 'Đăng nhập vào hệ thống',
      module: 'Xác thực',
      result: 'success',
      ip: '192.168.1.130',
    },
    {
      id: 9,
      time: '03/11/2024 13:55:43',
      user: 'Nguyễn Văn A',
      action: 'Thử đăng nhập thất bại',
      module: 'Xác thực',
      result: 'error',
      ip: '192.168.1.100',
    },
    {
      id: 10,
      time: '03/11/2024 13:50:29',
      user: 'Trần Thị B',
      action: 'Xuất báo cáo PDF',
      module: 'Báo cáo',
      result: 'success',
      ip: '192.168.1.105',
    },
  ];

  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
      log.action.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUser = userFilter === 'all' || log.user === userFilter;
    const matchesModule = moduleFilter === 'all' || log.module === moduleFilter;
    return matchesSearch && matchesUser && matchesModule;
  });

  const uniqueUsers = [...new Set(logs.map(log => log.user))];
  const uniqueModules = [...new Set(logs.map(log => log.module))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-gray-900">Nhật ký hệ thống</h2>
          <p className="text-sm text-gray-500">Theo dõi tất cả hoạt động trong hệ thống</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600">
          <Download className="w-4 h-4 mr-2" />
          Xuất file CSV
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Tìm kiếm theo người dùng hoặc hành động..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={userFilter} onValueChange={setUserFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Lọc theo người dùng" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả người dùng</SelectItem>
            {uniqueUsers.map(user => (
              <SelectItem key={user} value={user}>{user}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={moduleFilter} onValueChange={setModuleFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Lọc theo module" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả module</SelectItem>
            {uniqueModules.map(module => (
              <SelectItem key={module} value={module}>{module}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="border rounded-lg bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Thời gian</TableHead>
              <TableHead>Người thực hiện</TableHead>
              <TableHead>Hành động</TableHead>
              <TableHead>Module</TableHead>
              <TableHead>Kết quả</TableHead>
              <TableHead>IP Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="text-sm text-gray-600">{log.time}</TableCell>
                <TableCell>{log.user}</TableCell>
                <TableCell className="max-w-md">{log.action}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="border-gray-300 text-gray-700">
                    {log.module}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={log.result === 'success' ? 'default' : 'destructive'}
                    className={log.result === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
                  >
                    {log.result === 'success' ? 'Thành công' : 'Lỗi'}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-gray-600">{log.ip}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-sm text-gray-600">Tổng số hoạt động</p>
          <p className="text-gray-900 mt-1">{logs.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-sm text-gray-600">Thành công</p>
          <p className="text-gray-900 mt-1">{logs.filter(l => l.result === 'success').length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-sm text-gray-600">Lỗi</p>
          <p className="text-gray-900 mt-1">{logs.filter(l => l.result === 'error').length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-sm text-gray-600">Người dùng hoạt động</p>
          <p className="text-gray-900 mt-1">{uniqueUsers.length}</p>
        </div>
      </div>
    </div>
  );
}
