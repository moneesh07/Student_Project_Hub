export const mockProjects = [
  {
    id: "proj-001",
    title: "Smart Healthcare Assistant",
    domain: "Healthcare",
    shortDescription: "An AI-powered clinical decision support system utilizing FastAPI, TensorFlow, and React to analyze patient diagnostic symptoms in real-time.",
    problemStatement: "Rural clinics lack immediate access to specialist diagnostic assistance, resulting in delayed patient triage and medical errors during initial consultations.",
    abstract: "The Smart Healthcare Assistant leverages state-of-the-art transformer models fine-tuned on clinical datasets to predict preliminary diagnostic categories. Built with a robust microservice architecture using Python and FastAPI, it interfaces with a modern React web dashboard for healthcare workers. All patient record interactions are securely persisted in PostgreSQL with full audit logging.",
    team: {
      name: "BioHealth Innovations",
      members: [
        { name: "Aarav Sharma", role: "AI Engineer & Team Lead" },
        { name: "Priya Patel", role: "Fullstack Web Developer" },
        { name: "Rohan Verma", role: "Database Architect" }
      ]
    },
    technologies: ["Python", "React", "FastAPI", "PostgreSQL", "TensorFlow", "Docker", "Tailwind CSS"],
    taxonomyTags: [
      { category: "Programming Language", name: "Python", confidence: 0.96, evidence: "requirements.txt, main.py (94 lines)", status: "validated" },
      { category: "Frontend Framework", name: "React", confidence: 0.91, evidence: "package.json, src/App.jsx", status: "validated" },
      { category: "Backend Framework", name: "FastAPI", confidence: 0.89, evidence: "app/main.py, router declarations", status: "validated" },
      { category: "Database", name: "PostgreSQL", confidence: 0.94, evidence: "docker-compose.yml, alembic migrations", status: "validated" },
      { category: "AI/ML Framework", name: "TensorFlow", confidence: 0.78, evidence: "models/diagnostic_net.py import", status: "validated" }
    ],
    validationStatus: "validated",
    repositoryUrl: "https://github.com/sih-2026/smart-healthcare-assistant",
    documentationUrl: "https://docs.smarthealthcare.org",
    updatedAt: "2026-08-28"
  },
  {
    id: "proj-002",
    title: "AI-Based Crop Disease Detection System",
    domain: "Agriculture",
    shortDescription: "Edge-computed computer vision application running PyTorch models on mobile and web to classify plant foliar diseases from leaf imagery.",
    problemStatement: "Smallholder farmers lose up to 40% of crop yields annually due to untreated fungal and bacterial infections caught too late.",
    abstract: "This project provides an intuitive offline-first crop disease diagnostic platform. It incorporates Convolutional Neural Networks trained on over 50,000 leaf image samples. The system comprises a Mobile Flutter client, a Django backend REST API for model updates, and a PostgreSQL database for regional disease tracking maps.",
    team: {
      name: "AgriVision Squad",
      members: [
        { name: "Vikram Reddy", role: "Computer Vision Lead" },
        { name: "Ananya Sen", role: "Mobile App Developer" }
      ]
    },
    technologies: ["Python", "PyTorch", "Django", "Flutter", "PostgreSQL", "OpenCV"],
    taxonomyTags: [
      { category: "Programming Language", name: "Python", confidence: 0.98, evidence: "model_training.py, manage.py", status: "validated" },
      { category: "AI/ML Framework", name: "PyTorch", confidence: 0.95, evidence: "torchvision model initialization", status: "validated" },
      { category: "Backend Framework", name: "Django", confidence: 0.92, evidence: "settings.py, urls.py structure", status: "validated" },
      { category: "Mobile Framework", name: "Flutter", confidence: 0.88, evidence: "pubspec.yaml, lib/main.dart", status: "validated" },
      { category: "Database", name: "PostgreSQL", confidence: 0.85, evidence: "DATABASES setting in settings.py", status: "validated" }
    ],
    validationStatus: "validated",
    repositoryUrl: "https://github.com/sih-2026/agri-crop-disease",
    documentationUrl: "https://agrivision-docs.org",
    updatedAt: "2026-08-30"
  },
  {
    id: "proj-003",
    title: "Smart Campus Energy Monitoring & Grid Balancing",
    domain: "IoT & Smart Cities",
    shortDescription: "IoT sensor grid aggregation platform built with Node.js, React, and MongoDB for monitoring building electricity metrics in real time.",
    problemStatement: "University campuses suffer from wasteful off-peak power draw due to lack of automated load balancing and sub-meter granularity.",
    abstract: "An end-to-end IoT platform collecting real-time telemetry from smart meters installed across 14 campus buildings. Node.js backend services process MQTT message queues and aggregate time-series energy metrics into MongoDB. A live React dashboard visualizes usage heatmaps and provides predictive peak load alerts.",
    team: {
      name: "EcoGrid Labs",
      members: [
        { name: "Kabir Das", role: "IoT Systems Engineer" },
        { name: "Neha Gupta", role: "Frontend UI Developer" },
        { name: "Sanjay Rao", role: "Data Pipeline Engineer" }
      ]
    },
    technologies: ["JavaScript", "Node.js", "React", "MongoDB", "Express", "MQTT", "Docker"],
    taxonomyTags: [
      { category: "Programming Language", name: "JavaScript", confidence: 0.97, evidence: "package.json, 42 js source files", status: "validated" },
      { category: "Runtime", name: "Node.js", confidence: 0.95, evidence: "server.js, package.json engines", status: "validated" },
      { category: "Frontend Framework", name: "React", confidence: 0.93, evidence: "src/components/Dashboard.jsx", status: "validated" },
      { category: "Database", name: "MongoDB", confidence: 0.90, evidence: "mongoose schemas in models/", status: "validated" },
      { category: "Backend Framework", name: "Express", confidence: 0.88, evidence: "express middleware routing", status: "validated" }
    ],
    validationStatus: "validated",
    repositoryUrl: "https://github.com/sih-2026/smart-campus-energy",
    documentationUrl: "https://ecogrid-campus.org/docs",
    updatedAt: "2026-08-25"
  },
  {
    id: "proj-004",
    title: "Student Skill & Career Path Recommendation Platform",
    domain: "Education",
    shortDescription: "Personalized learning path generator matching student GitHub repositories and course grades to industry job profiles using Scikit-Learn.",
    problemStatement: "Graduating engineering students lack objective feedback on skill gaps relative to dynamic tech industry hiring standards.",
    abstract: "The platform analyzes student project code repositories and academic transcripts to construct a multi-dimensional skill vector. Using Scikit-Learn clustering and cosine similarity matching against 10,000+ job descriptions, it renders step-by-step course and project recommendations in a responsive React web interface.",
    team: {
      name: "EduMatch Team",
      members: [
        { name: "Meera Nair", role: "Data Scientist" },
        { name: "Karthik Iyer", role: "Full Stack Engineer" }
      ]
    },
    technologies: ["Python", "React", "FastAPI", "Scikit-Learn", "MySQL", "Tailwind CSS"],
    taxonomyTags: [
      { category: "Programming Language", name: "Python", confidence: 0.94, evidence: "recommendation_engine.py", status: "validated" },
      { category: "Frontend Framework", name: "React", confidence: 0.92, evidence: "src/pages/CareerPath.jsx", status: "validated" },
      { category: "AI/ML Library", name: "Scikit-Learn", confidence: 0.86, evidence: "sklearn.metrics.pairwise import", status: "validated" },
      { category: "Backend Framework", name: "FastAPI", confidence: 0.85, evidence: "api/v1/recommendations.py", status: "validated" },
      { category: "Database", name: "MySQL", confidence: 0.82, evidence: "mysql-connector-python in requirements", status: "validated" }
    ],
    validationStatus: "validated",
    repositoryUrl: "https://github.com/sih-2026/student-skill-recommender",
    documentationUrl: "https://edumatch-recommender.org",
    updatedAt: "2026-08-31"
  },
  {
    id: "proj-005",
    title: "IoT-Based Automated River Water Quality Monitoring System",
    domain: "Sustainability",
    shortDescription: "Solar-powered buoy array measuring pH, turbidity, and dissolved oxygen with predictive pollution event alerts backed by Spring Boot.",
    problemStatement: "Industrial effluents dumped into public waterways go undetected for days due to manual weekly sampling protocols.",
    abstract: "This project deploys autonomous floating sensors that push hourly water metrics over cellular IoT gates. A Java Spring Boot backend collects time-series sensor payloads, stores records in PostgreSQL/PostGIS, and calculates river sanitation index scores visualized on an interactive web portal.",
    team: {
      name: "CleanWater Innovators",
      members: [
        { name: "Devansh Mehta", role: "Backend Architect" },
        { name: "Shruti Joshi", role: "Hardware & Firmware Specialist" }
      ]
    },
    technologies: ["Java", "Spring Boot", "React", "PostgreSQL", "Docker", "Leaflet.js"],
    taxonomyTags: [
      { category: "Programming Language", name: "Java", confidence: 0.98, evidence: "pom.xml, src/main/java", status: "validated" },
      { category: "Backend Framework", name: "Spring Boot", confidence: 0.96, evidence: "SpringBootApplication annotation", status: "validated" },
      { category: "Frontend Framework", name: "React", confidence: 0.89, evidence: "frontend/src/App.js", status: "validated" },
      { category: "Database", name: "PostgreSQL", confidence: 0.91, evidence: "application.properties postgresql URL", status: "validated" }
    ],
    validationStatus: "validated",
    repositoryUrl: "https://github.com/sih-2026/river-water-monitoring",
    documentationUrl: "https://cleanwater-sih.org",
    updatedAt: "2026-08-20"
  },
  {
    id: "proj-006",
    title: "Real-Time Cyber Threat Detection & Log Analysis",
    domain: "Cybersecurity",
    shortDescription: "Automated network intrusion detection pipeline processing Syslog streams via Python, PyTorch, and Elasticsearch.",
    problemStatement: "Security Operation Centers (SOC) are overwhelmed by millions of raw log entries daily, missing zero-day anomaly indicators.",
    abstract: "An enterprise security intelligence layer that ingests server access logs in real time. PyTorch autoencoders flag statistical anomalies in network packet payloads, feeding flagged security alerts directly to a React SOC dashboard backed by FastAPI and Elasticsearch.",
    team: {
      name: "SecOps Knights",
      members: [
        { name: "Siddharth Malhotra", role: "Security Researcher" },
        { name: "Pooja Hegde", role: "Backend Developer" }
      ]
    },
    technologies: ["Python", "PyTorch", "FastAPI", "React", "Elasticsearch", "Docker"],
    taxonomyTags: [
      { category: "Programming Language", name: "Python", confidence: 0.97, evidence: "log_parser.py, anomaly_detector.py", status: "validated" },
      { category: "AI/ML Framework", name: "PyTorch", confidence: 0.89, evidence: "torch.nn module definitions", status: "validated" },
      { category: "Backend Framework", name: "FastAPI", confidence: 0.91, evidence: "api/routes/alerts.py", status: "validated" },
      { category: "Frontend Framework", name: "React", confidence: 0.87, evidence: "dashboard/src/components/AlertTable.jsx", status: "validated" }
    ],
    validationStatus: "validated",
    repositoryUrl: "https://github.com/sih-2026/cyber-threat-detector",
    documentationUrl: "https://secops-knights.io",
    updatedAt: "2026-09-01"
  },
  {
    id: "proj-007",
    title: "Blockchain-Based Academic Certificate Verification System",
    domain: "FinTech",
    shortDescription: "Tamper-proof digital degree issuance and instant credential validation system leveraging Ethereum smart contracts and React.",
    problemStatement: "Academic credential forgery is rising, causing severe delays during university background verification procedures for employers.",
    abstract: "This system enables universities to mint cryptographic certificate hashes on Ethereum compatible sidechains. Employers can upload PDF certificates to the React web app to compute SHA-256 hashes and verify authenticity against smart contracts without middleman verification fees.",
    team: {
      name: "ChainTrust",
      members: [
        { name: "Aditya Roy", role: "Smart Contract Engineer" },
        { name: "Simran Kaur", role: "Fullstack Web Lead" }
      ]
    },
    technologies: ["Solidity", "JavaScript", "React", "Node.js", "Web3.js", "Express"],
    taxonomyTags: [
      { category: "Smart Contract", name: "Solidity", confidence: 0.92, evidence: "contracts/CertificateVerifier.sol", status: "pending" },
      { category: "Programming Language", name: "JavaScript", confidence: 0.95, evidence: "scripts/deploy.js, client code", status: "pending" },
      { category: "Frontend Framework", name: "React", confidence: 0.90, evidence: "client/src/App.jsx", status: "pending" },
      { category: "Runtime", name: "Node.js", confidence: 0.88, evidence: "package.json, server setup", status: "pending" }
    ],
    validationStatus: "pending",
    repositoryUrl: "https://github.com/sih-2026/blockchain-cert-verification",
    documentationUrl: "https://chaintrust-docs.net",
    updatedAt: "2026-09-02"
  },
  {
    id: "proj-008",
    title: "Smart Traffic Light Controller with Computer Vision",
    domain: "Smart Cities",
    shortDescription: "Dynamic junction timer control algorithm calculating lane congestion via OpenCV and Python to reduce city intersection delays.",
    problemStatement: "Fixed timer traffic lights cause unnecessary congestion during asymmetric rush-hour traffic jams in urban hubs.",
    abstract: "The project integrates camera feeds positioned at 4-way intersections to count stationary vehicle units per lane using OpenCV. A Python control loop dynamically recalculates green light duration based on actual queue length, streaming telemetry to a Flask web monitor.",
    team: {
      name: "UrbanFlow Systems",
      members: [
        { name: "Rahul Deshmukh", role: "CV Developer" },
        { name: "Tanvi Kapoor", role: "Embedded Systems Lead" }
      ]
    },
    technologies: ["Python", "OpenCV", "Flask", "React", "MySQL"],
    taxonomyTags: [
      { category: "Programming Language", name: "Python", confidence: 0.96, evidence: "traffic_control.py, vision.py", status: "pending" },
      { category: "Computer Vision", name: "OpenCV", confidence: 0.91, evidence: "cv2.CASCADE_CLASSIFIER", status: "pending" },
      { category: "Backend Framework", name: "Flask", confidence: 0.85, evidence: "app.py Flask instance", status: "pending" },
      { category: "Frontend Framework", name: "React", confidence: 0.80, evidence: "ui/src/App.js", status: "pending" }
    ],
    validationStatus: "pending",
    repositoryUrl: "https://github.com/sih-2026/smart-traffic-controller",
    documentationUrl: "https://urbanflow-traffic.org",
    updatedAt: "2026-09-03"
  },
  {
    id: "proj-009",
    title: "Automated Student Attendance via Face Recognition",
    domain: "Education",
    shortDescription: "Classroom camera attendance capture using DeepFace, Django, and React with automated WhatsApp absence alerts.",
    problemStatement: "Manual attendance taking consumes 10-15 minutes per lecture, reducing instructional time in engineering institutions.",
    abstract: "An automated attendance logging system that captures wide-angle classroom snapshots upon class start. DeepFace neural networks recognize enrolled student embeddings, immediately recording attendance records in MySQL and pushing notifications to absent students' parents via Twilio REST APIs.",
    team: {
      name: "VisionAttend",
      members: [
        { name: "Gaurav Sen", role: "ML Engineer" },
        { name: "Divya Nambiar", role: "Django Backend Dev" }
      ]
    },
    technologies: ["Python", "Django", "React", "MySQL", "OpenCV", "Tailwind CSS"],
    taxonomyTags: [
      { category: "Programming Language", name: "Python", confidence: 0.97, evidence: "face_recognition_service.py", status: "validated" },
      { category: "Backend Framework", name: "Django", confidence: 0.94, evidence: "manage.py, apps/attendance", status: "validated" },
      { category: "Frontend Framework", name: "React", confidence: 0.88, evidence: "frontend/src/AttendanceGrid.jsx", status: "validated" },
      { category: "Database", name: "MySQL", confidence: 0.86, evidence: "settings.py mysql connector", status: "validated" }
    ],
    validationStatus: "validated",
    repositoryUrl: "https://github.com/sih-2026/vision-attendance",
    documentationUrl: "https://visionattend.edu",
    updatedAt: "2026-08-22"
  },
  {
    id: "proj-010",
    title: "Mental Health Sentiment & Mood Journaling Assistant",
    domain: "Healthcare",
    shortDescription: "Natural language processing web application delivering daily sentiment trend reports and mood therapy resources using HuggingFace & React.",
    problemStatement: "College students experiencing high stress lack early-stage non-clinical psychological tracking and self-care feedback tools.",
    abstract: "This student wellness platform evaluates user daily voice and text journal entries using HuggingFace RoBERTa models. It constructs mood score timelines in React, providing personalized therapeutic prompts and triggering urgent counselor contact flags when severe depression indicators persist.",
    team: {
      name: "MindCare Tech",
      members: [
        { name: "Rhea Banerjee", role: "NLP Researcher & Founder" },
        { name: "Kunal Shah", role: "Full Stack Developer" }
      ]
    },
    technologies: ["Python", "FastAPI", "React", "MongoDB", "PyTorch", "Tailwind CSS"],
    taxonomyTags: [
      { category: "Programming Language", name: "Python", confidence: 0.95, evidence: "nlp/sentiment_analyzer.py", status: "validated" },
      { category: "Backend Framework", name: "FastAPI", confidence: 0.90, evidence: "app/routers/journal.py", status: "validated" },
      { category: "Frontend Framework", name: "React", confidence: 0.92, evidence: "src/components/MoodChart.jsx", status: "validated" },
      { category: "Database", name: "MongoDB", confidence: 0.84, evidence: "pymongo database connection", status: "validated" }
    ],
    validationStatus: "validated",
    repositoryUrl: "https://github.com/sih-2026/mindcare-assistant",
    documentationUrl: "https://mindcare-health.org",
    updatedAt: "2026-08-29"
  },
  {
    id: "proj-011",
    title: "AI-Powered Autonomous Landslide Warning Buoy",
    domain: "IoT & Smart Cities",
    shortDescription: "Soil moisture and seismic sensor network deploying Scikit-Learn micro-models for early hill slope collapse warnings.",
    problemStatement: "Hilly terrain roads experience sudden landslides during monsoon season without prior warning to highway transit vehicles.",
    abstract: "Deploying solar-powered wireless telemetry nodes that measure pore-water pressure and ground vibration metrics. Node.js gateway servers aggregate sensor broadcasts into MongoDB, calculating landslide probability scores using Random Forest classifiers and firing emergency SMS warning beacons.",
    team: {
      name: "TerraShield",
      members: [
        { name: "Varun Saxena", role: "Geotech & Data Lead" },
        { name: "Isha Dutt", role: "Embedded Hardware Specialist" }
      ]
    },
    technologies: ["Python", "Node.js", "React", "MongoDB", "Scikit-Learn"],
    taxonomyTags: [
      { category: "Programming Language", name: "Python", confidence: 0.93, evidence: "predict_landslide.py", status: "validated" },
      { category: "Runtime", name: "Node.js", confidence: 0.91, evidence: "gateway_server.js", status: "validated" },
      { category: "Frontend Framework", name: "React", confidence: 0.87, evidence: "src/pages/LiveMonitor.jsx", status: "validated" },
      { category: "Database", name: "MongoDB", confidence: 0.89, evidence: "models/SensorData.js", status: "validated" }
    ],
    validationStatus: "validated",
    repositoryUrl: "https://github.com/sih-2026/terrashield-warning",
    documentationUrl: "https://terrashield.org",
    updatedAt: "2026-08-26"
  },
  {
    id: "proj-012",
    title: "Decentralized Micro-Grant Distribution Platform for Student Researchers",
    domain: "FinTech",
    shortDescription: "Transparent crowdfunding portal for university research grants using Spring Boot, React, and MySQL database ledgers.",
    problemStatement: "Student research projects encounter high administrative overhead and 3-month delays when seeking small seed grants ($500-$2000).",
    abstract: "A peer-to-peer grant distribution workflow platform that streamlines institutional peer-review and milestone payouts. Built with Java Spring Boot and React, it enforces stage-gate deliverable signoffs by academic mentors before disbursing scholarship installments from a transparent audit database.",
    team: {
      name: "GrantFlow",
      members: [
        { name: "Manish Sharma", role: "Backend System Architect" },
        { name: "Pooja Varma", role: "UI/UX & Frontend Engineer" }
      ]
    },
    technologies: ["Java", "Spring Boot", "React", "MySQL", "Tailwind CSS"],
    taxonomyTags: [
      { category: "Programming Language", name: "Java", confidence: 0.97, evidence: "src/main/java/com/grantflow", status: "validated" },
      { category: "Backend Framework", name: "Spring Boot", confidence: 0.95, evidence: "pom.xml dependencies", status: "validated" },
      { category: "Frontend Framework", name: "React", confidence: 0.91, evidence: "src/components/GrantList.jsx", status: "validated" },
      { category: "Database", name: "MySQL", confidence: 0.93, evidence: "schema.sql, JPA Entity classes", status: "validated" }
    ],
    validationStatus: "validated",
    repositoryUrl: "https://github.com/sih-2026/grantflow-platform",
    documentationUrl: "https://grantflow.edu",
    updatedAt: "2026-08-18"
  }
];

