import Image from "next/image";
import { Inter, Montserrat, Bebas_Neue, Rajdhani } from 'next/font/google';
import LogoText from "@/app/_components/LogoText";

// Initialize the fonts
const inter = Inter({ subsets: ['latin'] });
const montserrat = Montserrat({ subsets: ['latin'] });
const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
});
const rajdhani = Rajdhani({
  weight: '600',
  subsets: ['latin'],
});

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <LogoText />

          {/* Center Navigation */}
          <div className="hidden md:flex items-center justify-center space-x-10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">Why Transloft?</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">Price Plans</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">Solutions</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">How it works?</a>
          </div>

          {/* Right Buttons */}
          <div className="flex items-center gap-6">
            <button className="text-gray-700 px-4 py-2 text-sm font-medium hover:text-gray-900 transition-colors">
              Login
            </button>
            <button className="bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm">
              Sign up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen bg-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: `radial-gradient(circle at center, #E5E7EB 2px, transparent 2px)`,
          backgroundSize: '40px 40px',
          opacity: 0.2
        }}></div>
        
        {/* Floating Dots */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-blue-400/30"></div>
          <div className="absolute top-1/3 right-1/4 w-3 h-3 rounded-full bg-blue-400/30"></div>
          <div className="absolute bottom-1/3 left-1/3 w-3 h-3 rounded-full bg-blue-300/30"></div>
          <div className="absolute top-1/2 right-1/3 w-3 h-3 rounded-full bg-blue-300/30"></div>
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            <p className="text-emerald-600 font-medium inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Your super logistics partner for success
            </p>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Grow your business<br />with Logistics
            </h1>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Trust us to be your strategic partner in achieving your growth objectives and realizing your full business potential.
            </p>

            <div className="pt-6">
              <button className="bg-gray-900 text-white px-8 py-4 rounded-lg font-medium hover:bg-gray-800 transition-all hover:scale-105 shadow-sm">
                Get service now
              </button>
            </div>
          </div>

          {/* Logistics Image */}
          <div className="mt-20 relative">
            <div className="absolute inset-0 z-10"></div>
            <Image
              src="/logistics.jpg"
              alt="Logistics Operations"
              width={1920}
              height={1080}
              className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
              priority
            />
          </div>
        </div>
      </section>

      {/* Shipping Service Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Shipping Service</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Effective warehousing options for a smooth supply chain and seamless operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Global Shipping",
              description: "Fast and reliable international shipping services to meet your global logistics needs",
              icon: "🌐",
              color: "bg-blue-50",
              border: "border-blue-200"
            },
            {
              title: "Warehousing",
              description: "Strategic warehouse locations with state-of-the-art inventory management systems",
              icon: "🏭",
              color: "bg-green-50",
              border: "border-green-200"
            },
            {
              title: "Last Mile Delivery",
              description: "Efficient and timely delivery to ensure your products reach their final destination",
              icon: "🚚",
              color: "bg-purple-50",
              border: "border-purple-200"
            }
          ].map((service, index) => (
            <div 
              key={index}
              className={`${service.color} border ${service.border} rounded-2xl p-8 
                hover:shadow-lg transition-all duration-300 group cursor-pointer`}
            >
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ready to Ship Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="relative overflow-hidden rounded-2xl bg-gray-700">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700"></div>
          <Image
            src="/logistics-2.jpg"
            alt="Logistics Operations"
            width={1920}
            height={1080}
            className="w-full h-[400px] object-cover mix-blend-overlay opacity-50"
            priority
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="text-center text-white max-w-2xl px-4">
              <h3 className="text-3xl font-bold mb-4">Ready to Ship?</h3>
              <p className="text-lg mb-8 text-gray-200">
                Join thousands of businesses that trust us with their logistics needs
              </p>
              <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-medium 
                hover:bg-gray-100 transition-colors inline-flex items-center gap-2 shadow-lg">
                Get Started <span className="text-xl">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-gray-50">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Features</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Powerful tools and features to streamline your logistics operations
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: "Smart Freight Matching",
              description: "Connect with the best carriers instantly using our AI-powered matching system.",
              icon: "🎯",
              color: "bg-blue-500",
              lightColor: "bg-blue-50"
            },
            {
              title: "Real-Time Tracking",
              description: "Know where your cargo is at all times with precise GPS tracking and status updates.",
              icon: "📍",
              color: "bg-indigo-500",
              lightColor: "bg-indigo-50"
            },
            {
              title: "Secure & Transparent Payments",
              description: "Hassle-free transactions with automated payments and complete financial transparency.",
              icon: "🔒",
              color: "bg-violet-500",
              lightColor: "bg-violet-50"
            },
            {
              title: "Optimized Routes",
              description: "Save time and reduce shipping costs with AI-optimized route planning.",
              icon: "🛣️",
              color: "bg-purple-500",
              lightColor: "bg-purple-50"
            }
          ].map((feature, index) => (
            <div 
              key={index} 
              className={`${feature.lightColor} rounded-2xl p-8 
                hover:shadow-xl transition-all duration-300 group relative 
                overflow-hidden border border-gray-100`}
            >
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 ${feature.lightColor} opacity-50`}></div>

              {/* Content */}
              <div className="relative z-10">
                <div className={`${feature.color} text-white w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-6 
                  group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 border-2 border-transparent hover:border-blue-500/20 rounded-2xl transition-colors duration-300"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Waitlist Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 overflow-hidden">
        <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 p-12 md:p-16 rounded-3xl">
          {/* Background Decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -right-10 -top-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-3xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Be the First to Know!
              </h2>
              <p className="text-gray-300 text-lg">
                Join our waitlist to get exclusive early access and special launch offers.
              </p>
            </div>

            <form className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white 
                    rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 
                    transition-all duration-300 hover:bg-white/20 placeholder-gray-400"
                />
              </div>
              <button 
                type="submit"
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold 
                  hover:bg-blue-500 transition-all hover:scale-105 active:scale-100 
                  shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
              >
                Join Waitlist
              </button>
            </form>

            <div className="flex items-center justify-center gap-8 pt-4">
              <div className="flex items-center gap-2 text-gray-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span className="text-sm">Free Access</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span className="text-sm">No Spam</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center space-y-4">
            <LogoText />
            <p className="text-sm text-gray-600">
              © 2024 Transloft. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
