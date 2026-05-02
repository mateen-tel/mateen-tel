import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const Contact = () => {
  const { t } = useTranslation();

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8 text-center lg:text-start"
          >
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">{t('contact.title')}</h2>
              <div className="w-20 h-1.5 bg-secondary rounded-full mx-auto lg:mx-0"></div>
            </div>
            
            <p className="text-lg text-muted-foreground">
              {t('contact.subtitle')}
            </p>

            <div className="space-y-6">
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold">{t('contact.emailLabel')}</h4>
                  <p className="text-muted-foreground">info@mateen-tel.com</p>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold">{t('contact.phoneLabel')}</h4>
                  <p className="text-muted-foreground">+218 91 000 0000</p>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold">{t('contact.locationLabel')}</h4>
                  <p className="text-muted-foreground">{t('contact.address')}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 bg-muted/30 rounded-3xl border"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('contact.name')}</Label>
                  <Input id="name" placeholder="John Doe" className="bg-background" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t('contact.email')}</Label>
                  <Input id="email" type="email" placeholder="john@example.com" className="bg-background" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">{t('contact.message')}</Label>
                <Textarea id="message" placeholder="How can we help you?" className="bg-background min-h-[150px]" />
              </div>
              <Button className="w-full h-12 gap-2 text-lg">
                {t('contact.send')} <Send className="w-4 h-4" />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
