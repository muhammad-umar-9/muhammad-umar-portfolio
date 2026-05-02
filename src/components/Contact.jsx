import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiMail, HiPhone, HiLocationMarker, HiPaperAirplane } from 'react-icons/hi'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import emailjs from 'emailjs-com'
import { personalInfo } from '../data/personal'
import { validateForm, saveContactDraft, clearContactDraft } from '../utils/analytics'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const formRef = useRef()
  
  // Initialize EmailJS
  useEffect(() => {
    emailjs.init('yV8vxxHKlbCMGIvxZ')
  }, [])
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
    
    // Save draft
    saveContactDraft({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate form
    const validation = validateForm(formData)
    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }
    
    setIsSubmitting(true)
    setSubmitStatus(null)
    
    try {
      console.log('Attempting to send email with data:', {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message
      })
      
      // Using EmailJS for form submission
      const result = await emailjs.send(
        'service_i1oimpa', // Your EmailJS service ID
        'template_9lsvw3t', // Your EmailJS template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_name: 'Muhammad Umar'
        }
        // Public key is already initialized in useEffect
      )
      
      console.log('EmailJS success:', result)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      clearContactDraft()
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000)
      
    } catch (error) {
      console.error('EmailJS error details:', error)
      console.error('Error status:', error.status)
      console.error('Error text:', error.text)
      
      // Fallback to mailto if EmailJS fails
      if (error.status === 400 || error.status === 401 || error.status === 404) {
        console.log('Falling back to mailto...')
        const subject = encodeURIComponent(formData.subject || 'Message from Portfolio')
        const body = encodeURIComponent(
          `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        )
        const mailtoLink = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`
        window.location.href = mailtoLink
        setSubmitStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
        clearContactDraft()
      } else {
        setSubmitStatus('error')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: HiMail,
      title: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: HiPhone,
      title: 'Phone',
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: HiLocationMarker,
      title: 'Location',
      value: personalInfo.location,
      href: '#',
      color: 'from-purple-500 to-pink-500'
    }
  ]

  const socialLinks = [
    { icon: FaGithub, href: personalInfo.social.github, label: 'GitHub', color: 'hover:text-gray-700' },
    { icon: FaLinkedin, href: personalInfo.social.linkedin, label: 'LinkedIn', color: 'hover:text-blue-600' }
  ]

  return (
    <section id="contact" className="section-padding bg-gray-50 dark:bg-gray-800">
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
              Get In Touch
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Have a project in mind or want to collaborate? I'm always open to building something impactful together.
            </p>
          </motion.div>

          {/* Contact Content */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                  Let's Connect
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  Whether you have a project in mind, want to discuss potential collaborations, 
                  or simply want to connect, I'd love to hear from you. Feel free to reach out 
                  through any of the channels below.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-4">
                {contactInfo.map((contact, index) => (
                  <motion.a
                    key={contact.title}
                    href={contact.href}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    className="glass-card p-6 flex items-center gap-4 hover:shadow-lg transition-all duration-300"
                  >
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${contact.color} flex items-center justify-center text-white`}>
                      <contact.icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        {contact.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {contact.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Follow Me
                </h4>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 ${social.color} transition-colors duration-300`}
                      aria-label={social.label}
                    >
                      <social.icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Fun Fact */}
              <motion.div variants={itemVariants} className="glass-card p-6 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900 dark:to-secondary-900">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Fun Fact! 🎉
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  I usually respond to emails within 24 hours and love discussing everything from 
                  machine learning algorithms to the latest tech trends!
                </p>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants} className="glass-card p-8">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                Send Me a Message
              </h3>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg"
                >
                  <p className="font-medium">Message sent successfully! 🎉</p>
                  <p className="text-sm">I'll get back to you as soon as possible.</p>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg"
                >
                  <p className="font-medium">Oops! Something went wrong. 😅</p>
                  <p className="text-sm">Please try again or contact me directly via email.</p>
                </motion.div>
              )}

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`form-input ${errors.name ? 'border-red-500' : ''}`}
                      placeholder="Enter your name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className={`form-textarea ${errors.message ? 'border-red-500' : ''}`}
                    placeholder="Tell me about your project, question, or just say hi!"
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="loading-spinner w-5 h-5"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <HiPaperAirplane size={20} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>

              <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                <p>
                  * Required fields. Your information is safe and will never be shared.
                </p>
              </div>
            </motion.div>
          </div>

          {/* CTA Section */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="glass-card p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                Ready to Work Together?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                I'm always looking for exciting opportunities to build impactful software, 
                collaborate on challenging projects, or work on AI initiatives. Let's ship something together!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={personalInfo.resume.downloadUrl}
                  download
                  className="btn-primary"
                >
                  Download Resume
                </a>
                <a
                  href={personalInfo.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
