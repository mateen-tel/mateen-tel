import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background Grid Pattern - Static for performance */}
      <div className="absolute inset-0 z-0 grid-pattern opacity-10"></div>

      {/* Static Gradient Orbs - No animation for better performance */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]"></div>

      <div className="container mx-auto px-4 z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-8 text-center lg:text-start w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ willChange: 'transform, opacity' }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" style={{ animationDuration: '2s' }}></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                {t('hero.badge')}
              </div>
              <h1 className="text-4xl md:text-7xl lg:text-8xl font-heading font-bold leading-[1.4] mb-6">
                {t('hero.title').split(' ').map((word, i) => (
                  <span key={i} className={i === 1 ? "text-primary" : ""}>
                    {word}{' '}
                  </span>
                ))}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground lg:max-w-3xl leading-relaxed mx-auto lg:mx-0">
                {t('hero.subtitle')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ willChange: 'transform, opacity' }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <Button size="lg" className="rounded-full px-8 h-14 text-base font-semibold group">
                {t('hero.cta')}
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-base font-semibold glass">
                {t('nav.about')}
              </Button>
            </motion.div>

            {/* Stats - Simpler animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="grid grid-cols-3 gap-8 pt-8 border-t border-border/40"
            >
              <div>
                <div className="text-3xl font-bold font-heading">15+</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">{t('hero.stats.years')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold font-heading">200+</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">{t('hero.stats.projects')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold font-heading">50+</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">{t('hero.stats.partners')}</div>
              </div>
            </motion.div>
          </div>

          {/* Visual Element - Optimized */}
          <div className="relative hidden lg:block lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ willChange: 'transform, opacity' }}
              className="relative z-10"
            >
              <div className="aspect-square rounded-3xl overflow-hidden border border-border/40 glass p-8">
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 grid-pattern opacity-20"></div>
                  {/* Simplified floating animation - GPU accelerated */}
                  <div className="float-animation" style={{ willChange: 'transform' }}>
                    <div className="w-48 h-48 md:w-56 md:h-56 rounded-full border-2 border-primary/30 flex items-center justify-center p-4">
                      <div className="w-full h-full rounded-full border-4 border-secondary/30 flex items-center justify-center p-4">
                        <div className="w-full h-full rounded-full bg-primary/10 backdrop-blur-sm flex items-center justify-center">
                          <div className="text-primary font-heading font-bold text-5xl md:text-6xl">M</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Cards - CSS animation instead of JS */}
              <div className="absolute -top-4 -right-4 glass p-3 rounded-2xl border-border/40 shadow-xl float-card-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-secondary"></div>
                  </div>
                  <div>
                    <div className="text-xs font-bold">{t('hero.status.network')}</div>
                    <div className="text-[10px] text-muted-foreground uppercase">{t('hero.status.performance')}</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 glass p-3 rounded-2xl border-border/40 shadow-xl float-card-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs font-bold">{t('hero.status.newProject')}</div>
                    <div className="text-[10px] text-muted-foreground uppercase">{t('hero.status.smartInfra')}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Simplified */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold">{t('hero.scroll')}</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </motion.div>

      {/* CSS Animations for performance */}
      <style>{`
        .float-animation {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .float-card-1 {
          animation: floatCard1 5s ease-in-out infinite;
        }
        @keyframes floatCard1 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .float-card-2 {
          animation: floatCard2 5s ease-in-out infinite;
          animation-delay: 2.5s;
        }
        @keyframes floatCard2 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
      `}</style>
    </section>
  );
};
