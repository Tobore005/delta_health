import { useCallback } from 'react';

export function useInitials() {
    return useCallback((user: { firstname?: string; lastname?: string; name?: string } | string | undefined): string => {
        if (!user) return '';
        if (typeof user === 'string') {
            const names = user.trim().split(' ');
            if (names.length === 0) return '';
            if (names.length === 1) return names[0].charAt(0).toUpperCase();
            return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase();
        }
        const { firstname, lastname, name } = user;
        if (firstname || lastname) {
            return `${(firstname?.charAt(0) || '')}${(lastname?.charAt(0) || '')}`.toUpperCase();
        }
        if (name) {
            const names = name.trim().split(' ');
            if (names.length === 0) return '';
            if (names.length === 1) return names[0].charAt(0).toUpperCase();
            return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase();
        }
        return '';
    }, []);
}
