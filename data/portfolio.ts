import { PortfolioData, PortfolioContent } from '../types';

const socialLinks = [
  { platform: "github", url: "https://github.com/rehanhf/" } as const,
  { platform: "linkedin", url: "https://www.linkedin.com/in/raihan-hafizh-rifadi-7b4128286/git " } as const,
  { platform: "email", url: "mailto:hafizhnabil@gmail.com" } as const
];

const skills = [
  "Python", "SQL", "TensorFlow", "React", "Next.js", 
  "TypeScript", "AWS", "Docker", "PostgreSQL", "Framer Motion"
];

const currentlyLearning = [
  "Rust", "WebAssembly", "GraphQL", "System Design"
];

const enContent: PortfolioContent = {
  hero: {
    name: "Raihan Hafizh Rifadi",
    title: "Data Scientist & Full-Stack Developer",
    subtitle: "Bridging the gap between Complex Data and Intuitive Experiences.",
    imageUrl: "/images/profile.jpg",
  },
  summary: "I am an Information Science undergraduate at UPN Veteran Jakarta with a GPA of 3.7. I possess a unique hybrid profile, combining robust data analytics skills (Python, R, SQL) with full-stack web development capabilities. I specialize in building data-driven applications, automating workflows, and designing user-centric interfaces.",
  skills,
  currentlyLearning,
  projects: [
    {
      id: "1",
      title: "CSV Analytics App",
      description: "Interactive web dashboard for CSV dataset exploration. Features secure auth, dynamic visualization, and AI-powered assistance via Gemini API.",
      tags: ["R Shiny", "Gemini API", "Data Viz"],
      link: ""
    },
    {
      id: "2",
      title: "End-to-End Crypto ELT",
      description: "Containerized pipeline orchestrating cryptocurrency market data. Implements a Data Lake architecture with MinIO, transformation via dbt, and automated scheduling using Apache Airflow.",
      tags: ["Airflow", "dbt", "Docker", "Postgres"],
      link: "https://github.com/YOUR_USERNAME/crypto-elt-pipeline"
    },
    {
      id: "3",
      title: "NYC Taxi Big Data Platform",
      description: "Scalable batch processing system handling 130M+ records. Utilizes Apache Spark for distributed transformation, DuckDB for high-speed ingestion, and custom geospatial visualization.",
      tags: ["Apache Spark", "Airflow", "Big Data", "Metabase"],
      link: "https://github.com/YOUR_USERNAME/nyc-taxi-pipeline"
    },
    {
      id: "4",
      title: "Headless Media CMS",
      description: "High-performance API backend for omnichannel content delivery. Features MariaDB native Full-Text Search, Redis caching for sub-50ms latency, and scalable Docker infrastructure.",
      tags: ["Laravel", "MariaDB", "Redis", "API Design"],
      link: "https://github.com/YOUR_USERNAME/headless-news"
    },
    {
      id: "5",
      title: "FISIP Connect",
      description: "Centralized digital information hub for BEM FISIP serving 1000+ students. Includes custom CMS for event calendars and announcements.",
      tags: ["PHP", "JS", "HTML/CSS", "CMS"],
      link: "#"
    },
    {
      id: "6",
      title: "Law Firm Redesign",
      description: "UI/UX redesign for Anagata Law website focusing on readability, information hierarchy, and visual consistency.",
      tags: ["Figma", "UI/UX", "Design System"],
      link: "#"
    },
    {
      id: "7",
      title: "TAJAM Digital News & Article Website",
      description: "Web-based content management system for creating, managing, and publishing articles with role-based access control. Supports dynamic routing with SEO-friendly slugs, category and tag management, and cloud-based image handling, built on a modern full-stack architecture for performance and scalability.",
      tags: ["Next.js", "Firebase", "Typescript", "CMS", "TailwindCSS"],
      link: "#"
    },
  ],
  experience: [
    {
      id: "e1",
      role: "Data Scientist Intern",
      company: "Swanstatistic",
      period: "Aug 2025 - Dec 2025",
      achievements: [
        "In charge of creating and testing N8N templates for commercial use.",
        "Translated complex raw data into actionable insights and visual presentations using Canva and Excel.",
        "Improved data readability for non-technical teams.",
        "Managed data workflows using N8N and Python to ensure accuracy in reporting."
      ]
    }
  ],
  education: [
    {
      id: "ed1",
      school: "Universitas Pembangunan Veteran Jakarta",
      degree: "Bachelor of Information Science",
      period: "Aug 2020 - Present",
      gpa: "3.7"
    },
    {
      id: "ed2",
      school: "SMA Plus PGRI Cibinong",
      degree: "Science Major",
      period: "May 2017 - June 2020",
      gpa: "9.2"
    }
  ],
  certifications: [
    {
      id: "c1",
      name: "Google Data Analytics Professional Certificate",
      issuer: "Google",
    },
    {
      id: "c2",
      name: "Microsoft Certified: Data Analyst Associate",
      issuer: "Microsoft",
    },
    {
      id: "c3",
      name: "Certified Data Professional (CDP)",
      issuer: "ICCP",
    },
    {
      id: "c4",
      name: "Samsung Innovation Campus Batch 6: Intro to IoT & Python",
      issuer: "Samsung",
    },
    {
      id: "c5",
      name: "Speaker Wadhwani Opportunity: Employability Skills",
      issuer: "Wadhwani Foundation",
    }
  ],
  social: socialLinks,
  labels: {
    available: "AVAILABLE FOR HIRE",
    intro: "01. Introduction",
    capabilities: "02. Capabilities",
    technical: "Technical Expertise",
    coreStack: "Core Stack",
    current: "Currently Learning",
    works: "01. Selected Works",
    experience: "02. Experience",
    academics: "03. Academics",
    education: "Education",
    certifications: "Certifications",
    contact: "Let's Connect",
    footer: "DESIGNED & BUILT BY RAIHAN HAFIZH RIFADI",
    nav: {
      about: "About",
      projects: "Projects",
      experience: "Experience",
      contact: "Contact"
    }
  }
};

