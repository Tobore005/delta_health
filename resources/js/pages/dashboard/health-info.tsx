import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SharedData } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';

type Article = {
    id: number;
    title: string;
    category: string;
    content: string;
};

type HealthInfoHubPageProps = {
    articles: Article[];
};


export default function HealthInfoHub() {
    const { articles } = usePage<HealthInfoHubPageProps>().props;
    const { auth } = usePage<SharedData>().props;
    
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: (auth.clinic ? '/dashboard/clinic' : '/dashboard/user') },
        { title: 'Health Info Hub', href: '/dashboard/health-info' },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Health Info Hub" />
            <div className="space-y-6 p-6">
                <Input
                    placeholder="Search articles..."
                    className="max-w-md"
                    onChange={(e) =>
                        router.get(
                            '/dashboard/health-info',
                            { search: e.target.value },
                            { preserveState: true },
                        )
                    }
                />

                <div className="grid gap-6 md:grid-cols-2">
                    {articles.length > 0 ? (
                        articles.map((a: Article) => (
                            <Card key={a.id}>
                                <CardHeader>
                                    <CardTitle>{a.title}</CardTitle>
                                    <p className="text-sm text-muted-foreground">
                                        {a.category}
                                    </p>
                                </CardHeader>
                                <CardContent>{a.content}</CardContent>
                            </Card>
                        ))
                    ) : (
                        <p className="text-gray-500">No Articles Yet</p>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
