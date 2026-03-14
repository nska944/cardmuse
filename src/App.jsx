import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Sparkles, 
  Download, 
  Share2, 
  Type, 
  Palette, 
  Image as ImageIcon, 
  Smile,
  RefreshCw,
  Plus,
  ArrowLeft,
  Search
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MessageLibrary, GLOBAL_FESTIVALS, THEMES } from './constants';

// --- SEO Component ---
const SEO = ({ title, description, keywords, canonical }) => (
  <Helmet>
    <title>{title} | CardMuse</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    {canonical && <link rel="canonical" href={canonical} />}
  </Helmet>
);

// --- Constants (Shared) ---
const FONTS = ['Inter', 'Playfair Display', 'Courier New', 'Georgia', 'Arial Black'];
const COLORS = ['#000000', '#FFFFFF', '#6366f1', '#a855f7', '#f43f5e', '#10b981', '#f59e0b'];
// --- Designer Page Component ---
const EMOJIS = ['❤️', '🎂', '🎉', '💍', '💐', '🎓', '🙏', '✨', '🎁', '🎈'];
const REGIONS = ['All', 'North America', 'Europe', 'Middle East', 'India', 'Africa', 'South East Asia', 'East Asia', 'South America'];

// --- Designer Page Component ---
const CardDesigner = ({ initialOccasion = 'birthday' }) => {
  const [textElements, setTextElements] = useState([
    { id: 1, text: `HAPPY ${initialOccasion.toUpperCase()}`, x: 200, y: 150, fontSize: 40, fontFamily: 'Playfair Display', color: '#000000' },
    { id: 2, text: 'To someone special', x: 200, y: 220, fontSize: 18, fontFamily: 'Inter', color: '#666666' }
  ]);
  const [activeElementId, setActiveElementId] = useState(null);
  const [theme, setTheme] = useState(THEMES[0]);
  const [isDrag, setIsDrag] = useState(false);
  const [activeCategory, setActiveCategory] = useState(initialOccasion);
  const [activeRegion, setActiveRegion] = useState('All');
  const [isPremium, setIsPremium] = useState(false); // Monetization: Premium User Status
  const [showDownloadAd, setShowDownloadAd] = useState(false); // Monetization: Ad after download
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    drawCanvas();
  }, [textElements, theme]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Background
    if (theme.bg.includes('gradient')) {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      // Rough parse of gradient string for simplicity
      if (theme.name === 'Sunset') { gradient.addColorStop(0, '#fceabb'); gradient.addColorStop(1, '#f8b500'); }
      else if (theme.name === 'Ocean') { gradient.addColorStop(0, '#2193b0'); gradient.addColorStop(1, '#6dd5ed'); }
      else if (theme.name === 'Royal' || theme.name === 'Elegant') { gradient.addColorStop(0, '#1A1A1A'); gradient.addColorStop(1, '#0F172A'); }
      else if (theme.name === 'Romantic') { gradient.addColorStop(0, '#FFB7B2'); gradient.addColorStop(1, '#FF1E56'); }
      else if (theme.name === 'Cute') { gradient.addColorStop(0, '#B2F2BB'); gradient.addColorStop(1, '#A5D8FF'); }
      else if (theme.name === 'Luxury') { gradient.addColorStop(0, '#0B0B0B'); gradient.addColorStop(1, '#2D3436'); }
      ctx.fillStyle = gradient;
    } else {
      ctx.fillStyle = theme.bg;
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Decorations
    ctx.globalAlpha = 0.2;
    if (theme.decoration === 'hearts') {
      for(let i=0; i<8; i++) {
        ctx.font = '40px serif';
        ctx.fillText('❤️', Math.random()*canvas.width, Math.random()*canvas.height);
      }
    } else if (theme.decoration === 'confetti') {
      for(let i=0; i<20; i++) {
        ctx.fillStyle = COLORS[Math.floor(Math.random()*COLORS.length)];
        ctx.beginPath();
        ctx.arc(Math.random()*canvas.width, Math.random()*canvas.height, 5, 0, Math.PI*2);
        ctx.fill();
      }
    } else if (theme.decoration === 'diamonds') {
      ctx.strokeStyle = theme.accent;
      ctx.lineWidth = 0.5;
      for(let i=0; i<canvas.width; i+=50) {
        ctx.moveTo(i, 0); ctx.lineTo(i+50, canvas.height);
        ctx.moveTo(i+50, 0); ctx.lineTo(i, canvas.height);
      }
      ctx.stroke();
    } else if (theme.decoration === 'bubbles') {
       for(let i=0; i<15; i++) {
         ctx.strokeStyle = '#FFFFFF';
         ctx.beginPath();
         ctx.arc(Math.random()*canvas.width, Math.random()*canvas.height, Math.random()*20, 0, Math.PI*2);
         ctx.stroke();
       }
    }
    ctx.globalAlpha = 1.0;

    // Borders
    if (theme.decoration === 'gold-foil') {
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 15;
      ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
      ctx.lineWidth = 2;
      ctx.strokeRect(35, 35, canvas.width - 70, canvas.height - 70);
    } else {
      ctx.strokeStyle = theme.accent + '33';
      ctx.lineWidth = 20;
      ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);
    }

    // Text
    textElements.forEach(el => {
      ctx.font = `${el.fontSize}px "${el.fontFamily}"`;
      ctx.fillStyle = el.color; // Use the color from the element
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(el.text, el.x, el.y);
    });

    // Watermark (Hidden for Premium Users)
    if (!isPremium) {
      ctx.globalAlpha = 0.5;
      ctx.font = '10px Inter';
      ctx.fillStyle = theme.accent;
      ctx.textAlign = 'right';
      ctx.fillText('Created with CardMuse.online', canvas.width - 40, canvas.height - 40);
      ctx.globalAlpha = 1.0;
    }
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = "Check out this beautiful AI-generated greeting card!";
    let shareUrl = "";

    switch(platform) {
      case 'whatsapp': shareUrl = `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`; break;
      case 'facebook': shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`; break;
      case 'pinterest': shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(text)}`; break;
      case 'copy': 
        navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
        return;
    }
    if (shareUrl) window.open(shareUrl, '_blank');
  };


  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const clickedEl = textElements.find(el => {
      const textWidth = el.text.length * (el.fontSize * 0.5);
      return x > el.x - textWidth/2 && x < el.x + textWidth/2 &&
             y > el.y - el.fontSize/2 && y < el.y + el.fontSize/2;
    });
    if (clickedEl) { setActiveElementId(clickedEl.id); setIsDrag(true); } else { setActiveElementId(null); }
  };

  const handleMouseMove = (e) => {
    if (!isDrag || !activeElementId) return;
    const rect = canvasRef.current.getBoundingClientRect();
    setTextElements(prev => prev.map(el => 
      el.id === activeElementId ? { ...el, x: e.clientX - rect.left, y: e.clientY - rect.top } : el
    ));
  };

  const handleMouseUp = () => setIsDrag(false);

  const generateAI = () => {
    const messages = MessageLibrary[activeCategory] || ["Best wishes!"];
    const message = messages[Math.floor(Math.random() * messages.length)];
    setTextElements(prev => {
      const exists = prev.find(el => el.id === 2);
      const titleEl = prev.find(el => el.id === 1);
      const festivalInfo = GLOBAL_FESTIVALS.find(f => f.id === activeCategory);
      if (festivalInfo && titleEl) {
         prev = prev.map(el => el.id === 1 ? { ...el, text: `HAPPY ${festivalInfo.name.toUpperCase()}` } : el);
      }
      if (exists) { return prev.map(el => el.id === 2 ? { ...el, text: message } : el); }
      else { return [...prev, { id: 2, text: message, x: 200, y: 220, fontSize: 18, fontFamily: 'Inter', color: theme.accent === '#FFFFFF' ? '#CCCCCC' : '#666666' }]; }
    });
    setActiveElementId(2);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
  };

  const addEmoji = (emoji) => {
    const newId = Date.now();
    setTextElements(prev => [...prev, { id: newId, text: emoji, x: 200, y: 350, fontSize: 50, fontFamily: 'Inter', color: '#000000' }]);
    setActiveElementId(newId);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    
    // Monetization: High-Res Simulation (Scaling up for Premium)
    if (isPremium) {
       // In a real implementation, we would redraw the canvas at 2x/3x scale here
       console.log("High-Resolution Export Initiated");
    }

    const link = document.createElement('a');
    link.download = `cardmuse-${activeCategory}-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    
    // Monetization: Show ad after download
    setShowDownloadAd(true);
  };

  return (
    <div className="flex flex-col lg:flex-row lg:h-[calc(100vh-65px)]">
      <SEO 
        title={`${activeCategory.replace('_', ' ').toUpperCase()} Card Generator`} 
        description={`Create personalized ${activeCategory} cards instantly with AI. Customize fonts, themes, and messages.`}
        keywords={`${activeCategory} card, ai greeting card, personalized card`}
      />
      <div className="flex-1 flex flex-col items-center justify-center p-4 bg-neutral-100 dark:bg-neutral-950">
        <Link to="/" className="lg:hidden mb-4 text-sm font-bold text-indigo-600">← Back Home</Link>
        <div className="relative shadow-2xl rounded-sm overflow-hidden bg-white">
          <canvas ref={canvasRef} width={400} height={500} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} className="cursor-move max-w-full h-auto" />
        </div>
      </div>
      <aside className="w-full lg:w-[350px] border-l dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-y-auto p-6 space-y-8">
            {/* Ad Slot: Below Preview (Appears in sidebar above controls) */}
            {!isPremium && (
              <div className="w-full aspect-[4/3] bg-neutral-100 dark:bg-neutral-800 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-neutral-200 dark:border-neutral-700">
                <span className="text-[10px] uppercase font-bold text-neutral-400 mb-2">Advertisement</span>
                <div className="text-xs text-neutral-500 text-center px-4 italic">Support CardMuse by viewing this ad.</div>
              </div>
            )}

            {activeElementId ? (
              <div className="space-y-4 p-4 bg-indigo-50 dark:bg-indigo-950/30 rounded-2xl border border-indigo-100 dark:border-indigo-900 duration-300">
                <div className="flex items-center justify-between text-indigo-600 dark:text-indigo-400">
                  <h3 className="text-sm font-bold uppercase tracking-wider">Edit Text</h3>
                  <button onClick={() => setActiveElementId(null)}>✕</button>
                </div>
                <input type="text" value={textElements.find(el => el.id === activeElementId)?.text || ''} 
                       onChange={(e) => setTextElements(prev => prev.map(el => el.id === activeElementId ? {...el, text: e.target.value} : el))} 
                       className="w-full bg-white dark:bg-neutral-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500" />
                <div className="grid grid-cols-2 gap-2">
                   {FONTS.map(f => (
                     <button key={f} onClick={() => setTextElements(prev => prev.map(el => el.id === activeElementId ? {...el, fontFamily: f} : el))}
                             className={`text-xs p-2 rounded-lg border ${textElements.find(el => el.id === activeElementId)?.fontFamily === f ? 'border-indigo-500' : 'border-neutral-200 dark:border-neutral-700'}`} style={{ fontFamily: f }}>{f}</button>
                   ))}
                </div>
              </div>
            ) : (
              <div className="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-2xl text-center text-sm text-neutral-500">
                 <p className="italic">Select text on card to customize</p>
                 <button onClick={() => addEmoji('✨')} className="mt-2 text-indigo-600 flex items-center gap-1 mx-auto font-bold"><Plus className="w-3 h-3"/> Add Decoration</button>
              </div>
            )}

            {/* Premium CTA */}
            {!isPremium && (
              <div className="p-5 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl text-white shadow-xl">
                 <h4 className="font-bold mb-1 flex items-center gap-2 text-sm"><Sparkles className="w-4 h-4"/> Get CardMuse Pro</h4>
                 <p className="text-[10px] opacity-90 mb-4">No watermarks, high-resolution downloads, and ad-free experience.</p>
                 <button onClick={() => setIsPremium(true)} className="w-full py-2 bg-white text-indigo-600 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-neutral-100 transition-colors">Start Free Trial</button>
              </div>
            )}

            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider opacity-50">AI Magic</h3>
              <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-none"><div className="flex gap-1">{REGIONS.map(r => (<button key={r} onClick={() => setActiveRegion(r)} className={`text-[8px] px-2 py-1 rounded ${activeRegion === r ? 'bg-indigo-600 text-white' : 'text-neutral-500'}`}>{r}</button>))}</div></div>
              <div className="flex flex-wrap gap-1 mb-4 h-24 overflow-y-auto">{Object.keys(MessageLibrary).filter(cat => activeRegion === 'All' || GLOBAL_FESTIVALS.find(f => f.id === cat)?.region === activeRegion).map(cat => (<button key={cat} onClick={() => setActiveCategory(cat)} className={`text-[9px] uppercase font-bold px-2 py-1.5 rounded-lg border ${activeCategory === cat ? 'bg-indigo-600 text-white' : 'border-neutral-200 dark:border-neutral-700'}`}>{cat.replace('_', ' ')}</button>))}</div>
              <button onClick={generateAI} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg"><RefreshCw className="w-4 h-4" /> Generate Message</button>
            </div>
            
            <div className="space-y-4 pt-4 border-t dark:border-neutral-800">
              <h3 className="text-sm font-bold uppercase tracking-wider opacity-50">Share Viral Card</h3>
              <div className="grid grid-cols-4 gap-2">
                <button onClick={() => handleShare('whatsapp')} className="aspect-square flex items-center justify-center bg-green-500 text-white rounded-xl hover:scale-110 transition-transform shadow-md"><Share2 className="w-5 h-5"/></button>
                <button onClick={() => handleShare('facebook')} className="aspect-square flex items-center justify-center bg-blue-600 text-white rounded-xl hover:scale-110 transition-transform shadow-md"><Share2 className="w-5 h-5"/></button>
                <button onClick={() => handleShare('pinterest')} className="aspect-square flex items-center justify-center bg-red-600 text-white rounded-xl hover:scale-110 transition-transform shadow-md"><ImageIcon className="w-5 h-5"/></button>
                <button onClick={() => handleShare('copy')} className="aspect-square flex items-center justify-center bg-neutral-200 dark:bg-neutral-800 rounded-xl hover:scale-110 transition-transform shadow-md"><Plus className="w-5 h-5"/></button>
              </div>
            </div>

            <button onClick={handleDownload} className="w-full bg-neutral-900 dark:bg-white text-white dark:text-black py-4 rounded-xl font-bold flex items-center justify-center gap-2 group"><Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform"/> Download Image</button>

            {/* Post-Download Ad Overlay */}
            {showDownloadAd && !isPremium && (
              <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-6 backdrop-blur-sm">
                <div className="bg-white dark:bg-neutral-900 w-full max-w-md rounded-[2rem] p-8 text-center space-y-6 relative">
                   <button onClick={() => setShowDownloadAd(false)} className="absolute top-6 right-6 text-neutral-400 hover:text-black dark:hover:text-white">✕</button>
                   <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto text-green-600"><Download/></div>
                   <h2 className="text-2xl font-black">Download Successful!</h2>
                   <p className="text-sm text-neutral-500">Your card is being prepared for your device. While you wait, check out our sponsor:</p>
                   
                   <div className="w-full aspect-video bg-neutral-100 dark:bg-neutral-800 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-neutral-200">
                      <span className="text-[10px] uppercase font-bold text-neutral-400">Sponsor Ad</span>
                   </div>

                   <button onClick={() => setShowDownloadAd(false)} className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold">Continue Creating</button>
                </div>
              </div>
            )}
      </aside>

    </div>
  );
};

// --- Landing Page Component ---
const LandingPage = () => {
  const { categorySlug } = useParams();
  const occasion = categorySlug ? categorySlug.replace('-card-generator', '') : 'birthday';

  return (
    <main className="max-w-6xl mx-auto px-4 py-12 space-y-24">
      <SEO 
        title={`Free ${occasion.charAt(0).toUpperCase() + occasion.slice(1)} Card Generator`} 
        description={`The world's most advanced AI ${occasion} card generator. Create, download, and share personalized cards for free.`}
        keywords={`${occasion} card generator, free ${occasion} cards, ai greeting cards`}
      />
      
      <section className="text-center space-y-6">
        <h1 className="text-6xl md:text-8xl font-playfair font-black tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
          Personalized {occasion.replace('-', ' ')} <br/> cards made in seconds.
        </h1>
        <p className="text-xl text-neutral-500 max-w-2xl mx-auto">
          Use our AI designer to create beautiful, high-quality {occasion} cards for your loved ones. No registration required.
        </p>
      </section>

      {/* Ad Slot: Above Generator */}
      <div className="max-w-4xl mx-auto h-24 bg-neutral-100 dark:bg-neutral-800 rounded-3xl flex items-center justify-center border-2 border-dashed border-neutral-200 dark:border-neutral-700">
         <span className="text-[10px] uppercase font-bold text-neutral-300">Google AdSense - Leaderboard</span>
      </div>

      <div className="glass-card shadow-3xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-[3rem] overflow-hidden">
        <CardDesigner initialOccasion={occasion} />
      </div>

      <section className="grid md:grid-cols-3 gap-12 pt-12">
        <div className="space-y-4">
          <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center text-indigo-600"><Sparkles/></div>
          <h3 className="text-xl font-bold">AI Message Lab</h3>
          <p className="text-neutral-500">Our engine generates millions of unique, emotionally engaging messages for any relationship.</p>
        </div>
        <div className="space-y-4">
          <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-2xl flex items-center justify-center text-pink-600"><Download/></div>
          <h3 className="text-xl font-bold">Instantly Download</h3>
          <p className="text-neutral-500">High-resolution PNG files ready for printing or sharing on WhatsApp, Instagram, and Facebook.</p>
        </div>
        <div className="space-y-4">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center text-purple-600"><Palette/></div>
          <h3 className="text-xl font-bold">Fully Customizable</h3>
          <p className="text-neutral-500">Drag and drop text, pick premium fonts, and choose from stunning gradient themes.</p>
        </div>
      </section>
    </main>
  );
};

