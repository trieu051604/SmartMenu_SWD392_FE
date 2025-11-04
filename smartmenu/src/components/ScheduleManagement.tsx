import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar } from './ui/calendar';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Calendar as CalendarIcon, Clock, AlertTriangle, Plus, Edit, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

export function ScheduleManagement() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const schedules = [
    {
      id: 1,
      playlist: 'Menu Mùa Hè 2024',
      devices: 'Tất cả thiết bị (248)',
      startDate: '01/11/2024',
      startTime: '08:00',
      frequency: 'Hàng ngày',
      priority: 'Cao',
      status: 'active',
    },
    {
      id: 2,
      playlist: 'Khuyến Mãi Đặc Biệt',
      devices: 'Chi nhánh Quận 1 (15)',
      startDate: '03/11/2024',
      startTime: '12:00',
      frequency: 'Cuối tuần',
      priority: 'Trung bình',
      status: 'scheduled',
    },
    {
      id: 3,
      playlist: 'Menu Combo Trưa',
      devices: 'Chi nhánh Quận 3 (12)',
      startDate: '01/11/2024',
      startTime: '11:30',
      frequency: 'Thứ 2-6',
      priority: 'Cao',
      status: 'active',
    },
    {
      id: 4,
      playlist: 'Menu Tối Cuối Tuần',
      devices: 'Tất cả thiết bị (248)',
      startDate: '02/11/2024',
      startTime: '18:00',
      frequency: 'T7-CN',
      priority: 'Thấp',
      status: 'conflict',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-gray-900">Lịch phát Playlist</h2>
          <p className="text-sm text-gray-500">Lên lịch hiển thị playlist trên các thiết bị</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600">
          <Plus className="w-4 h-4 mr-2" />
          Tạo lịch mới
        </Button>
      </div>

      {/* Conflict Warning */}
      <Alert className="bg-red-50 border-red-200">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          <strong>Phát hiện trùng lịch!</strong> Có 1 lịch phát xung đột thời gian.{' '}
          <Button variant="link" className="text-red-600 p-0 ml-1 h-auto">
            Xem chi tiết
          </Button>
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Schedule Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Create Schedule Form */}
          <Card>
            <CardHeader>
              <CardTitle>Tạo lịch phát mới</CardTitle>
              <CardDescription>Cấu hình thời gian và thiết bị hiển thị</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Chọn playlist</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn playlist" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Menu Mùa Hè 2024</SelectItem>
                      <SelectItem value="2">Khuyến Mãi Đặc Biệt</SelectItem>
                      <SelectItem value="3">Menu Combo Trưa</SelectItem>
                      <SelectItem value="4">Menu Tối Cuối Tuần</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Thiết bị hiển thị</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn thiết bị" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả thiết bị (248)</SelectItem>
                      <SelectItem value="q1">Chi nhánh Quận 1 (15)</SelectItem>
                      <SelectItem value="q3">Chi nhánh Quận 3 (12)</SelectItem>
                      <SelectItem value="q7">Chi nhánh Quận 7 (20)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Ngày bắt đầu</Label>
                  <Input type="date" defaultValue="2024-11-03" />
                </div>

                <div className="space-y-2">
                  <Label>Giờ bắt đầu</Label>
                  <Input type="time" defaultValue="08:00" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tần suất</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn tần suất" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Hàng ngày</SelectItem>
                      <SelectItem value="weekday">Thứ 2-6</SelectItem>
                      <SelectItem value="weekend">Cuối tuần</SelectItem>
                      <SelectItem value="custom">Tùy chỉnh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Độ ưu tiên</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn độ ưu tiên" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">Cao</SelectItem>
                      <SelectItem value="medium">Trung bình</SelectItem>
                      <SelectItem value="low">Thấp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button className="flex-1 bg-teal-600 hover:bg-teal-700">
                  Kiểm tra xung đột
                </Button>
                <Button className="flex-1 bg-orange-500 hover:bg-orange-600">
                  Lên lịch phát
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Schedule List */}
          <Card>
            <CardHeader>
              <CardTitle>Lịch phát đang có</CardTitle>
              <CardDescription>Quản lý các lịch phát đã tạo</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Playlist</TableHead>
                    <TableHead>Thiết bị</TableHead>
                    <TableHead>Thời gian</TableHead>
                    <TableHead>Tần suất</TableHead>
                    <TableHead>Ưu tiên</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schedules.map((schedule) => (
                    <TableRow key={schedule.id}>
                      <TableCell>{schedule.playlist}</TableCell>
                      <TableCell className="text-sm text-gray-600">{schedule.devices}</TableCell>
                      <TableCell className="text-sm">
                        <div>{schedule.startDate}</div>
                        <div className="text-gray-500">{schedule.startTime}</div>
                      </TableCell>
                      <TableCell className="text-sm">{schedule.frequency}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            schedule.priority === 'Cao'
                              ? 'bg-red-100 text-red-700'
                              : schedule.priority === 'Trung bình'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-gray-100 text-gray-700'
                          }
                        >
                          {schedule.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            schedule.status === 'active'
                              ? 'bg-green-100 text-green-700'
                              : schedule.status === 'conflict'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-blue-100 text-blue-700'
                          }
                        >
                          {schedule.status === 'active' && 'Đang chạy'}
                          {schedule.status === 'scheduled' && 'Đã lên lịch'}
                          {schedule.status === 'conflict' && 'Xung đột'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Calendar View */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lịch tháng</CardTitle>
              <CardDescription>Xem tổng quan lịch phát</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lịch hôm nay</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                <Clock className="w-4 h-4 text-orange-600 mt-1" />
                <div className="flex-1">
                  <p className="text-sm">Menu Mùa Hè 2024</p>
                  <p className="text-xs text-gray-600 mt-1">08:00 - Tất cả thiết bị</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-teal-50 rounded-lg border border-teal-200">
                <Clock className="w-4 h-4 text-teal-600 mt-1" />
                <div className="flex-1">
                  <p className="text-sm">Menu Combo Trưa</p>
                  <p className="text-xs text-gray-600 mt-1">11:30 - Chi nhánh Q3</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <Clock className="w-4 h-4 text-blue-600 mt-1" />
                <div className="flex-1">
                  <p className="text-sm">Menu Tối Cuối Tuần</p>
                  <p className="text-xs text-gray-600 mt-1">18:00 - Tất cả thiết bị</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
