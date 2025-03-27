"use client"

import Image from "next/image";
import LogoText from "@/app/_components/LogoText";
import Link from "next/link";
import { useState, useEffect} from "react";
// Initialize the fonts


export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <LogoText />

          {/* Center Navigation */}
          <div className="hidden md:flex items-center justify-center space-x-10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <a href="#why-transloft" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">Why Transloft?</a>
            <a href="#solutions" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">Solutions</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">How it works?</a>
          </div>

          {/* Right Buttons */}
          <div className="flex items-center gap-6">
            <Link href="/login" className="text-gray-700 px-4 py-2 text-sm font-medium hover:text-gray-900 transition-colors">
              Login
            </Link>
            <Link href="/signup" className="bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm">
              Sign up
            </Link>
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

      <WhyUs />

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

      
      <Solutions />
      <HowItWorks />
      <WaitList />

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


function WhyUs() {
  return (
    <div>
      {/* Why Transloft? Section */}
      <section id="why-transloft" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Transloft?</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We're reimagining logistics with technology that brings reliability, speed, and transparency to every shipment.
          </p>
        </div>

        <div className="relative">
          {/* Floating Graphics */}
          <div className="hidden lg:block absolute -left-20 top-1/4">
            <div className="w-40 h-40 rounded-full "></div>
          </div>
          <div className="hidden lg:block absolute -right-20 bottom-1/4">
            <div className="w-40 h-40 rounded-full  "></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="/logistics-dashboard.jpg"
                alt="Transloft Dashboard"
                width={600}
                height={480}
                className="rounded-2xl shadow-lg object-cover"
              />
            </div>
            
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-medium text-gray-900">Reliability You Can Trust</h3>
                    <p className="mt-2 text-gray-600">
                      With a 99.8% on-time delivery rate and carrier quality scoring, we ensure your goods arrive as promised, every time.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-md bg-green-100 text-green-600">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-medium text-gray-900">Global Reach, Local Expertise</h3>
                    <p className="mt-2 text-gray-600">
                      Our network extends across 120+ countries with local teams who understand regional regulations and requirements.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-md bg-purple-100 text-purple-600">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-medium text-gray-900">AI-Powered Efficiency</h3>
                    <p className="mt-2 text-gray-600">
                      Our proprietary algorithm matches your cargo with the perfect carrier, optimizing for cost, speed, and reliability.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-md bg-yellow-100 text-yellow-600">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-medium text-gray-900">Full Transparency</h3>
                    <p className="mt-2 text-gray-600">
                      Real-time tracking, clear pricing, and detailed analytics give you complete visibility into your supply chain.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function Solutions() {
  return (
    <div>
      {/* Solutions Section */}
      <section id="solutions" className="relative py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Solutions</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Tailored logistics solutions for every business need, regardless of size or industry
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="p-8">
                <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">E-Commerce Fulfillment</h3>
                <p className="text-gray-600 mb-6">
                  End-to-end solutions for online retailers, from warehouse storage to last-mile delivery, with seamless integration for your shopping platforms.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Same-day and next-day delivery options
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Shopify, WooCommerce, and Amazon integrations
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Custom packaging and branded tracking
                  </li>
                </ul>
                <a href="#" className="inline-flex items-center text-blue-600 font-medium">
                  Learn more
                  <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="p-8">
                <div className="w-16 h-16 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center mb-6">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">B2B Freight Services</h3>
                <p className="text-gray-600 mb-6">
                  Streamlined solutions for business-to-business shipping, from pallets to full truckload, with dedicated account management.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    LTL and FTL shipping options
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Cross-docking and distribution services
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Volume discounts and contract rates
                  </li>
                </ul>
                <a href="#" className="inline-flex items-center text-blue-600 font-medium">
                  Learn more
                  <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="p-8">
                <div className="w-16 h-16 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-6">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">International Shipping</h3>
                <p className="text-gray-600 mb-6">
                  Global logistics solutions with customs clearance expertise, documentation support, and international tracking.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Air, ocean, and ground transportation
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Customs brokerage and compliance
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Global trade management
                  </li>
                </ul>
                <a href="#" className="inline-flex items-center text-blue-600 font-medium">
                  Learn more
                  <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="p-8">
                <div className="w-16 h-16 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-6">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Last-Mile Delivery</h3>
                <p className="text-gray-600 mb-6">
                  Fast, reliable local delivery with real-time tracking, proof of delivery, and white-glove service options.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Same-day and scheduled deliveries
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Real-time tracking and notifications
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Installation and assembly services
                  </li>
                </ul>
                <a href="#" className="inline-flex items-center text-blue-600 font-medium">
                  Learn more
                  <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function HowItWorks() {
  return (
    <div>
      {/* How it Works Section */}
      <section id="how-it-works" className="relative py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-medium text-sm tracking-wide uppercase">Simple Process</span>
            <h2 className="mt-3 text-4xl font-bold text-gray-900">How Transloft Works</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Ship your products in three easy steps
            </p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute left-1/2 top-24 bottom-24 w-0.5 bg-gradient-to-b from-blue-400 to-blue-100"></div>

            {/* Steps */}
            <div className="space-y-24">
              {[
                {
                  title: "Create Your Shipment",
                  description: "Enter your shipment details including pickup and delivery locations, package information, and scheduling preferences.",
                  icon: "📦",
                  image: "/create-shipment.jpg",
                  color: "blue"
                },
                {
                  title: "Get Instant Quotes",
                  description: "Compare competitive rates from our verified carrier network and choose the option that best fits your needs.",
                  icon: "💰",
                  image: "/compare-rates.jpg",
                  color: "green"
                },
                {
                  title: "Track & Manage",
                  description: "Monitor your shipment in real-time, receive notifications, and access detailed delivery information.",
                  icon: "🚚",
                  image: "/track-delivery.jpg",
                  color: "purple"
                }
              ].map((step, index) => (
                <div key={index} className="relative">
                  <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:ml-auto lg:pl-16' : 'lg:pr-16'}`}>
                    <div className="relative">
                      {/* Step Number */}
                      <div className={`absolute -left-4 lg:left-auto ${index % 2 === 0 ? 'lg:-left-16' : 'lg:-right-16'} top-0 
                        w-8 h-8 rounded-full bg-white shadow-md border-2 border-blue-400 flex items-center justify-center
                        text-blue-600 font-bold z-10`}>
                        {index + 1}
                      </div>

                      {/* Content Card */}
                      <div className="bg-white rounded-2xl shadow-lg p-8 relative overflow-hidden group
                        hover:shadow-xl transition-all duration-300 border border-gray-100">
                        {/* Icon */}
                        <div className={`w-16 h-16 rounded-xl bg-${step.color}-50 flex items-center justify-center text-3xl mb-6
                          group-hover:scale-110 transition-transform duration-300`}>
                          {step.icon}
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{step.description}</p>

                        {/* Feature List */}
                        <div className="mt-6 space-y-3">
                          {[
                            "Smart address validation",
                            "Real-time rate calculation",
                            "Automated documentation"
                          ].map((feature, idx) => (
                            <div key={idx} className="flex items-center text-gray-600">
                              <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                              </svg>
                              {feature}
                            </div>
                          ))}
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-gray-50 rounded-full opacity-50"></div>
                        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-gray-100 rounded-full opacity-50"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 text-center">
          <button className="inline-flex items-center px-8 py-4 rounded-xl bg-blue-600 text-white font-medium
            hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl">
            Start Shipping Now
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </button>
        </div>
      </section>
    </div>
  )
}

function WaitList() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const [addedToWaitList, setAddedToWaitList] = useState(false)
  
  useEffect(() => {
    if (addedToWaitList || error) {
      const timeout = setTimeout(() => {setAddedToWaitList(false), setError(null);}, 5000);
      return () => clearTimeout(timeout);
    }
  }, [addedToWaitList, error]); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/wait-list", {
        method: "POST",
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({email})
      })

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to add email to waitlist");
      }

      setAddedToWaitList(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setEmail('')
    }
  }

  const handleChange = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  return (
    <div>
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
            <div>
            {addedToWaitList && (
                <p className="text-green-400 text-sm mt-4">🎉 You're on the waitlist!</p>
              )}

              {error && (
                <p className="text-red-400 text-sm mt-4">{error}</p>
              )}
            </div>
            <form className="flex flex-col sm:flex-row max-w-md mx-auto gap-4" onSubmit={handleSubmit}>
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={handleChange}
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
    </div>
  )
}


