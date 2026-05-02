import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { MapPin, Target, HardHat, Network, Radio, Wrench, Sun } from 'lucide-react';

const iconMap: Record<string, any> = {
  HardHat,
  Network,
  Radio,
  Wrench,
  Sun
};

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  type: 'service' | 'project';
}

export const DetailModal = ({ isOpen, onClose, data, type }: DetailModalProps) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as 'en' | 'ar' | 'fr';

  if (!data) return null;

  const title = data.title[currentLang];
  const description = type === 'service' ? t(`services.${data.id}.desc`) : data.description[currentLang];
  const longDescription = type === 'service' ? t(`services.${data.id}.longDesc`) : data.longDescription?.[currentLang] || description;
  const Icon = type === 'service' ? iconMap[data.icon] : null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-[92vw] max-h-[85vh] p-0 gap-0 rounded-2xl border border-border/50 bg-background/95 backdrop-blur-xl overflow-hidden shadow-2xl">
        {/* Scrollable Content Container - Hidden Scrollbar */}
        <div className="overflow-y-auto max-h-[85vh] scrollbar-hide">
          <div className="flex flex-col">
            {/* Header Area - Reduced Height */}
            <div className="relative w-full h-40 md:h-56 shrink-0">
              {type === 'project' ? (
                <img
                  src={data.image}
                  alt={title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl bg-background/80 shadow-lg flex items-center justify-center text-primary">
                    {Icon && <Icon className="w-8 h-8 md:w-12 md:h-12" />}
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

              {type === 'project' && (
                <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4">
                  <Badge className="bg-primary text-primary-foreground shadow-lg border-none px-3 py-1 text-xs">
                    {data.category[currentLang]}
                  </Badge>
                </div>
              )}
            </div>

            {/* Content Area - Compact Padding */}
            <div className="px-5 py-5 md:px-8 md:py-6 space-y-4">
              <div className="space-y-3">
                <DialogHeader className="text-start p-0">
                  <DialogTitle className="text-xl md:text-2xl font-bold leading-tight text-foreground">
                    {title}
                  </DialogTitle>
                </DialogHeader>

                {type === 'project' && (
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5 bg-muted px-2.5 py-1 rounded-full">
                      <Target className="w-3 h-3 text-primary" />
                      <span>{data.stats}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-muted px-2.5 py-1 rounded-full">
                      <MapPin className="w-3 h-3 text-primary" />
                      <span>{t('contact.address')}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {longDescription}
                </p>

                {type === 'service' && (
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    {['Reliability', 'Efficiency', 'Scalability', 'Innovation'].map((item) => (
                      <div key={item} className="flex items-center gap-2 p-2.5 rounded-xl bg-muted/50 border border-border/30">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        <span className="font-medium text-xs md:text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Custom Scrollbar Styles */}
        <style>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </DialogContent>
    </Dialog>
  );
};
