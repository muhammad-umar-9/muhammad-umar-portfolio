// Skills Data
export const skills = {
  // Programming Languages
  programming: [
    { name: "Python", level: 90, icon: "🐍", description: "Backend, ML, automation, scripting" },
    { name: "JavaScript", level: 85, icon: "🟨", description: "Frontend & backend development" },
    { name: "C++", level: 80, icon: "⚡", description: "System programming, algorithms" },
    { name: "SQL", level: 88, icon: "🗃️", description: "Complex queries, database design" },
    { name: "HTML/CSS", level: 92, icon: "🌐", description: "Responsive web design" }
  ],

  // Tools & Technologies
  tools: [
    { name: "Git/GitHub", level: 85, icon: "🔗", description: "Version control, collaboration" },
    { name: "Docker", level: 75, icon: "🐳", description: "Containerization, deployment" },
    { name: "Linux", level: 75, icon: "🐧", description: "System administration, scripting" },
    { name: "VS Code", level: 95, icon: "💻", description: "Primary development environment" },
    { name: "Postman", level: 82, icon: "📮", description: "API testing, development" },
    { name: "Jupyter", level: 88, icon: "📓", description: "Data analysis, prototyping" }
  ],

  // Data & ML Libraries
  dataAnalysis: [
    { name: "Pandas", level: 92, icon: "🐼", description: "Data manipulation, analysis" },
    { name: "NumPy", level: 88, icon: "🔢", description: "Numerical computing, arrays" },
    { name: "Matplotlib", level: 85, icon: "📈", description: "Data visualization, plotting" },
    { name: "Seaborn", level: 83, icon: "🎨", description: "Statistical data visualization" }
  ],

  // Machine Learning & AI
  machineLearning: [
    { name: "Scikit-learn", level: 88, icon: "🧠", description: "ML algorithms, model evaluation" },
    { name: "TensorFlow", level: 70, icon: "🔥", description: "Deep learning, neural networks" },
    { name: "PyTorch", level: 65, icon: "🔦", description: "Deep learning research" },
    { name: "OpenCV", level: 72, icon: "👁️", description: "Computer vision, image processing" },
    { name: "YOLOv9", level: 80, icon: "🎯", description: "Object detection, real-time inference" }
  ],

  // Web Development & Frameworks
  webDevelopment: [
    { name: "FastAPI", level: 85, icon: "⚡", description: "High-performance REST APIs" },
    { name: "Flask", level: 85, icon: "🌶️", description: "Web apps, REST APIs" },
    { name: "React / React Native", level: 82, icon: "⚛️", description: "Frontend & mobile apps" },
    { name: "Node.js", level: 80, icon: "🟢", description: "Backend development, APIs" },
    { name: "Socket.IO", level: 78, icon: "🔌", description: "Real-time WebSocket communication" }
  ],

  // Databases
  databases: [
    { name: "PostgreSQL", level: 85, icon: "🐘", description: "Production databases, advanced SQL" },
    { name: "MySQL", level: 82, icon: "🐬", description: "Relational databases, optimization" },
    { name: "MongoDB", level: 75, icon: "🍃", description: "NoSQL, document databases" },
    { name: "GraphDB", level: 70, icon: "🕸️", description: "Knowledge graphs, SPARQL" }
  ]
}

// Skill Categories for Display
export const skillCategories = [
  {
    name: "Programming Languages",
    key: "programming",
    color: "from-blue-500 to-cyan-500",
    icon: "💻"
  },
  {
    name: "Tools & Technologies",
    key: "tools",
    color: "from-purple-500 to-pink-500",
    icon: "🛠️"
  },
  {
    name: "Data & ML Libraries",
    key: "dataAnalysis",
    color: "from-green-500 to-emerald-500",
    icon: "📊"
  },
  {
    name: "Machine Learning & AI",
    key: "machineLearning",
    color: "from-orange-500 to-red-500",
    icon: "🧠"
  },
  {
    name: "Web Frameworks",
    key: "webDevelopment",
    color: "from-indigo-500 to-purple-500",
    icon: "🌐"
  },
  {
    name: "Databases",
    key: "databases",
    color: "from-teal-500 to-blue-500",
    icon: "🗃️"
  }
]

// Skill Stats
export const skillStats = {
  totalSkills: Object.values(skills).flat().length,
  avgLevel: Math.round(
    Object.values(skills).flat().reduce((acc, skill) => acc + skill.level, 0) / 
    Object.values(skills).flat().length
  ),
  expertLevel: Object.values(skills).flat().filter(skill => skill.level >= 90).length,
  categories: Object.keys(skills).length
}
