import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HiDownload, HiMail, HiLocationMarker } from 'react-icons/hi'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { personalInfo } from '../data/personal'
import { scrollToElement } from '../utils/analytics'

const Hero = () => {
  const [currentText, setCurrentText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [textIndex, setTextIndex] = useState(0)
  
  const texts = [
    "AI Student",
    "Full Stack Developer",
    "Software Engineer",
    "Python Developer",
    "Problem Solver"
  ]

  useEffect(() => {
    const typeText = () => {
      const currentString = texts[textIndex]
      if (isTyping) {
        if (currentText.length < currentString.length) {
          setCurrentText(currentString.slice(0, currentText.length + 1))
        } else {
          setTimeout(() => setIsTyping(false), 1500)
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1))
        } else {
          setIsTyping(true)
          setTextIndex((prev) => (prev + 1) % texts.length)
        }
      }
    }

    const timer = setTimeout(typeText, isTyping ? 100 : 50)
    return () => clearTimeout(timer)
  }, [currentText, isTyping, textIndex])

  const handleResumeDownload = () => {
    // Create a temporary link to download resume
    const link = document.createElement('a')
    link.href = personalInfo.resume.downloadUrl
    link.download = 'Muhammad_Umar_Resume.pdf'
    link.click()
  }

  const socialLinks = [
    { icon: FaGithub, href: personalInfo.social.github, label: 'GitHub' },
    { icon: FaLinkedin, href: personalInfo.social.linkedin, label: 'LinkedIn' }
  ]

  return (
    <section id="home" className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom section-padding">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-8rem)]">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              <p className="text-primary-600 dark:text-primary-400 font-medium text-lg">
                Hello, I'm
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
                <span className="gradient-text">{personalInfo.name}</span>
              </h1>
            </motion.div>

            {/* Typewriter Effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-700 dark:text-gray-300">
                I'm a <span className="gradient-text">{currentText}</span>
                <span className="animate-pulse">|</span>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
                {personalInfo.summary}
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-8 py-6"
            >
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">3+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Production Apps</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">99%+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">ML Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">5</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Certifications</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">2+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={handleResumeDownload}
                className="btn-primary flex items-center gap-2"
              >
                <HiDownload size={20} />
                Download Resume
              </button>
              <button
                onClick={() => scrollToElement('contact')}
                className="btn-secondary flex items-center gap-2"
              >
                <HiMail size={20} />
                Contact Me
              </button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="flex items-center gap-4 pt-4"
            >
              <span className="text-gray-600 dark:text-gray-400">Follow me:</span>
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400"
            >
              <HiLocationMarker size={20} />
              <span>{personalInfo.location}</span>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Floating Elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary-200 dark:bg-primary-800 rounded-full opacity-20 animate-bounce-slow"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary-200 dark:bg-secondary-800 rounded-full opacity-20 animate-pulse-slow"></div>
              
              {/* Main Image */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96"
              >
                <div className="w-full h-full rounded-full bg-gradient-to-r from-primary-400 to-secondary-400 p-2 shadow-2xl">
                  <img
                    src={personalInfo.images.profile}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                
                {/* Floating Icons */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-4 -right-4 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center"
                >
                  <span className="text-2xl">🐍</span>
                </motion.div>
                
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="absolute bottom-8 -left-4 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center"
                >
                  <span className="text-2xl">📊</span>
                </motion.div>
                
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                  className="absolute top-1/2 -right-8 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center"
                >
                  <span className="text-2xl">🤖</span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center"
        >
          <div className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2"></div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
