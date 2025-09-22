'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from './ui/Button'
import { Share2, Twitter, Facebook, Linkedin, Copy, Check } from 'lucide-react'

interface SocialShareProps {
  title?: string
  description?: string
  url?: string
}

export default function SocialShare({ 
  title = "CampaignHub - Transform Your Marketing",
  description = "Join thousands of marketers revolutionizing their campaigns with AI-powered insights and analytics.",
  url = typeof window !== 'undefined' ? window.location.href : ''
}: SocialShareProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const shareData = {
    title,
    text: description,
    url
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData)
        // Track share event
        await fetch('/api/analytics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            event: 'share',
            data: { method: 'native', url }
          }),
        })
      } catch (error) {
        console.log('Share cancelled or failed:', error)
      }
    } else {
      setIsOpen(true)
    }
  }

  const handleSocialShare = async (platform: string, shareUrl: string) => {
    window.open(shareUrl, '_blank', 'width=600,height=400')
    
    // Track share event
    await fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event: 'share',
        data: { method: platform, url }
      }),
    }).catch(console.error)
    
    setIsOpen(false)
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      
      // Track copy event
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event: 'share',
          data: { method: 'copy', url }
        }),
      }).catch(console.error)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const socialLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={handleNativeShare}
        className="flex items-center"
      >
        <Share2 className="w-4 h-4 mr-2" />
        Share
      </Button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-lg border p-4 z-50 min-w-[200px]"
        >
          <div className="space-y-2">
            <button
              onClick={() => handleSocialShare('twitter', socialLinks.twitter)}
              className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Twitter className="w-4 h-4 mr-3 text-blue-500" />
              Twitter
            </button>
            <button
              onClick={() => handleSocialShare('facebook', socialLinks.facebook)}
              className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Facebook className="w-4 h-4 mr-3 text-blue-600" />
              Facebook
            </button>
            <button
              onClick={() => handleSocialShare('linkedin', socialLinks.linkedin)}
              className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Linkedin className="w-4 h-4 mr-3 text-blue-700" />
              LinkedIn
            </button>
            <button
              onClick={handleCopyLink}
              className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {copied ? (
                <Check className="w-4 h-4 mr-3 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 mr-3 text-gray-500" />
              )}
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
          </div>
        </motion.div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}
