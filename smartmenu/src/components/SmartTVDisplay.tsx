import { useState, useEffect } from 'react';
import { Badge } from './ui/badge';
import { RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function SmartTVDisplay() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  const menuPages = [
    {
      title: 'Menu hôm nay',
      items: [
        { name: 'Cà phê đen', price: '35,000', category: 'Cà phê', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop' },
        { name: 'Cà phê sữa', price: '40,000', category: 'Cà phê', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop' },
        { name: 'Bạc xỉu', price: '42,000', category: 'Cà phê', image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=300&fit=crop' },
        { name: 'Trà đào cam sả', price: '45,000', category: 'Trà', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop' },
        { name: 'Trà sữa trân châu', price: '48,000', category: 'Trà', image: 'https://images.unsplash.com/photo-1525385444278-e7eca32a6f3a?w=400&h=300&fit=crop' },
        { name: 'Sinh tố bơ', price: '50,000', category: 'Sinh tố', image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&h=300&fit=crop' },
      ],
    },
    {
      title: 'Ưu đãi đặc biệt',
      items: [
        { name: 'Combo Sáng Tươi', price: '79,000', originalPrice: '95,000', category: 'Combo', isPromo: true, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=400&fit=crop' },
        { name: 'Combo Trưa Tiết Kiệm', price: '89,000', originalPrice: '110,000', category: 'Combo', isPromo: true, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=400&fit=crop' },
      ],
    },
    {
      title: 'Món mới',
      items: [
        { name: 'Matcha Latte Đặc Biệt', price: '55,000', category: 'Đồ uống', isNew: true, image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400&h=300&fit=crop' },
        { name: 'Bánh Tiramisu Ý', price: '45,000', category: 'Bánh ngọt', isNew: true, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop' },
        { name: 'Croissant Bơ Pháp', price: '35,000', category: 'Bánh mặn', isNew: true, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop' },
        { name: 'Smoothie Xoài Dừa', price: '52,000', category: 'Sinh tố', isNew: true, image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?w=400&h=300&fit=crop' },
      ],
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % menuPages.length);
    }, 10000); // Change page every 10 seconds

    return () => clearInterval(interval);
  }, [menuPages.length]);

  useEffect(() => {
    // Simulate content update
    const updateInterval = setInterval(() => {
      setIsUpdating(true);
      setTimeout(() => setIsUpdating(false), 2000);
    }, 60000); // Check for updates every minute

    return () => clearInterval(updateInterval);
  }, []);

  const currentPageData = menuPages[currentPage];
  const isPromoPage = currentPageData.items.some(item => item.isPromo);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-teal-50 p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-gray-900 flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-teal-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">☕</span>
              </div>
              SmartMenu Café
            </h1>
            <p className="text-gray-600 mt-1">Chi nhánh Quận 1 • Hotline: 1900-xxxx</p>
          </div>
          {isUpdating && (
            <div className="flex items-center gap-2 text-teal-600 bg-teal-50 px-4 py-2 rounded-lg">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span className="text-sm">Đang cập nhật nội dung...</span>
            </div>
          )}
        </div>
      </div>

      {/* Page Indicator */}
      <div className="max-w-7xl mx-auto mb-6 flex justify-center gap-2">
        {menuPages.map((_, index) => (
          <div
            key={index}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === currentPage 
                ? 'w-12 bg-gradient-to-r from-orange-500 to-teal-500' 
                : 'w-8 bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            {/* Section Title */}
            <div className="text-center mb-8">
              <h2 className="text-gray-900 inline-block relative">
                {currentPageData.title}
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-teal-500 rounded-full" />
              </h2>
            </div>

            {/* Menu Items */}
            {isPromoPage ? (
              // Promo Layout - Large Cards
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {currentPageData.items.map((item, index) => (
                  <div key={index} className="relative bg-white rounded-2xl overflow-hidden shadow-lg">
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-red-500 text-white text-lg px-4 py-2">
                        KHUYẾN MÃI
                      </Badge>
                    </div>
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-gray-900 mb-2">{item.name}</h3>
                      <div className="flex items-baseline gap-3">
                        <span className="text-orange-600">{item.price} ₫</span>
                        <span className="text-gray-400 line-through">{item.originalPrice} ₫</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Regular Layout - Grid
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {currentPageData.items.map((item, index) => (
                  <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                    <div className="relative">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-48 object-cover"
                      />
                      {item.isNew && (
                        <Badge className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-teal-500 text-white">
                          MỚI
                        </Badge>
                      )}
                      {item.outOfStock && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <Badge className="bg-red-500 text-white text-lg px-4 py-2">
                            HẾT HÀNG
                          </Badge>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="text-xs text-gray-500 mb-1">{item.category}</div>
                      <h3 className="text-lg mb-2">{item.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-orange-600">{item.price} ₫</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div>
            📍 123 Nguyễn Huệ, Quận 1, TP.HCM • 🕐 Mở cửa: 7:00 - 22:00
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Đang cập nhật trực tuyến</span>
          </div>
        </div>
      </div>
    </div>
  );
}
