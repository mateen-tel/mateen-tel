import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Copy, Check, Trash2, Plus, ArrowUp, ArrowDown, Upload, ImageIcon } from 'lucide-react';

interface HiddenCMSProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthorized: boolean;
  onAuthorize: (pin: string) => boolean;
  data: any;
  onUpdate: (newData: any) => void;
}

export const HiddenCMS: React.FC<HiddenCMSProps> = ({
  isOpen,
  onClose,
  isAuthorized,
  onAuthorize,
  data,
  onUpdate
}) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (onAuthorize(pin)) {
      setError('');
    } else {
      setError('رمز PIN غير صحيح / Invalid PIN');
    }
  };

  const copyToClipboard = () => {
    const code = `export const SITE_DATA = ${JSON.stringify(data, null, 2)};`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImageUpload = (index: number, section: 'projects' | 'services', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newData = { ...data };
        newData[section][index].image = reader.result as string;
        onUpdate(newData);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateField = (section: 'projects' | 'services', index: number, field: string, lang: string | null, value: string) => {
    const newData = { ...data };
    if (lang) {
      newData[section][index][field][lang] = value;
    } else {
      newData[section][index][field] = value;
    }
    onUpdate(newData);
  };

  const moveItem = (section: 'projects' | 'services', index: number, direction: 'up' | 'down') => {
    const newData = { ...data };
    if (direction === 'up' && index > 0) {
      const temp = newData[section][index];
      newData[section][index] = newData[section][index - 1];
      newData[section][index - 1] = temp;
    } else if (direction === 'down' && index < newData[section].length - 1) {
      const temp = newData[section][index];
      newData[section][index] = newData[section][index + 1];
      newData[section][index + 1] = temp;
    }
    onUpdate(newData);
  };

  const deleteItem = (section: 'projects' | 'services', index: number) => {
    const newData = { ...data };
    newData[section].splice(index, 1);
    onUpdate(newData);
  };

  const addItem = (section: 'projects' | 'services') => {
    const newData = { ...data };
    if (section === 'projects') {
      newData.projects.push({
        id: `new_${Date.now()}`,
        title: { en: 'New Project', ar: 'مشروع جديد', fr: 'Nouveau Projet' },
        description: { en: '', ar: '', fr: '' },
        longDescription: { en: '', ar: '', fr: '' },
        image: '',
        category: { en: 'General', ar: 'عام', fr: 'Général' },
        stats: ''
      });
    } else {
      newData.services.push({
        id: `new_${Date.now()}`,
        title: { en: 'New Service', ar: 'خدمة جديدة', fr: 'Nouveau Service' },
        icon: 'Settings'
      });
    }
    onUpdate(newData);
  };

  // COMPLETELY DISABLE IN PRODUCTION - Return null immediately
  if (import.meta.env.PROD) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto" dir="ltr">
        <DialogHeader>
          <DialogTitle>Hidden CMS - نظام إدارة المحتوى المخفي</DialogTitle>
          <DialogDescription>
            Manage content locally. Changes require copying code to constants.ts file.
            <br />
            إدارة المحتوى محليًا. التعديلات تتطلب نسخ الكود إلى ملف constants.ts
          </DialogDescription>
        </DialogHeader>

        {!isAuthorized ? (
          <form onSubmit={handleAuth} className="space-y-4 py-8">
            <div className="space-y-2">
              <Label htmlFor="pin" className="text-center block">
                أدخل رمز PIN / Enter PIN Code
              </Label>
              <Input
                id="pin"
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="••••"
                maxLength={4}
                className="text-center text-2xl tracking-widest"
                inputMode="numeric"
              />
              {error && <p className="text-sm text-destructive text-center">{error}</p>}
            </div>
            <Button type="submit" className="w-full">دخول / Enter</Button>
          </form>
        ) : (
          <div className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="projects">المشاريع / Projects</TabsTrigger>
                <TabsTrigger value="services">الخدمات / Services</TabsTrigger>
              </TabsList>

              <TabsContent value="projects" className="space-y-4 mt-4">
                {data.projects.map((project: any, index: number) => (
                  <Card key={project.id || index} className="border-2">
                    <CardContent className="pt-6 space-y-4">
                      {/* Header with controls */}
                      <div className="flex justify-between items-center border-b pb-4">
                        <h4 className="font-bold text-lg">{project.title.en || `Project #${index + 1}`}</h4>
                        <div className="flex gap-1">
                          <Button size="icon" variant="ghost" onClick={() => moveItem('projects', index, 'up')} disabled={index === 0}>
                            <ArrowUp className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={() => moveItem('projects', index, 'down')} disabled={index === data.projects.length - 1}>
                            <ArrowDown className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="destructive" onClick={() => deleteItem('projects', index)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Image Upload */}
                      <div className="space-y-2">
                        <Label>الصورة / Image</Label>
                        <div className="flex items-center gap-4">
                          {project.image ? (
                            <img src={project.image} alt="Preview" className="w-20 h-20 object-cover rounded-lg" />
                          ) : (
                            <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center">
                              <ImageIcon className="w-8 h-8 text-muted-foreground" />
                            </div>
                          )}
                          <div className="flex-1">
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(index, 'projects', e)}
                              className="cursor-pointer"
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              Upload image or paste URL in field below
                            </p>
                          </div>
                        </div>
                        <Input
                          value={project.image}
                          onChange={(e) => updateField('projects', index, 'image', null, e.target.value)}
                          placeholder="Image URL or Base64"
                          className="mt-2"
                        />
                      </div>

                      {/* Titles */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>العنوان (English)</Label>
                          <Input
                            value={project.title.en}
                            onChange={(e) => updateField('projects', index, 'title', 'en', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>العنوان (العربية)</Label>
                          <Input
                            value={project.title.ar}
                            onChange={(e) => updateField('projects', index, 'title', 'ar', e.target.value)}
                            dir="rtl"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Titre (Français)</Label>
                          <Input
                            value={project.title.fr}
                            onChange={(e) => updateField('projects', index, 'title', 'fr', e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Descriptions */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>الوصف المختصر (English)</Label>
                          <Textarea
                            value={project.description?.en || ''}
                            onChange={(e) => updateField('projects', index, 'description', 'en', e.target.value)}
                            rows={3}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>الوصف المختصر (العربية)</Label>
                          <Textarea
                            value={project.description?.ar || ''}
                            onChange={(e) => updateField('projects', index, 'description', 'ar', e.target.value)}
                            dir="rtl"
                            rows={3}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Description courte (Français)</Label>
                          <Textarea
                            value={project.description?.fr || ''}
                            onChange={(e) => updateField('projects', index, 'description', 'fr', e.target.value)}
                            rows={3}
                          />
                        </div>
                      </div>

                      {/* Category & Stats */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>الفئة (English)</Label>
                          <Input
                            value={project.category?.en || ''}
                            onChange={(e) => updateField('projects', index, 'category', 'en', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>الإحصائيات / Stats</Label>
                          <Input
                            value={project.stats || ''}
                            onChange={(e) => updateField('projects', index, 'stats', null, e.target.value)}
                            placeholder="e.g., 100+ Sites"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Button variant="outline" className="w-full" onClick={() => addItem('projects')}>
                  <Plus className="w-4 h-4 mr-2" /> إضافة مشروع / Add Project
                </Button>
              </TabsContent>

              <TabsContent value="services" className="space-y-4 mt-4">
                {data.services.map((service: any, index: number) => (
                  <Card key={service.id || index} className="border-2">
                    <CardContent className="pt-6 space-y-4">
                      <div className="flex justify-between items-center border-b pb-4">
                        <h4 className="font-bold text-lg">{service.title.en || `Service #${index + 1}`}</h4>
                        <div className="flex gap-1">
                          <Button size="icon" variant="ghost" onClick={() => moveItem('services', index, 'up')} disabled={index === 0}>
                            <ArrowUp className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={() => moveItem('services', index, 'down')} disabled={index === data.services.length - 1}>
                            <ArrowDown className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="destructive" onClick={() => deleteItem('services', index)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>العنوان (English)</Label>
                          <Input
                            value={service.title.en}
                            onChange={(e) => updateField('services', index, 'title', 'en', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>العنوان (العربية)</Label>
                          <Input
                            value={service.title.ar}
                            onChange={(e) => updateField('services', index, 'title', 'ar', e.target.value)}
                            dir="rtl"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Titre (Français)</Label>
                          <Input
                            value={service.title.fr}
                            onChange={(e) => updateField('services', index, 'title', 'fr', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>اسم الأيقونة / Icon Name</Label>
                        <Input
                          value={service.icon}
                          onChange={(e) => updateField('services', index, 'icon', null, e.target.value)}
                          placeholder="e.g., HardHat, Wrench, Network..."
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Button variant="outline" className="w-full" onClick={() => addItem('services')}>
                  <Plus className="w-4 h-4 mr-2" /> إضافة خدمة / Add Service
                </Button>
              </TabsContent>
            </Tabs>

            <div className="pt-4 border-t flex flex-col gap-4">
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Instructions / تعليمات:</strong><br/>
                  1. Edit content above / قم بتعديل المحتوى أعلاه<br/>
                  2. Click "Copy Updated Code" / انقر "نسخ الكود المحدث"<br/>
                  3. Paste into <code>src/lib/constants.ts</code> / الصق في الملف<br/>
                  4. Save and redeploy / احفظ وأعد النشر
                </p>
              </div>
              <div className="flex justify-end">
                <Button onClick={copyToClipboard} className="gap-2" size="lg">
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  {copied ? 'تم النسخ! / Copied!' : 'نسخ الكود المحدث / Copy Updated Code'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
