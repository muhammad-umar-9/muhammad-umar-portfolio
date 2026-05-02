import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Import Components
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ScrollProgressBar from './components/ScrollProgressBar'
import ThemeToggle from './components/ThemeToggle'

// Import Data
import { incrementPageViews, getPageViews } from './utils/analytics'

function App() {
  const [pageViews, setPageViews] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    // Increment page views
    incrementPageViews()
    setPageViews(getPageViews())

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="loading-spinner mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold gradient-text">Loading Portfolio...</h2>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 dark-mode-transition">
      {/* Scroll Progress Bar */}
      <ScrollProgressBar />
      
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-pattern opacity-50 pointer-events-none"></div>
      
      {/* Navigation */}
      <Navbar />
      
      {/* Theme Toggle */}
      <ThemeToggle />
      
      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Certifications />
        <Contact />
      </main>
      
      {/* Footer */}
      <Footer pageViews={pageViews} />
      
      {/* Scroll to Top */}
      <ScrollToTop />
    </div>
  )
}

export default App
