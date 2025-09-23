'use client'

import { motion } from 'framer-motion'
import { Button } from './ui/Button'
import SocialShare from './SocialShare'
import { TrendingUp } from 'lucide-react'

export default function Header() {
  const scrollToSignup = () => {
    const signupSection = document.getElementById('signup')
    if (signupSection) {
      signupSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 mr-3">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-xl font-semibold text-foreground">CampaignHub</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={scrollToSignup}
              className="hidden sm:inline-flex"
            >
              Get Started
            </Button>
            <SocialShare />
          </div>
        </div>
      </div>
    </motion.header>
  )
}
