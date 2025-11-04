import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, Plus, Upload, RefreshCw, Edit, Trash2, CheckCircle, Clock } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

export function MenuPriceManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const menuItems = [
    { id: 1, sku: 'CF001', name: 'Cà phê đen', category: 'Cà phê', price: '35,000', status: 'active', sync: 'synced' },
    { id: 2, sku: 'CF002', name: 'Cà phê sữa', category: 'Cà phê', price: '40,000', status: 'active', sync: 'synced' },
    { id: 3, sku: 'CF003', name: 'Bạc xỉu', category: 'Cà phê', price: '42,000', status: 'active', sync: 'pending' },
    { id: 4, sku: 'TR001', name: 'Trà đào cam sả', category: 'Trà', price: '45,000', status: 'active', sync: 'synced' },
    { id: 5, sku: 'TR002', name: 'Trà sữa trân châu', category: 'Trà', price: '48,000', status: 'active', sync: 'synced' },
    { id: 6, sku: 'SM001', name: 'Sinh tố bơ', category: 'Sinh tố', price: '50,000', status: 'active', sync: 'pending' },
    { id: 7, sku: 'SM002', name: 'Sinh tố dâu', category: 'Sinh tố', price: '48,000', status: 'active', sync: 'synced' },
    { id: 8, sku: 'BK001', name: 'Bánh mì trứng', category: 'Bánh', price: '25,000', status: 'inactive', sync: 'synced' },
  ];

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-gray-900">Quản lý Menu & Giá</h2>
          <p className="text-sm text-gray-500">Cập nhật thông tin món ăn và đồng bộ giá với POS</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Cập nhật hàng loạt (CSV)
          </Button>
          <Button variant="outline" className="text-teal-600 border-teal-200 hover:bg-teal-50">
            <RefreshCw className="w-4 h-4 mr-2" />
            Đồng bộ POS
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-orange-500 hover:bg-orange-600">
                <Plus className="w-4 h-4 mr-2" />
                Thêm món
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Thêm món mới</DialogTitle>
                <DialogDescription>
                  Nhập thông tin món ăn mới vào menu
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sku">Mã sản phẩm (SKU)</Label>
                    <Input id="sku" placeholder="CF001" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Danh mục</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn danh mục" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="coffee">Cà phê</SelectItem>
                        <SelectItem value="tea">Trà</SelectItem>
                        <SelectItem value="smoothie">Sinh tố</SelectItem>
                        <SelectItem value="bakery">Bánh</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Tên món</Label>
                  <Input id="name" placeholder="VD: Cà phê đen" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Giá (VNĐ)</Label>
                  <Input id="price" type="number" placeholder="35000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Mô tả</Label>
                  <Input id="description" placeholder="Mô tả ngắn về món ăn" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Hủy</Button>
                <Button className="bg-orange-500 hover:bg-orange-600" onClick={() => setIsDialogOpen(false)}>
                  Thêm món
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Sync Status Alert */}
      <Alert className="bg-blue-50 border-blue-200">
        <Clock className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>2 món</strong> đang chờ đồng bộ với hệ thống POS. 
          <Button variant="link" className="text-blue-600 p-0 ml-2 h-auto">
            Đồng bộ ngay
          </Button>
        </AlertDescription>
      </Alert>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Tìm kiếm món ăn..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Lọc theo danh mục" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả danh mục</SelectItem>
            <SelectItem value="Cà phê">Cà phê</SelectItem>
            <SelectItem value="Trà">Trà</SelectItem>
            <SelectItem value="Sinh tố">Sinh tố</SelectItem>
            <SelectItem value="Bánh">Bánh</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả trạng thái</SelectItem>
            <SelectItem value="active">Đang bán</SelectItem>
            <SelectItem value="inactive">Hết hàng</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="border rounded-lg bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã sản phẩm (SKU)</TableHead>
              <TableHead>Tên món</TableHead>
              <TableHead>Danh mục</TableHead>
              <TableHead>Giá</TableHead>
              <TableHead>Tình trạng</TableHead>
              <TableHead>Đồng bộ</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="text-gray-900">{item.sku}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell className="text-gray-600">{item.category}</TableCell>
                <TableCell className="text-gray-900">{item.price} ₫</TableCell>
                <TableCell>
                  <Badge 
                    variant={item.status === 'active' ? 'default' : 'secondary'}
                    className={item.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}
                  >
                    {item.status === 'active' ? 'Đang bán' : 'Hết hàng'}
                  </Badge>
                </TableCell>
                <TableCell>
                  {item.sync === 'synced' ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">Đã đồng bộ</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-orange-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">Đang chờ</span>
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-sm text-gray-600">Tổng số món</p>
          <p className="text-gray-900 mt-1">{menuItems.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-sm text-gray-600">Đang bán</p>
          <p className="text-gray-900 mt-1">{menuItems.filter(i => i.status === 'active').length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-sm text-gray-600">Đã đồng bộ</p>
          <p className="text-gray-900 mt-1">{menuItems.filter(i => i.sync === 'synced').length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-sm text-gray-600">Chờ đồng bộ</p>
          <p className="text-gray-900 mt-1">{menuItems.filter(i => i.sync === 'pending').length}</p>
        </div>
      </div>
    </div>
  );
}
