# 🌍 Field Survey PWA (ODK Collect Clone)

Một ứng dụng Progressive Web App (PWA) mô phỏng lại các tính năng cốt lõi của **ODK Collect**, phục vụ cho công tác thu thập dữ liệu hiện trường, đo đạc và khảo sát tại các khu vực không có kết nối Internet.

Dự án được xây dựng với tư duy **Offline-first**, kết hợp giao diện hiện đại mang phong cách Glassmorphism.

---

## ✨ Tính năng nổi bật

*   **PWA & Cross-platform:** Cài đặt trực tiếp lên Màn hình chính của Android/iOS/Windows mà không cần thông qua App Store/Google Play. Chạy độc lập toàn màn hình.
*   **Hoạt động Offline-first:** Tự động phát hiện trạng thái mạng. Lưu trữ dữ liệu an toàn vào cơ sở dữ liệu nội bộ của thiết bị khi mất kết nối.
*   **Thu thập Tọa độ GPS:** Gọi trực tiếp API vệ tinh của thiết bị để lấy tọa độ Vĩ độ/Kinh độ chính xác.
*   **Tích hợp Camera:** Chụp ảnh hiện trường trực tiếp từ trình duyệt và nén dưới định dạng Base64 để lưu trữ cục bộ.
*   **Giao diện Glassmorphism:** Trải nghiệm UX/UI mượt mà với hiệu ứng hạt particles, kính mờ và hệ thống animation trơn tru.

---

## 🛠️ Công nghệ sử dụng (Tech Stack)

*   **Framework:** Vue 3 (Composition API) + TypeScript
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS v4
*   **Database (Offline):** Dexie.js (IndexedDB wrapper)
*   **PWA Plugin:** `vite-plugin-pwa`
*   **Hiệu ứng:** `@tsparticles/vue3`

---

## 🚀 Hướng dẫn cài đặt và chạy nội bộ (Local Development)

### 1. Yêu cầu môi trường
*   Node.js (Phiên bản 18.x trở lên)
*   NPM hoặc Yarn

### 2. Cài đặt

Clone dự án về máy:
```bash
git clone [https://github.com/trCongThanh/field-survey-odk.git](https://github.com/trCongThanh/field-survey-odk.git)
cd field-survey-odk

### 3. Triển Khai Thực Tế

https://truongcongthanh-odk-collect.netlify.app/

