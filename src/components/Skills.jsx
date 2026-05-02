import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js'
import { Radar } from 'react-chartjs-2'
import { skills, skillCategories, skillStats } from '../data/skills'

// Register Chart.js components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState('programming')
  const [showChart, setShowChart] = useState(false)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  useEffect(() => {
    if (inView) {
      setShowChart(true)
    }
  }, [inView])

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

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
    }
  }

  // Prepare radar chart data
  const radarData = {
    labels: skillCategories.map(cat => cat.name),
    datasets: [{
      label: 'Skill Level',
      data: skillCategories.map(cat => {
        const categorySkills = skills[cat.key] || []
        return categorySkills.length > 0 
          ? categorySkills.reduce((acc, skill) => acc + skill.level, 0) / categorySkills.length
          : 0
      }),
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      borderColor: 'rgba(59, 130, 246, 1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(59, 130, 246, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(59, 130, 246, 1)'
    }]
  }

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.parsed.r.toFixed(1)}%`
          }
        }
      }
    },
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(255, 255, 255, 0.1)'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        pointLabels: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 12
          }
        },
        ticks: {
          display: false
        },
        min: 0,
        max: 100
      }
    }
  }

  return (
    <section id="skills" className="section-padding bg-white dark:bg-gray-900">
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
              Skills & Expertise
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Technologies and tools I use to build and ship production software
            </p>
          </motion.div>

          {/* Skills Overview Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Total Skills', value: skillStats.totalSkills, icon: '🛠️' },
              { label: 'Avg Level', value: `${skillStats.avgLevel}%`, icon: '📊' },
              { label: 'Expert Level', value: skillStats.expertLevel, icon: '🏆' },
              { label: 'Categories', value: skillStats.categories, icon: '📂' }
            ].map((stat, index) => (
              <div key={stat.label} className="glass-card p-6 text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Skills Visualization */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Radar Chart */}
            <motion.div variants={itemVariants} className="glass-card p-8">
              <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200 mb-8">
                Skills Overview
              </h3>
              <div className="h-80">
                {showChart && (
                  <Radar data={radarData} options={radarOptions} />
                )}
              </div>
            </motion.div>

            {/* Tech Stack Summary */}
            <motion.div variants={itemVariants} className="glass-card p-8 space-y-6">
              <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200">
                Tech Stack
              </h3>
              <div className="space-y-4">
                {skillCategories.map((category, index) => {
                  const categorySkills = skills[category.key] || []
                  const avgLevel = categorySkills.length > 0 
                    ? Math.round(categorySkills.reduce((acc, skill) => acc + skill.level, 0) / categorySkills.length)
                    : 0
                  return (
                    <motion.div
                      key={category.key}
                      variants={skillVariants}
                      className="space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                          <span className="text-xl">{category.icon}</span>
                          {category.name}
                        </span>
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          {avgLevel}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <motion.div
                          className={`bg-gradient-to-r ${category.color} h-2 rounded-full`}
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${avgLevel}%` } : { width: 0 }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>

          {/* Category Tabs */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="flex flex-wrap justify-center gap-4">
              {skillCategories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category.key
                      ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>

            {/* Skills Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {skills[selectedCategory]?.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    variants={skillVariants}
                    whileHover={{ scale: 1.05 }}
                    className="glass-card p-6 space-y-4 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{skill.icon}</span>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                          {skill.name}
                        </h4>
                      </div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {skill.level}%
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {skill.description}
                    </p>
                    
                    {/* Skill Level Indicator */}
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < Math.floor(skill.level / 20)
                              ? 'bg-primary-500'
                              : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Call to Action */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="glass-card p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                Let's Build Something Amazing Together
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                I'm always excited to work on new projects and learn new technologies. 
                Let's collaborate and create something impactful!
              </p>
              <button
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
              >
                Get In Touch
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
