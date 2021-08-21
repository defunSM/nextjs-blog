import '@/css/tailwind.css'

import { ThemeProvider } from 'next-themes'
import Head from 'next/head'

import Analytics from '@/components/analytics'
import LayoutWrapper from '@/components/LayoutWrapper'
import { ClerkProvider, SignedIn, SignedUp, SignedOut, RedirectToSignIn } from '@clerk/nextjs'
import { useRouter } from 'next/router'

export const publicPages = []

export default function App({ Component, pageProps }) {
  // Get the pathname
  const { pathname } = useRouter()
  // Check if the current route matches a public page
  const isPublicPage = publicPages.includes(pathname)

  // If the current route is listed as public, render it directly
  // Otherwise, use Clerk to require authentication
  return (
    <ThemeProvider attribute="class">
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <Analytics />
      <LayoutWrapper>
        <ClerkProvider>
          {isPublicPage ? (
            <Component {...pageProps} />
          ) : (
            <>
              <SignedIn>
                <Component {...pageProps} />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          )}
        </ClerkProvider>
      </LayoutWrapper>
    </ThemeProvider>
  )
}
