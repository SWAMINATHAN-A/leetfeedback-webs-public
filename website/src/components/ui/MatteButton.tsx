import React from "react";

interface MatteButtonProps {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    className?: string;
    showArrow?: boolean;
}

/**
 * A matte black button that pairs with GlowyButton.
 * It picks up the ambient glow from nearby GlowyButton components.
 */
const MatteButton: React.FC<MatteButtonProps> = ({
    children,
    href,
    onClick,
    className = "",
    showArrow = true,
}) => {
    const handleClick = (e: React.MouseEvent) => {
        if (onClick) {
            e.preventDefault();
            onClick();
        }
    };

    const ButtonContent = (
        <>
            <span>{children}</span>
            {showArrow && (
                <svg
                    className="matte-button-arrow-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 17 9"
                >
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="m12.495 0 4.495 4.495-4.495 4.495-.99-.99 2.805-2.805H0v-1.4h14.31L11.505.99z"
                        clipRule="evenodd"
                    />
                </svg>
            )}
        </>
    );

    const buttonClassName = `matte-button ${className}`;

    return (
        <>
            <style>{`
                .matte-button-wrapper {
                    position: relative;
                    display: inline-flex;
                    align-items: center;
                    z-index: 10;
                }

                .matte-button {
                    position: relative;
                    z-index: 10;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 40px;
                    padding: 0 64px;
                    background: #1a1a1a;
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    border-radius: 9999px;
                    color: rgba(255, 255, 255, 0.9);
                    font-size: 12px;
                    font-weight: 700;
                    letter-spacing: -0.18px;
                    text-transform: uppercase;
                    cursor: pointer;
                    overflow: hidden;
                    text-decoration: none;
                    gap: 4px;
                    transition: all 0.3s ease;
                    /* Reflective surface effect */
                    box-shadow: 
                        inset 0 1px 0 rgba(255, 255, 255, 0.1),
                        0 2px 8px rgba(0, 0, 0, 0.3);
                }

                .matte-button:hover {
                    background: #222222;
                    border-color: rgba(255, 255, 255, 0.25);
                    box-shadow: 
                        inset 0 1px 0 rgba(255, 255, 255, 0.15),
                        0 4px 16px rgba(0, 0, 0, 0.4),
                        0 0 30px rgba(255, 137, 100, 0.15);
                }

                /* Adjacent glow reflection - when placed next to GlowyButton */
                .glowy-button-wrapper:hover ~ .matte-button-wrapper .matte-button,
                .matte-button-wrapper:has(~ .glowy-button-wrapper:hover) .matte-button {
                    box-shadow: 
                        inset 0 1px 0 rgba(255, 255, 255, 0.1),
                        0 2px 8px rgba(0, 0, 0, 0.3),
                        -20px 0 40px rgba(255, 137, 100, 0.2),
                        -10px 0 20px rgba(255, 177, 153, 0.15);
                    border-color: rgba(255, 177, 153, 0.2);
                }

                /* Glow reflection when GlowyButton is nearby and hovered */
                .matte-button.reflect-glow {
                    box-shadow: 
                        inset 0 1px 0 rgba(255, 255, 255, 0.1),
                        0 2px 8px rgba(0, 0, 0, 0.3),
                        -20px 0 40px rgba(255, 137, 100, 0.25),
                        -10px 0 20px rgba(255, 177, 153, 0.2);
                }

                .matte-button-arrow-icon {
                    width: 17px;
                    height: 9px;
                    color: rgba(255, 255, 255, 0.9);
                    transition: transform 0.2s ease;
                }

                .matte-button:hover .matte-button-arrow-icon {
                    transform: translateX(3px);
                }
            `}</style>

            <div className="matte-button-wrapper">
                {href ? (
                    <a
                        href={href}
                        className={buttonClassName}
                        onClick={onClick ? handleClick : undefined}
                    >
                        {ButtonContent}
                    </a>
                ) : (
                    <button
                        className={buttonClassName}
                        onClick={onClick}
                        type="button"
                    >
                        {ButtonContent}
                    </button>
                )}
            </div>
        </>
    );
};

export default MatteButton;
