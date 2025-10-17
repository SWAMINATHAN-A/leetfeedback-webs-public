import React from "react";
import { Skiper58 } from "./ui/skiper-ui/skiper58";

const Footer: React.FC = () => {
    return (
        <footer className="mt-24">
            <div className="container mx-auto px-4 md:px-8">
                {/* Separator */}
                <div className="border-t border-border mb-12"></div>
                
                {/* Skiper58 Footer Component */}
                <div className="mb-12">
                    <Skiper58 />
                </div>

                {/* Copyright */}
                <div className="text-left pb-8">
                    <p className="text-muted-foreground text-sm font-mono">
                        © 2025 LeetFeedback. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
