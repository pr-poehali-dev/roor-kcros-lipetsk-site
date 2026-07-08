import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import DocumentsSection from '@/components/DocumentsSection';
import AdminPanel from '@/components/AdminPanel';
import RegistrySection from '@/components/RegistrySection';

interface NewsItem {
  id: number;
  title: string;
  date: string;
  image?: string;
  images?: string[];
  video?: string;
  excerpt: string;
  fullText: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface MainContentProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  newsData: NewsItem[];
  formData: FormData;
  setFormData: (data: FormData) => void;
  formStatus: 'idle' | 'sending' | 'success' | 'error';
  setFormStatus: (status: 'idle' | 'sending' | 'success' | 'error') => void;
  formMessage: string;
  setFormMessage: (message: string) => void;
}

const MainContent = ({
  activeSection,
  setActiveSection,
  newsData,
  formData,
  setFormData,
  formStatus,
  setFormStatus,
  formMessage,
  setFormMessage,
}: MainContentProps) => {
  return (
      <main className="container mx-auto px-4 py-8">
        {activeSection === 'home' && (
          <div className="space-y-8 animate-fade-in">
            <section className="bg-gradient-to-br from-primary/10 to-accent/5 rounded-lg p-8 md:p-12">
              <div className="max-w-3xl">
                <div className="flex items-start gap-4 mb-6">
                  <img src="https://cdn.poehali.dev/files/%D0%A0%D0%9E%D0%9E%D0%A0%20%D0%93%D0%B5%D1%80%D0%B1.png" alt="РООР КЦРОС" className="h-20 w-auto" />
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-2">
                      Региональное отраслевое объединение работодателей
                    </h2>
                  </div>
                </div>
                <p className="text-lg text-muted-foreground mb-6 ml-24">
                  Координационный центр руководителей охранных структур Липецкой области
                </p>
                <div className="flex flex-wrap gap-4 ml-24">
                  <Button onClick={() => setActiveSection('registry')} size="lg" className="shadow-md">
                    <Icon name="Database" size={20} className="mr-2" />
                    Реестры организаций
                  </Button>
                  <Button onClick={() => setActiveSection('about')} variant="outline" size="lg">
                    Подробнее
                  </Button>
                </div>
              </div>
            </section>

            <section className="grid md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-2 p-1">
                    <img src="https://cdn.poehali.dev/files/%D0%A0%D0%9E%D0%9E%D0%A0%20%D0%93%D0%B5%D1%80%D0%B1.png" alt="Документы" className="h-full w-auto" />
                  </div>
                  <CardTitle>Документы</CardTitle>
                  <CardDescription>Нормативные акты и регламенты</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="link" className="p-0 h-auto" onClick={() => setActiveSection('documents')}>
                    Перейти к документам
                    <Icon name="ArrowRight" size={16} className="ml-2" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-2 p-1">
                    <img src="https://cdn.poehali.dev/files/%D0%A0%D0%9E%D0%9E%D0%A0%20%D0%93%D0%B5%D1%80%D0%B1.png" alt="Реестры" className="h-full w-auto" />
                  </div>
                  <CardTitle>Реестры</CardTitle>
                  <CardDescription>База данных организаций региона</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="link" className="p-0 h-auto" onClick={() => setActiveSection('registry')}>
                    Открыть реестры
                    <Icon name="ArrowRight" size={16} className="ml-2" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-2 p-1">
                    <img src="https://cdn.poehali.dev/files/%D0%A0%D0%9E%D0%9E%D0%A0%20%D0%93%D0%B5%D1%80%D0%B1.png" alt="Новости" className="h-full w-auto" />
                  </div>
                  <CardTitle>Новости</CardTitle>
                  <CardDescription>События и объявления</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="link" className="p-0 h-auto" onClick={() => setActiveSection('news')}>
                    Читать новости
                    <Icon name="ArrowRight" size={16} className="ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-secondary mb-4">Последние новости</h3>
              <div className="grid gap-6">
                {newsData.slice(0, 1).map((news) => (
                  <Card key={news.id} className="hover:shadow-lg transition-shadow overflow-hidden cursor-pointer" onClick={() => setActiveSection('news')}>
                    {news.image && (
                      <div className="w-full h-48 overflow-hidden bg-gray-100">
                        <img 
                          src={news.image} 
                          alt={news.title}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">{news.date}</Badge>
                      </div>
                      <CardTitle className="text-lg">{news.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground line-clamp-3">{news.excerpt}</p>
                      <Button variant="link" className="p-0 h-auto mt-2">
                        Читать далее
                        <Icon name="ArrowRight" size={16} className="ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeSection === 'about' && (
          <div className="space-y-8 animate-fade-in max-w-4xl">
            <div>
              <h2 className="text-3xl font-bold text-secondary mb-4">О организации</h2>
              <div className="h-1 w-20 bg-primary rounded mb-6"></div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Target" size={24} className="text-primary" />
                  Миссия организации
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  РООР КЦРОС Липецкой области — региональное отраслевое объединение работодателей, координирующее
                  деятельность руководителей охранных структур региона.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Мы работаем над развитием охранной отрасли, повышением профессионального уровня специалистов
                  и обеспечением безопасности объектов на территории Липецкой области.
                </p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Users" size={24} className="text-primary" />
                    Наши задачи
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Icon name="CheckCircle2" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">Координация деятельности охранных организаций</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="CheckCircle2" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">Ведение реестров охранных предприятий</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="CheckCircle2" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">Методическая и правовая поддержка участников</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="CheckCircle2" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">Профессиональная подготовка и аттестация</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Award" size={24} className="text-primary" />
                    Ключевые направления
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Icon name="ShieldCheck" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">Физическая охрана объектов</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Video" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">Технические средства безопасности</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="GraduationCap" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">Обучение охранников</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Network" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">Взаимодействие с органами власти</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeSection === 'registry' && (
          <div className="animate-fade-in max-w-6xl">
            <RegistrySection />
          </div>
        )}

        {activeSection === 'news' && (
          <div className="space-y-6 animate-fade-in max-w-4xl">
            <div>
              <h2 className="text-3xl font-bold text-secondary mb-4">Новости</h2>
              <div className="h-1 w-20 bg-primary rounded mb-6"></div>
            </div>

            <div className="space-y-6">
              {newsData.map((news) => (
                <Card key={news.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                  {news.image && (
                    <div className="w-full h-64 overflow-hidden bg-gray-100">
                      <img 
                        src={news.image} 
                        alt={news.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  {news.images && news.images.length > 0 && (
                    <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-2 p-4 bg-gray-50">
                      {news.images.map((img, idx) => (
                        <div key={idx} className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                          <img 
                            src={img} 
                            alt={`${news.title} - фото ${idx + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        <Icon name="Calendar" size={14} className="mr-1" />
                        {news.date}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl">{news.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {news.video && (
                      <div className="w-full rounded-lg overflow-hidden mb-4 bg-gray-100 flex items-center justify-center p-4">
                        <a 
                          href={news.video}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 bg-primary text-white px-6 py-4 rounded-lg hover:bg-primary/90 transition-colors"
                        >
                          <Icon name="Video" size={24} />
                          <span className="font-medium">Смотреть видео на VK</span>
                          <Icon name="ExternalLink" size={18} />
                        </a>
                      </div>
                    )}
                    {news.fullText && (
                      <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                        {news.fullText}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'documents' && <DocumentsSection />}

        {false && (
          <div className="space-y-6 animate-fade-in max-w-6xl">
            <div>
              <h2 className="text-3xl font-bold text-secondary mb-4">Документы</h2>
              <div className="h-1 w-20 bg-primary rounded mb-6"></div>
              <p className="text-muted-foreground mb-8">
                Нормативные акты, учредительные документы, договоры и регламенты организации
              </p>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-6">
                <TabsTrigger value="all">Все документы</TabsTrigger>
                <TabsTrigger value="founding">Учредительные</TabsTrigger>
                <TabsTrigger value="contracts">Договоры</TabsTrigger>
                <TabsTrigger value="license">Лицензирование</TabsTrigger>
                <TabsTrigger value="regulations">Регламенты</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {documentsData.map((doc) => (
                  <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon name={doc.icon as any} size={24} className="text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-1">{doc.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <Badge variant="outline">{doc.category}</Badge>
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
                          <Button variant="outline" size="sm">
                            <Icon name="Eye" size={16} className="mr-2" />
                            Просмотр
                          </Button>
                          <Button variant="default" size="sm">
                            <Icon name="Download" size={16} className="mr-2" />
                            Скачать
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="founding" className="space-y-4">
                {documentsData.filter(doc => doc.category === 'Учредительные документы').map((doc) => (
                  <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon name={doc.icon as any} size={24} className="text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-1">{doc.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <Badge variant="outline">{doc.category}</Badge>
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
                          <Button variant="outline" size="sm">
                            <Icon name="Eye" size={16} className="mr-2" />
                            Просмотр
                          </Button>
                          <Button variant="default" size="sm">
                            <Icon name="Download" size={16} className="mr-2" />
                            Скачать
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="contracts" className="space-y-4">
                {documentsData.filter(doc => doc.category === 'Договоры и соглашения').map((doc) => (
                  <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon name={doc.icon as any} size={24} className="text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-1">{doc.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <Badge variant="outline">{doc.category}</Badge>
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
                          <Button variant="outline" size="sm">
                            <Icon name="Eye" size={16} className="mr-2" />
                            Просмотр
                          </Button>
                          <Button variant="default" size="sm">
                            <Icon name="Download" size={16} className="mr-2" />
                            Скачать
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="license" className="space-y-4">
                {documentsData.filter(doc => doc.category === 'Лицензионные требования').map((doc) => (
                  <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon name={doc.icon as any} size={24} className="text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-1">{doc.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <Badge variant="outline">{doc.category}</Badge>
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
                          <Button variant="outline" size="sm">
                            <Icon name="Eye" size={16} className="mr-2" />
                            Просмотр
                          </Button>
                          <Button variant="default" size="sm">
                            <Icon name="Download" size={16} className="mr-2" />
                            Скачать
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="regulations" className="space-y-4">
                {documentsData.filter(doc => doc.category === 'Регламенты и инструкции').map((doc) => (
                  <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon name={doc.icon as any} size={24} className="text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-1">{doc.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <Badge variant="outline">{doc.category}</Badge>
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
                          <Button variant="outline" size="sm">
                            <Icon name="Eye" size={16} className="mr-2" />
                            Просмотр
                          </Button>
                          <Button variant="default" size="sm">
                            <Icon name="Download" size={16} className="mr-2" />
                            Скачать
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        )}

        {activeSection === 'admin' && (
          <div className="animate-fade-in max-w-6xl">
            <AdminPanel />
          </div>
        )}

        {activeSection === 'contacts' && (
          <div className="space-y-6 animate-fade-in max-w-4xl">
            <div>
              <h2 className="text-3xl font-bold text-secondary mb-4">Контакты</h2>
              <div className="h-1 w-20 bg-primary rounded mb-6"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="MapPin" size={24} className="text-primary" />
                    Адрес
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    398001, Липецкая область,<br />
                    г. Липецк, ул. Тельмана, д. 92, оф. 1
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon name="Phone" size={18} className="text-primary" />
                      <span className="text-muted-foreground">+7-919-161-00-30</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Mail" size={18} className="text-primary" />
                      <span className="text-muted-foreground">roorktsros@yandex.ru</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="User" size={24} className="text-primary" />
                    Руководство
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-primary/20">
                      <img 
                        src="https://cdn.poehali.dev/files/dsc_9278.jpg" 
                        alt="Воронов Сергей Викторович"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">Председатель РООР КЦРОС</p>
                    <p className="text-sm text-muted-foreground mb-2">по Липецкой области</p>
                    <p className="font-semibold text-lg">Воронов Сергей Викторович</p>
                  </div>
                  <div className="flex items-center justify-center gap-2 pt-2">
                    <Icon name="Phone" size={18} className="text-primary" />
                    <span className="text-muted-foreground">+7-919-161-00-30</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Map" size={24} className="text-primary" />
                  Как нас найти
                </CardTitle>
                <CardDescription>г. Липецк, ул. Тельмана, д. 92, оф. 1</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full h-[400px] rounded-lg overflow-hidden border border-border">
                  <iframe
                    src="https://yandex.ru/map-widget/v1/?ll=39.588305%2C52.621549&z=17&pt=39.588305%2C52.621549%2Cpm2rdm"
                    width="100%"
                    height="400"
                    frameBorder="0"
                    allowFullScreen
                    className="w-full h-full"
                    title="Карта расположения офиса"
                  />
                </div>
                <div className="mt-4 flex items-start gap-2 text-sm text-muted-foreground">
                  <Icon name="MapPin" size={18} className="text-primary mt-0.5 flex-shrink-0" />
                  <span>398001, Липецкая область, г. Липецк, ул. Тельмана, д. 92, офис 1</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Отправить сообщение</CardTitle>
                <CardDescription>Заполните форму, и мы свяжемся с вами в ближайшее время</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={async (e) => {
                  e.preventDefault();
                  setFormStatus('sending');
                  setFormMessage('');
                  
                  try {
                    const response = await fetch('https://functions.poehali.dev/b1b9bfcc-d198-490f-a800-1d221a817352', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(formData)
                    });
                    
                    const result = await response.json();
                    
                    if (response.ok) {
                      setFormStatus('success');
                      setFormMessage('Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.');
                      setFormData({ name: '', email: '', phone: '', message: '' });
                    } else {
                      setFormStatus('error');
                      setFormMessage(result.error || 'Ошибка отправки сообщения');
                    }
                  } catch (error) {
                    setFormStatus('error');
                    setFormMessage('Ошибка соединения. Попробуйте позже.');
                  }
                }}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Ваше имя *</label>
                      <Input 
                        required
                        placeholder="Иванов Иван Иванович"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email *</label>
                      <Input 
                        required
                        type="email"
                        placeholder="example@mail.ru"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Телефон</label>
                    <Input 
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Сообщение *</label>
                    <textarea
                      required
                      className="w-full min-h-[120px] px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Ваше сообщение..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>
                  
                  {formMessage && (
                    <div className={`p-4 rounded-md ${formStatus === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                      <p className="text-sm">{formMessage}</p>
                    </div>
                  )}
                  
                  <Button 
                    type="submit" 
                    className="w-full md:w-auto"
                    disabled={formStatus === 'sending'}
                  >
                    {formStatus === 'sending' ? (
                      <>
                        <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                        Отправка...
                      </>
                    ) : (
                      <>
                        <Icon name="Send" size={18} className="mr-2" />
                        Отправить сообщение
                      </>
                    )}
                  </Button>
                  
                  <p className="text-sm text-muted-foreground">
                    Или напишите напрямую на{' '}
                    <a href="mailto:roorktsros@yandex.ru" className="text-primary hover:underline">
                      roorktsros@yandex.ru
                    </a>
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
  );
};

export default MainContent;