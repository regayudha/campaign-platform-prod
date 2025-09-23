'use client'

import { motion } from 'framer-motion'
import { BarChart3, Target, Zap, Users, TrendingUp, Shield } from 'lucide-react'

const features = [
  {
    icon: BarChart3,
    title: 'Analytics that matter',
    description: 'Track what drives results, not vanity metrics. Get insights that actually help you make better decisions.',
    category: 'Data'
  },
  {
    icon: Target,
    title: 'Find your people',
    description: 'Stop wasting money on the wrong audience. Our targeting helps you reach people who actually care.',
    category: 'Targeting'
  },
  {
    icon: Zap,
    title: 'Ship campaigns fast',
    description: 'From idea to live campaign in minutes, not days. Spend time optimizing, not setting up.',
    category: 'Speed'
  },
  {
    icon: Users,
    title: 'Work as a team',
    description: 'Everyone stays in sync. No more version confusion or missed approvals holding you back.',
    category: 'Collaboration'
  },
  {
    icon: TrendingUp,
    title: 'Grow what works',
    description: 'Double down on winners, kill the losers. Clear data shows you exactly what to do next.',
    category: 'Growth'
  },
  {
    icon: Shield,
    title: 'Enterprise ready',
    description: 'Built for scale with security that meets enterprise standards. Your data stays protected.',
    category: 'Security'
  }
]

export default function Features() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Everything you need to run better campaigns
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-600"
          >
            No fluff, no complexity. Just the tools that actually move the needle for your marketing.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">
                    {feature.category}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-lg p-8 md:p-12 shadow-sm border border-gray-100 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Ready to see what better campaigns look like?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join over 5,000 marketers who&apos;ve already made the switch to data-driven campaigns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Start free trial
            </button>
            <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Book a demo
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
