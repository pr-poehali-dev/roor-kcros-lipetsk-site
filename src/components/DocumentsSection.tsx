import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

const DOCUMENTS_API = 'https://functions.poehali.dev/4ce44caf-e09f-47bf-a97f-8107551e318d';

interface Document {
  id: string;
  title?: string;
  category?: string;
  size: string;
  date: string;
  url: string;
  icon?: string;
}

export default function DocumentsSection() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadForm, setUploadForm] = useState({ 
    title: '', 
    category: 'Учредительные документы', 
    file: null as File | null 
  });
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      const response = await fetch(DOCUMENTS_API);
      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      console.error('Error loading documents:', error);
    }
  };

  const ALLOWED_EXTENSIONS = ['pdf', 'doc', 'docx', 'rtf'];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const ext = file.name.split('.').pop()?.toLowerCase() || '';
      if (ALLOWED_EXTENSIONS.includes(ext)) {
        setUploadForm({ ...uploadForm, file });
      } else {
        alert('Пожалуйста, выберите файл в формате PDF, DOC, DOCX или RTF');
      }
    }
  };

  const handleUpload = async () => {
    if (!uploadForm.file || !uploadForm.title) {
      alert('Заполните все поля');
      return;
    }

    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target?.result?.toString().split(',')[1];
        
        const extension = uploadForm.file?.name.split('.').pop()?.toLowerCase() || 'pdf';

        const response = await fetch(DOCUMENTS_API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: uploadForm.title,
            category: uploadForm.category,
            file: base64,
            extension
          })
        });

        if (response.ok) {
          await loadDocuments();
          setIsUploadModalOpen(false);
          setUploadForm({ title: '', category: 'Учредительные документы', file: null });
          alert('Документ успешно загружен!');
        } else {
          alert('Ошибка загрузки документа');
        }
      };
      reader.readAsDataURL(uploadForm.file);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Ошибка загрузки документа');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (docId: string) => {
    if (!confirm('Удалить документ?')) return;

    try {
      await fetch(`${DOCUMENTS_API}?id=${docId}`, { method: 'DELETE' });
      await loadDocuments();
      alert('Документ удален');
    } catch (error) {
      console.error('Delete error:', error);
      alert('Ошибка удаления документа');
    }
  };

  const getIconForCategory = (category?: string) => {
    if (!category) return 'FileText';
    if (category.includes('Учредительные')) return 'FileText';
    if (category.includes('Договоры')) return 'FileCheck';
    if (category.includes('Лицензионные')) return 'Shield';
    if (category.includes('Регламенты')) return 'BookOpen';
    return 'FileText';
  };

  const DocumentCard = ({ doc, isAdmin }: { doc: Document, isAdmin?: boolean }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name={getIconForCategory(doc.category) as any} size={24} className="text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">{doc.title || 'Без названия'}</h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                {doc.category && <Badge variant="outline">{doc.category}</Badge>}
                <span className="flex items-center gap-1">
                  <Icon name="Calendar" size={14} />
                  {doc.date}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="HardDrive" size={14} />
                  {doc.size}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => window.open(doc.url, '_blank')}>
              <Icon name="Eye" size={16} className="mr-2" />
              Просмотр
            </Button>
            <Button variant="default" size="sm" onClick={() => window.open(doc.url, '_blank')}>
              <Icon name="Download" size={16} className="mr-2" />
              Скачать
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl">
      <div>
        <h2 className="text-3xl font-bold text-secondary mb-4">Документы</h2>
        <div className="h-1 w-20 bg-primary rounded mb-6"></div>
        <p className="text-muted-foreground mb-8">
          Нормативные акты, учредительные документы, договоры и регламенты организации
        </p>
      </div>

      {isUploadModalOpen && (
        <Card className="border-primary">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Загрузить новый документ</h3>
                <Button variant="ghost" size="sm" onClick={() => setIsUploadModalOpen(false)}>
                  <Icon name="X" size={20} />
                </Button>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Название документа</label>
                <Input
                  placeholder="Введите название"
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Категория</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={uploadForm.category}
                  onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value })}
                >
                  <option>Учредительные документы</option>
                  <option>Договоры и соглашения</option>
                  <option>Лицензионные требования</option>
                  <option>Регламенты и инструкции</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Файл документа (PDF, DOC, DOCX, RTF)</label>
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx,.rtf"
                  onChange={handleFileSelect}
                />
                {uploadForm.file && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Выбран файл: {uploadForm.file.name}
                  </p>
                )}
              </div>

              <Button 
                onClick={handleUpload} 
                disabled={isUploading || !uploadForm.file || !uploadForm.title}
                className="w-full"
              >
                {isUploading ? 'Загрузка...' : 'Загрузить документ'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="all">Все документы ({documents.length})</TabsTrigger>
          <TabsTrigger value="founding">
            Учредительные ({documents.filter(d => d.category?.includes('Учредительные')).length})
          </TabsTrigger>
          <TabsTrigger value="contracts">
            Договоры ({documents.filter(d => d.category?.includes('Договоры')).length})
          </TabsTrigger>
          <TabsTrigger value="license">
            Лицензирование ({documents.filter(d => d.category?.includes('Лицензионные')).length})
          </TabsTrigger>
          <TabsTrigger value="regulations">
            Регламенты ({documents.filter(d => d.category?.includes('Регламенты')).length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {documents.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Icon name="FileX" size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Документы пока не загружены</p>
              </CardContent>
            </Card>
          ) : (
            documents.map((doc) => <DocumentCard key={doc.id} doc={doc} />)
          )}
        </TabsContent>

        <TabsContent value="founding" className="space-y-4">
          {documents.filter(d => d.category?.includes('Учредительные')).map((doc) => (
            <DocumentCard key={doc.id} doc={doc} />
          ))}
        </TabsContent>

        <TabsContent value="contracts" className="space-y-4">
          {documents.filter(d => d.category?.includes('Договоры')).map((doc) => (
            <DocumentCard key={doc.id} doc={doc} />
          ))}
        </TabsContent>

        <TabsContent value="license" className="space-y-4">
          {documents.filter(d => d.category?.includes('Лицензионные')).map((doc) => (
            <DocumentCard key={doc.id} doc={doc} />
          ))}
        </TabsContent>

        <TabsContent value="regulations" className="space-y-4">
          {documents.filter(d => d.category?.includes('Регламенты')).map((doc) => (
            <DocumentCard key={doc.id} doc={doc} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}