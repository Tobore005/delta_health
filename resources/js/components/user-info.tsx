import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';

interface UserLike {
    firstname?: string;
    lastname?: string;
    name?: string;
    email?: string;
    avatar?: string;
}

export function UserInfo({ user, showEmail = false }: { user: UserLike; showEmail?: boolean }) {
    const getInitials = useInitials();

    // Support both user (firstname + lastname) and clinic (name)
    const displayName =
        user?.firstname || user?.lastname
            ? `${user.firstname ?? ''} ${user.lastname ?? ''}`.trim()
            : user?.name || 'Unknown';

    const initials = getInitials(displayName);
    console.log( "Logged in", user)

    return (
        <>
            <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                <AvatarImage src={user?.avatar} alt={displayName} />
                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                    {initials}
                </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{displayName}</span>
                {showEmail && user?.email && (
                    <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                )}
            </div>
        </>
    );
}
