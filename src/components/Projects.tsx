import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { SITE_DATA } from '@/lib/constants';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { DetailModal } from './DetailModal';

export const Projects = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as 'en' | 'ar' | 'fr';
  const [selectedProject, setSelectedProject] = useState<any>(null);

  return (
    <section id="projects" className="py-32 bg-muted/20 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20 text-center md:text-start">
          <div className="max-w-2xl mx-auto md:mx-0 space-y-4">
            <div className="text-primary font-bold uppercase tracking-[0.2em] text-xs">{t('projects.badge')}</div>
            <h2 className="text-4xl md:text-6xl font-heading font-bold">
              {t('projects.title')}
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm mx-auto md:mx-0 text-sm leading-relaxed">
            {t('projects.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {SITE_DATA.projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onClick={() => setSelectedProject(project)}
              className="cursor-pointer"
            >
              <Card className="group overflow-hidden h-full border-border/40 glass hover:border-primary/40 transition-all duration-500">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title[currentLang]} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <ExternalLink className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-secondary/90 text-secondary-foreground backdrop-blur-sm border-none shadow-lg">
                      {project.category[currentLang]}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-2xl font-heading font-bold group-hover:text-primary transition-colors duration-300">
                      {project.title[currentLang]}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                      {project.description[currentLang]}
                    </p>
                  </div>
                  
                  <div className="pt-6 flex items-center justify-between border-t border-border/40">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block">{t('projects.impact')}</span>
                      <span className="text-lg font-heading font-bold text-primary">{project.stats}</span>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <DetailModal 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
        data={selectedProject} 
        type="project" 
      />
    </section>
  );
};
