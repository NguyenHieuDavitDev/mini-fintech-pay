# Mini Fintech Pay


## Tính năng chính

-  **Giỏ hàng thông minh**: Thêm, xóa, cập nhật sản phẩm
- **Thanh toán MoMo**: Tích hợp thanh toán trực tuyến
- **Gửi hóa đơn**: Tự động gửi hóa đơn PDF qua email
- **Responsive**: Giao diện thân thiện trên mọi thiết bị
- **UI/UX hiện đại**: Giao diện đẹp mắt với gradient và animations


## Yêu cầu hệ thống

- **Node.js**: Phiên bản 14.x trở lên
- **npm**: Phiên bản 6.x trở lên
- **Git**: Để clone repository

## Hướng dẫn cài đặt

### Bước 1: Clone dự án

```bash
git clone <repository-url>
cd thanhtoanpj
```

### Bước 2: Cài đặt Backend

```bash
cd backend
npm install
```

### Bước 3: Cài đặt Frontend

```bash
cd ../frontend
npm install
```

### Bước 4: Cấu hình MoMo Payment

Mở file `backend/server.js` và cập nhật các thông tin sau:

```javascript
// Thông tin MoMo (cần đăng ký tại https://developers.momo.vn/)
const partnerCode = "YOUR_PARTNER_CODE";
const accessKey = "YOUR_ACCESS_KEY";
const secretKey = "YOUR_SECRET_KEY";

// URL redirect (thay đổi theo domain của bạn)
const redirectUrl = "http://localhost:3001/momo-return";
const ipnUrl = "http://localhost:3000/momo-ipn";
```

### Bước 5: Cấu hình Email

Cập nhật thông tin email trong `backend/server.js`:

```javascript
const INVOICE_SENDER_EMAIL = "your-email@gmail.com";
const INVOICE_SENDER_PASS = "your-app-password"; // App password từ Gmail
```

**Lưu ý**: Để sử dụng Gmail, bạn cần:
1. Bật 2-factor authentication
2. Tạo App Password tại: https://myaccount.google.com/apppasswords
3. Sử dụng App Password thay vì mật khẩu thường

## Chạy ứng dụng

### Chạy Backend

```bash
cd backend
npm start
# hoặc chạy development mode
npm run dev
```

Backend sẽ chạy tại: `http://localhost:3000`

### Chạy Frontend

```bash
cd frontend
npm start
```

Frontend sẽ chạy tại: `http://localhost:3001`

## API Endpoints

### Backend APIs

- `POST /create-payment` - Tạo thanh toán MoMo
- `POST /momo-ipn` - Webhook nhận thông báo từ MoMo
- `POST /send-invoice` - Gửi hóa đơn qua email
- `POST /generate-invoice` - Tạo hóa đơn PDF

### Frontend Routes

- `/` - Trang chủ với danh sách sản phẩm
- `/momo-return` - Trang xử lý kết quả thanh toán

