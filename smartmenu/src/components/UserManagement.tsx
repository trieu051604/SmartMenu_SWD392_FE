import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, UserPlus, Edit, Trash2, MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const users = [
    { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@email.com', role: 'Admin', status: 'active', lastLogin: '2 giờ trước' },
    { id: 2, name: 'Trần Thị B', email: 'tranthib@email.com', role: 'Brand Manager', status: 'active', lastLogin: '5 phút trước' },
    { id: 3, name: 'Lê Văn C', email: 'levanc@email.com', role: 'Store Staff', status: 'active', lastLogin: '1 ngày trước' },
    { id: 4, name: 'Phạm Thị D', email: 'phamthid@email.com', role: 'Brand Manager', status: 'inactive', lastLogin: '1 tuần trước' },
    { id: 5, name: 'Hoàng Văn E', email: 'hoangvane@email.com', role: 'Store Staff', status: 'active', lastLogin: '30 phút trước' },
    { id: 6, name: 'Đặng Thị F', email: 'dangthif@email.com', role: 'Admin', status: 'active', lastLogin: '3 giờ trước' },
    { id: 7, name: 'Vũ Văn G', email: 'vuvang@email.com', role: 'Store Staff', status: 'active', lastLogin: '15 phút trước' },
    { id: 8, name: 'Bùi Thị H', email: 'buithih@email.com', role: 'Brand Manager', status: 'active', lastLogin: '2 ngày trước' },
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-gray-900">Quản lý người dùng</h2>
          <p className="text-sm text-gray-500">Quản lý tài khoản và phân quyền người dùng</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <UserPlus className="w-4 h-4 mr-2" />
              Thêm người dùng
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Thêm người dùng mới</DialogTitle>
              <DialogDescription>
                Nhập thông tin để tạo tài khoản người dùng mới
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Tên</Label>
                <Input id="name" placeholder="Nguyễn Văn A" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="nguyenvana@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <Input id="password" type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Xác nhận mật khẩu</Label>
                <Input id="confirm-password" type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Chọn vai trò</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn vai trò" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="brand-manager">Brand Manager</SelectItem>
                    <SelectItem value="store-staff">Store Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Hủy</Button>
              <Button className="bg-orange-500 hover:bg-orange-600" onClick={() => setIsDialogOpen(false)}>
                Tạo tài khoản
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Tìm kiếm theo tên hoặc email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Lọc theo vai trò" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả vai trò</SelectItem>
            <SelectItem value="Admin">Admin</SelectItem>
            <SelectItem value="Brand Manager">Brand Manager</SelectItem>
            <SelectItem value="Store Staff">Store Staff</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="border rounded-lg bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Vai trò</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Đăng nhập lần cuối</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell className="text-gray-600">{user.email}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline"
                    className={
                      user.role === 'Admin' 
                        ? 'border-orange-500 text-orange-600 bg-orange-50' 
                        : user.role === 'Brand Manager'
                        ? 'border-teal-500 text-teal-600 bg-teal-50'
                        : 'border-blue-500 text-blue-600 bg-blue-50'
                    }
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={user.status === 'active' ? 'default' : 'secondary'}
                    className={user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}
                  >
                    {user.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-600">{user.lastLogin}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Chỉnh sửa
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Xóa
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-sm text-gray-600">Tổng số người dùng</p>
          <p className="text-gray-900 mt-1">{users.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-sm text-gray-600">Đang hoạt động</p>
          <p className="text-gray-900 mt-1">{users.filter(u => u.status === 'active').length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-sm text-gray-600">Người dùng mới (tuần này)</p>
          <p className="text-gray-900 mt-1">12</p>
        </div>
      </div>
    </div>
  );
}
