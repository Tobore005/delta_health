import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';

type Article = {
    id: number;
    title: string;
    category: string;
    content: string;
};

type HealthInfoHubPageProps = {
    articles: Article[];
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard/admin' },
    { title: 'Articles', href: '/dashboard/admin/articles' },
];

export default function Article() {
    const { articles } = usePage<HealthInfoHubPageProps>().props;
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        category: '',
        content: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/dashboard/admin/articles');
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Artcles" />
            <div className="space-y-6 p-6">
                {/* Optional: Add Article Form */}
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <Input
                        name="title"
                        placeholder="Article Title"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        required
                    />

                    <Input
                        name="category"
                        placeholder="Category"
                        value={data.category}
                        onChange={(e) => setData('category', e.target.value)}
                    />

                    <textarea
                        name="content"
                        placeholder="Article Content"
                        className="w-full rounded border p-2"
                        value={data.content}
                        onChange={(e) => setData('content', e.target.value)}
                        required
                    />

                    {errors.title && (
                        <p className="text-red-500">{errors.title}</p>
                    )}

                    <Button type="submit" disabled={processing}>
                        {processing ? 'Creating...' : 'Create Article'}
                    </Button>
                </form>

                <Input
                    placeholder="Search articles..."
                    // className="max-w-md"
                    onChange={(e) =>
                        router.get(
                            '/dashboard/admin/articles',
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
