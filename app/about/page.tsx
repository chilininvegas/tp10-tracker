import Link from 'next/link'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {Button} from '@/components/ui/button'
import {
  CodeIcon,
  DatabaseIcon,
  LayoutDashboardIcon,
  ShieldCheckIcon,
  TrendingUpIcon,
  CalendarIcon,
  ListIcon,
  BookOpenIcon,
  BotIcon
} from 'lucide-react'

const AboutPage = () => {
  return (
    <main className='min-h-[calc(100vh-80px)] bg-gradient-to-b from-slate-50 to-white'>
      <div className='max-w-7xl mx-auto py-12 px-4'>
        <div className='text-center mb-12'>
          <h1 className='text-5xl font-bold mb-4'>About NextCash</h1>
          <p className='text-xl text-muted-foreground max-w-2xl mx-auto mb-6'>
            A modern finance tracking application built with cutting-edge
            technologies
          </p>
          <Button asChild size='lg' className='bg-lime-600 hover:bg-lime-500'>
            <Link href='/dashboard'>Go to Dashboard</Link>
          </Button>
        </div>

        {/* Technology Stack Section */}
        <section className='mb-12'>
          <h2 className='text-3xl font-semibold mb-6 flex items-center gap-2'>
            <CodeIcon className='text-lime-500' />
            Technology Stack
          </h2>
          <div className='grid md:grid-cols-2 gap-6'>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <LayoutDashboardIcon className='text-blue-500' size={24} />
                  Frontend
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                <div>
                  <Badge variant='secondary'>Next.js 16.0.7</Badge>
                  <p className='text-sm text-muted-foreground mt-1'>
                    React framework with App Router and Server Components
                  </p>
                </div>
                <div>
                  <Badge variant='secondary'>React 19.2.1</Badge>
                  <p className='text-sm text-muted-foreground mt-1'>
                    Modern UI library with latest features
                  </p>
                </div>
                <div>
                  <Badge variant='secondary'>Tailwind CSS 4</Badge>
                  <p className='text-sm text-muted-foreground mt-1'>
                    Utility-first CSS framework for styling
                  </p>
                </div>
                <div>
                  <Badge variant='secondary'>shadcn/ui + Radix UI</Badge>
                  <p className='text-sm text-muted-foreground mt-1'>
                    Accessible component library
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <DatabaseIcon className='text-green-500' size={24} />
                  Backend & Database
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                <div>
                  <Badge variant='secondary'>PostgreSQL</Badge>
                  <p className='text-sm text-muted-foreground mt-1'>
                    Robust relational database via Neon
                  </p>
                </div>
                <div>
                  <Badge variant='secondary'>Drizzle ORM 0.44.7</Badge>
                  <p className='text-sm text-muted-foreground mt-1'>
                    Type-safe database toolkit
                  </p>
                </div>
                <div>
                  <Badge variant='secondary'>Server Actions</Badge>
                  <p className='text-sm text-muted-foreground mt-1'>
                    Next.js server-side mutations
                  </p>
                </div>
                <div>
                  <Badge variant='secondary'>Zod 4.1.13</Badge>
                  <p className='text-sm text-muted-foreground mt-1'>
                    Schema validation and type safety
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <ShieldCheckIcon className='text-purple-500' size={24} />
                  Authentication
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                <div>
                  <Badge variant='secondary'>Clerk 6.35.5</Badge>
                  <p className='text-sm text-muted-foreground mt-1'>
                    Complete authentication solution with user management
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <TrendingUpIcon className='text-orange-500' size={24} />
                  Data Visualization
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                <div>
                  <Badge variant='secondary'>Recharts 2.15.4</Badge>
                  <p className='text-sm text-muted-foreground mt-1'>
                    Interactive charts for cashflow visualization
                  </p>
                </div>
                <div>
                  <Badge variant='secondary'>date-fns 4.1.0</Badge>
                  <p className='text-sm text-muted-foreground mt-1'>
                    Modern date utility library
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features Section */}
        <section className='mb-12'>
          <h2 className='text-3xl font-semibold mb-6 flex items-center gap-2'>
            <ListIcon className='text-lime-500' />
            App Features
          </h2>
          <Card>
            <CardContent className='pt-6'>
              <div className='grid md:grid-cols-2 gap-6'>
                <div className='space-y-2'>
                  <div className='flex items-start gap-3'>
                    <CalendarIcon className='text-lime-500 mt-1' size={20} />
                    <div>
                      <h3 className='font-semibold'>Transaction Management</h3>
                      <p className='text-sm text-muted-foreground'>
                        Create, edit, and delete income and expense transactions
                        with ease
                      </p>
                    </div>
                  </div>
                </div>

                <div className='space-y-2'>
                  <div className='flex items-start gap-3'>
                    <TrendingUpIcon className='text-lime-500 mt-1' size={20} />
                    <div>
                      <h3 className='font-semibold'>Cashflow Visualization</h3>
                      <p className='text-sm text-muted-foreground'>
                        Interactive charts showing income vs expenses over time
                      </p>
                    </div>
                  </div>
                </div>

                <div className='space-y-2'>
                  <div className='flex items-start gap-3'>
                    <ListIcon className='text-lime-500 mt-1' size={20} />
                    <div>
                      <h3 className='font-semibold'>Category Organization</h3>
                      <p className='text-sm text-muted-foreground'>
                        Organize transactions by predefined categories (Housing,
                        Transport, Food, etc.)
                      </p>
                    </div>
                  </div>
                </div>

                <div className='space-y-2'>
                  <div className='flex items-start gap-3'>
                    <CalendarIcon className='text-lime-500 mt-1' size={20} />
                    <div>
                      <h3 className='font-semibold'>Monthly & Annual Views</h3>
                      <p className='text-sm text-muted-foreground'>
                        Filter and view transactions by month and year
                      </p>
                    </div>
                  </div>
                </div>

                <div className='space-y-2'>
                  <div className='flex items-start gap-3'>
                    <LayoutDashboardIcon
                      className='text-lime-500 mt-1'
                      size={20}
                    />
                    <div>
                      <h3 className='font-semibold'>Dashboard Overview</h3>
                      <p className='text-sm text-muted-foreground'>
                        Quick glance at recent transactions and annual cashflow
                      </p>
                    </div>
                  </div>
                </div>

                <div className='space-y-2'>
                  <div className='flex items-start gap-3'>
                    <ShieldCheckIcon className='text-lime-500 mt-1' size={20} />
                    <div>
                      <h3 className='font-semibold'>Secure Authentication</h3>
                      <p className='text-sm text-muted-foreground'>
                        User-specific data with robust authentication and
                        authorization
                      </p>
                    </div>
                  </div>
                </div>

                <div className='space-y-2'>
                  <div className='flex items-start gap-3'>
                    <DatabaseIcon className='text-lime-500 mt-1' size={20} />
                    <div>
                      <h3 className='font-semibold'>Type-Safe Development</h3>
                      <p className='text-sm text-muted-foreground'>
                        Full TypeScript support with Zod validation for data
                        integrity
                      </p>
                    </div>
                  </div>
                </div>

                <div className='space-y-2'>
                  <div className='flex items-start gap-3'>
                    <LayoutDashboardIcon
                      className='text-lime-500 mt-1'
                      size={20}
                    />
                    <div>
                      <h3 className='font-semibold'>Responsive Design</h3>
                      <p className='text-sm text-muted-foreground'>
                        Beautiful UI that works seamlessly on all devices
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Acknowledgments Section */}
        <section>
          <h2 className='text-3xl font-semibold mb-6 flex items-center gap-2'>
            <BookOpenIcon className='text-lime-500' />
            Acknowledgments
          </h2>
          <div className='grid md:grid-cols-2 gap-6'>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <BookOpenIcon className='text-red-500' size={24} />
                  Udemy Course
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-sm mb-2'>
                  This application was built following the excellent course:
                </p>
                <p className='font-semibold text-lg mb-2'>
                  "Next.js 15 & PostgreSQL"
                </p>
                <p className='text-sm text-muted-foreground mb-2'>
                  by{' '}
                  <span className='font-semibold text-foreground'>
                    Tom Phillips
                  </span>
                </p>
                <p className='text-sm text-muted-foreground'>
                  A comprehensive course covering modern web development with
                  Next.js 15, PostgreSQL, Drizzle ORM, and more.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <BotIcon className='text-blue-500' size={24} />
                  AI Assistant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-sm mb-2'>
                  Development assistance and code enhancements provided by:
                </p>
                <p className='font-semibold text-lg mb-2'>
                  Claude (Anthropic AI)
                </p>
                <p className='text-sm text-muted-foreground'>
                  An AI assistant that helped with code refactoring, feature
                  implementations, and technical guidance throughout the
                  development process.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <div className='mt-12 text-center text-sm text-muted-foreground'>
          <p>
            Built with ❤️ using Next.js 16, PostgreSQL, and modern web
            technologies
          </p>
        </div>
      </div>
    </main>
  )
}

export default AboutPage
