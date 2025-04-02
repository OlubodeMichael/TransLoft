import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LogoText from '@/app/_components/LogoText';

export default function SideMenu({ menuItems, isMobileMenuOpen, user, handleLogout }) {
    const pathname = usePathname();
    
    const isLinkActive = (href) => {
        if (href === '/shipments' && pathname === '/shipments') {
            return true;
        }

        if (href !== '/shipments') {
            const pathSegments = pathname.split('/').filter(Boolean);
            const itemSegments = href.split('/').filter(Boolean);
            
            if (pathSegments.length >= itemSegments.length) {
                return itemSegments.every((segment, index) => 
                    segment === pathSegments[index]
                );
            }
        }
        return false;
    };

    return (
        <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-200 ease-in-out`}>
            <div className="h-full flex flex-col">
                {/* Logo */}
                <div className="flex-shrink-0 px-4 py-4 border-b border-gray-200">
                    <LogoText />
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                                isLinkActive(item.href)
                                    ? 'bg-blue-50 text-blue-700'
                                    : 'text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            <span className={`mr-3 h-5 w-5 ${
                                isLinkActive(item.href)
                                    ? 'text-blue-500'
                                    : 'text-gray-400 group-hover:text-gray-500'
                            }`}>
                                {item.icon}
                            </span>
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Logout button */}
                <div className="flex-shrink-0 border-t border-gray-200 p-4">
                    <div className="px-4 py-4">
                        <p className="text-sm font-medium text-gray-900">Welcome back</p>
                        <p className="text-sm text-gray-500 truncate">{user?.data?.doc?.email}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="group flex items-center w-full px-2 py-2 text-sm font-medium text-red-500 rounded-md hover:bg-gray-50"
                    >
                        <svg className="mr-3 h-5 w-5 text-red-400 group-hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}