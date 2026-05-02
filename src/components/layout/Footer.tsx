import React from 'react';
import { useTranslation } from 'react-i18next';
import { Logo } from './Logo';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onTriggerCMS: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onTriggerCMS }) => {
  const { t } = useTranslation();

  return (
    <footer className="bg-muted/30 border-t border-border/40">
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="cursor-pointer group" onClick={onTriggerCMS}>
              <Logo className="h-10 w-auto transition-transform group-hover:scale-105" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {t('footer.desc')}
            </p>
            <div className="flex items-center gap-4">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all duration-300">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-heading font-bold text-lg mb-6 uppercase tracking-wider">{t('nav.services')}</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              {[
                t('services.civil.title'),
                t('services.planning.title'),
                t('services.implementation.title'),
                t('services.solar.title')
              ].map((item) => (
                <li key={item}>
                  <a href="#services" className="hover:text-primary transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-6 uppercase tracking-wider">{t('footer.quickLinks')}</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              {[
                { name: t('nav.about'), href: '#about' },
                { name: t('nav.projects'), href: '#projects' },
                { name: t('nav.contact'), href: '#contact' },
                { name: t('footer.careers'), href: '#' },
                { name: t('footer.privacy'), href: '#' }
              ].map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="hover:text-primary transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary/40"></span>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-6 uppercase tracking-wider">{t('nav.contact')}</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>info@mateen-tel.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>+218 91 000 0000</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>{t('footer.address')}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-20 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground uppercase tracking-widest font-bold">
          <p>© {new Date().getFullYear()} AL-Mateen Company. {t('footer.rights')}</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary transition-colors">{t('footer.terms')}</a>
            <a href="#" className="hover:text-primary transition-colors">{t('footer.privacy')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
