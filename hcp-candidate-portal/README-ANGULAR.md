# Health Candidate Portal - Angular Version

## نظرة عامة
تم تحويل المشروع من React إلى Angular بنفس التصميم والوظائف الأساسية.

## الميزات الرئيسية
- ✅ تصميم متجاوب (Responsive Design)
- ✅ دعم اللغة العربية والإنجليزية (RTL/LTR)
- ✅ استخدام Tailwind CSS للتصميم
- ✅ مكونات قابلة لإعادة الاستخدام
- ✅ تصميم حديث وأنيق
- ✅ تحسين الأداء مع Standalone Components

## التقنيات المستخدمة
- **Angular 20** - أحدث إصدار من Angular
- **TypeScript** - للكتابة الآمنة
- **Tailwind CSS** - للتصميم
- **ngx-translate** - للترجمة والدعم متعدد اللغات
- **Lucide Angular** - للأيقونات
- **Angular Router** - للتنقل
- **Standalone Components** - لتحسين الأداء

## هيكل المشروع
```
src/
├── app/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── layout.component.ts
│   │   │   ├── navbar/
│   │   │   └── footer/
│   │   ├── hero-section/
│   │   ├── statistics-section/
│   │   ├── news-section/
│   │   └── quick-links/
│   ├── pages/
│   │   ├── home/
│   │   ├── jobs/
│   │   ├── hire/
│   │   ├── clinics/
│   │   ├── contact/
│   │   ├── login/
│   │   ├── register/
│   │   └── personal-info/
│   ├── services/
│   │   ├── language.service.ts
│   │   └── theme.service.ts
│   ├── app.config.ts
│   ├── app.routes.ts
│   └── app.ts
├── assets/
│   └── i18n/
│       ├── ar.json
│       └── en.json
└── styles.css
```

## كيفية التشغيل

### 1. تثبيت المكتبات
```bash
npm install
```

### 2. تشغيل المشروع في وضع التطوير
```bash
npm start
```

### 3. بناء المشروع للإنتاج
```bash
npm run build
```

### 4. تشغيل الاختبارات
```bash
npm test
```

## الأوامر المفيدة

### إنشاء مكون جديد
```bash
ng generate component components/my-component --standalone
```

### إنشاء خدمة جديدة
```bash
ng generate service services/my-service
```

### إنشاء صفحة جديدة
```bash
ng generate component pages/my-page --standalone
```

## المميزات المطورة

### 1. دعم اللغات
- تبديل سلس بين العربية والإنجليزية
- حفظ تفضيل اللغة في Local Storage
- دعم كامل لـ RTL/LTR

### 2. تصميم متجاوب
- يعمل على جميع أحجام الشاشات
- تصميم Mobile-First
- قوائم تنقل محسنة للهواتف

### 3. الأداء
- استخدام Standalone Components
- Lazy Loading للصفحات
- تحسين البحث والتصفية

### 4. إمكانية الوصول
- دعم ARIA labels
- Navigation بالكيبورد
- ألوان متباينة للوضوح

## تخصيص التصميم

### ألوان المشروع
يمكن تعديل الألوان في `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        500: '#3b82f6',
        600: '#2563eb',
        // ...
      }
    }
  }
}
```

### إضافة لغة جديدة
1. أنشئ ملف ترجمة جديد في `src/assets/i18n/`
2. أضف اللغة في `language.service.ts`
3. حدث المكون `language-switcher.component.ts`

## المساهمة
1. Fork المشروع
2. أنشئ فرع جديد (`git checkout -b feature/AmazingFeature`)
3. اعمل Commit للتغييرات (`git commit -m 'Add some AmazingFeature'`)
4. ادفع إلى الفرع (`git push origin feature/AmazingFeature`)
5. افتح Pull Request

## الترخيص
هذا المشروع مرخص تحت رخصة MIT - انظر ملف [LICENSE](LICENSE) للتفاصيل.

## الدعم
للدعم التقني أو الاستفسارات:
- البريد الإلكتروني: support@medconnect.sa
- الهاتف: +966 12 345 6789
