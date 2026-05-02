import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { CheckCircle2, Shield, Zap, Globe } from 'lucide-react';

export const About = () => {
  const { t } = useTranslation();

  const features = [
    { icon: Shield, title: t('about.features.reliability.title'), desc: t('about.features.reliability.desc') },
    { icon: Zap, title: t('about.features.innovation.title'), desc: t('about.features.innovation.desc') },
    { icon: Globe, title: t('about.features.reach.title'), desc: t('about.features.reach.desc') },
  ];

  return (
    <section id="about" className="py-32 bg-muted/20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl relative group">
              <img 
                src="https://picsum.photos/seed/telecom-tower/1000/1250" 
                alt="MATEEN-TEL Infrastructure" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
              
              {/* Overlay Content */}
              <div className="absolute bottom-10 left-10 right-10 text-white">
                <div className="text-5xl font-heading font-bold mb-2">{t('about.since')}</div>
                <p className="text-white/80 max-w-xs">{t('about.backbone')}</p>
              </div>
            </div>
            
            {/* Decorative Grid */}
            <div className="absolute -top-10 -left-10 w-40 h-40 grid-pattern opacity-20 -z-10"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 grid-pattern opacity-20 -z-10"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-10 text-center lg:text-start"
          >
            <div className="space-y-4">
              <div className="text-primary font-bold uppercase tracking-[0.2em] text-xs">{t('about.badge')}</div>
              <h2 className="text-4xl md:text-6xl font-heading font-bold leading-[1.2]">
                {t('about.title')}
              </h2>
            </div>
            
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p className="text-foreground font-medium">{t('about.description1')}</p>
              <p>{t('about.description2')}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-3 flex flex-col items-center lg:items-start">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-xl">{t('about.vision')}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t('about.visionText')}</p>
              </div>
              <div className="space-y-3 flex flex-col items-center lg:items-start">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-xl">{t('about.mission')}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t('about.missionText')}</p>
              </div>
            </div>

            <div className="pt-8 border-t border-border/40 flex flex-wrap gap-12 justify-center lg:justify-start">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <f.icon className="w-5 h-5 text-primary" />
                  <span className="text-sm font-bold uppercase tracking-wider">{f.title}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
