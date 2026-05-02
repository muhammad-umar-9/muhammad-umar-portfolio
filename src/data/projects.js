// Projects Data
export const projects = [
  {
    id: 1,
    title: "Smart Attendance System",
    description: "Deployed on GIKI's internal server and used by faculty; instructors mark attendance in real time via the web app. YOLOv9 + ArcFace facial recognition pipeline achieving 99%+ accuracy.",
    longDescription: "A production facial recognition attendance system deployed on GIKI's internal server and used daily by faculty. Features a YOLOv9 + ArcFace facial recognition pipeline achieving 99%+ accuracy across varying lighting and angles. Built with a FastAPI backend with JWT auth, OTP verification, and role-based access control. PostgreSQL database for storing student records, attendance logs, course enrollments, and user credentials. Includes automated image augmentation (5×), centroid-based classification, and per-course model training.",
    technologies: ["Python", "FastAPI", "React Native", "PostgreSQL", "Docker", "YOLOv9", "ArcFace"],
    category: "Full Stack",
    githubUrl: "#",
    liveUrl: "#",
    image: "/project_images/smart_attendance_project_image.png",
    featured: true,
    status: "Completed",
    date: "2025",
    isPrivate: true,
    highlights: [
      "Deployed on GIKI's internal server and used by faculty daily",
      "YOLOv9 + ArcFace pipeline with 99%+ accuracy",
      "FastAPI backend with JWT auth, OTP verification, and RBAC",
      "PostgreSQL for student records, attendance logs, and enrollments",
      "Automated image augmentation (5×) and per-course model training"
    ]
  },
  {
    id: 2,
    title: "GIKI Panda – Campus Food Delivery System",
    description: "Multi-role platform (Student, Vendor, Rider, Admin) with real-time GPS tracking via WebSockets. Anti-spoofing layer with rate limiting, teleport detection, and campus geofencing.",
    longDescription: "A comprehensive campus food delivery system with multi-role support for Students, Vendors, Riders, and Admins. Features real-time GPS tracking via WebSockets, an anti-spoofing layer with rate limiting, teleport detection, and campus geofencing. Interactive campus map with 20+ building polygons from OpenStreetMap using Leaflet.js.",
    technologies: ["Flask", "PostgreSQL", "Socket.IO", "Leaflet.js", "WebSockets"],
    category: "Full Stack",
    githubUrl: "https://github.com/muhammad-umar-9/GIKIPanda-Food-Delivery-System",
    liveUrl: "https://giki-panda-food-2f1e85dc6df5.herokuapp.com/",
    image: "/project_images/giki_panda_project_image.png",
    featured: true,
    status: "Completed",
    date: "2025",
    highlights: [
      "Multi-role platform: Student, Vendor, Rider, Admin",
      "Real-time GPS tracking via WebSockets",
      "Anti-spoofing: rate limiting, teleport detection, geofencing",
      "Interactive campus map with 20+ building polygons via Leaflet.js"
    ]
  },
  {
    id: 3,
    title: "Biomedical Knowledge Graph System",
    description: "Built a 2.1M+ triple knowledge graph from PubMed using OWL 2 ontology with 23 classes and HermiT reasoning. Python ETL pipeline processing 50K+ records with entity linking.",
    longDescription: "A large-scale biomedical knowledge graph system built from PubMed data using OWL 2 ontology with 23 classes and HermiT reasoning. Features a Python ETL pipeline processing 50K+ records with entity linking to DBpedia and Wikidata. Includes a Flask + D3.js visualization dashboard with live SPARQL endpoint, deployed on Heroku.",
    technologies: ["Python", "SPARQL", "GraphDB", "Flask", "D3.js", "OWL 2"],
    category: "AI / Knowledge Systems",
    githubUrl: "https://github.com/muhammad-umar-9/Knowlege-Graphs-Project",
    liveUrl: "https://krr-685beba13d3f.herokuapp.com/",
    image: "/project_images/knowledge_graph_project_image.png",
    featured: true,
    status: "Completed",
    date: "2025",
    highlights: [
      "2.1M+ triple knowledge graph from PubMed",
      "OWL 2 ontology with 23 classes and HermiT reasoning",
      "Python ETL pipeline processing 50K+ records",
      "Entity linking to DBpedia and Wikidata",
      "Flask + D3.js dashboard with live SPARQL endpoint"
    ]
  }
]

// Project Categories
export const projectCategories = [
  "All",
  "Full Stack",
  "AI / Knowledge Systems"
]

// Project Stats
export const projectStats = {
  totalProjects: projects.length,
  completedProjects: projects.filter(p => p.status === "Completed").length,
  featuredProjects: projects.filter(p => p.featured).length,
  technologies: [...new Set(projects.flatMap(p => p.technologies))].length
}
