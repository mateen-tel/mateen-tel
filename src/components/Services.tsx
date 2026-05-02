import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { SITE_DATA } from '@/lib/constants';
import { HardHat, Network, Radio, Wrench, Sun, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DetailModal } from './DetailModal';

const iconMap: Record<string, any> = {
  HardHat,
  Network,
  Radio,
  Wrench,
  Sun
};

export const Services = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as 'en' | 'ar' | 'fr';
  const [selectedService, setSelectedService] = useState<any>(null);

  return (
    <section id="services" className="py-32 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 text-center md:text-start">
          <div className="max-w-2xl mx-auto md:mx-0 space-y-4">
            <div className="text-primary font-bold uppercase tracking-[0.2em] text-xs">{t('services.badge')}</div>
            <h2 className="text-4xl md:text-6xl font-heading font-bold">
              {t('services.title')}
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm mx-auto md:mx-0 text-sm leading-relaxed">
            {t('services.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SITE_DATA.services.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onClick={() => setSelectedService(service)}
                className="group relative bg-card rounded-3xl border border-border/50 p-8 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 overflow-hidden flex flex-col h-full cursor-pointer"
              >
                {/* Watermark Number */}
                <div className="absolute -right-4 -top-8 text-9xl font-heading font-black text-muted/10 group-hover:text-primary/5 transition-colors duration-500 pointer-events-none select-none">
                  0{index + 1}
                </div>

                <div className="relative z-10 flex-1 flex flex-col">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                    <Icon className="w-8 h-8" />
                  </div>
                  
                  <div className="space-y-4 flex-1">
                    <h3 className="text-2xl font-heading font-bold group-hover:text-primary transition-colors duration-300">
                      {service.title[currentLang]}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t(`services.${service.id}.desc`)}
                    </p>
                  </div>

                  <div className="pt-8 mt-auto">
                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary opacity-80 group-hover:opacity-100 transition-opacity">
                      {t('services.learnMore')} <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-1 rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <DetailModal 
        isOpen={!!selectedService} 
        onClose={() => setSelectedService(null)} 
        data={selectedService} 
        type="service" 
      />
    </section>
  );
};
