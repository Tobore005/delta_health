import React from 'react';
import Header from '@/components/header';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Footer from '@/components/footer';
import { router } from '@inertiajs/react';
import Map from '@/components/map';
import { Clinic } from '@/types/data';

interface ContactUsProps {
    clinics: Clinic[]; // Replace 'unknown' with the actual type if known, e.g. Clinic[]
}

export default function ContactUs({clinics}: ContactUsProps) {
    const [form, setForm] = React.useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [submitted, setSubmitted] = React.useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        router.post(
            '/contact-message',
            form,
            {
                onSuccess: () => setSubmitted(true),
                onError: (errs) => setErrors(errs),
                preserveScroll: true,
            }
        );
    };

    console.log("clin", clinics)

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-violet-50">
            <Header title="Contact Us" />
            <div className="flex flex-1 items-center justify-center">
                <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
                    <img
                        src="/dentist.jpg"
                        alt="Doctor"
                        className="mx-auto mb-4 h-32 w-32 rounded-full object-cover shadow-md border-4 border-violet-100"
                    />
                    <h2 className="mb-2 text-center text-2xl font-bold text-violet-700">Contact Us</h2>
                    <p className="mb-2 text-center text-gray-500">We'd love to hear from you! Fill out the form below.</p>
                    <div className="mb-6 text-center text-sm text-gray-700">
                        <div className="font-semibold">Contact Information</div>
                        <div>Email: <a href="mailto:info@deltahealth.com" className="text-violet-700 underline">info@deltahealth.com</a></div>
                        <div>Phone: <a href="tel:+2349065484220" className="text-violet-700 underline">+234 906 548 4220</a></div>
                        <div>Address: Delta State, Nigeria</div>
                    </div>
                    {submitted ? (
                        <div className="text-center text-green-600 font-semibold">Thank you for reaching out! We'll get back to you soon.</div>
                    ) : (
                        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                            <div className="grid gap-2">
                                <Label className="text-gray-600" htmlFor="name">Name</Label>
                                <Input id="name" name="name" required placeholder="Your name" value={form.name} onChange={handleChange} />
                                <InputError message={errors['name']} />
                            </div>
                            <div className="grid gap-2">
                                <Label className="text-gray-600" htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" required placeholder="Your email" value={form.email} onChange={handleChange} />
                                <InputError message={errors['email']} />
                            </div>
                            <div className="grid gap-2">
                                <Label className="text-gray-600" htmlFor="message">Message</Label>
                                <textarea id="message" name="message" required rows={5} className="rounded-md border border-gray-300 p-2 focus:border-violet-500 focus:ring-violet-500" placeholder="Type your message..." value={form.message} onChange={handleChange} />
                                <InputError message={errors['message']} />
                            </div>
                            <Button type="submit" className="mt-2 w-full bg-violet-700 text-white hover:bg-violet-800">Send Message</Button>
                        </form>
                    )}
                </div>
            </div>
            <div className='mt-5'>
                <Map regClinics={clinics} />
            </div>
            <Footer />
        </div>
    );
}
