SmartMenu System - Front-End



Đây là dự án front-end cho Hệ thống Quản lý Menu Số (SmartMenu System). Dự án được xây dựng bằng React, Vite, TypeScript, và sử dụng thư viện component Shadcn/ui với Tailwind CSS.



Giao diện (Demo)



Giao diện trang đăng nhập (LoginPage) của hệ thống.



(Bạn hãy chụp ảnh màn hình dự án của mình sau khi đã chạy thành công và thay thế link placeholder bên dưới)



Công nghệ sử dụng



Framework: React 18



Ngôn ngữ: TypeScript



Build Tool: Vite



Styling: Tailwind CSS 3



Component Library: Shadcn/ui



Icons: Lucide React



Animation Plugin: tailwindcss-animate



Hướng dẫn cài đặt và Khởi chạy



Dự án này yêu cầu Node.js phiên bản 18.x trở lên.



1\. Clone a repository



git clone <link-repository-git-cua-ban>





2\. Di chuyển vào thư mục dự án



Quan trọng: Toàn bộ dự án nằm trong thư mục smartmenu.



cd smartmenu





3\. Cài đặt Dependencies



Cài đặt tất cả các thư viện cần thiết từ package.json:



npm install





4\. Chạy Server Development



Khởi chạy server Vite ở chế độ development:



npm run dev





Sau đó, mở trình duyệt và truy cập vào http://localhost:5173 (hoặc cổng mà Vite hiển thị trong terminal) để xem ứng dụng.



Các lưu ý quan trọng (Troubleshooting)



Dự án này đã được cấu hình rất cụ thể để Shadcn/ui hoạt động chính xác với Vite. Nếu bạn clone dự án về và gặp lỗi giao diện (UI) bị "vỡ" (không hiển thị CSS), hãy đảm bảo bạn đã kiểm tra:



package.json:



Đảm bảo tailwindcss là phiên bản ^3.4.0 (v3), không phải v4.



Đảm bảo tailwindcss-animate đã được cài đặt.



tailwind.config.js:



Đây là file quan trọng nhất. Nó phải chứa đầy đủ phần theme.extend.colors (định nghĩa các màu primary, secondary, border, background...) và plugins: \[require("tailwindcss-animate")]. Nếu không có, Shadcn sẽ không thể áp dụng class.



src/styles/globals.css:



File này bắt buộc phải có 3 dòng @tailwind base;, @tailwind components;, @tailwind utilities; ở trên cùng của file.



src/main.tsx (hoặc .jsx):



File này bắt buộc phải import './styles/globals.css'; ở trên cùng để nạp CSS vào ứng dụng.



vite.config.mts:



Dự án sử dụng file config có đuôi .mts (thay vì .ts) để xử lý các plugin (như @vitejs/plugin-react) dạng ESM, tránh lỗi ESM file cannot be loaded by require.

