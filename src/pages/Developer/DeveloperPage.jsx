import React from "react";
import { 
  Code, 
  Users, 
  Github, 
  ExternalLink, 
  BookOpen, 
  Cpu, 
  Database, 
  Brain,
  Monitor,
  Server,
  Globe,
  Mail,
  MapPin,
  Star,
  Coffee
} from "lucide-react";

const DeveloperPage = () => {
  const teamMembers = [
    // Machine Learning Team
    {
      id: "MC009D5Y0680",
      name: "Mifta Rizaldirahmat",
      role: "Machine Learning Engineer",
      team: "ML",
      university: "Universitas Gunadarma",
      status: "Aktif",
      specialization: "Recommendation Systems",
      avatar: "profile/miftah.png",
    },
    {
      id: "MC009D5Y1029",
      name: "Muhammad Naufal Hilmy",
      role: "Machine Learning Engineer",
      team: "ML",
      university: "Universitas Gunadarma",
      status: "Aktif",
      specialization: "Data Science & Analytics",
      avatar: "profile/naufal.png",
    },
    {
      id: "MC009D5Y0498",
      name: "Muhammad Ammar Arief",
      role: "Machine Learning Engineer",
      team: "ML",
      university: "Universitas Gunadarma",
      status: "Aktif",
      specialization: "AI & Neural Networks",
      avatar: "profile/ammar.png",
    },
    // Frontend Backend Team
    {
      id: "FC009D5X2473",
      name: "Fayza Kamila",
      role: "Full Stack Developer",
      team: "FEBE",
      university: "Universitas Gunadarma",
      status: "Aktif",
      specialization: "Frontend Development",
      avatar: "profile/fayy.png",
    },
    {
      id: "FC009D5Y1612",
      name: "Muhamad Aditya Umar Faiz",
      role: "Full Stack Developer",
      team: "FEBE",
      university: "Universitas Gunadarma",
      status: "Aktif",
      specialization: "Backend Development",
      avatar: "profile/adit.png",
    },
    {
      id: "FC009D5Y0580",
      name: "Dwiki Diandra Putra",
      role: "Full Stack Developer",
      team: "FEBE",
      university: "Universitas Gunadarma",
      status: "Aktif",
      specialization: "DevOps & Integration",
      avatar: "profile/dwiki.png",
    }
  ];



  const technologies = [
    { name: "React", icon: <Monitor className="h-6 w-6" />, category: "Frontend" },
    { name: "Node.js", icon: <Server className="h-6 w-6" />, category: "Backend" },
    { name: "Python", icon: <Code className="h-6 w-6" />, category: "ML/AI" },
    { name: "PostgreSQL", icon: <Database className="h-6 w-6" />, category: "Database" },
    { name: "TensorFlow", icon: <Brain className="h-6 w-6" />, category: "ML/AI" },
    { name: "Express.js", icon: <Globe className="h-6 w-6" />, category: "Backend" }
  ];

  const getTeamIcon = (team) => {
    return team === "ML" ? <Brain className="h-5 w-5" /> : <Code className="h-5 w-5" />;
  };

  const getTeamColor = (team) => {
    return team === "ML" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#1A3636] via-[#2A4A4A] to-[#1A3636] text-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Code className="h-12 w-12" />
              <h1 className="text-5xl font-bold">Developer Team</h1>
            </div>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
              Meet the talented team behind Explore Jakarta - a collaborative project combining 
              Machine Learning expertise with Full Stack development to create intelligent 
              travel recommendations.
            </p>
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Universitas Gunadarma</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>6 Active Developers</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                <span>Capstone Project 2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Stats */}
      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl mb-4">
              <Brain className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">3</h3>
            <p className="text-gray-600">Machine Learning Engineers</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-4">
              <Code className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">3</h3>
            <p className="text-gray-600">Full Stack Developers</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mb-4">
              <Coffee className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">∞</h3>
            <p className="text-gray-600">Cups of Coffee</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Team Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1A3636] mb-4">Our Development Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A diverse team of developers specializing in Machine Learning and Full Stack development, 
              working together to create innovative travel recommendation solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex flex-col gap-2">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getTeamColor(member.team)}`}>
                        {getTeamIcon(member.team)}
                        {member.team}
                      </span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {member.status}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-[#1A3636] font-medium mb-2">{member.role}</p>
             
                  
                  <div className="border-t pt-4">
                    <div className="mb-3">
                      <p className="text-xs font-medium text-gray-500 mb-2">ID: {member.id}</p>
                      <p className="text-sm text-gray-600">{member.university}</p>
                    </div>
                    

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1A3636] mb-4">Technologies We Use</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Modern tech stack powering our intelligent travel recommendation system.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {technologies.map((tech, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl mb-3 text-[#1A3636]">
                  {tech.icon}
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">{tech.name}</h3>
                <p className="text-xs text-gray-500">{tech.category}</p>
              </div>
            ))}
          </div>
        </div>

        {/* API Documentation Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1A3636] mb-4">API Documentation</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Comprehensive API documentation for developers who want to integrate with our 
              recommendation system and explore Jakarta's attractions data.
            </p>
            <a
              href="https://api.explore-jakarta.my.id/#/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A3636] text-white rounded-lg hover:bg-[#2A4A4A] transition-colors font-medium"
            >
              <BookOpen className="h-5 w-5" />
              View Full Documentation
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>


        </div>

  
      </div>
    </div>
  );
};

export default DeveloperPage; 