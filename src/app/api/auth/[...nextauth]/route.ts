import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

// @ts-expect-error NextAuth default export issue
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