const idContent: PortfolioContent = {
  hero: {
    name: "Raihan Hafizh Rifadi",
    title: "Data Scientist & Full-Stack Developer",
    subtitle: "Menjembatani kesenjangan antara Data yang Kompleks dan Pengalaman Intuitif.",
    imageUrl: "https://picsum.photos/600/800",
  },
  summary: "Saya adalah mahasiswa S1 Sains Informasi di UPN Veteran Jakarta dengan IPK 3.7. Saya memiliki profil hibrida unik, menggabungkan keterampilan analisis data yang kuat (Python, R, SQL) dengan kemampuan pengembangan web full-stack. Saya berspesialisasi dalam membangun aplikasi berbasis data, mengotomatisasi alur kerja, dan merancang antarmuka yang berpusat pada pengguna.",
  skills,
  currentlyLearning,
  projects: [
    {
      id: "1",
      title: "Aplikasi Analitik CSV",
      description: "Dashboard web interaktif untuk eksplorasi dataset CSV. Fitur autentikasi aman, visualisasi dinamis, dan dukungan AI melalui Gemini API.",
      tags: ["R Shiny", "Gemini API", "Data Viz"],
      link: "#"
    },
    {
      id: "2",
      title: "FISIP Connect",
      description: "Hub informasi digital terpusat untuk BEM FISIP melayani 1000+ siswa. Mencakup CMS kustom untuk kalender acara dan pengumuman.",
      tags: ["PHP", "JS", "HTML/CSS", "CMS"],
      link: "#"
    },
    {
      id: "3",
      title: "Desain Ulang Firma Hukum",
      description: "Desain ulang UI/UX untuk situs web Anagata Law dengan fokus pada keterbacaan, hierarki informasi, dan konsistensi visual.",
      tags: ["Figma", "UI/UX", "Design System"],
      link: "#"
    },
    {
      id: "4",
      title: "TAJAM Platform Berita & Artikel Digital",
      description: "Sistem manajemen konten berbasis web untuk membuat, mengelola, dan menerbitkan artikel dengan kontrol akses berbasis peran. Mendukung perutean dinamis dengan slug ramah SEO, manajemen kategori dan tag, serta penanganan gambar berbasis cloud, dibangun pada arsitektur full-stack modern untuk performa dan skalabilitas.",
      tags: ["Next.js", "Firebase", "Typescript", "CMS", "TailwindCSS"],
      link: "#"
    }
  ],
  experience: [
    {
      id: "e1",
      role: "Data Scientist Intern",
      company: "Swanstatistic",
      period: "Agu 2025 - Des 2025",
      achievements: [
        "Bertanggung jawab untuk membuat dan menguji template N8N untuk penggunaan komersial.",
        "Menerjemahkan data mentah yang kompleks menjadi wawasan yang dapat ditindaklanjuti dan presentasi visual menggunakan Canva dan Excel.",
        "Meningkatkan keterbacaan data untuk tim non-teknis.",
        "Mengelola alur kerja data menggunakan N8N dan Python untuk memastikan akurasi pelaporan."
      ]
    }
  ],
  education: [
    {
      id: "ed1",
      school: "Universitas Pembangunan Veteran Jakarta",
      degree: "Sarjana Sains Informasi",
      period: "Agu 2020 - Sekarang",
      gpa: "3.7"
    },
    {
      id: "ed2",
      school: "SMA Plus PGRI Cibinong",
      degree: "Jurusan IPA",
      period: "Mei 2017 - Juni 2020",
      gpa: "9.2"
    }
  ],
  certifications: [
    {
      id: "c1",
      name: "Sertifikat Profesional Analitik Data Google",
      issuer: "Google",
    },
    {
      id: "c2",
      name: "Microsoft Certified: Data Analyst Associate",
      issuer: "Microsoft",
    },
    {
      id: "c3",
      name: "Certified Data Professional (CDP)",
      issuer: "ICCP",
    },
    {
      id: "c4",
      name: "Samsung Innovation Campus Batch 6: Intro to IoT & Python",
      issuer: "Samsung",
    },
    {
      id: "c5",
      name: "Speaker Wadhwani Opportunity: Employability Skills",
      issuer: "Wadhwani Foundation",
    }
  ],
  social: socialLinks,
  labels: {
    available: "TERSEDIA UNTUK PEKERJAAN",
    intro: "01. Pendahuluan",
    capabilities: "02. Kapabilitas",
    technical: "Keahlian Teknis",
    coreStack: "Stack Utama",
    current: "Sedang Dipelajari",
    works: "01. Karya Terpilih",
    experience: "02. Pengalaman",
    academics: "03. Akademik",
    education: "Pendidikan",
    certifications: "Sertifikasi",
    contact: "Mari Terhubung",
    footer: "DIRANCANG & DIBANGUN OLEH RAIHAN HAFIZH RIFADI",
    nav: {
      about: "Tentang",
      projects: "Proyek",
      experience: "Pengalaman",
      contact: "Kontak"
    }
  }
};

export const portfolioData: PortfolioData = {
  en: enContent,
  id: idContent
};