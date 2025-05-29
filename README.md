# LeetFeedback - AI-Powered DSA Practice Analytics

A Chrome extension that tracks your coding practice sessions on platforms like LeetCode, GeeksforGeeks, and other DSA platforms, providing intelligent feedback and performance insights through advanced AI analysis.

## 🚀 Features

### Core Functionality
- **Practice Session Tracking**: Automatically tracks every "Run" click on supported DSA platforms
- **Solution Analysis**: Captures and analyzes your code submissions when you solve problems correctly
- **AI-Powered Feedback**: Provides precise, actionable feedback on your coding patterns and mistakes
- **Performance Insights**: Detailed analytics on your problem-solving journey
- **Multi-Platform Support**: Works across LeetCode, GeeksforGeeks, HackerRank, and more

### Key Benefits
- **Identify Patterns**: Understand recurring mistakes in your coding approach
- **Improve Efficiency**: Get suggestions to optimize your problem-solving strategy
- **Track Progress**: Monitor improvement over time with detailed metrics
- **Personalized Learning**: Receive tailored recommendations based on your coding style

## 🎯 Supported Platforms

- ✅ LeetCode
- ✅ GeeksforGeeks (GFG)
- ✅ HackerRank
- ✅ CodeChef
- ✅ Codeforces
- 🔄 More platforms coming soon...

## 📥 Installation

### From Chrome Web Store
1. Visit the [Chrome Web Store](link-to-store)
2. Click "Add to Chrome"
3. Confirm installation
4. Pin the extension for easy access

### Manual Installation (Development)
1. Clone this repository
```bash
git clone https://github.com/your-username/leetfeedback.git
cd leetfeedback
```

2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension directory
5. The extension should now appear in your toolbar

## 🔧 Setup

1. **Install the Extension**: Follow installation steps above
2. **Create Account**: Sign up on our [website](your-website-url) to access analytics
3. **Configure Settings**: Set your preferences in the extension popup
4. **Start Coding**: Begin practicing on any supported platform

## 💡 How It Works

### 1. Session Tracking
- Automatically detects when you're on a supported coding platform
- Tracks every "Run" button click to monitor your debugging iterations
- Records problem metadata (difficulty, topic, language used)

### 2. Solution Capture
- Captures your final solution when you successfully submit
- Stores code along with performance metrics (runtime, memory usage)
- Maintains privacy - all data is encrypted and anonymized

### 3. AI Analysis
- Analyzes patterns across your coding sessions
- Identifies common mistakes and inefficiencies
- Generates personalized feedback using advanced LLM APIs
- Provides actionable suggestions for improvement

### 4. Insights Dashboard
- View detailed analytics on our web platform
- Track progress over time with interactive charts
- Get weekly/monthly performance summaries
- Export data for personal analysis

## 🛡️ Privacy & Security

- **Data Encryption**: All captured data is encrypted before transmission
- **Anonymization**: Personal identifiers are removed from code analysis
- **Opt-out Anytime**: Full control over data collection and retention
- **Local Storage**: Sensitive data stored locally when possible
- **GDPR Compliant**: Full compliance with data protection regulations

## 🔍 Analytics Features

### Performance Metrics
- Average attempts per problem
- Time to solution distribution
- Most challenging problem types
- Language-specific performance

### Learning Insights
- Common syntax errors and patterns
- Algorithm efficiency improvements
- Problem-solving approach analysis
- Personalized study recommendations

### Progress Tracking
- Weekly/monthly solving statistics
- Difficulty progression over time
- Topic mastery indicators
- Consistency metrics

## 🌐 Web Platform

Access your detailed analytics at [website-url]:

- **Dashboard**: Overview of your coding journey
- **Analytics**: Deep dive into performance metrics
- **Recommendations**: AI-generated improvement suggestions
- **Progress Reports**: Exportable progress summaries
- **Community**: Compare anonymous stats with other users

## 🛠️ Development

### Prerequisites
- Node.js 16+
- Chrome/Chromium browser
- Git

### Local Development
```bash
# Clone repository
git clone https://github.com/your-username/leetfeedback.git
cd leetfeedback

# Install dependencies
npm install

# Build extension
npm run build

# Watch mode for development
npm run dev
```

### Project Structure
```
leetfeedback/
├── src/
│   ├── content/          # Content scripts for each platform
│   ├── background/       # Service worker and background logic
│   ├── popup/           # Extension popup interface
│   ├── options/         # Settings and configuration
│   └── shared/          # Shared utilities and constants
├── assets/              # Icons and static assets
├── manifest.json        # Extension manifest
└── dist/               # Built extension files
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

- **Documentation**: [docs.leetfeedback.com](docs-url)
- **Issues**: [GitHub Issues](github-issues-url)
- **Email**: support@leetfeedback.com
- **Discord**: [Join our community](discord-url)

## 🗺️ Roadmap

### Q1 2024
- [ ] Advanced code quality analysis
- [ ] Integration with more platforms
- [ ] Mobile app companion
- [ ] Team/organization features

### Q2 2024
- [ ] AI-powered problem recommendations
- [ ] Code review automation
- [ ] Performance benchmarking
- [ ] Advanced visualization tools

## 📈 Pricing

- **Free Tier**: Basic tracking and analysis (up to 100 submissions/month)
- **Pro**: Advanced analytics and unlimited tracking ($9.99/month)
- **Teams**: Organization features and team analytics ($29.99/month)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to all the DSA platforms for providing excellent practice environments
- Special thanks to our beta testers and the coding community
- Built with love for developers, by developers

---

**Start improving your coding skills today!** 🚀

[Download Extension](store-url) | [Visit Website](website-url) | [View Analytics Demo](demo-url)