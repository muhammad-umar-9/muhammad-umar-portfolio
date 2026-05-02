// Certifications Data — only umbrella/significant certs, no redundant sub-courses
export const certifications = [
  {
    id: 1,
    title: "Google Advanced Data Analytics Certificate",
    issuer: "Google",
    date: "2024",
    credentialId: "GADA-2024-001",
    description: "Comprehensive program covering advanced data analytics techniques, statistical analysis, machine learning, and data visualization using Python and various tools.",
    skills: ["Python", "Statistics", "Machine Learning", "Data Visualization", "Tableau", "R"],
    image: "/certification_images/google_advance_data/Professional Certificate_page-0001.jpg",
    pdfUrl: "/certification_images/google_advance_data/Professional Certificate.pdf",
    verificationUrl: "https://www.coursera.org/account/accomplishments/professional-cert/",
    featured: true,
    category: "Data Analytics",
    issuerLogo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    type: "Professional Certificate",
    duration: "6 months",
    level: "Advanced"
  },
  {
    id: 2,
    title: "C++ Programming Specialization",
    issuer: "University of California, Santa Cruz",
    date: "2023",
    credentialId: "CPP-SPEC-2023",
    description: "Comprehensive C++ programming specialization covering object-oriented programming, data structures, algorithms, and system programming concepts.",
    skills: ["C++", "Object-Oriented Programming", "Data Structures", "Algorithms", "System Programming"],
    image: "/certification_images/c_plus_specialization/specialization.pdf",
    pdfUrl: "/certification_images/c_plus_specialization/specialization.pdf",
    verificationUrl: "https://www.coursera.org/account/accomplishments/specialization/",
    featured: true,
    category: "Programming",
    issuerLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/UC_Santa_Cruz_seal.svg/1200px-UC_Santa_Cruz_seal.svg.png",
    type: "Specialization",
    duration: "4 months",
    level: "Intermediate"
  },
  {
    id: 3,
    title: "AI for Everyone",
    issuer: "DeepLearning.AI",
    date: "2023",
    credentialId: "AI-EVERY-2023",
    description: "Introduction to artificial intelligence concepts, applications, and impact on business and society by Andrew Ng.",
    skills: ["Artificial Intelligence", "Machine Learning", "AI Strategy", "Business Applications"],
    image: "/certification_images/deep_learning_certificate/AI_for_Everyone.pdf",
    pdfUrl: "/certification_images/deep_learning_certificate/AI_for_Everyone.pdf",
    verificationUrl: "https://www.coursera.org/account/accomplishments/certificate/",
    featured: false,
    category: "Artificial Intelligence",
    issuerLogo: "https://www.deeplearning.ai/wp-content/uploads/2021/02/LogoFiles_DeepLearning_PrimaryLogo.png",
    type: "Certificate",
    duration: "4 weeks",
    level: "Beginner"
  },
  {
    id: 4,
    title: "The Nuts and Bolts of Machine Learning",
    issuer: "Google",
    date: "2024",
    credentialId: "NBML-2024",
    description: "Deep dive into machine learning algorithms, model evaluation, and practical implementation techniques.",
    skills: ["Machine Learning", "Python", "Model Evaluation", "Algorithms"],
    image: "/certification_images/google_advance_data/Nuts and Bolts of machine learning.pdf",
    pdfUrl: "/certification_images/google_advance_data/Nuts and Bolts of machine learning.pdf",
    verificationUrl: "https://www.coursera.org/account/accomplishments/certificate/",
    featured: false,
    category: "Artificial Intelligence",
    issuerLogo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    type: "Certificate",
    duration: "8 weeks",
    level: "Advanced"
  },
  {
    id: 5,
    title: "Google Data Analytics Capstone",
    issuer: "Google",
    date: "2024",
    credentialId: "CAPSTONE-2024",
    description: "Comprehensive capstone project demonstrating end-to-end data analytics skills including data collection, analysis, and presentation.",
    skills: ["Data Analytics", "Project Management", "Data Visualization", "Presentation"],
    image: "/certification_images/google_advance_data/capstone.pdf",
    pdfUrl: "/certification_images/google_advance_data/capstone.pdf",
    verificationUrl: "https://www.coursera.org/account/accomplishments/certificate/",
    featured: true,
    category: "Data Analytics",
    issuerLogo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    type: "Capstone Project",
    duration: "4 weeks",
    level: "Advanced"
  }
]

// Certification Categories
export const certificationCategories = [
  "All",
  "Data Analytics",
  "Programming",
  "Artificial Intelligence"
]

// Certification Stats
export const certificationStats = {
  totalCertifications: certifications.length,
  featuredCertifications: certifications.filter(cert => cert.featured).length,
  categories: [...new Set(certifications.map(cert => cert.category))].length,
  skills: [...new Set(certifications.flatMap(cert => cert.skills))].length
}

// Certification Levels
export const certificationLevels = {
  "Beginner": { color: "green", count: certifications.filter(cert => cert.level === "Beginner").length },
  "Intermediate": { color: "yellow", count: certifications.filter(cert => cert.level === "Intermediate").length },
  "Advanced": { color: "red", count: certifications.filter(cert => cert.level === "Advanced").length }
}
