import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import Image from 'next/image' // https://nextjs.org/docs/messages/no-img-element

import {
  ClerkProvider,
  SignedIn,
  SignedUp,
  SignedOut,
  RedirectToSignIn,
  useUser,
  UserButton,
  withUser,
} from '@clerk/nextjs'
import { useRouter } from 'next/router'

const publicPages = []

const myLoader = ({ src, width, quality }) => {
  return `https://tybapp.ml/${src}?w=${width}&q=${quality || 75}`
}

const LayoutWrapper = ({ children }) => {
  const { pathname } = useRouter()
  // Check if the current route matches a public page
  const isPublicPage = publicPages.includes(pathname)
  //const { firstName } = withUser()
  return (
    <SectionContainer>
      <div className="flex flex-col justify-between h-screen">
        <header className="flex items-center justify-between py-10">
          <div>
            <Link href="/" aria-label="Tailwind CSS Blog">
              <div className="flex items-center justify-between">
                <div className="mr-3">
                  <Image
                    loader={myLoader}
                    src="data/logo.svg"
                    alt="site logo"
                    height={100}
                    width={100}
                  />
                </div>
                {typeof siteMetadata.headerTitle === 'string' ? (
                  <div className="hidden h-6 text-2xl font-semibold sm:block">
                    {siteMetadata.headerTitle}
                  </div>
                ) : (
                  siteMetadata.headerTitle
                )}
              </div>
            </Link>
          </div>
          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="p-1 font-medium text-gray-900 sm:p-4 dark:text-gray-100"
                >
                  {link.title}
                </Link>
              ))}
              <SignedOut>
                <Link
                  key="Sign In"
                  href="https://accounts.kkwyr.i3qnb.stg.dev/sign-up"
                  className="p-1 font-medium text-gray-900 sm:p-4 dark:text-gray-100"
                >
                  Sign In
                </Link>
              </SignedOut>
            </div>
            <SignedIn>
              <UserButton></UserButton>
            </SignedIn>
            <ThemeSwitch />
            <MobileNav />
          </div>
        </header>
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
