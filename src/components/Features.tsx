'use client'

import { motion } from 'framer-motion'
import { BarChart3, Target, Zap, Users, TrendingUp, Shield } from 'lucide-react'

const features = [
  {
    icon: BarChart3,
    title: 'Real-Time Analytics',
    description: 'Track your campaign performance with live data and actionable insights.',
    color: 'text-blue-500'
  },
  {
    icon: Target,
    title: 'Precision Targeting',
    description: 'Reach the right audience with AI-powered customer segmentation.',
    color: 'text-purple-500'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Deploy campaigns in minutes with our streamlined workflow.',
    color: 'text-yellow-500'
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Work seamlessly with your team using built-in collaboration tools.',
    color: 'text-green-500'
  },
  {
    icon: TrendingUp,
    title: 'Growth Optimization',
    description: 'Continuously improve with machine learning recommendations.',
    color: 'text-red-500'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Your data is protected with bank-grade security measures.',
    color: 'text-indigo-500'
  }
]

export default function Features() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Everything You Need to Succeed
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Our comprehensive platform provides all the tools and insights you need to create, 
            manage, and optimize successful marketing campaigns.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className={`w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-6`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
