import { useInitials } from '@/hooks/use-initials';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from './ui/button';

export default function Header({ title = 'Delta Health' }: { title?: string }) {
    const { auth, url } = usePage<SharedData>().props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const getInitials = useInitials();
    const currentUser = auth?.user || auth?.clinic || auth?.admin;
    const isLoggedIn = !!currentUser;
    console.log('INERTIA AUTH PROPS', usePage().props.auth);
    const currentPath =
        typeof window !== 'undefined' ? window.location.pathname : url || '/';
    const navLinkClass = (href: string) =>
        `${currentPath === href ? 'text-violet-700' : 'text-black hover:text-violet-600'} `;
    return (
        <>
            <Head title={title} />
            <header className="sticky top-0 z-50 flex items-center justify-between bg-white px-4 py-6 shadow-sm sm:px-8">
                <Link
                    href="/"
                    className="text-2xl font-bold tracking-wide text-violet-700 hover:text-violet-600"
                >
                    Delta Health
                </Link>
                <nav className="text-md hidden items-center gap-10 font-medium md:flex">
                    <Link href="/" className={navLinkClass('/')}>
                        Home
                    </Link>
                    <Link href="/about" className={navLinkClass('/about')}>
                        About
                    </Link>
                    <Link href="/contact" className={navLinkClass('/contact')}>
                        Contact Us
                    </Link>
                    <span className="text-gray-300">|</span>
                    <div className="flex items-center gap-4">
                        {isLoggedIn ? (
                            <>
                                {auth?.user ? (
                                    <Link href={`/dashboard/user`}>
                                        <img
                                            src={auth?.user?.avatar || ''}
                                            alt={getInitials(
                                                `${auth?.user?.firstname} ${auth?.user?.lastname}`,
                                            )}
                                            className="h-10 w-10 rounded-full border-2 border-violet-200 object-cover shadow"
                                            onError={(e) =>
                                                (e.currentTarget.src = `https://ui-avatars.com/api/?name=${getInitials(`${auth?.user?.firstname} ${auth?.user?.lastname}`)}`)
                                            }
                                        />
                                    </Link>
                                ) : auth?.clinic ? (
                                    <Link href={`/dashboard/clinic`}>
                                        <img
                                            src={auth?.clinic?.logo || ''}
                                            alt={getInitials(
                                                auth?.clinic?.name,
                                            )}
                                            className="h-10 w-10 rounded-full border-2 border-violet-200 object-cover shadow"
                                            onError={(e) =>
                                                (e.currentTarget.src = `https://ui-avatars.com/api/?name=${getInitials(auth?.clinic?.name)}`)
                                            }
                                        />
                                    </Link>
                                ) : auth?.admin ? (
                                    <Link href={`/dashboard/admin`}>
                                        <img
                                            src={auth?.admin?.logo || ''}
                                            alt={getInitials(
                                                auth?.admin?.name,
                                            )}
                                            className="h-10 w-10 rounded-full border-2 border-violet-200 object-cover shadow"
                                            onError={(e) =>
                                                (e.currentTarget.src = `https://ui-avatars.com/api/?name=${getInitials(auth?.admin?.name)}`)
                                            }
                                        />
                                    </Link>
                                ) : null}
                            </>
                        ) : (
                            <Link href="/login">
                                <Button
                                    variant={'outline'}
                                    className="flex h-10 cursor-pointer items-center bg-white px-5 text-violet-700 hover:bg-violet-50 hover:text-black"
                                >
                                    Login
                                </Button>
                            </Link>
                        )}
                    </div>
                </nav>
                <button
                    className="flex h-10 w-10 flex-col items-center justify-center focus:outline-none md:hidden"
                    aria-label="Open menu"
                    onClick={() => setMobileOpen((v) => !v)}
                >
                    <span
                        className={`mb-1 block h-0.5 w-6 bg-violet-700 transition-all ${mobileOpen ? 'translate-y-2 rotate-45' : ''}`}
                    ></span>
                    <span
                        className={`mb-1 block h-0.5 w-6 bg-violet-700 transition-all ${mobileOpen ? 'opacity-0' : ''}`}
                    ></span>
                    <span
                        className={`block h-0.5 w-6 bg-violet-700 transition-all ${mobileOpen ? '-translate-y-2 -rotate-45' : ''}`}
                    ></span>
                </button>

                <div
                    className={`fixed top-0 right-0 z-[100] h-full w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out ${
                        mobileOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                    style={{
                        boxShadow: mobileOpen
                            ? '0 0 0 9999px rgba(0,0,0,0.2)'
                            : undefined,
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
                        <Link
                            href="/"
                            className={navLinkClass('/')}
                            onClick={() => setMobileOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/about"
                            className={navLinkClass('/about')}
                            onClick={() => setMobileOpen(false)}
                        >
                            About
                        </Link>
                        <Link
                            href="/contact"
                            className={navLinkClass('/contact')}
                            onClick={() => setMobileOpen(false)}
                        >
                            Contact Us
                        </Link>
                        <hr />
                        {isLoggedIn ? (
                        <Link
                            href={auth?.user? "/dashboard/user" : "/dashboard/clinic"}
                            className="flex h-10 cursor-pointer items-center rounded-md border border-violet-700 px-5 text-violet-700 hover:bg-violet-50"
                            onClick={() => setMobileOpen(false)}
                        >
                            My Account
                        </Link>
                        ) : (
                            <Link
                                href="/login"
                                onClick={() => setMobileOpen(false)}
                            >
                                <Button
                                    variant={'outline'}
                                    className="flex h-10 cursor-pointer items-center bg-white px-5 text-violet-700 hover:bg-violet-50 hover:text-black"
                                >
                                    Login
                                </Button>
                            </Link>
                        )}
                    </nav>
                </div>
            </header>
        </>
    );
}
