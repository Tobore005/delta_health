import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-white text-white border-2 border-violet-300">
                <AppLogoIcon className="size-5 fill-current text-violet-600 dark:text-violet-600" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold text-violet-600">Delta Health</span>
            </div>
        </>
    );
}
