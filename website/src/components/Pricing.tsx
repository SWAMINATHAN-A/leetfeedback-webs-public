import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import GitHubIcon from "@mui/icons-material/GitHub";
import NotesIcon from "@mui/icons-material/Notes";
import StyleIcon from "@mui/icons-material/Style";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import BusinessIcon from "@mui/icons-material/Business";
import StarIcon from "@mui/icons-material/Star";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { BlurFade } from "./magicui/blur-fade";
import { TextAnimate } from "./magicui/text-animate";
import { NumberTicker } from "./magicui/number-ticker";
import { analytics } from "../utils/analytics";
import AnimatedButton from "./ui/animated-button";
import GroupsIcon from "@mui/icons-material/Groups";
import CodeIcon from "@mui/icons-material/Code";
import BugReportIcon from "@mui/icons-material/BugReport";

const Pricing: React.FC = () => {
    const plans = [
        {
            name: "Free",
            price: "₹0",
            priceValue: 0,
            period: "forever",
            description:
                "Perfect for getting started with AI-powered coding insights",
            badge: "Most Popular",
            badgeColor: "bg-muted/50 text-foreground border border-border",
            features: [
                "Up to 100 tracked submissions/month",
                "Basic mistake pattern analysis",
                "Weekly progress reports",
                "Support for 3 platforms",
                "Community support",
                "Basic analytics dashboard",
            ],
            limitations: [
                "Limited to 100 submissions/month",
                "Basic AI analysis only",
                "No export functionality",
            ],
            cta: "Start Free",
            ctaVariant: "outline" as const,
            popular: true,
        },
        {
            name: "Pro",
            price: "₹200",
            priceValue: 200,
            period: "per month",
            description:
                "Advanced analytics and unlimited tracking for serious developers",
            badge: "Best Value",
            badgeColor: "bg-muted/50 text-foreground border border-border",
            features: [
                "Everything in Free plan",
                "Unlimited tracked submissions",
                "GitHub auto-commit with AI notes",
                "Notion workspace integration",
                "Anki flashcard generation",
                "Advanced AI analysis & insights",
                "All platforms supported",
                "Priority email support",
                "Export data to CSV/PDF",
                "Custom learning goals",
            ],
            limitations: [],
            cta: "Start Pro Trial",
            ctaVariant: "default" as const,
            popular: false,
        },
        {
            name: "Teams",
            price: "₹500",
            priceValue: 500,
            period: "per month",
            description:
                "Collaborate and track progress across your entire development team",
            badge: "Enterprise",
            badgeColor: "bg-muted/50 text-foreground border border-border",
            features: [
                "Everything in Pro",
                "Up to 10 team members",
                "Shared GitHub organization repos",
                "Team Notion workspace templates",
                "Collaborative Anki decks",
                "Team analytics dashboard",
                "Admin controls & permissions",
                "Slack/Discord integrations",
                "Custom reporting",
                "Dedicated account manager",
            ],
            limitations: [],
            cta: "Contact Sales",
            ctaVariant: "outline" as const,
            popular: false,
        },
    ];

    return (
        <section
            id="pricing"
            className="py-24 bg-background border-t border-border/20"
        >
            <div className="container mx-auto px-4 md:px-8">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <BlurFade delay={0.25}>
                        <Badge className="mb-4 bg-green-500/20 text-green-400 border border-green-500/30 font-mono hover:bg-green-500/30 hover:text-green-300">
                            <AttachMoneyIcon className="w-4 h-4 mr-1" />
                            Beta Pricing
                        </Badge>
                    </BlurFade>
                    <TextAnimate
                        as="h2"
                        className="text-4xl md:text-5xl font-bold text-foreground mb-6"
                        animation="blurInUp"
                        delay={0.5}
                        by="word"
                    >
                        Choose the perfect plan for your growth
                    </TextAnimate>
                    <BlurFade delay={0.75}>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            Start free, upgrade as you scale. Every plan
                            includes our core features.
                        </p>
                    </BlurFade>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {plans.map((plan, index) => (
                        <BlurFade key={index} delay={1 + index * 0.2}>
                            <Card
                                className={`relative overflow-hidden transition-all duration-300 ${
                                    plan.popular
                                        ? "border-2 border-white/20 bg-card/50 shadow-xl scale-105"
                                        : "border border-border hover:border-white/20 hover:bg-card/30 bg-card/20"
                                }`}
                            >
                                {plan.popular && (
                                    <div className="absolute top-0 left-0 right-0 bg-foreground text-background text-center py-2 text-sm font-semibold font-mono">
                                        ⭐ Most Popular Choice
                                    </div>
                                )}

                                <CardHeader
                                    className={`space-y-4 ${plan.popular ? "pt-12" : "pt-6"}`}
                                >
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-2xl font-bold text-foreground">
                                            {plan.name}
                                        </CardTitle>
                                        <Badge className={plan.badgeColor}>
                                            {plan.badge}
                                        </Badge>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-end space-x-1">
                                            <span className="text-4xl font-bold text-foreground font-mono">
                                                {plan.price}
                                            </span>
                                            <span className="text-muted-foreground pb-1 font-mono">
                                                /{plan.period}
                                            </span>
                                        </div>
                                        <CardDescription className="text-muted-foreground">
                                            {plan.description}
                                        </CardDescription>
                                    </div>

                                    <Button
                                        variant={plan.ctaVariant}
                                        className={`w-full py-3 font-semibold ${
                                            plan.ctaVariant === "default"
                                                ? "bg-foreground text-background hover:bg-foreground/90"
                                                : "border-border hover:bg-muted/50"
                                        }`}
                                        onClick={() =>
                                            analytics.trackPricingPlanView(
                                                plan.name,
                                            )
                                        }
                                    >
                                        {plan.cta}
                                    </Button>
                                </CardHeader>

                                <CardContent className="space-y-6">
                                    {/* Features */}
                                    <div>
                                        <h4 className="font-semibold text-foreground mb-3 font-mono">
                                            What's included:
                                        </h4>
                                        <ul className="space-y-3">
                                            {plan.features.map(
                                                (feature, featureIndex) => (
                                                    <li
                                                        key={featureIndex}
                                                        className="flex items-start"
                                                    >
                                                        <CheckCircleIcon className="w-5 h-5 mr-3 text-green-400 flex-shrink-0 mt-0.5" />
                                                        <span className="text-sm text-muted-foreground">
                                                            {feature}
                                                        </span>
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    </div>

                                    {/* Limitations */}
                                    {plan.limitations.length > 0 && (
                                        <div>
                                            <h4 className="font-semibold text-foreground mb-3 font-mono">
                                                Limitations:
                                            </h4>
                                            <ul className="space-y-2">
                                                {plan.limitations.map(
                                                    (
                                                        limitation,
                                                        limitationIndex,
                                                    ) => (
                                                        <li
                                                            key={
                                                                limitationIndex
                                                            }
                                                            className="flex items-start"
                                                        >
                                                            <CloseIcon className="w-4 h-4 mr-3 text-muted-foreground flex-shrink-0 mt-0.5" />
                                                            <span className="text-sm text-muted-foreground">
                                                                {limitation}
                                                            </span>
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </BlurFade>
                    ))}
                </div>

                {/* FAQ Section */}
                <div className="bg-muted/10 border border-border rounded-lg p-8 md:p-12">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-bold text-foreground mb-4">
                            Frequently Asked Questions
                        </h3>
                        <p className="text-muted-foreground">
                            Everything you need to know about our pricing and
                            features
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            {
                                question: "Can I upgrade or downgrade anytime?",
                                answer: "Yes! You can change your plan at any time. Upgrades take effect immediately, and downgrades apply at your next billing cycle.",
                            },
                            {
                                question: "Do you offer student discounts?",
                                answer: "Absolutely! Students get 50% off Pro plans with a valid .edu email address. Contact us for verification.",
                            },
                            {
                                question: "Is my code data secure?",
                                answer: "Yes, we use enterprise-grade encryption and never store your actual code. Only anonymized patterns are analyzed.",
                            },
                            {
                                question:
                                    "What happens if I exceed the free limit?",
                                answer: "We'll notify you as you approach the limit. You can upgrade anytime or wait for the next month's reset.",
                            },
                            {
                                question: "Do you offer refunds?",
                                answer: "Yes, we offer a 30-day money-back guarantee on all paid plans. No questions asked.",
                            },
                            {
                                question: "Can I cancel anytime?",
                                answer: "Of course! Cancel anytime with one click. Your data remains accessible until your current period ends.",
                            },
                        ].map((faq, index) => (
                            <div key={index} className="space-y-3">
                                <h4 className="font-semibold text-foreground">
                                    {faq.question}
                                </h4>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Help Us Section */}
                <div className="text-center mt-16 p-8 bg-muted/10 border border-border rounded-lg">
                    <div className="flex justify-center space-x-6 mb-6">
                        <div className="w-16 h-16 bg-card/50 border border-border rounded-lg flex items-center justify-center backdrop-blur-sm">
                            <GroupsIcon className="w-8 h-8 text-foreground" />
                        </div>
                        <div className="w-16 h-16 bg-card/50 border border-border rounded-lg flex items-center justify-center backdrop-blur-sm">
                            <CodeIcon className="w-8 h-8 text-foreground" />
                        </div>
                        <div className="w-16 h-16 bg-card/50 border border-border rounded-lg flex items-center justify-center backdrop-blur-sm">
                            <BugReportIcon className="w-8 h-8 text-foreground" />
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-foreground">
                        <AutoAwesomeIcon className="w-6 h-6 mr-2 inline" />
                        Help Us Build LeetFeedback
                    </h3>
                    <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                        Actively looking for designers, developers and testers
                        to join our mission of making coding practice more
                        effective and enjoyable.
                    </p>
                    <div className="flex justify-center">
                        <AnimatedButton
                            onClick={() =>
                                (window.location.href =
                                    "mailto:catince@outlook.com")
                            }
                        >
                            Join Our Team
                        </AnimatedButton>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
