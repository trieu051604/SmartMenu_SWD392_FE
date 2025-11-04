import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { GripVertical, Plus, Eye, Save, Trash2, Image as ImageIcon } from 'lucide-react';

export function PlaylistManagement() {
  const [playlistName, setPlaylistName] = useState('Playlist mới');
  const [selectedItems, setSelectedItems] = useState([
    { id: 1, name: 'Menu Mùa Hè 2024', duration: 10, type: 'template' },
    { id: 2, name: 'Khuyến Mãi Đặc Biệt', duration: 8, type: 'template' },
  ]);

  const availableTemplates = [
    { id: 3, name: 'Menu Cà Phế Sáng', type: 'template' },
    { id: 4, name: 'Menu Combo Trưa', type: 'template' },
    { id: 5, name: 'Đồ Uống Đặc Biệt', type: 'template' },
    { id: 6, name: 'Menu Tối Cuối Tuần', type: 'template' },
  ];

  const addToPlaylist = (template: typeof availableTemplates[0]) => {
    setSelectedItems([...selectedItems, { ...template, duration: 10 }]);
  };

  const removeFromPlaylist = (id: number) => {
    setSelectedItems(selectedItems.filter(item => item.id !== id));
  };

  const updateDuration = (id: number, duration: number) => {
    setSelectedItems(selectedItems.map(item => 
      item.id === id ? { ...item, duration } : item
    ));
  };

  const totalDuration = selectedItems.reduce((sum, item) => sum + item.duration, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-gray-900">Quản lý Playlist</h2>
          <p className="text-sm text-gray-500">Tạo và sắp xếp thứ tự hiển thị các template menu</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Xem trước
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Save className="w-4 h-4 mr-2" />
            Lưu
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600">
            Xuất bản
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Playlist Editor */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Playlist Editor</CardTitle>
              <CardDescription>Kéo thả để sắp xếp thứ tự hiển thị</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Tên Playlist</Label>
                <Input 
                  value={playlistName}
                  onChange={(e) => setPlaylistName(e.target.value)}
                  placeholder="Nhập tên playlist"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Danh sách hiển thị</Label>
                  <Badge variant="outline" className="text-teal-600 border-teal-200">
                    Tổng: {totalDuration} giây
                  </Badge>
                </div>

                {selectedItems.length === 0 ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                    <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                    <p className="text-gray-600 mb-1">Kéo thả mẫu vào đây để tạo playlist</p>
                    <p className="text-sm text-gray-400">hoặc chọn từ danh sách bên phải</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {selectedItems.map((item, index) => (
                      <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-orange-300 transition-colors">
                        <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">#{index + 1}</Badge>
                            <span className="text-sm">{item.name}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            value={item.duration}
                            onChange={(e) => updateDuration(item.id, parseInt(e.target.value) || 10)}
                            className="w-20 text-sm"
                          />
                          <span className="text-sm text-gray-600">giây</span>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeFromPlaylist(item.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {selectedItems.length > 0 && (
                <Button variant="outline" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm trang mới
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Available Templates */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Template có sẵn</CardTitle>
              <CardDescription>Click để thêm vào playlist</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {availableTemplates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => addToPlaylist(template)}
                  className="w-full p-3 text-left bg-white border border-gray-200 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-teal-100 rounded flex items-center justify-center">
                      <ImageIcon className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{template.name}</p>
                      <p className="text-xs text-gray-500">Template</p>
                    </div>
                    <Plus className="w-4 h-4 text-gray-400" />
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cài đặt hiển thị</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Thời lượng mặc định</Label>
                <div className="flex items-center gap-2">
                  <Input type="number" defaultValue={10} className="flex-1" />
                  <span className="text-sm text-gray-600">giây</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Hiệu ứng chuyển cảnh</Label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>Mờ dần</option>
                  <option>Trượt</option>
                  <option>Phóng to</option>
                  <option>Không có</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-sm text-gray-600">Số trang</p>
          <p className="text-gray-900 mt-1">{selectedItems.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-sm text-gray-600">Tổng thời lượng</p>
          <p className="text-gray-900 mt-1">{totalDuration} giây</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-sm text-gray-600">Thời gian vòng lặp</p>
          <p className="text-gray-900 mt-1">{Math.floor(totalDuration / 60)} phút</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-sm text-gray-600">Trạng thái</p>
          <Badge className="mt-1 bg-yellow-100 text-yellow-700">Bản nháp</Badge>
        </div>
      </div>
    </div>
  );
}
