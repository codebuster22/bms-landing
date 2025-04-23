import { Menu, X, FileCheck, DollarSign, FileX, ChevronRight, Download, Key, Mail, CheckCircle2, Monitor, Shield, Database, Layers, MessageSquareQuote, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import YouTube from 'react-youtube';
import { getYouTubeVideoId } from './utils/youtube';
import { useLanguageStore } from './store/languageStore';
import { translations } from './translations';
import { LanguageSelector } from './components/LanguageSelector';
import { LanguageToggle } from './components/LanguageToggle';
import { useAnalytics } from './hooks/useAnalytics';
import { usePageView } from './utils/analytics';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { ref: videoSectionRef, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const { language } = useLanguageStore();
  const t = translations[language];
  const { trackPurchaseClick, trackDownloadClick } = useAnalytics();
  
  // Track page view
  usePageView();

  const videoId = getYouTubeVideoId(import.meta.env.VITE_YOUTUBE_VIDEO_ID);

  const handlePurchaseClick = () => {
    trackPurchaseClick();
    window.open(import.meta.env.VITE_PURCHASE_URL, '_blank');
  };

  const handleDownloadClick = () => {
    trackDownloadClick();
    window.open(import.meta.env.VITE_DOWNLOAD_URL, '_blank');
  };

  // Initialize Senja Collector and Widget
  useEffect(() => {
    // Load Senja collector script
    const collectorScript = document.createElement('script');
    collectorScript.src = 'https://widget.senja.io/js/collector.js';
    collectorScript.async = true;
    collectorScript.type = 'text/javascript';
    document.body.appendChild(collectorScript);

    // Load Senja widget script
    const widgetScript = document.createElement('script');
    widgetScript.src = 'https://widget.senja.io/widget/524530d8-7b52-418e-ac33-f47a66093d61/platform.js';
    widgetScript.async = true;
    widgetScript.type = 'text/javascript';
    document.body.appendChild(widgetScript);

    // Configure Senja collector
    window.SenjaCollectorConfig = {
      url: "https://senja.io/p/bmsfusion/r/NWjyM9",
      trigger: {"type":"none"}
    };

    // Cleanup function
    return () => {
      document.body.removeChild(collectorScript);
      document.body.removeChild(widgetScript);
    };
  }, []);

  const openReviewForm = () => {
    if (window.SenjaCollector) {
      window.SenjaCollector.open();
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] font-['Space_Grotesk']">
      <LanguageSelector />
      
      {/* Navigation */}
      <nav className="bg-[#0B3B8F] text-white py-4 px-6 md:px-8 lg:px-12 relative z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="https://ik.imagekit.io/xlvg9oc4k/BMS/zeeconvert-86.png?updatedAt=1744185964666" 
              alt="BMS Logo" 
              className="h-10 w-auto"
            />
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="hover:text-[#FF9800] transition-colors">{t.nav.features}</a>
            <a href="#video-demo" className="hover:text-[#FF9800] transition-colors">{t.nav.howItWorks}</a>
            <a href="#pricing" className="hover:text-[#FF9800] transition-colors">{t.nav.pricing}</a>
            <a href="#download" className="hover:text-[#FF9800] transition-colors">{t.nav.download}</a>
            <a href="#testimonials" className="hover:text-[#FF9800] transition-colors">Testimonials</a>
            <a href="#footer" className="hover:text-[#FF9800] transition-colors">{t.nav.support}</a>
            <button 
              onClick={openReviewForm}
              className="flex items-center gap-1 hover:text-[#FF9800] transition-colors"
            >
              <Star size={18} />
              Write a Review
            </button>
            <LanguageToggle />
            <button 
              onClick={handleDownloadClick}
              className="bg-[#FF9800] px-6 py-2 font-bold shadow-[4px_4px_0_#212121] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#212121] transition-all"
            >
              {t.nav.download}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-[#0B3B8F] py-4 px-6 space-y-4 border-t border-white/10">
            <a href="#features" className="block">{t.nav.features}</a>
            <a href="#video-demo" className="block">{t.nav.howItWorks}</a>
            <a href="#pricing" className="block">{t.nav.pricing}</a>
            <a href="#download" className="block">{t.nav.download}</a>
            <a href="#testimonials" className="block">Testimonials</a>
            <a href="#footer" className="block">{t.nav.support}</a>
            <button 
              onClick={openReviewForm}
              className="flex items-center gap-1 w-full text-left"
            >
              <Star size={18} />
              Write a Review
            </button>
            <LanguageToggle />
            <button 
              onClick={handleDownloadClick}
              className="w-full bg-[#FF9800] px-6 py-2 font-bold shadow-[4px_4px_0_#212121]"
            >
              {t.nav.download}
            </button>
          </div>
        )}
      </nav>

      {/* Mobile Menu Overlay - added to block content when menu is open */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsMenuOpen(false)} />
      )}

      {/* Hero Section */}
      <section className="relative py-20 px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-3 py-1 bg-[#FF9800] text-white text-sm font-mono mb-6 shadow-[2px_2px_0_#212121]">
              Version {import.meta.env.VITE_APP_VERSION}
            </div>
            <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6">
              {t.hero.title}
            </h1>
            <p className="text-xl mb-8 text-gray-700">
              {t.hero.subtitle}
            </p>
            {/* <p className="text-sm font-medium text-[#0B3B8F] mb-6 inline-flex items-center">
              <span className="mr-2">•</span> Your license works for one year. You must renew it each year.
            </p> */}
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={handleDownloadClick}
                className="bg-[#0B3B8F] text-white px-8 py-3 font-bold shadow-[4px_4px_0_#212121] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#212121] transition-all flex items-center gap-2"
              >
                {t.hero.download} <Download size={20} />
              </button>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80" 
              alt="BMS Dashboard" 
              className="rounded-lg shadow-[8px_8px_0_#212121] border-4 border-[#212121]"
            />
          </div>
        </div>
      </section>

      {/* Demo Video Section */}
      <section id="video-demo" ref={videoSectionRef} className="py-20 px-6 md:px-8 lg:px-12 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-black mb-8 text-center">{t.demo.title}</h2>
          <div className="relative aspect-video rounded-lg shadow-[8px_8px_0_#212121] border-4 border-[#212121] overflow-hidden">
            <YouTube
              videoId={videoId}
              opts={{
                width: '100%',
                height: '100%',
                playerVars: {
                  autoplay: inView ? 1 : 0,
                  mute: 1,
                  controls: 1,
                  modestbranding: 1,
                  rel: 0,
                },
              }}
              className="absolute inset-0 w-full h-full"
              onReady={(event: { target: { playVideo: () => void } }) => {
                if (inView) {
                  event.target.playVideo();
                }
              }}
            />
          </div>
          <p className="text-center mt-6 text-gray-600">{t.demo.subtitle}</p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 md:px-8 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black mb-16 text-center">
            {t.features.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-[#F5F5F5] p-8 shadow-[8px_8px_0_#212121] border-4 border-[#212121]">
              <div className="w-12 h-12 bg-[#0B3B8F] flex items-center justify-center rounded-lg mb-6">
                <FileCheck className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{t.features.invoiceMatching.title}</h3>
              <p className="text-gray-700">{t.features.invoiceMatching.description}</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#F5F5F5] p-8 shadow-[8px_8px_0_#212121] border-4 border-[#212121]">
              <div className="w-12 h-12 bg-[#4CAF50] flex items-center justify-center rounded-lg mb-6">
                <DollarSign className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{t.features.shortPayments.title}</h3>
              <p className="text-gray-700">{t.features.shortPayments.description}</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#F5F5F5] p-8 shadow-[8px_8px_0_#212121] border-4 border-[#212121]">
              <div className="w-12 h-12 bg-[#F44336] flex items-center justify-center rounded-lg mb-6">
                <FileX className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{t.features.rejectedBills.title}</h3>
              <p className="text-gray-700">{t.features.rejectedBills.description}</p>
            </div>

            {/* Feature 4: Smart File Validation */}
            <div className="bg-[#F5F5F5] p-8 shadow-[8px_8px_0_#212121] border-4 border-[#212121]">
              <div className="w-12 h-12 bg-[#9C27B0] flex items-center justify-center rounded-lg mb-6">
                <Shield className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{t.features.fileValidation.title}</h3>
              <p className="text-gray-700">{t.features.fileValidation.description}</p>
            </div>

            {/* Feature 5: Database Storage */}
            <div className="bg-[#F5F5F5] p-8 shadow-[8px_8px_0_#212121] border-4 border-[#212121]">
              <div className="w-12 h-12 bg-[#FF5722] flex items-center justify-center rounded-lg mb-6">
                <Database className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{t.features.database.title}</h3>
              <p className="text-gray-700">{t.features.database.description}</p>
            </div>

            {/* Feature 6: Advanced Pagination */}
            <div className="bg-[#F5F5F5] p-8 shadow-[8px_8px_0_#212121] border-4 border-[#212121]">
              <div className="w-12 h-12 bg-[#795548] flex items-center justify-center rounded-lg mb-6">
                <Layers className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{t.features.pagination.title}</h3>
              <p className="text-gray-700">{t.features.pagination.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Setup Guide Section */}
      <section className="py-20 px-6 md:px-8 lg:px-12 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-black mb-16 text-center">
            {t.setup.title}
          </h2>
          <div className="bg-[#F5F5F5] p-8 rounded-lg shadow-[8px_8px_0_#212121] border-4 border-[#212121]">
            <ol className="space-y-8">
              <li className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-[#0B3B8F] flex-shrink-0 flex items-center justify-center rounded-full text-white font-bold">1</div>
                <div>
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-3">
                    {t.setup.steps.download.title} <Download size={20} className="text-[#0B3B8F]" />
                  </h3>
                  <p className="text-gray-700">{t.setup.steps.download.description}</p>
                </div>
              </li>
              <li className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-[#0B3B8F] flex-shrink-0 flex items-center justify-center rounded-full text-white font-bold">2</div>
                <div>
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-3">
                    {t.setup.steps.install.title} <Monitor size={20} className="text-[#0B3B8F]" />
                  </h3>
                  <p className="text-gray-700">{t.setup.steps.install.description}</p>
                </div>
              </li>
              <li className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-[#0B3B8F] flex-shrink-0 flex items-center justify-center rounded-full text-white font-bold">3</div>
                <div>
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-3">
                    {t.setup.steps.purchase.title} <Key size={20} className="text-[#0B3B8F]" />
                  </h3>
                  <p className="text-gray-700">{t.setup.steps.purchase.description}</p>
                </div>
              </li>
              <li className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-[#0B3B8F] flex-shrink-0 flex items-center justify-center rounded-full text-white font-bold">4</div>
                <div>
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-3">
                    {t.setup.steps.activate.title} <Mail size={20} className="text-[#0B3B8F]" />
                  </h3>
                  <p className="text-gray-700">{t.setup.steps.activate.description}</p>
                </div>
              </li>
              <li className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-[#0B3B8F] flex-shrink-0 flex items-center justify-center rounded-full text-white font-bold">5</div>
                <div>
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-3">
                    {t.setup.steps.enjoy.title} <CheckCircle2 size={20} className="text-[#0B3B8F]" />
                  </h3>
                  <p className="text-gray-700">{t.setup.steps.enjoy.description}</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 md:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-black mb-16 text-center">{t.pricing.title}</h2>
          <div className="bg-white p-12 shadow-[8px_8px_0_#212121] border-4 border-[#212121]">
            <div className="text-center mb-8">
              <div className="text-5xl font-black mb-4">₹1,999</div>
              <div className="text-gray-600">{t.pricing.perYear}</div>
              <div className="text-sm font-medium text-[#0B3B8F] mt-2">Your license works for one year. You must renew it each year.</div>
            </div>
            <ul className="space-y-4 mb-8">
              {t.pricing.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <ChevronRight className="text-[#0B3B8F]" size={20} />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="flex justify-center">
              <button 
                onClick={handleDownloadClick}
                className="bg-[#0B3B8F] text-white px-8 py-3 font-bold shadow-[4px_4px_0_#212121] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#212121] transition-all flex items-center gap-2"
              >
                {t.nav.download} <Download size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6 md:px-8 lg:px-12 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-black mb-8 text-center flex items-center justify-center gap-3">
            <MessageSquareQuote className="text-[#0B3B8F]" size={32} />
            What Our Users Say
          </h2>
          {/* <div className="relative mb-10">
            <div 
              className="senja-embed shadow-[8px_8px_0_#212121] border-4 border-[#212121] rounded-lg overflow-hidden p-2" 
              data-id="524530d8-7b52-418e-ac33-f47a66093d61" 
              data-mode="shadow" 
              data-lazyload="false" 
              style={{ display: 'block', width: '100%', minHeight: '600px' }}
            />
          </div> */}
          <div className="flex justify-center">
            <button 
              onClick={openReviewForm}
              className="bg-[#0B3B8F] text-white px-8 py-3 font-bold shadow-[4px_4px_0_#212121] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#212121] transition-all flex items-center gap-2"
              data-senja-collector-open="bmsfusion"
              data-url="https://senja.io/p/bmsfusion/r/NWjyM9"
            >
              <Star size={20} />
              Write a Review
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="bg-[#0B3B8F] text-white py-12 px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">{t.footer.support.title}</h3>
              <p className="mb-2">{t.footer.support.hours}</p>
              <p className="mb-2">{t.footer.support.phone}</p>
              <p className="mb-2">{t.footer.support.email}</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">{t.footer.quickLinks.title}</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="hover:text-[#FF9800]">{t.nav.features}</a></li>
                <li><a href="#pricing" className="hover:text-[#FF9800]">{t.nav.pricing}</a></li>
                <li><a href="#download" className="hover:text-[#FF9800]">{t.nav.download}</a></li>
                <li><a href="#footer" className="hover:text-[#FF9800]">{t.nav.support}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">{t.footer.legal.title}</h3>
              <ul className="space-y-2">
                <li><a href="/privacy" className="hover:text-[#FF9800]">{t.footer.legal.privacy}</a></li>
                <li><a href="/terms" className="hover:text-[#FF9800]">{t.footer.legal.terms}</a></li>
              </ul>
              <div className="mt-4">
                <LanguageToggle />
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <p>{t.footer.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

declare global {
  interface Window {
    iFrameResize?: (options: any, selector: HTMLIFrameElement) => void;
    SenjaCollector?: {
      open: () => void;
    };
    SenjaCollectorConfig?: {
      url: string;
      trigger: {
        type: string;
      };
    };
  }
}

export default App;