import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="">
            <div className="container mx-auto px-4 md:px-8 py-16">
                {/* Bottom Footer */}
                <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
                    <div className="text-muted-foreground text-sm mb-4 md:mb-0 font-mono">
                        © 2025 Traverse. All rights reserved.
                    </div>
                    <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
                        <a
                            href="/privacy"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="/terms"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Terms of Service
                        </a>
                        <a
                            href="#"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Cookie Policy
                        </a>
                        <a
                            href="#"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Security
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
