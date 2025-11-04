import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { Eye, Play, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Progress } from './ui/progress';

export function StoreStaffView() {
  const playlists = [
    {
      id: 1,
      name: 'Menu Mùa Hè 2024',
      duration: '3 phút 20 giây',
      status: 'active',
      lastUpdate: '2 giờ trước',
      pages: 12,
    },
    {
      id: 2,
      name: 'Khuyến Mãi Đặc Biệt',
      duration: '2 phút 15 giây',
      status: 'pending',
      lastUpdate: '5 phút trước',
      pages: 8,
    },
    {
      id: 3,
      name: 'Menu Combo Trưa',
      duration: '4 phút 10 giây',
      status: 'active',
      lastUpdate: '1 ngày trước',
      pages: 15,
    },
    {
      id: 4,
      name: 'Menu Tối Cuối Tuần',
      duration: '3 phút 45 giây',
      status: 'error',
      lastUpdate: '3 giờ trước',
      pages: 10,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-gray-900">Xem & Kiểm tra Playlist</h2>
        <p className="text-sm text-gray-500">Quản lý và phê duyệt playlist cho cửa hàng</p>
      </div>

      {/* Current Store Info */}
      <Card className="bg-gradient-to-r from-orange-50 to-teal-50 border-orange-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-900 mb-1">Chi nhánh Quận 1</h3>
              <p className="text-sm text-gray-600">15 thiết bị đang hoạt động</p>
            </div>
            <Badge className="bg-green-500 text-white">
              <CheckCircle className="w-4 h-4 mr-1" />
              Đang hoạt động
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Playlists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {playlists.map((playlist) => (
          <Card key={playlist.id} className={`${playlist.status === 'pending' ? 'border-orange-300 bg-orange-50' : ''}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{playlist.name}</CardTitle>
                  <CardDescription className="mt-1">
                    {playlist.pages} trang • {playlist.duration}
                  </CardDescription>
                </div>
                <Badge
                  className={
                    playlist.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : playlist.status === 'pending'
                      ? 'bg-orange-100 text-orange-700'
                      : 'bg-red-100 text-red-700'
                  }
                >
                  {playlist.status === 'active' && (
                    <>
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Đang hoạt động
                    </>
                  )}
                  {playlist.status === 'pending' && (
                    <>
                      <Clock className="w-3 h-3 mr-1" />
                      Đang chờ xuất bản
                    </>
                  )}
                  {playlist.status === 'error' && (
                    <>
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Lỗi phát
                    </>
                  )}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm text-gray-600">
                  Cập nhật lần cuối: {playlist.lastUpdate}
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-4 h-4 mr-2" />
                    Xem trước trên trình duyệt
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Play className="w-4 h-4 mr-2" />
                    Phát lại trên TV
                  </Button>
                </div>

                {playlist.status === 'pending' && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className="w-full bg-orange-500 hover:bg-orange-600">
                        Phê duyệt & Xuất bản
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Xác nhận xuất bản playlist</AlertDialogTitle>
                        <AlertDialogDescription>
                          Bạn có chắc muốn xuất bản playlist "{playlist.name}" không? 
                          Playlist sẽ được hiển thị trên tất cả thiết bị tại chi nhánh này.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                        <AlertDialogAction className="bg-orange-500 hover:bg-orange-600">
                          Xác nhận
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pending Approval Section */}
      <Card className="border-orange-200">
        <CardHeader>
          <CardTitle>Phê duyệt & Xuất bản Playlist</CardTitle>
          <CardDescription>Các playlist đang chờ phê duyệt để xuất bản</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {playlists
              .filter(p => p.status === 'pending')
              .map((playlist) => (
                <div key={playlist.id} className="flex items-center gap-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex-1">
                    <h4 className="mb-1">{playlist.name}</h4>
                    <p className="text-sm text-gray-600">
                      {playlist.pages} trang • {playlist.duration} • Cập nhật {playlist.lastUpdate}
                    </p>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className="bg-orange-500 hover:bg-orange-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Phê duyệt
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Xác nhận xuất bản playlist</AlertDialogTitle>
                        <AlertDialogDescription className="space-y-3">
                          <p>
                            Bạn có chắc muốn xuất bản playlist "{playlist.name}" không?
                          </p>
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="text-sm text-blue-800">
                              <strong>Thông tin xuất bản:</strong>
                            </p>
                            <ul className="text-sm text-blue-700 mt-2 space-y-1">
                              <li>• Thiết bị: 15 thiết bị tại Chi nhánh Quận 1</li>
                              <li>• Thời gian: Ngay lập tức</li>
                              <li>• Thời lượng: {playlist.duration}</li>
                            </ul>
                          </div>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                        <AlertDialogAction className="bg-orange-500 hover:bg-orange-600">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Xác nhận xuất bản
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              ))}
            {playlists.filter(p => p.status === 'pending').length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Không có playlist nào đang chờ phê duyệt
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-sm text-gray-600">Tổng số playlist</p>
          <p className="text-gray-900 mt-1">{playlists.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-sm text-gray-600">Đang hoạt động</p>
          <p className="text-gray-900 mt-1">{playlists.filter(p => p.status === 'active').length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-sm text-gray-600">Chờ phê duyệt</p>
          <p className="text-gray-900 mt-1">{playlists.filter(p => p.status === 'pending').length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-sm text-gray-600">Lỗi</p>
          <p className="text-gray-900 mt-1">{playlists.filter(p => p.status === 'error').length}</p>
        </div>
      </div>
    </div>
  );
}
