'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, ArrowRight, Globe, Search, AlertCircle, Moon, Sun } from 'lucide-react'
import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
})

const analyzeWebsite = async (url: string) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are an SEO expert. Analyze the given website URL and provide an SEO score from 0 to 100, where 0 is extremely poor and 100 is perfect. Only respond with a number." },
        { role: "user", content: `Analyze this website for SEO: ${url}` }
      ],
      model: "gpt-3.5-turbo",
      max_tokens: 10,
    });

    const response = completion.choices[0].message.content;
    if (!response) {
      throw new Error("No response from OpenAI");
    }
    const score = parseInt(response.trim());
    if (isNaN(score) || score < 0 || score > 100) {
      throw new Error("Invalid score received from OpenAI");
    }
    return { seoScore: score };
  } catch (error) {
    console.error('Error in analyzeWebsite:', error);
    throw error;
  }
};

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [url, setUrl] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [analysisResult, setAnalysisResult] = useState<{ seoScore: number } | { error: string } | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsScanning(true)
    setScanProgress(0)
    setAnalysisResult(null)

    try {
      const result = await analyzeWebsite(url);
      setAnalysisResult(result);
    } catch (error) {
      setAnalysisResult({ 
        error: error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.' 
      });
    } finally {
      setIsScanning(false);
    }
  }

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing-section')
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className={`min-h-screen font-sans flex flex-col ${isDarkMode ? 'dark' : ''}`}>
      {/* Navigation */}
      <nav className="sticky top-0 z-50 transition-all duration-300 bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <Image
              src="/getmorepacklinks.png"
              alt="Logo"
              width={180}
              height={40}
              className="h-8 w-auto mb-4 sm:mb-0"
            />
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
              <Link href="/blogs" className="text-[15px] text-black transition-colors">
                Blogs
              </Link>
              <Link href="/submit" className="text-[15px] text-black transition-colors">
                Submit my Directory
              </Link>
              <Link
                href="/#pricing-section"
                className="px-6 py-2.5 bg-[#F97316] text-white text-[15px] rounded-full hover:bg-[#EA580C] transition-colors"
              >
                Submit my Product
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="flex-grow relative overflow-hidden bg-white dark:bg-gray-900">
        {/* Grid Background */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(249, 115, 22, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(249, 115, 22, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '2rem 2rem',
          }}
        />

        {/* Radial Gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(249, 115, 22, 0.1) 0%, transparent 70%)',
          }}
        />

        <div className="container mx-auto px-4 py-12 sm:py-24 relative">
          <div className={`text-center max-w-4xl mx-auto transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="inline-flex items-center justify-center bg-white dark:bg-gray-800 rounded-full px-4 py-2 mb-8 sm:mb-12 border border-gray-200 dark:border-gray-700 shadow-sm group relative">
              <span className="bg-[#FF6B35] text-white text-xs font-semibold px-2 py-0.5 rounded-full mr-2">HOT</span>
              <span className="text-gray-800 dark:text-gray-200 text-sm tracking-wide font-medium">
                ONE CLICK TO SEO SUCCESS
              </span>
              <ChevronRight className="h-4 w-4 text-gray-400 ml-1 group-hover:translate-x-0.5 transition-transform" />
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6 sm:mb-8 tracking-tight text-gray-800 dark:text-white">
              Boost Your <span className="text-[#F97316]">SEO</span> &<br />
              Get More <span className="text-[#F97316]">Sales</span>
            </h1>

            <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg mb-8 sm:mb-12 max-w-2xl mx-auto">
              Get instant traffic on your site, save days of manual work with just one click. 
              Submit Your AI Startup To 100+ Platforms In 7 Days
            </p>

            <Link
              href="/#pricing-section"
              className="inline-block px-6 sm:px-8 py-3 bg-[#F97316] text-white rounded-full hover:bg-[#EA580C] transition-colors font-semibold text-base sm:text-lg"
            >
              Submit my Product
            </Link>

            {/* Browser Window Mockup */}
            <div className="mt-12 sm:mt-16 relative w-full max-w-4xl mx-auto bg-gray-900 rounded-lg shadow-2xl overflow-hidden">
              <div className="bg-gray-800 border-b border-gray-700 p-2 sm:p-4">
                <div className="flex items-center">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#FF5F57]"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#FFBD2E]"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#28C840]"></div>
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="bg-gray-700 rounded-md px-2 sm:px-3 py-1 text-gray-300 text-xs sm:text-sm flex items-center gap-2 w-full sm:w-96 border border-gray-600">
                      <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                      getmorebacklinks.org
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 sm:p-8 bg-gradient-to-br from-gray-900 to-gray-800">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 text-center">Welcome to GetMoreBacklinks</h2>
                <p className="text-gray-300 max-w-2xl mx-auto text-center mb-6 sm:mb-8 text-sm sm:text-base">
                  Boost your SEO with one click. Submit your website and get high-quality backlinks from 100+ platforms.
                </p>
                <div className="flex justify-center">
                  <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="relative">
                        <input
                          type="url"
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          className="w-full px-3 sm:px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F97316] bg-gray-700 text-gray-100 text-sm sm:text-base"
                          placeholder="Enter your website URL"
                          required
                        />
                        <Globe className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-[#F97316] text-white py-2 px-4 rounded-md hover:bg-[#EA580C] transition-colors flex items-center justify-center text-sm sm:text-base"
                        disabled={isScanning}
                      >
                        {isScanning ? (
                          <>
                            <Search className="animate-spin mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            Analyze My Website
                            <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                          </>
                        )}
                      </button>
                    </form>
                    {isScanning && (
                      <div className="mt-4">
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-[#F97316] h-2 rounded-full transition-all duration-200 ease-out"
                            style={{ width: '100%' }}
                          ></div>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-400 mt-2">Analyzing your website...</p>
                      </div>
                    )}
                    {analysisResult && (
                      <div className="mt-6 bg-gray-700 border border-gray-600 rounded-lg p-4">
                        <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Analysis Report</h3>
                        {'error' in analysisResult ? (
                          <div className="flex items-center text-red-500 dark:text-red-400">
                            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                            <p className="text-sm sm:text-base">{analysisResult.error}</p>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center justify-center mb-4">
                              <div className="text-4xl sm:text-6xl font-bold text-[#F97316]">{analysisResult.seoScore}</div>
                              <div className="ml-4 text-gray-300">
                                <div className="text-lg sm:text-xl font-semibold">SEO Score</div>
                                <div className="text-xs sm:text-sm">out of 100</div>
                              </div>
                            </div>
                            <div className="text-center mb-4">
                              {analysisResult.seoScore < 50 ? (
                                <p className="text-red-600 dark:text-red-400 font-semibold text-sm sm:text-base">Your SEO needs immediate attention!</p>
                              ) : analysisResult.seoScore < 80 ? (
                                <p className="text-yellow-600 dark:text-yellow-400 font-semibold text-sm sm:text-base">Your SEO has room for improvement.</p>
                              ) : (
                                <p className="text-green-600 dark:text-green-400 font-semibold text-sm sm:text-base">Great job! Let's make it even better.</p>
                              )}
                            </div>
                            <div className="bg-gray-700 p-4 rounded-md shadow-sm">
                              <h4 className="font-semibold text-base sm:text-lg mb-2 text-white">Boost Your SEO Now!</h4>
                              <p className="text-xs sm:text-sm text-gray-300 mb-4">
                                Our expert team can help you improve your SEO score and drive more traffic to your website.
                              </p>
                              <ul className="text-xs sm:text-sm text-gray-300 mb-4 list-disc list-inside">
                                <li>Comprehensive SEO audit</li>
                                <li>Customized optimization strategy</li>
                                <li>High-quality backlink building</li>
                                <li>Regular performance reports</li>
                              </ul>
                            </div>
                          </>
                        )}
                        <button
                          onClick={scrollToPricing}
                          className="mt-4 w-full bg-[#F97316] text-white py-2 sm:py-3 px-4 rounded-md hover:bg-[#EA580C] transition-colors flex items-center justify-center font-semibold text-sm sm:text-lg"
                        >
                          Get Your Personalized SEO Plan
                          <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Reflection/Shadow Effect */}
            <div 
              className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[90%] h-12 blur-xl"
              style={{
                background: 'linear-gradient(to bottom, rgba(249, 115, 22, 0.15), transparent)',
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}

