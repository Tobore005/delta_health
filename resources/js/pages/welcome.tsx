import Footer from '@/components/footer';
import Header from '@/components/header';
import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const currentUser = auth?.user || auth?.clinic;
    const isLoggedIn = !!currentUser
    console.log("Logged In", isLoggedIn)

    const services = [
        {
            title: 'Book Appointments',
            icon: '📅',
            description: 'Quickly schedule medical appointments with local clinics around Delta State.',
        },
        {
            title: 'Find Nearby Clinics',
            icon: '📍',
            description: 'Browse a directory of clinics with contact info and services offered.',
        },
        {
            title: 'SMS Reminders',
            icon: '🔔',
            description: 'Get notified via text message so you never miss an appointment.',
        },
        {
            title: 'Health Information',
            icon: '📖',
            description: 'Learn from verified articles, FAQs, and medical tips.',
        },
        {
            title: 'Clinic Services Overview',
            icon: '🩺',
            description: 'Know the services each clinic offers before making a booking.',
        },
        {
            title: 'Mobile Friendly',
            icon: '📱',
            description: 'Optimized for low-end devices, easily accessible from anywhere.',
        },
    ];

    return (
        <>
            <Header />
            <div className="flex min-h-screen flex-col bg-gradient-to-br from-white to-violet-50">
                <Head title="Welcome">
                    <link rel="preconnect" href="https://fonts.bunny.net" />
                    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
                </Head>

                <section className="flex flex-col items-center justify-center bg-gradient-to-br py-8 sm:py-12">
                    <div className="container mx-auto px-2 sm:px-4 lg:px-6 xl:px-8">
                        <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-8">
                            <div className="mx-auto w-full max-w-xl space-y-6 text-center lg:mx-0 lg:text-left">
                                <div className="flex flex-wrap gap-3">
                                    <span className="rounded-full bg-green-100 px-4 py-1 text-xs font-semibold text-green-700">
                                        ✔ Book Appointments
                                    </span>
                                    <span className="rounded-full bg-blue-100 px-4 py-1 text-xs font-semibold text-blue-700">
                                        ✔ Trusted Health Info
                                    </span>
                                </div>
                                <h1 className="text-3xl leading-tight font-bold text-black sm:text-4xl lg:text-5xl">
                                    Bringing<span className="text-violet-700"> Healthcare </span>
                                    Closer to <span className="text-violet-700">Delta State </span>
                                    Communities
                                </h1>
                                <p className="mx-auto max-w-md text-gray-600 lg:mx-0">
                                    This platform helps residents in Delta State access verified health information, find clinics nearby, and book
                                    appointments—all from their phone.
                                </p>
                                <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                                    <button
                                        onClick={() => {
                                            if (isLoggedIn) {
                                                if(auth?.clinic) {
                                                    window.location.href = '/dashboard/clinic/appointments';
                                                }
                                                if(auth?.user) {
                                                    window.location.href = '/dashboard/user/appointments';
                                                }
                                            } else {
                                                window.location.href = '/login';
                                            }
                                        }}
                                        className="cursor-pointer rounded-lg bg-violet-600 px-6 py-3 text-sm text-white shadow hover:bg-violet-700"
                                    >
                                        Book Appointment
                                    </button>

                                    <a href="/contact" className="self-center text-sm text-violet-700 underline">
                                        Emergency? Contact us
                                    </a>
                                </div>
                                <div className="mt-6 text-sm">
                                    <p className="font-medium text-gray-700">📞 Call Us</p>
                                    <p className="text-lg font-semibold text-violet-700">+234 906 548 4220</p>
                                </div>
                            </div>

                            <div className="mx-auto grid w-full max-w-md grid-cols-2 gap-3 sm:gap-4 lg:mx-0 lg:max-w-none">
                                <img src="./dentist.jpg" alt="Clinic Visit" className="h-32 w-full rounded-xl object-cover shadow-md sm:h-48" />
                                <img src="./clinicvisit.jpeg" alt="Hospital Bed" className="h-32 w-full rounded-xl object-cover shadow-md sm:h-48" />
                                <img
                                    src="./smiling.jpg"
                                    alt="Smiling Doctor"
                                    className="col-span-2 h-80 w-full rounded-xl object-cover shadow-md sm:h-80"
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full bg-white py-12">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-3">
                            <div className="flex min-h-[140px] w-full flex-col items-center justify-center rounded-2xl bg-violet-50 p-8 shadow-lg">
                                <span className="text-3xl font-bold text-violet-700">100+</span>
                                <span className="mt-3 text-base font-medium text-gray-700">Users</span>
                            </div>
                            <div className="flex min-h-[140px] w-full flex-col items-center justify-center rounded-2xl bg-violet-50 p-8 shadow-lg">
                                <span className="text-3xl font-bold text-violet-700">200+</span>
                                <span className="mt-3 text-base font-medium text-gray-700">Clinics</span>
                            </div>
                            <div className="flex min-h-[140px] w-full flex-col items-center justify-center rounded-2xl bg-violet-50 p-8 shadow-lg">
                                <span className="text-3xl font-bold text-violet-700">100+</span>
                                <span className="mt-3 text-base font-medium text-gray-700">Medical Articles</span>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-gradient-to-br from-white to-violet-50 px-8 py-16">
                    <h1 className="mb-6 text-center text-3xl font-bold lg:text-4xl">Our Services</h1>
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {services.map((service, index) => (
                            <div key={index} className="rounded-lg bg-white p-6 shadow transition-shadow duration-200 hover:shadow-lg">
                                <div className="mb-2 flex items-center gap-2 text-xl font-semibold text-black">
                                    {service.icon} {service.title}
                                </div>
                                <p className="text-gray-600">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
                <Footer />
            </div>
        </>
    );
}
