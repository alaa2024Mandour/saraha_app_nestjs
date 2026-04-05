# 1. بنستخدم نسخة Node مستقرة وخفيفة
FROM node:20-alpine

# 2. الفولدر اللي الكود هيعيش فيه جوه الدوكر
WORKDIR /usr/src/app

# 3. بننسخ ملفات الـ package عشان ننزل المكتبات
COPY package*.json ./
RUN npm install

# 4. بننسخ باقي كود المشروع كله
COPY . .

# 5. بنعمل Build للمشروع (عشان يحول الـ TS لـ JS)
RUN npm run build

# 6. بنفتح بورت 3000 للأبلكيشن
EXPOSE 3000

# 7. أمر التشغيل النهائي
CMD ["npm", "run", "start:dev"]