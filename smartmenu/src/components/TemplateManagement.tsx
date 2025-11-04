import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Checkbox } from './ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Plus, Edit, Trash2, Eye, RefreshCw, Search, Shield, Users, Calendar, User as UserIcon } from 'lucide-react';
import { Badge } from './ui/badge';
import { toast } from 'sonner';

interface TemplateManagementProps {
  userRole?: 'admin' | 'brand-manager';
}

interface Template {
  id: number;
  name: string;
  layout: string;
  preview: string;
  status: 'active' | 'draft' | 'inactive';
  usedBy: number;
  createdBy: string;
  createdDate: string;
  description: string;
  sharedWith: number;
}

interface UserPermission {
  id: number;
  name: string;
  email: string;
  role: string;
  canView: boolean;
  canEdit: boolean;
  canDelete: boolean;
  status: 'active' | 'inactive';
}

export function TemplateManagement({ userRole = 'admin' }: TemplateManagementProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPermissionDialogOpen, setIsPermissionDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [creatorFilter, setCreatorFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const templates: Template[] = [
    {
      id: 1,
      name: 'Menu Mùa Hè 2024',
      layout: 'Dọc',
      preview: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=600&fit=crop',
      status: 'active',
      usedBy: 24,
      createdBy: 'Nguyễn Văn A',
      createdDate: '15/10/2024',
      description: 'Template menu cho mùa hè với màu sắc tươi sáng',
      sharedWith: 5,
    },
    {
      id: 2,
      name: 'Template Cà Phê Sáng',
      layout: 'Ngang',
      preview: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop',
      status: 'active',
      usedBy: 18,
      createdBy: 'Trần Thị B',
      createdDate: '10/10/2024',
      description: 'Template cho thực đơn buổi sáng',
      sharedWith: 3,
    },
    {
      id: 3,
      name: 'Menu Combo Trưa',
      layout: 'Kết hợp',
      preview: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=600&fit=crop',
      status: 'active',
      usedBy: 32,
      createdBy: 'Lê Văn C',
      createdDate: '05/10/2024',
      description: 'Menu combo đặc biệt giờ trưa',
      sharedWith: 8,
    },
    {
      id: 4,
      name: 'Đồ Uống Đặc Biệt',
      layout: 'Dọc',
      preview: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=600&fit=crop',
      status: 'draft',
      usedBy: 0,
      createdBy: 'Nguyễn Văn A',
      createdDate: '01/11/2024',
      description: 'Template cho các loại đồ uống đặc biệt',
      sharedWith: 0,
    },
    {
      id: 5,
      name: 'Menu Tối Cuối Tuần',
      layout: 'Ngang',
      preview: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop',
      status: 'active',
      usedBy: 15,
      createdBy: 'Phạm Thị D',
      createdDate: '20/09/2024',
      description: 'Menu buổi tối cho cuối tuần',
      sharedWith: 4,
    },
    {
      id: 6,
      name: 'Khuyến Mãi Đặc Biệt',
      layout: 'Kết hợp',
      preview: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400&h=600&fit=crop',
      status: 'inactive',
      usedBy: 28,
      createdBy: 'Hoàng Văn E',
      createdDate: '15/08/2024',
      description: 'Template cho các chương trình khuyến mãi',
      sharedWith: 6,
    },
  ];

  const [userPermissions, setUserPermissions] = useState<UserPermission[]>([
    { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@email.com', role: 'Brand Manager', canView: true, canEdit: true, canDelete: false, status: 'active' },
    { id: 2, name: 'Trần Thị B', email: 'tranthib@email.com', role: 'Brand Manager', canView: true, canEdit: false, canDelete: false, status: 'active' },
    { id: 3, name: 'Lê Văn C', email: 'levanc@email.com', role: 'Store Staff', canView: true, canEdit: false, canDelete: false, status: 'active' },
    { id: 4, name: 'Phạm Thị D', email: 'phamthid@email.com', role: 'Brand Manager', canView: true, canEdit: true, canDelete: false, status: 'inactive' },
  ]);

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCreator = creatorFilter === 'all' || template.createdBy === creatorFilter;
    const matchesStatus = statusFilter === 'all' || template.status === statusFilter;
    return matchesSearch && matchesCreator && matchesStatus;
  });

  const uniqueCreators = [...new Set(templates.map(t => t.createdBy))];

  const handleViewTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setIsViewDialogOpen(true);
  };

  const handleEditTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setIsEditDialogOpen(true);
  };

  const handleManagePermissions = (template: Template) => {
    if (userRole !== 'admin') {
      toast.error('Chỉ quản trị viên có thể phân quyền');
      return;
    }
    setSelectedTemplate(template);
    setIsPermissionDialogOpen(true);
  };

  const handleDeleteTemplate = (template: Template) => {
    if (confirm(`Bạn có chắc muốn xóa template "${template.name}" không?`)) {
      toast.success('Đã xóa template thành công!');
    }
  };

  const handleSavePermissions = () => {
    toast.success('Quyền truy cập đã được lưu.');
    setIsPermissionDialogOpen(false);
  };

  const handleSaveEdit = () => {
    toast.success('Cập nhật thành công!');
    setIsEditDialogOpen(false);
  };

  const togglePermission = (userId: number, permission: 'canView' | 'canEdit' | 'canDelete') => {
    setUserPermissions(prev => prev.map(user => 
      user.id === userId ? { ...user, [permission]: !user[permission] } : user
    ));
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#" className="text-gray-600">Quản lý hệ thống</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Quản lý Template</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-gray-900">Quản lý Template</h2>
          <p className="text-sm text-gray-500">Tạo, chỉnh sửa và phân quyền sử dụng các mẫu menu hiển thị</p>
        </div>
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={() => toast.success('Đã tải lại danh sách')}>
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Tải lại danh sách template</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button className="bg-orange-500 hover:bg-orange-600" onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Tạo mẫu mới
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      {userRole === 'admin' && (
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Tìm theo tên template..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={creatorFilter} onValueChange={setCreatorFilter}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Lọc theo người tạo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả người tạo</SelectItem>
              {uniqueCreators.map(creator => (
                <SelectItem key={creator} value={creator}>{creator}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Lọc theo trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="active">Đang dùng</SelectItem>
              <SelectItem value="draft">Bản nháp</SelectItem>
              <SelectItem value="inactive">Ngừng sử dụng</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Template Grid */}
      {filteredTemplates.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-500">Không tìm thấy template phù hợp</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card 
              key={template.id} 
              className="overflow-hidden hover:shadow-lg transition-shadow relative group"
              onMouseEnter={() => setHoveredCard(template.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                <img 
                  src={template.preview} 
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge className={
                    template.status === 'active' 
                      ? 'bg-green-500' 
                      : template.status === 'draft' 
                      ? 'bg-blue-500' 
                      : 'bg-gray-500'
                  }>
                    {template.status === 'active' && 'Đang dùng'}
                    {template.status === 'draft' && 'Bản nháp'}
                    {template.status === 'inactive' && 'Ngừng sử dụng'}
                  </Badge>
                </div>

                {/* Hover Overlay */}
                {hoveredCard === template.id && (
                  <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center gap-2 transition-opacity">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            size="icon" 
                            variant="secondary"
                            onClick={() => handleViewTemplate(template)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent><p>Xem</p></TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            size="icon" 
                            variant="secondary"
                            onClick={() => handleEditTemplate(template)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent><p>Sửa</p></TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            size="icon" 
                            variant="secondary"
                            onClick={() => handleManagePermissions(template)}
                            disabled={userRole !== 'admin'}
                            className={userRole !== 'admin' ? 'opacity-50 cursor-not-allowed' : ''}
                          >
                            <Shield className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{userRole === 'admin' ? 'Phân quyền' : 'Chỉ quản trị viên có thể phân quyền'}</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            size="icon" 
                            variant="secondary"
                            onClick={() => handleDeleteTemplate(template)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent><p>Xóa</p></TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="mb-2">{template.name}</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center justify-between">
                    <span>Bố cục: {template.layout}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Chi nhánh áp dụng: {template.usedBy} chi nhánh</span>
                  </div>
                  {userRole === 'admin' && template.sharedWith > 0 && (
                    <div className="flex items-center gap-1 text-teal-600">
                      <Users className="w-3 h-3" />
                      <span>Được chia sẻ với: {template.sharedWith} người dùng</span>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex gap-2 border-t">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => handleViewTemplate(template)}>
                  <Eye className="w-4 h-4 mr-1" />
                  Xem
                </Button>
                <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEditTemplate(template)}>
                  <Edit className="w-4 h-4 mr-1" />
                  Sửa
                </Button>
                {userRole === 'admin' && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleManagePermissions(template)}
                        >
                          <Shield className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent><p>Phân quyền</p></TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                {userRole === 'brand-manager' && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          disabled
                          className="opacity-50"
                        >
                          <Shield className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Chỉ quản trị viên có thể phân quyền</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-red-600 hover:text-red-700"
                  onClick={() => handleDeleteTemplate(template)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-sm text-gray-600">Tổng số template</p>
          <p className="text-gray-900 mt-1">{templates.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-sm text-gray-600">Đang sử dụng</p>
          <p className="text-gray-900 mt-1">{templates.filter(t => t.status === 'active').length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-sm text-gray-600">Bản nháp</p>
          <p className="text-gray-900 mt-1">{templates.filter(t => t.status === 'draft').length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-sm text-gray-600">Ngừng sử dụng</p>
          <p className="text-gray-900 mt-1">{templates.filter(t => t.status === 'inactive').length}</p>
        </div>
      </div>

      {/* Create Template Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Tạo Template mới</DialogTitle>
            <DialogDescription>
              Tải lên hình ảnh và cấu hình template menu
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="template-name">Tên mẫu</Label>
              <Input id="template-name" placeholder="VD: Menu Mùa Hè 2024" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="template-desc">Mô tả ngắn</Label>
              <Input id="template-desc" placeholder="Mô tả về template này" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="layout-type">Chọn loại bố cục</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn loại bố cục" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vertical">Dọc (Portrait)</SelectItem>
                  <SelectItem value="horizontal">Ngang (Landscape)</SelectItem>
                  <SelectItem value="combined">Kết hợp</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Tải lên hình ảnh nền</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-400 transition-colors cursor-pointer">
                <Plus className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">Kéo thả hoặc click để tải lên</p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG (tối đa 5MB)</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Hủy</Button>
            <Button 
              className="bg-orange-500 hover:bg-orange-600" 
              onClick={() => {
                toast.success('Đã tạo template mới thành công!');
                setIsCreateDialogOpen(false);
              }}
            >
              Tạo mẫu
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Template Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Xem chi tiết Template</DialogTitle>
          </DialogHeader>
          {selectedTemplate && (
            <div className="space-y-4 py-4">
              <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src={selectedTemplate.preview} 
                  alt={selectedTemplate.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-600">Tên</Label>
                  <p className="mt-1">{selectedTemplate.name}</p>
                </div>
                <div>
                  <Label className="text-gray-600">Bố cục</Label>
                  <p className="mt-1">{selectedTemplate.layout}</p>
                </div>
                <div>
                  <Label className="text-gray-600">Trạng thái</Label>
                  <div className="mt-1">
                    <Badge className={
                      selectedTemplate.status === 'active' 
                        ? 'bg-green-500' 
                        : selectedTemplate.status === 'draft' 
                        ? 'bg-blue-500' 
                        : 'bg-gray-500'
                    }>
                      {selectedTemplate.status === 'active' && 'Đang dùng'}
                      {selectedTemplate.status === 'draft' && 'Bản nháp'}
                      {selectedTemplate.status === 'inactive' && 'Ngừng sử dụng'}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label className="text-gray-600">Ngày tạo</Label>
                  <p className="mt-1 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    {selectedTemplate.createdDate}
                  </p>
                </div>
                <div>
                  <Label className="text-gray-600">Người tạo</Label>
                  <p className="mt-1 flex items-center gap-2">
                    <UserIcon className="w-4 h-4 text-gray-500" />
                    {selectedTemplate.createdBy}
                  </p>
                </div>
                <div>
                  <Label className="text-gray-600">Chi nhánh áp dụng</Label>
                  <p className="mt-1">{selectedTemplate.usedBy} chi nhánh</p>
                </div>
              </div>
              <div>
                <Label className="text-gray-600">Mô tả</Label>
                <p className="mt-1 text-gray-700">{selectedTemplate.description}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>Đóng</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Template Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa Template</DialogTitle>
            <DialogDescription>
              Cập nhật thông tin template
            </DialogDescription>
          </DialogHeader>
          {selectedTemplate && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Tên Template</Label>
                <Input id="edit-name" defaultValue={selectedTemplate.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-desc">Mô tả</Label>
                <Input id="edit-desc" defaultValue={selectedTemplate.description} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-layout">Bố cục hiển thị</Label>
                <Select defaultValue={selectedTemplate.layout.toLowerCase()}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dọc">Dọc (Portrait)</SelectItem>
                    <SelectItem value="ngang">Ngang (Landscape)</SelectItem>
                    <SelectItem value="kết hợp">Kết hợp</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-branches">Chi nhánh áp dụng</Label>
                <Input 
                  id="edit-branches" 
                  type="number" 
                  defaultValue={selectedTemplate.usedBy} 
                  placeholder="Số lượng chi nhánh"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Hủy</Button>
            <Button 
              className="bg-orange-500 hover:bg-orange-600" 
              onClick={handleSaveEdit}
            >
              Lưu thay đổi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Permission Management Dialog (Admin Only) */}
      <Dialog open={isPermissionDialogOpen} onOpenChange={setIsPermissionDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Phân quyền sử dụng Template</DialogTitle>
            <DialogDescription>
              Quản lý quyền truy cập template: {selectedTemplate?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên người dùng</TableHead>
                  <TableHead>Vai trò</TableHead>
                  <TableHead className="text-center">Xem</TableHead>
                  <TableHead className="text-center">Sửa</TableHead>
                  <TableHead className="text-center">Xóa</TableHead>
                  <TableHead>Trạng thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userPermissions.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <p>{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.role}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Checkbox 
                        checked={user.canView}
                        onCheckedChange={() => togglePermission(user.id, 'canView')}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <Checkbox 
                        checked={user.canEdit}
                        onCheckedChange={() => togglePermission(user.id, 'canEdit')}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <Checkbox 
                        checked={user.canDelete}
                        onCheckedChange={() => togglePermission(user.id, 'canDelete')}
                      />
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={user.status === 'active' ? 'default' : 'secondary'}
                        className={user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}
                      >
                        {user.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPermissionDialogOpen(false)}>Hủy</Button>
            <Button 
              className="bg-teal-600 hover:bg-teal-700" 
              onClick={handleSavePermissions}
            >
              Lưu thay đổi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
