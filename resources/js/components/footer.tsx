export default function Footer() {
    return (
        <footer className="mt-10 bg-gray-100 py-6 text-gray-600">
            <div className="container mx-auto text-center">
                <p className="text-sm">© {new Date().getFullYear()} Delta Health. All rights reserved.</p>
                <p className="mt-2 text-xs">Made with ❤ for Delta State communities</p>
            </div>
        </footer>
    );
}
