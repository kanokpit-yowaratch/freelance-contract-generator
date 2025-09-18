# Freelance Contract Generator

แอปพลิเคชันช่วยสร้างเอกสารสัญญาสำหรับ Freelance พัฒนาด้วย Next.js, TypeScript และ Tailwind CSS

## ✨ Features

- 📝 สร้างสัญญา แบบ Interactive
- 📄 Export เป็น PDF ด้วย Puppeteer
- 📱 Responsive Design
- 🚀 Deploy ง่ายบน Vercel

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **PDF Generation**: Puppeteer
- **Deployment**: Vercel

### Prerequisites

- Node.js 18+
- pnpm (recommended) หรือ npm
- bun
- elysia

### Installation

```bash
# Clone repository
git clone https://github.com/kanokpit-yowaratch/freelance-contract-generator.git
cd contract-generator

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

### 🙏 Acknowledgments

สร้างขึ้นเพื่อสนันสนุนชุมชน Freelancers ไทย
ขอบคุณทุก contributors

### `CONTRIBUTING.md`

เรายินดีรับการ contribute จากทุกคน!
การ contribute แนะนำ:

- 🐛 Bug fixes
- ✨ New features
- 📝 Template สัญญาใหม่
- 🌍 Translation
- 📚 Documentation improvements

### Code Style Guidelines

- ใช้ TypeScript อย่างเคร่งครัด
- ตั้งชื่อตัวแปรและฟังก์ชันแบบ camelCase
- Component ใช้ PascalCase
- ใช้ Prettier สำหรับ formatting
- เขียน comment เป็นภาษาอังกฤษ

### Commit Convention

feat: เพิ่ม template สัญญาใหม่
fix: แก้ไขปัญหา PDF generation
docs: อัพเดท README
style: แก้ไข Tailwind classes
refactor: ปรับปรุง code structure
test: เพิ่ม unit tests
