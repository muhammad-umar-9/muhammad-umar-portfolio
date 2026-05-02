import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiExternalLink, HiCode, HiCalendar, HiTag, HiX, HiLockClosed } from 'react-icons/hi'
import { FaGithub } from 'react-icons/fa'
import { projects } from '../data/projects'

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  const ProjectCard = ({ project, index }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5 }}
      className="project-card group"
    >
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Project Status Badge */}
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${
          project.status === 'Completed' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
        }`}>
          {project.status}
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2 line-clamp-2">
            {project.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
            {project.description}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="skill-chip text-xs"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            {project.isPrivate ? (
              <span className="flex items-center gap-2 text-gray-500 dark:text-gray-500 text-sm">
                <HiLockClosed size={16} />
                Private Repo
              </span>
            ) : project.githubUrl !== '#' && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <FaGithub size={16} />
                Code
              </a>
            )}
            {project.liveUrl !== '#' && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <HiExternalLink size={16} />
                Live
              </a>
            )}
          </div>
          
          <button
            onClick={() => setSelectedProject(project)}
            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm transition-colors"
          >
            Learn More
          </button>
        </div>
      </div>
    </motion.div>
  )

  const ProjectModal = ({ project, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="modal-backdrop"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              {project.title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <HiX size={24} />
            </button>
          </div>
          
          <div className="space-y-6">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-64 object-cover rounded-lg"
            />
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    Description
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {project.longDescription}
                  </p>
                </div>
                
                {project.highlights && project.highlights.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Key Highlights
                    </h3>
                    <ul className="space-y-2">
                      {project.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-600 dark:text-gray-300 text-sm">
                          <span className="text-primary-500 mt-1">•</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="skill-chip text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="glass-card p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <HiCalendar className="text-primary-500" size={20} />
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      Project Date
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">{project.date}</p>
                </div>
                
                <div className="glass-card p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <HiTag className="text-primary-500" size={20} />
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      Category
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">{project.category}</p>
                </div>
                
                <div className="glass-card p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <HiCode className="text-primary-500" size={20} />
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      Status
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">{project.status}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              {project.isPrivate ? (
                <span className="flex items-center gap-2 text-gray-500 dark:text-gray-400 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm">
                  <HiLockClosed size={18} />
                  Private Repository
                </span>
              ) : project.githubUrl !== '#' && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center gap-2"
                >
                  <FaGithub size={20} />
                  View Code
                </a>
              )}
              {project.liveUrl !== '#' && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center gap-2"
                >
                  <HiExternalLink size={20} />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )

  return (
    <section id="projects" className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold gradient-text mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Real projects, real users, real deployments — not just demos.
            </p>
          </motion.div>

          {/* Projects Grid - Direct, no filter needed */}
          <motion.div variants={itemVariants}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </motion.div>
          </motion.div>

          {/* Call to Action */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="glass-card p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                Want to See More?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Check out my GitHub for more projects, experiments, and open-source contributions.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://github.com/muhammad-umar-9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center gap-2"
                >
                  <FaGithub size={20} />
                  View GitHub Profile
                </a>
                <button
                  onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                  className="btn-secondary"
                >
                  Let's Collaborate
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

export default Projects
