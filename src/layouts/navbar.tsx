import React from "react";
import logo from "../assets/logo.png";
import logoWhite from "../assets/logo-white.png";

interface SubItem {
    name: string;
    path: string;
    subItems?: { name: string; path: string }[];
}

interface NavLinkItem {
    name: string;
    path: string;
    dropdown?: SubItem[];
}

const Navbar = () => {
    const leftLinks: NavLinkItem[] = [
        {
            name: "DISCOVER AIMS",
            path: "#",
            dropdown: [
                { name: "Campus & Infrastructure", path: "#" },
                { name: "Administration", path: "#" },
                {
                    name: "About Overview",
                    path: "#",
                    subItems: [
                        { name: "Leadership & Vision", path: "#" },
                        { name: "Accreditations", path: "#" },
                    ],
                },
            ],
        },
        {
            name: "ACADEMICS",
            path: "#",
            dropdown: [
                {
                    name: "Programs Offered",
                    path: "#",
                    subItems: [
                        { name: "Undergraduate (MBBS)", path: "#" },
                        { name: "Postgraduate (MD/MS)", path: "#" },
                        { name: "Nursing & Allied Sciences", path: "#" },
                    ],
                },
                { name: "Admissions Process", path: "#" },
                { name: "Academic Calendar", path: "#" },
            ],
        },
    ];

    const rightLinks: NavLinkItem[] = [
        {
            name: "MEDICAL SERVICES",
            path: "#",
            dropdown: [
                {
                    name: "Departments",
                    path: "#",
                    subItems: [
                        { name: "Cardiology", path: "#" },
                        { name: "Neurology", path: "#" },
                        { name: "General Surgery", path: "#" },
                    ],
                },
                { name: "Emergency & Trauma", path: "#" },
                { name: "Diagnostics & Imaging", path: "#" },
            ],
        },
        {
            name: "HEALTH LIBRARY",
            path: "#",
            dropdown: [
                {
                    name: "Clinical Research",
                    path: "#",
                    subItems: [
                        { name: "Medical Journals", path: "#" },
                        { name: "Research Ethics", path: "#" },
                    ],
                },
                { name: "Patient Education", path: "#" },
                { name: "Health Bulletins", path: "#" },
            ],
        },
    ];

    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            const scrollPos = window.scrollY || document.documentElement.scrollTop;
            setIsScrolled(scrollPos > 10);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isWhiteBg = isScrolled || isHovered;

    const ChevronDown = () => (
        <svg
            className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
    );

    const ChevronRight = () => (
        <svg
            className="w-3.5 h-3.5 ml-auto text-gray-400 group-hover/sub:text-gray-900 transition-colors"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
    );

    const renderDesktopNavItem = (link: NavLinkItem, idx: number) => (
        <div key={idx} className="relative group h-full flex items-center">
            {/* Top Bar Item */}
            <a
                href={link.path}
                className={`flex items-center gap-1.5 py-4 transition-colors duration-200 font-semibold tracking-wider ${
                    isWhiteBg ? "hover:text-black text-gray-800" : "hover:text-white/80 text-white"
                }`}
            >
                <span>{link.name}</span>
                <ChevronDown />
            </a>

            {/* Level 1 Dropdown - Flush to bottom edge */}
            {link.dropdown && (
                <div className="absolute left-0 top-full hidden group-hover:block w-60 z-50 animate-fadeIn">
                    <div className="bg-white rounded-b-lg shadow-xl border-x border-b border-gray-100 py-2">
                        {link.dropdown.map((item, itemIdx) => (
                            <div key={itemIdx} className="relative group/sub">
                                <a
                                    href={item.path}
                                    className="flex items-center justify-between px-5 py-3 text-xs text-gray-700 hover:bg-gray-50 hover:text-black font-medium transition-colors"
                                >
                                    <span>{item.name}</span>
                                    {item.subItems && <ChevronRight />}
                                </a>

                                {/* Level 2 Dropdown - Magnetically Snapped to Edge with zero gaps */}
                                {item.subItems && (
                                    <div className="absolute left-full top-0 hidden group-hover/sub:block w-56 z-50 animate-fadeIn">
                                        <div className="bg-white rounded-r-lg rounded-b-lg shadow-xl border border-gray-100 py-2 -ml-[1px]">
                                            {item.subItems.map((sub, subIdx) => (
                                                <a
                                                    key={subIdx}
                                                    href={sub.path}
                                                    className="block px-5 py-2.5 text-xs text-gray-700 hover:bg-gray-50 hover:text-black font-medium transition-colors"
                                                >
                                                    {sub.name}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <>
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(2px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.15s ease-out forwards;
                }
            `}</style>

            <nav
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`fixed top-0 left-0 w-full px-6 md:px-12 lg:px-20 font-['Inter',sans-serif] transition-all duration-300 z-50 ${
                    isWhiteBg
                        ? "bg-white shadow-md text-gray-900"
                        : "bg-transparent text-white"
                }`}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between sm:justify-center">
                    {/* Left Desktop Links */}
                    <div className="hidden md:flex items-center gap-8 text-xs lg:text-sm h-16">
                        {leftLinks.map(renderDesktopNavItem)}
                    </div>

                    {/* Center Logo */}
                    <a href="/" className="flex items-center justify-center mx-10 py-3">
                        <img
                            src={isWhiteBg ? logo : logoWhite}
                            alt="Arundathi Institute of Medical Sciences & Hospital"
                            className="h-10 md:h-12 w-auto object-contain transition-opacity duration-300"
                        />
                    </a>

                    {/* Right Desktop Links */}
                    <div className="hidden md:flex items-center gap-8 text-xs lg:text-sm h-16">
                        {rightLinks.map(renderDesktopNavItem)}
                    </div>

                    {/* Mobile Menu Toggle Button */}
                    <div className="flex md:hidden py-4">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`p-1.5 rounded-md focus:outline-none ${
                                isWhiteBg ? "text-gray-900" : "text-white"
                            }`}
                            aria-label="Toggle Menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <line x1="4" y1="6" x2="20" y2="6" />
                                <line x1="4" y1="12" x2="20" y2="12" />
                                <line x1="4" y1="18" x2="20" y2="18" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Drawer */}
                <div
                    className={`fixed top-0 left-0 w-full h-screen bg-white text-gray-900 flex flex-col justify-start items-start px-8 pt-20 gap-6 text-sm font-semibold tracking-wide transition-transform duration-300 md:hidden overflow-y-auto ${
                        isMenuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
                >
                    <button
                        aria-label="Close menu"
                        className="absolute top-6 right-6 p-2 text-gray-800"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>

                    {[...leftLinks, ...rightLinks].map((link, idx) => (
                        <div key={idx} className="w-full flex flex-col gap-2">
                            <span className="text-gray-900 font-bold border-b pb-1">
                                {link.name}
                            </span>
                            <div className="pl-2 flex flex-col gap-2">
                                {link.dropdown?.map((item, itemIdx) => (
                                    <div key={itemIdx} className="flex flex-col gap-1">
                                        <span className="text-xs font-semibold text-gray-800">
                                            {item.name}
                                        </span>
                                        {item.subItems && (
                                            <div className="pl-3 border-l border-gray-200 flex flex-col gap-1">
                                                {item.subItems.map((sub, subIdx) => (
                                                    <a
                                                        key={subIdx}
                                                        href={sub.path}
                                                        onClick={() => setIsMenuOpen(false)}
                                                        className="text-gray-600 hover:text-black text-xs font-normal py-0.5"
                                                    >
                                                        {sub.name}
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </nav>
        </>
    );
};

export default Navbar;