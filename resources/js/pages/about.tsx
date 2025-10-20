import { Button } from '@/components/ui/button';
import { SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { HeartHandshake, Sparkles, Users } from 'lucide-react';
import { useState } from 'react';

export default function AboutPage() {
    const { auth } = usePage<SharedData>().props;
    const [mobileOpen, setMobileOpen] = useState(false);
    // Assume isLoggedIn from auth
    const isLoggedIn = !!auth?.user;

    return (
        <div className="flex min-h-screen flex-col bg-gradient-to-br from-white to-violet-50">
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <header className="sticky top-0 z-50 flex items-center justify-between bg-white px-4 py-6 shadow-sm sm:px-8">
                <Link href="/" className="text-2xl font-bold tracking-wide text-violet-700 hover:text-violet-600">
                    Delta Health
                </Link>
                <nav className="text-md hidden items-center gap-10 font-medium md:flex">
                    <Link href="/" className="text-black hover:text-violet-600">
                        Home
                    </Link>
                    <Link href="/about" className="text-black hover:text-violet-600">
                        About
                    </Link>
                    <Link href="/contact" className="text-black hover:text-violet-600">
                        Contact Us
                    </Link>
                    |
                    <div className="flex items-center gap-4">
                        <Link href="/login">
                            <Button
                                variant={'outline'}
                                className="flex h-10 cursor-pointer items-center bg-white px-5 text-violet-700 hover:bg-violet-50 hover:text-black"
                            >
                                Login
                            </Button>
                        </Link>
                    </div>
                </nav>
                <button
                    className="flex h-10 w-10 flex-col items-center justify-center focus:outline-none md:hidden"
                    aria-label="Open menu"
                    onClick={() => setMobileOpen((v) => !v)}
                >
                    <span className={`mb-1 block h-0.5 w-6 bg-violet-700 transition-all ${mobileOpen ? 'translate-y-2 rotate-45' : ''}`}></span>
                    <span className={`mb-1 block h-0.5 w-6 bg-violet-700 transition-all ${mobileOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block h-0.5 w-6 bg-violet-700 transition-all ${mobileOpen ? '-translate-y-2 -rotate-45' : ''}`}></span>
                </button>

                <div
                    className={`fixed top-0 right-0 z-[100] h-full w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out ${
                        mobileOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                    style={{
                        boxShadow: mobileOpen ? '0 0 0 9999px rgba(0,0,0,0.2)' : undefined,
                    }}
                >
                    <button
                        className="absolute top-4 right-4 text-2xl text-violet-700 focus:outline-none"
                        aria-label="Close menu"
                        onClick={() => setMobileOpen(false)}
                    >
                        &times;
                    </button>
                    <nav className="text-md mt-20 flex flex-col gap-6 px-8 font-medium">
                        <Link href="/" className="text-black hover:text-violet-600" onClick={() => setMobileOpen(false)}>
                            Home
                        </Link>
                        <Link href="/about" className="text-black hover:text-violet-600" onClick={() => setMobileOpen(false)}>
                            About
                        </Link>
                        <Link href="/contact" className="text-black hover:text-violet-600" onClick={() => setMobileOpen(false)}>
                            Contact Us
                        </Link>
                        <hr />
                        {isLoggedIn ? (
                            <Link
                                href="/dashboard"
                                className="flex h-10 cursor-pointer items-center rounded-md border border-violet-700 px-5 text-violet-700 hover:bg-violet-50"
                                onClick={() => setMobileOpen(false)}
                            >
                                My Account
                            </Link>
                        ) : (
                            <Link href="/login" onClick={() => setMobileOpen(false)}>
                                <Button variant={'outline'} className="flex h-10 cursor-pointer items-center px-5 text-violet-700 hover:bg-violet-50">
                                    Login
                                </Button>
                            </Link>
                        )}
                    </nav>
                </div>
            </header>
            <section className="min-h-[90vh] bg-gradient-to-br from-white to-violet-50 px-6 py-16">
                <div className="mx-auto max-w-5xl">
                    {/* Hero Banner */}
                    <div className="mb-12 overflow-hidden rounded-3xl shadow-xl">
                        <div className="h-56 w-full bg-violet-100 md:h-72">
                            <img
                                src="/hosp.jpg"
                                alt="Delta State Clinic"
                                className="h-full w-full object-cover"
                                style={{ objectPosition: 'center 65%' }}
                            />
                        </div>
                    </div>

                    {/* Heading & Introduction */}
                    <div className="mb-16 text-center">
                        <h1 className="text-4xl font-extrabold text-violet-700">About Delta Health</h1>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-700">
                            We're building a bridge between Delta State's communities and quality healthcare through access, technology, and trust.
                        </p>
                    </div>

                    {/* Mission + Values */}
                    <div className="mb-16 grid gap-12 md:grid-cols-2">
                        {/* Mission */}
                        <div className="flex flex-col items-center text-center md:items-start md:text-left">
                            <Sparkles className="mb-4 h-10 w-10 text-violet-600" />
                            <h2 className="mb-2 text-2xl font-semibold text-violet-700">Our Mission</h2>
                            <p className="text-gray-600">
                                To make trusted healthcare services easily available for all rural communities in Delta State through digital access
                                to information, appointments, and medical records.
                            </p>
                        </div>

                        {/* Values */}
                        <div className="flex flex-col items-center text-center md:items-start md:text-left">
                            <HeartHandshake className="mb-4 h-10 w-10 text-violet-600" />
                            <h2 className="mb-2 text-2xl font-semibold text-violet-700">Our Values</h2>
                            <ul className="list-inside list-disc space-y-1 text-left text-gray-600">
                                <li>Accessibility & Equity</li>
                                <li>Data privacy & patient trust</li>
                                <li>Community-first design</li>
                                <li>Continuous innovation</li>
                            </ul>
                        </div>
                    </div>

                    {/* Community Section */}
                    <div className="mb-16 text-center">
                        <Users className="mx-auto mb-4 h-12 w-12 text-violet-600" />
                        <h3 className="mb-2 text-xl font-semibold text-violet-700">Our Community</h3>
                        <p className="mx-auto max-w-xl text-gray-700">
                            We collaborate with local health workers, small clinics, and Delta State families to build tools that serve their real
                            needs—online or offline.
                        </p>
                    </div>

                    {/* Contact Block */}
                    <div className="rounded-2xl border-t bg-white p-6 pt-8 text-center shadow-lg">
                        <h3 className="mb-2 text-xl font-semibold text-violet-700">Contact Us</h3>
                        <p className="text-gray-700">📞 +234 906 548 4220</p>
                        <p className="text-gray-700">✉️ info@deltahealth.com</p>
                        <p className="mt-2 text-sm text-gray-500">We'd love to hear from you — patients, clinics, and partners welcome.</p>
                    </div>
                </div>
            </section>
            <footer className="mt-10 bg-gray-100 py-6 text-gray-600">
                <div className="container mx-auto text-center">
                    <p className="text-sm">© {new Date().getFullYear()} Delta Health. All rights reserved.</p>
                    <p className="mt-2 text-xs">Made with ❤ for Delta State communities</p>
                </div>
            </footer>
        </div>
    );
}
