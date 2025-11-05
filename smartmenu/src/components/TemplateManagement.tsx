import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./ui/breadcrumb";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Plus, Edit, Trash2, Eye, RefreshCw, Search, Shield, Users, Calendar, User as UserIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { toast } from "sonner";

// 🧩 Import các API Template
import { getTemplates, createTemplate, updateTemplate, deleteTemplate } from "../api/modules/templates";

interface TemplateManagementProps {
  userRole?: "admin" | "brand-manager";
}

interface Template {
  id: number;
  name: string;
  layout: string;
  preview?: string;
  status: "active" | "draft" | "inactive";
  usedBy?: number;
  createdBy?: string;
  createdDate?: string;
  description?: string;
}

export function TemplateManagement({ userRole = "admin" }: TemplateManagementProps) {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // 🧠 Gọi API lấy danh sách template
  const fetchTemplates = async () => {
    try {
      const data = await getTemplates();
      setTemplates(data);
    } catch (error) {
      console.error("❌ Lỗi tải danh sách template:", error);
      toast.error("Không thể tải danh sách template!");
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  // 🧩 Lọc dữ liệu theo trạng thái hoặc tìm kiếm
  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || template.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // 🧱 Xử lý CRUD
  const handleCreateTemplate = async () => {
    try {
      const newTemplate = {
        name: "Template mới",
        layoutJson: "{}",
        metadata: "Created by admin",
      };
      await createTemplate(newTemplate);
      await fetchTemplates();
      toast.success("Tạo template mới thành công!");
      setIsCreateDialogOpen(false);
    } catch (error) {
      console.error("❌ Lỗi tạo template:", error);
      toast.error("Không thể tạo template!");
    }
  };

  const handleSaveEdit = async () => {
    if (!selectedTemplate) return;
    try {
      const updatedData = {
        name: selectedTemplate.name,
        layoutJson: "{}",
        metadata: "Updated by admin",
      };
      await updateTemplate(selectedTemplate.id, updatedData);
      await fetchTemplates();
      toast.success("Cập nhật template thành công!");
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("❌ Lỗi cập nhật template:", error);
      toast.error("Không thể cập nhật template!");
    }
  };

  const handleDeleteTemplate = async (template: Template) => {
    if (!confirm(`Bạn có chắc muốn xóa template "${template.name}" không?`)) return;
    try {
      await deleteTemplate(template.id);
      await fetchTemplates();
      toast.success("Đã xóa template thành công!");
    } catch (error) {
      console.error("❌ Lỗi xóa template:", error);
      toast.error("Không thể xóa template!");
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#" className="text-gray-600">
              Quản lý hệ thống
            </BreadcrumbLink>
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
          <p className="text-sm text-gray-500">
            Tạo, chỉnh sửa và phân quyền sử dụng các mẫu menu hiển thị
          </p>
        </div>
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={fetchTemplates}>
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Tải lại danh sách template</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button
            className="bg-orange-500 hover:bg-orange-600"
            onClick={() => setIsCreateDialogOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Tạo mẫu mới
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
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
                  src={
                    template.preview ||
                    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=600&fit=crop"
                  }
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge
                    className={
                      template.status === "active"
                        ? "bg-green-500"
                        : template.status === "draft"
                        ? "bg-blue-500"
                        : "bg-gray-500"
                    }
                  >
                    {template.status === "active" && "Đang dùng"}
                    {template.status === "draft" && "Bản nháp"}
                    {template.status === "inactive" && "Ngừng sử dụng"}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="mb-2">{template.name}</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <div>Bố cục: {template.layout || "Không xác định"}</div>
                  <div>Người tạo: {template.createdBy || "Không rõ"}</div>
                  <div>
                    Ngày tạo: {template.createdDate || new Date().toLocaleDateString()}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0 flex gap-2 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    setSelectedTemplate(template);
                    setIsViewDialogOpen(true);
                  }}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Xem
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    setSelectedTemplate(template);
                    setIsEditDialogOpen(true);
                  }}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Sửa
                </Button>
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

      {/* Create Template Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Tạo Template mới</DialogTitle>
            <DialogDescription>
              Nhập thông tin template để thêm vào hệ thống
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Tên template</Label>
              <Input placeholder="VD: Menu Mùa Hè 2025" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Hủy
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600" onClick={handleCreateTemplate}>
              Tạo mẫu
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Template Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa Template</DialogTitle>
          </DialogHeader>
          {selectedTemplate && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Tên Template</Label>
                <Input
                  id="edit-name"
                  defaultValue={selectedTemplate.name}
                  onChange={(e) =>
                    setSelectedTemplate({ ...selectedTemplate, name: e.target.value })
                  }
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Hủy
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600" onClick={handleSaveEdit}>
              Lưu thay đổi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Template Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Chi tiết Template</DialogTitle>
          </DialogHeader>
          {selectedTemplate && (
            <div className="space-y-4 py-4">
              <img
                src={selectedTemplate.preview || "https://via.placeholder.com/400x300"}
                alt={selectedTemplate.name}
                className="rounded-lg w-full"
              />
              <div>
                <p className="font-semibold">{selectedTemplate.name}</p>
                <p className="text-sm text-gray-600 mt-2">
                  Bố cục: {selectedTemplate.layout}
                </p>
                <p className="text-sm text-gray-600">
                  Trạng thái: {selectedTemplate.status}
                </p>
                <p className="text-sm text-gray-600">
                  Ngày tạo: {selectedTemplate.createdDate}
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
