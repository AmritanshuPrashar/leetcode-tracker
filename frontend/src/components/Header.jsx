import React from "react";

const Header = () => {
    return (
        <div className="flex justify-between items-center mb-6">
            <div className="">
                <span className="text-white">Leet</span>
                <span style={{ color: '#FFA015' }}>Code</span> Dashboard
            </div>
            <button
                className="bg-transparent border-none cursor-pointer"
                onClick={() => window.location.href = "https://github.com/AmritanshuPrashar"}
            >
                <div className="flex flex-col items-center">
                    <img
                        src="./github-icon-1.png"
                        alt="GitHub"
                        className="h-10 w-10 mb-2"
                    />
                    <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit md:block">
                        View on GitHub
                    </p>
                </div>
            </button>
        </div>
    );
};

export default Header;
