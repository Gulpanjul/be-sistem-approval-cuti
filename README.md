<a id="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![project_license][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Gulpanjul/fe-acara">
    <img src="public/images/logo.png" alt="Logo" height="80">
  </a>

<h3 align="center">Backend Sistem Approval Cuti</h3>

  <p align="center">
    A web-based event ticketing platform with integrated payment processing and comprehensive event management capabilities
    <br />
    <a href="https://github.com/Gulpanjul/fe-acara">View Demo</a>
    &middot;
    <a href="https://github.com/Gulpanjul/fe-acara/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Acara Screen Shot][product-screenshot]](https://example.com)

**be-sistem-approval-cuti** adalah backend API untuk manajemen cuti karyawan dengan sistem multi-level approval. Sistem ini menangani pengajuan cuti oleh karyawan, persetujuan oleh Head atau GM, serta logging riwayat aksi.

Fitur utama:

- **User & Role Management**: Employee, Head, GM dengan akses berbeda
- **Cuti Management**: CRUD cuti dan approval multi-level
- **Authentication**: JWT-based authentication
- **History Tracking**: Logging setiap aksi approval atau revisi

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- ![Node.js](https://img.shields.io/badge/Node.js-%23000000?style=for-the-badge&logo=node.js&logoColor=white)
- ![Express](https://img.shields.io/badge/Express-%23000000?style=for-the-badge&logo=express&logoColor=white)
- ![Prisma](https://img.shields.io/badge/Prisma-%23007ACC?style=for-the-badge&logo=prisma&logoColor=white)
- ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-%23000000?style=for-the-badge&logo=postgresql&logoColor=white)
- ![JWT](https://img.shields.io/badge/JWT-%23FF0000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- Node.js dan npm/yarn/pnpm/bun
- Database PostgreSQL berjalan

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/Gulpanjul/be-sistem-approval-cuti.git
   ```
2. Install dependencies
   ```sh
    npm install
    # or
    yarn install
   ```
3. Setup environment variables (.env.local):
   ```sh
   DATABASE_URL=postgresql://user:password@localhost:5432/db_name
   JWT_SECRET=your_jwt_secret
   ```
4. Generate Prisma client & run migrations
    ```sh
    npx prisma generate       # Generate Prisma client
    npx prisma migrate dev    # Run migrations to create database tables
    ```
5. Run development server
   ```sh
   npm run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

Endpoint utama backend:

- /auth - Authentication (login)
- /users - Manajemen user dan role
- /cuti - CRUD cuti, approval, revisi
- /histories - Riwayat aksi approval
- /admin - Endpoint admin (opsional)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

Fitur yang sudah terimplementasi:

- [x] CRUD Cuti
- [x] Approval multi-level (Head & GM)
- [x] Logging riwayat aksi
- [x] Authentication dengan JWT
- [x] Seed dummy data untuk testing

See the [open issues](https://github.com/Gulpanjul/fe-acara/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Andhika Chandra Gulpa - [@gulpanjul](https://www.instagram.com/gulpanjul) - gulpa.andhikac@gmail.com

Project Link: [https://github.com/Gulpanjul/be-sistem-approval-cuti](https://github.com/Gulpanjul/be-sistem-approval-cuti)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [Node.js](https://nodejs.org/) - JavaScript runtime untuk menjalankan backend server.
- [Express](https://expressjs.com/) - Framework web untuk membangun API dengan cepat.
- [Prisma](https://www.prisma.io/) - ORM modern untuk berinteraksi dengan database.
- [PostgreSQL](https://www.postgresql.org/) - Database relasional yang handal.
- [JWT](https://jwt.io/) - JSON Web Token untuk autentikasi dan otorisasi.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/Gulpanjul/be-sistem-approval-cuti.svg?style=for-the-badge
[contributors-url]: https://github.com/Gulpanjul/be-sistem-approval-cuti/graphs/contributors
[license-shield]: https://img.shields.io/github/license/Gulpanjul/be-sistem-approval-cuti.svg?style=for-the-badge
[license-url]: https://github.com/Gulpanjul/be-sistem-approval-cuti/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/gulpa-andhikac
[product-screenshot]: /public/images/screenshot.png
