import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { HiddenCMS } from './components/cms/HiddenCMS';
import { useCMS } from './hooks/useCMS';
import { SITE_DATA as INITIAL_DATA } from './lib/constants';

export default function App() {
  const { i18n } = useTranslation();
  const [siteData, setSiteData] = useState(INITIAL_DATA);
  const { isOpen, setIsOpen, isAuthorized, authorize, handleTrigger } = useCMS();

  // Theme detection and listener
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const initialTheme = savedTheme || systemTheme;
    
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
    
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      // Only follow system if user hasn't manually set a preference
      if (!localStorage.getItem("theme")) {
        const newTheme = e.matches ? "dark" : "light";
        document.documentElement.classList.toggle("dark", newTheme === "dark");
      }
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Sync document direction and language with i18n
  useEffect(() => {
    const currentLang = i18n.language;
    if (!currentLang || currentLang === 'en') return; // Skip if not initialized yet

    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.body.style.textAlign = currentLang === 'ar' ? 'right' : 'left';
  }, [i18n.language]);

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Contact />
      </main>

      <Footer onTriggerCMS={handleTrigger} />

      <HiddenCMS
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        isAuthorized={isAuthorized}
        onAuthorize={authorize}
        data={siteData}
        onUpdate={setSiteData}
      />
    </div>
  );
}