export const mockTaxonomy = {
  id: "tax-root",
  name: "Technology Taxonomy",
  domains: [
    {
      id: "dom-web",
      name: "Web Development",
      description: "Client-side and server-side web application architectures and protocols.",
      categories: [
        {
          id: "cat-frontend",
          name: "Frontend Development",
          technologies: [
            {
              id: "tech-js",
              name: "JavaScript",
              category: "Programming Language",
              parentDomain: "Web Development",
              description: "High-level, interpreted programming language for dynamic web clients.",
              projectCount: 8,
              relatedTechnologies: ["React", "Node.js", "TypeScript", "Vue.js"]
            },
            {
              id: "tech-react",
              name: "React",
              category: "Frontend Framework",
              parentDomain: "Web Development",
              description: "Component-based declarative UI library for web interfaces.",
              projectCount: 10,
              relatedTechnologies: ["JavaScript", "Next.js", "Redux", "Tailwind CSS"]
            },
            {
              id: "tech-tailwind",
              name: "Tailwind CSS",
              category: "UI Styling Framework",
              parentDomain: "Web Development",
              description: "Utility-first CSS framework for rapid interface styling.",
              projectCount: 5,
              relatedTechnologies: ["React", "CSS3", "HTML5"]
            }
          ]
        },
        {
          id: "cat-backend",
          name: "Backend Development",
          technologies: [
            {
              id: "tech-python",
              name: "Python",
              category: "Programming Language",
              parentDomain: "Web Development / AI",
              description: "Versatile object-oriented language widely used in AI, scripting, and backend web APIs.",
              projectCount: 9,
              relatedTechnologies: ["FastAPI", "Django", "TensorFlow", "PyTorch"]
            },
            {
              id: "tech-fastapi",
              name: "FastAPI",
              category: "Backend Framework",
              parentDomain: "Web Development",
              description: "Modern, high-performance web framework for building Python RESTful APIs.",
              projectCount: 4,
              relatedTechnologies: ["Python", "Pydantic", "Uvicorn", "PostgreSQL"]
            },
            {
              id: "tech-django",
              name: "Django",
              category: "Backend Framework",
              parentDomain: "Web Development",
              description: "High-level Python Web framework encouraging rapid development and clean design.",
              projectCount: 2,
              relatedTechnologies: ["Python", "PostgreSQL", "SQLite"]
            },
            {
              id: "tech-nodejs",
              name: "Node.js",
              category: "Runtime",
              parentDomain: "Web Development",
              description: "Asynchronous event-driven JavaScript runtime engine.",
              projectCount: 3,
              relatedTechnologies: ["JavaScript", "Express", "MongoDB"]
            },
            {
              id: "tech-springboot",
              name: "Spring Boot",
              category: "Backend Framework",
              parentDomain: "Enterprise Web",
              description: "Java-based framework for production-grade microservices.",
              projectCount: 2,
              relatedTechnologies: ["Java", "PostgreSQL", "Maven"]
            }
          ]
        }
      ]
    },
    {
      id: "dom-ai",
      name: "Artificial Intelligence & Data Science",
      description: "Machine learning models, computer vision systems, and data processing pipelines.",
      categories: [
        {
          id: "cat-ml",
          name: "Machine Learning & Deep Learning",
          technologies: [
            {
              id: "tech-tensorflow",
              name: "TensorFlow",
              category: "AI/ML Framework",
              parentDomain: "Artificial Intelligence",
              description: "End-to-end open source platform for machine learning models.",
              projectCount: 2,
              relatedTechnologies: ["Python", "Keras", "PyTorch", "OpenCV"]
            },
            {
              id: "tech-pytorch",
              name: "PyTorch",
              category: "AI/ML Framework",
              parentDomain: "Artificial Intelligence",
              description: "Optimized tensor library for deep learning using GPUs and CPUs.",
              projectCount: 3,
              relatedTechnologies: ["Python", "Torchvision", "TensorFlow", "Scikit-Learn"]
            },
            {
              id: "tech-scikit",
              name: "Scikit-Learn",
              category: "Data Science Library",
              parentDomain: "Artificial Intelligence",
              description: "Predictive data analysis machine learning library for Python.",
              projectCount: 2,
              relatedTechnologies: ["Python", "Pandas", "NumPy"]
            }
          ]
        },
        {
          id: "cat-cv",
          name: "Computer Vision",
          technologies: [
            {
              id: "tech-opencv",
              name: "OpenCV",
              category: "Computer Vision Library",
              parentDomain: "Artificial Intelligence",
              description: "Real-time image processing and computer vision algorithm library.",
              projectCount: 3,
              relatedTechnologies: ["Python", "PyTorch", "TensorFlow"]
            }
          ]
        }
      ]
    },
    {
      id: "dom-db",
      name: "Database Systems",
      description: "Relational, NoSQL, and spatial data persistence engines.",
      categories: [
        {
          id: "cat-relational",
          name: "Relational Databases",
          technologies: [
            {
              id: "tech-postgres",
              name: "PostgreSQL",
              category: "Relational DB",
              parentDomain: "Database Systems",
              description: "Powerful, open source object-relational database system.",
              projectCount: 5,
              relatedTechnologies: ["SQL", "FastAPI", "Django", "Spring Boot"]
            },
            {
              id: "tech-mysql",
              name: "MySQL",
              category: "Relational DB",
              parentDomain: "Database Systems",
              description: "Widely used open source relational database engine.",
              projectCount: 3,
              relatedTechnologies: ["SQL", "PHP", "Spring Boot", "Express"]
            }
          ]
        },
        {
          id: "cat-nosql",
          name: "NoSQL & Document Databases",
          technologies: [
            {
              id: "tech-mongodb",
              name: "MongoDB",
              category: "Document DB",
              parentDomain: "Database Systems",
              description: "JSON-document based distributed NoSQL database.",
              projectCount: 3,
              relatedTechnologies: ["Node.js", "Express", "Mongoose"]
            }
          ]
        }
      ]
    }
  ]
};

export const mockDomains = [
  "Artificial Intelligence",
  "Healthcare",
  "Agriculture",
  "Education",
  "IoT & Smart Cities",
  "Cybersecurity",
  "Smart Cities",
  "FinTech",
  "Sustainability"
];

export const mockStats = {
  projectsCount: "1,250+",
  technologiesCount: "48",
  domainsCount: "12",
  validatedCount: "830"
};
