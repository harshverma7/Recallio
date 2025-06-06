import { useState, useEffect } from "react";
import { Logo } from "../common/Logo";

interface LandingPageProps {
  onGetStarted: () => void;
  onSignIn: () => void;
}

export function LandingPage({ onGetStarted, onSignIn }: LandingPageProps) {
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12 md:py-6 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <Logo />
            </div>
            <span className="text-xl font-semibold text-black">Recallio</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onSignIn}
              className="text-gray-600 hover:text-black text-sm font-medium transition-colors duration-200"
            >
              Sign In
            </button>
            <button
              onClick={onGetStarted}
              className="bg-black hover:bg-gray-800 text-white text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 hover:scale-105"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-24 md:px-12 md:py-32 bg-gradient-to-b from-white via-gray-50/30 to-white min-h-screen flex items-center">
        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-gray-100 rounded-full opacity-20 animate-pulse"></div>
          <div
            className="absolute bottom-20 right-10 w-80 h-80 bg-gray-100 rounded-full opacity-15 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/4 w-4 h-4 bg-gray-400 rounded-full opacity-40 animate-bounce"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute top-1/3 right-1/3 w-6 h-6 bg-gray-400 rounded-full opacity-30 animate-bounce"
            style={{ animationDelay: "1.5s" }}
          ></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium mb-8 animate-fade-in">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Join 10,000+ users organizing their digital life</span>
          </div>

          <h1
            className="text-6xl md:text-8xl font-bold tracking-tight mb-8 text-black animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Your digital life.
            <br />
            <span className="bg-gradient-to-r from-gray-600 via-gray-800 to-black bg-clip-text text-transparent">
              Beautifully organized.
            </span>
          </h1>

          <p
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            Save, organize, and rediscover everything that matters to you. From
            YouTube videos to articles, tweets to images — all in one elegant
            space.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            <button
              onClick={onGetStarted}
              onMouseEnter={() => setIsHovered("primary")}
              onMouseLeave={() => setIsHovered(null)}
              className="group relative bg-black hover:bg-gray-800 text-white text-lg font-medium px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 min-w-[200px] shadow-lg hover:shadow-xl"
            >
              <span className="relative z-10">Start collecting</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <button
              onClick={onSignIn}
              onMouseEnter={() => setIsHovered("secondary")}
              onMouseLeave={() => setIsHovered(null)}
              className="text-gray-900 text-lg font-medium px-8 py-4 rounded-full border-2 border-gray-300 hover:border-gray-900 hover:bg-gray-50 transition-all duration-300 min-w-[200px] hover:scale-105"
            >
              I have an account
            </button>
          </div>

          {/* Stats Section */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto mb-16 animate-fade-in-up"
            style={{ animationDelay: "0.8s" }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-black mb-2">10K+</div>
              <div className="text-gray-600 text-sm">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-black mb-2">1M+</div>
              <div className="text-gray-600 text-sm">Items Saved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-black mb-2">99.9%</div>
              <div className="text-gray-600 text-sm">Uptime</div>
            </div>
          </div>

          {/* Feature Preview - Enhanced */}
          <div
            className="relative animate-fade-in-up"
            style={{ animationDelay: "1s" }}
          >
            <div className="relative mx-auto max-w-5xl">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200/20 to-gray-300/20 blur-3xl rounded-3xl"></div>
              <div className="relative bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl p-1 shadow-2xl hover:shadow-3xl transition-shadow duration-500">
                <div className="bg-white rounded-2xl p-8 border border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* YouTube Card Preview */}
                    <div className="group bg-red-50 border border-red-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                      <div className="w-full h-28 bg-red-100 rounded-xl mb-4 flex items-center justify-center group-hover:bg-red-200 transition-colors duration-300">
                        <svg
                          className="w-10 h-10 text-red-600 group-hover:scale-110 transition-transform duration-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                      </div>
                      <h3 className="text-gray-900 text-lg font-semibold mb-2">
                        YouTube Videos
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Save and organize your favorite videos
                      </p>
                      <div className="mt-4 flex items-center text-xs text-gray-500">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                        3.2K videos saved
                      </div>
                    </div>

                    {/* Article Card Preview */}
                    <div className="group bg-blue-50 border border-blue-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                      <div className="w-full h-28 bg-blue-100 rounded-xl mb-4 flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                        <svg
                          className="w-10 h-10 text-blue-600 group-hover:scale-110 transition-transform duration-300"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <h3 className="text-gray-900 text-lg font-semibold mb-2">
                        Articles
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Keep track of great reads
                      </p>
                      <div className="mt-4 flex items-center text-xs text-gray-500">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        1.8K articles saved
                      </div>
                    </div>

                    {/* Twitter Card Preview */}
                    <div className="group bg-sky-50 border border-sky-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                      <div className="w-full h-28 bg-sky-100 rounded-xl mb-4 flex items-center justify-center group-hover:bg-sky-200 transition-colors duration-300">
                        <svg
                          className="w-10 h-10 text-sky-600 group-hover:scale-110 transition-transform duration-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </div>
                      <h3 className="text-gray-900 text-lg font-semibold mb-2">
                        Social Posts
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Never lose important tweets
                      </p>
                      <div className="mt-4 flex items-center text-xs text-gray-500">
                        <div className="w-2 h-2 bg-sky-500 rounded-full mr-2"></div>
                        892 posts saved
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced */}
      <section className="relative px-6 py-20 md:px-12 md:py-32 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-center mb-6 text-black">
              Everything you need.
              <br />
              <span className="text-gray-600">Nothing you don't.</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built for productivity enthusiasts who want to organize their
              digital life without the complexity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🎯",
                title: "Smart Organization",
                description:
                  "AI-powered categorization automatically sorts your content by type, date, and relevance.",
                highlight: "Save 5+ hours weekly",
              },
              {
                icon: "⚡",
                title: "Lightning Fast",
                description:
                  "Add content with a single click. Browser extension and mobile apps for instant saving.",
                highlight: "< 0.5s save time",
              },
              {
                icon: "🔒",
                title: "Privacy First",
                description:
                  "End-to-end encryption. Your data stays yours. No ads, no tracking, no data selling.",
                highlight: "Bank-level security",
              },
              {
                icon: "🌐",
                title: "Universal Support",
                description:
                  "Works with 50+ platforms including YouTube, Twitter, Medium, Reddit, and more.",
                highlight: "50+ integrations",
              },
              {
                icon: "📱",
                title: "Cross-Platform",
                description:
                  "Seamless sync across all devices. Web, mobile, and desktop apps available.",
                highlight: "Real-time sync",
              },
              {
                icon: "🚀",
                title: "Export Freedom",
                description:
                  "Your data, your way. Export to any format, integrate with existing tools.",
                highlight: "No vendor lock-in",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-white border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-500 hover:transform hover:scale-105 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-gray-100 to-transparent rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-black group-hover:text-gray-800 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {feature.description}
                </p>
                <div className="inline-flex items-center text-sm font-semibold text-black bg-gray-100 px-3 py-1 rounded-full">
                  {feature.highlight}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="relative px-6 py-20 md:px-12 md:py-32 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            Loved by thousands of users
          </h2>
          <p className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto">
            Join a community of productive people who've transformed how they
            save and organize digital content.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                name: "Sarah Chen",
                role: "Product Designer",
                avatar: "SC",
                text: "Recallio has completely changed how I research. I can find that article I saved 3 months ago in seconds.",
                rating: 5,
              },
              {
                name: "Marcus Rodriguez",
                role: "Content Creator",
                avatar: "MR",
                text: "The YouTube integration is perfect. I save videos for inspiration and Recallio keeps everything organized by topic.",
                rating: 5,
              },
              {
                name: "Emily Watson",
                role: "Researcher",
                avatar: "EW",
                text: "Finally, a tool that gets it right. Clean, fast, and actually helps me stay organized without getting in the way.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-semibold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-black">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="relative px-6 py-20 md:px-12 md:py-32 bg-gradient-to-b from-white to-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-black">
            Ready to get
            <br />
            <span className="text-gray-600">organized?</span>
          </h2>

          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Join thousands of users who have transformed how they save and
            organize their digital content. Start free, upgrade when you're
            ready.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button
              onClick={onGetStarted}
              className="group relative bg-black hover:bg-gray-800 text-white text-xl font-semibold px-10 py-5 rounded-full transition-all duration-300 transform hover:scale-105 min-w-[220px] shadow-xl hover:shadow-2xl"
            >
              <span className="relative z-10">Start Free Today</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <button
              onClick={onSignIn}
              className="text-gray-900 text-xl font-semibold px-10 py-5 rounded-full border-2 border-gray-300 hover:border-gray-900 hover:bg-gray-50 transition-all duration-300 min-w-[220px] hover:scale-105"
            >
              Sign In
            </button>
          </div>

          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <svg
                className="w-4 h-4 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Free forever plan</span>
            </div>
            <div className="flex items-center gap-1">
              <svg
                className="w-4 h-4 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-1">
              <svg
                className="w-4 h-4 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Setup in 30 seconds</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Enhanced */}
      <footer className="border-t border-gray-200 px-6 py-12 md:px-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-black rounded-md flex items-center justify-center">
                  <Logo />
                </div>
                <span className="text-xl font-bold text-black">Recallio</span>
              </div>
              <p className="text-gray-600 mb-4 max-w-md">
                Your digital life, beautifully organized. Save, organize, and
                rediscover everything that matters to you.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-black mb-4">Product</h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <a href="#" className="hover:text-black transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black transition-colors">
                    Download
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-black mb-4">Support</h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <a href="#" className="hover:text-black transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black transition-colors">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2024 Recallio. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm mt-4 md:mt-0">
              Made with ❤️ for digital organizers everywhere
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