// --- Home Component ---
const Home = () => (
  <main className="max-w-6xl mx-auto px-4 py-24 text-center">
    <SEO title="AI Greeting Card Generator" description="The world's most advanced AI Greeting Card Generator. Create cards for any occasion instantly." />
    <h1 className="text-7xl md:text-9xl font-playfair font-black tracking-tighter mb-8">Spread Joy. <br/><span className="text-indigo-600">Instantly.</span></h1>
    <p className="text-2xl text-neutral-500 mb-16 max-w-3xl mx-auto">Trusted by millions for birthdays, anniversaries, and holidays worldwide.</p>
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {['birthday', 'love', 'apology', 'friendship', 'diwali', 'christmas'].map(cat => (
        <Link key={cat} to={`/${cat}-card-generator`} className="p-6 bg-white dark:bg-neutral-800 rounded-3xl border border-neutral-100 dark:border-neutral-700 hover:shadow-xl transition-all font-bold uppercase tracking-widest text-xs">{cat}</Link>
      ))}
    </div>
  </main>
);

// --- Personalized Page Component ---
const PersonalizedPage = () => {
  const { slug } = useParams();
  const title = slug.replace(/-/g, ' ').toUpperCase();
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 space-y-12">
      <SEO title={title} description={`Special greeting card: ${title}. Create yours now!`} />
      <h1 className="text-4xl font-black mb-4">A Special Surprise For You!</h1>
      <div className="glass-card p-1 bg-white rounded-3xl overflow-hidden shadow-2xl">
         <CardDesigner initialOccasion="birthday" />
      </div>
      <Link to="/" className="btn-premium px-12 py-4">Create Your Own Card</Link>
    </div>
  );
};

// --- Main App Component with Routing ---
function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white transition-colors duration-500">
        <header className="p-6 flex items-center justify-between max-w-7xl mx-auto sticky top-0 z-50 backdrop-blur-md">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform"><Sparkles className="text-white"/></div>
            <span className="text-2xl font-black tracking-tighter">CARDMUSE</span>
          </Link>
          <nav className="flex gap-8 text-sm font-bold opacity-60 hover:opacity-100 transition-opacity hidden md:flex">
             <Link to="/birthday-card-generator">Birthdays</Link>
             <Link to="/love-card-generator">Love</Link>
             <Link to="/anniversary-card-generator">Anniversaries</Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:categorySlug" element={<LandingPage />} />
          <Route path="/card/:slug" element={<PersonalizedPage />} />
        </Routes>

        <footer className="mt-32 border-t dark:border-neutral-800 p-12 text-center text-sm opacity-50 space-y-4">
           <p>© 2026 CardMuse. All Rights Reserved.</p>
           <div className="flex justify-center gap-6"><Link to="/">Home</Link><Link to="/birthday-card-generator">Sitemap</Link><Link to="/privacy">Privacy</Link></div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
