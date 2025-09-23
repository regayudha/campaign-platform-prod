'use client'

import { motion } from 'framer-motion'
import { Button } from './ui/Button'
import { ArrowRight, BarChart3, Users, TrendingUp } from 'lucide-react'

export default function Hero() {
  return (
    <section className="min-h-screen bg-white relative">
      {/* Subtle geometric pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#000" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-12 gap-8 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="lg:col-span-7">
            {/* Simple badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <span className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-800 text-sm font-medium rounded-full">
                Marketing Platform
              </span>
            </motion.div>

            {/* Clean headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Build campaigns that
              <span className="text-blue-600 block">actually work</span>
            </motion.h1>

            {/* Simple description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl"
            >
              Stop guessing. Start growing. Our platform gives you the data and tools to create marketing campaigns that deliver real results.
            </motion.p>

            {/* Clean CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                onClick={() => {
                  const signupSection = document.getElementById('signup')
                  if (signupSection) {
                    signupSection.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
              >
                Get started free
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-3"
              >
                See how it works
              </Button>
            </motion.div>

            {/* Simple stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-8"
            >
              <div>
                <div className="text-2xl font-bold text-gray-900">5,000+</div>
                <div className="text-sm text-gray-600">Active users</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">180%</div>
                <div className="text-sm text-gray-600">Avg. ROI boost</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">99.9%</div>
                <div className="text-sm text-gray-600">Uptime</div>
              </div>
            </motion.div>
          </div>

          {/* Right Visual */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Simple dashboard mockup */}
              <div className="bg-white rounded-lg shadow-2xl border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-xs text-gray-500">Campaign Dashboard</div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Email Campaign</span>
                    <span className="text-sm text-green-600">+24%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Social Media</span>
                    <span className="text-sm text-green-600">+18%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Content Marketing</span>
                    <span className="text-sm text-green-600">+32%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-gray-50 rounded">
                    <Users className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                    <div className="text-sm font-semibold">1,247</div>
                    <div className="text-xs text-gray-500">Users</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <BarChart3 className="w-5 h-5 text-green-600 mx-auto mb-1" />
                    <div className="text-sm font-semibold">89%</div>
                    <div className="text-xs text-gray-500">Growth</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <TrendingUp className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                    <div className="text-sm font-semibold">$12k</div>
                    <div className="text-xs text-gray-500">Revenue</div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Live
              </div>
              <div className="absolute -bottom-4 -left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                Real-time data
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
