# Next.js ve ASP.NET Core Todo Uygulaması

Bu proje, frontend için Next.js ve backend için ASP.NET Core kullanarak oluşturulmuş basit bir Todo uygulamasıdır.

## Proje Yapısı

- `backend/`: ASP.NET Core Web API projesi
- `frontend/`: Next.js frontend uygulaması

## Gereksinimler

- .NET 8.0+ SDK
- Node.js 18+ ve npm
- Visual Studio Code veya tercih ettiğiniz bir editör

## Nasıl Çalıştırılır

### Backend (ASP.NET Core)

1. Backend klasörüne gidin:

```bash
cd backend
```

2. ASP.NET Core uygulamasını çalıştırın:

```bash
dotnet run
```

Backend API http://localhost:5000 adresinde çalışacaktır.

### Frontend (Next.js)

1. Frontend klasörüne gidin:

```bash
cd frontend
```

2. Bağımlılıkları yükleyin:

```bash
npm install
```

3. Next.js uygulamasını çalıştırın:

```bash
npm run dev
```

Frontend http://localhost:3000 adresinde çalışacaktır.

## API Endpoints

Backend aşağıdaki API endpointlerini sunar:

- `GET /api/todo`: Tüm todo öğelerini listeler
- `GET /api/todo/{id}`: Belirli bir todo öğesini getirir
- `POST /api/todo`: Yeni bir todo öğesi oluşturur
- `PUT /api/todo/{id}`: Var olan bir todo öğesini günceller
- `DELETE /api/todo/{id}`: Bir todo öğesini siler

## Özellikler

- Todo öğeleri oluşturma, listeleme, güncelleme ve silme
- Tamamlanan/tamamlanmayan öğelerin görsel olarak ayrılması
- Responsive tasarım

## Teknolojiler

### Backend
- ASP.NET Core 8.0
- C#
- Web API

### Frontend
- Next.js 14
- React
- TypeScript
- Tailwind CSS
