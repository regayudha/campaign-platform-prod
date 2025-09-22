import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import SignupForm from '@/components/SignupForm'

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Hero />
        <Features />
        <SignupForm />
      </main>
    </>
  )
}
