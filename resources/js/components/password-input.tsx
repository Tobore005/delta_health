import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import TextLink from './text-link';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
    forgotLink?: string;
    error: string | undefined;
}

export default function PasswordInput({ label, id, forgotLink, error, ...props }: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="grid gap-2 relative">
            {label && (
                <div className="flex items-center">
                    <label className="text-gray-700" htmlFor={id}>
                        {label}
                    </label>
                    {forgotLink && 
                    <TextLink href={forgotLink} className="ml-auto text-sm text-gray-600" tabIndex={5}>
                        Forgot password?
                    </TextLink>
                    }
                </div>
            )}
            <div className="relative">
                <Input
                    id={id}
                    {...props}
                    type={showPassword ? 'text' : 'password'}
                    className={`pr-10 text-black ${props.className || ''}`}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                    tabIndex={-1}
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>

            {error && <InputError message={error} />}
        </div>
    );
}
