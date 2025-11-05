import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Monitor } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { login } from '../api/modules/auth';
import { jwtDecode } from 'jwt-decode'; // ✅ đúng cú pháp cho TypeScript

interface LoginPageProps {
  onLogin: (role: 'admin' | 'brand-manager' | 'store-staff') => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1️⃣ Gọi API login để lấy token JWT
      const token = await login(email, password);

      if (!token || typeof token !== 'string') {
        throw new Error('Token không hợp lệ');
      }

      // 2️⃣ Lưu token vào localStorage
      localStorage.setItem('token', token);

      // 3️⃣ Decode token để lấy role/email
      const decoded: any = jwtDecode(token);

      // 🧩 Xử lý mọi kiểu role mà .NET có thể trả
      const rawRole =
        decoded.role ||
        decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ||
        decoded['Role'] ||
        '';

      const role = rawRole.toString().toLowerCase();

      console.log('✅ Token decoded:', decoded);
      console.log('🎭 Role xác định:', role);

      // 4️⃣ Chuyển hướng theo role
      if (role.includes('admin')) {
        onLogin('admin');
      } else if (role.includes('manager')) {
        onLogin('brand-manager');
      } else {
        onLogin('store-staff');
      }
    } catch (err) {
      console.error('❌ Lỗi đăng nhập:', err);
      setError('Đăng nhập thất bại. Kiểm tra email và mật khẩu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-teal-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-teal-500 rounded-2xl flex items-center justify-center">
              <Monitor className="w-10 h-10 text-white" />
            </div>
          </div>
          <CardTitle className="text-gray-900">SmartMenu System</CardTitle>
          <CardDescription>Hệ thống quản lý menu số cho chuỗi cửa hàng</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600"
            >
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </Button>

            <div className="text-center">
              <Button variant="link" className="text-sm text-teal-600">
                Quên mật khẩu?
              </Button>
            </div>
          </form>

          <div className="mt-6 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-800 mb-2">Tài khoản demo:</p>
            <p className="text-xs text-blue-700">• admin@smartmenu.com (Admin)</p>
            <p className="text-xs text-blue-700">• manager@smartmenu.com (Brand Manager)</p>
            <p className="text-xs text-blue-700">• staff@smartmenu.com (Store Staff)</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
