import React from 'react'
import { motion } from 'framer-motion'
import { HiHeart, HiArrowUp } from 'react-icons/hi'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { personalInfo } from '../data/personal'

const Footer = ({ pageViews }) => {
  const currentYear = new Date().getFullYear()
  
  const socialLinks = [
    { icon: FaGithub, href: personalInfo.social.github, label: 'GitHub' },
    { icon: FaLinkedin, href: personalInfo.social.linkedin, label: 'LinkedIn' }
  ]

  const quickLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Contact', href: '#contact' }
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="py-16 grid lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">MU</span>
              </div>
              <span className="text-xl font-bold">Muhammad Umar</span>
            </div>
            
            <p className="text-gray-300 leading-relaxed max-w-md">
              AI undergrad and software engineer building production systems that real people use.
              Always open to collaborating on impactful projects.
            </p>
            
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary-600 transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Get In Touch</h3>
            <div className="space-y-3 text-gray-300">
              <p>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="hover:text-white transition-colors duration-300"
                >
                  {personalInfo.email}
                </a>
              </p>
              <p>{personalInfo.location}</p>
              <p className="text-sm">
                <span className="text-primary-400">Available for:</span><br />
                Internships & Collaborations
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © {currentYear} Muhammad Umar. Built with{' '}
                <HiHeart className="inline text-red-500 mx-1" size={16} />{' '}
                using React & Tailwind CSS
              </p>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-400">
              {pageViews > 0 && (
                <span>
                  👀 {pageViews.toLocaleString()} views
                </span>
              )}
              <span>
                🚀 v1.0.0
              </span>
              <button
                onClick={scrollToTop}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
              >
                <HiArrowUp size={16} />
                Back to Top
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
