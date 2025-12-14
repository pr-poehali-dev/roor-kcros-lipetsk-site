import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');

  const registryData = [
    { id: 1, name: 'ЧОП "Барс-Липецк"', inn: '4825012345', status: 'Активно', category: 'Частная охрана', date: '15.01.2024' },
    { id: 2, name: 'ООО "Охранное предприятие Щит"', inn: '4826023456', status: 'Активно', category: 'Физическая охрана', date: '20.02.2024' },
    { id: 3, name: 'ЧОП "Сокол"', inn: '482701234567', status: 'Приостановлено', category: 'Частная охрана', date: '10.03.2024' },
    { id: 4, name: 'ООО "Безопасность-48"', inn: '4828034567', status: 'Активно', category: 'Охранные системы', date: '05.04.2024' },
    { id: 5, name: 'ЧОП "Страж"', inn: '4829045678', status: 'Активно', category: 'Частная охрана', date: '12.05.2024' },
  ];

  const newsData = [
    { id: 1, title: 'Заседание координационного совета РООР КЦРОС', date: '10.12.2024', excerpt: 'Состоялось очередное заседание координационного совета по вопросам развития охранной отрасли в регионе.' },
    { id: 2, title: 'Обновление реестра охранных организаций', date: '05.12.2024', excerpt: 'Внесены изменения в реестр охранных предприятий Липецкой области. Обновлено 47 записей.' },
    { id: 3, title: 'Семинар по новым требованиям к лицензированию', date: '01.12.2024', excerpt: 'Приглашаем руководителей охранных предприятий на семинар по актуальным вопросам лицензирования.' },
  ];

  const filteredRegistry = registryData.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.inn.includes(searchQuery) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-secondary text-white border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Shield" size={32} className="text-primary" />
              <div>
                <h1 className="text-xl font-bold">РООР КЦРОС</h1>
                <p className="text-sm text-gray-300">Координационный центр руководителей охранных структур</p>
              </div>
            </div>
            <nav className="hidden md:flex gap-6">
              <button
                onClick={() => setActiveSection('home')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === 'home' ? 'text-primary' : 'text-white'
                }`}
              >
                Главная
              </button>
              <button
                onClick={() => setActiveSection('about')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === 'about' ? 'text-primary' : 'text-white'
                }`}
              >
                О организации
              </button>
              <button
                onClick={() => setActiveSection('registry')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === 'registry' ? 'text-primary' : 'text-white'
                }`}
              >
                Реестры
              </button>
              <button
                onClick={() => setActiveSection('news')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === 'news' ? 'text-primary' : 'text-white'
                }`}
              >
                Новости
              </button>
              <button
                onClick={() => setActiveSection('contacts')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === 'contacts' ? 'text-primary' : 'text-white'
                }`}
              >
                Контакты
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeSection === 'home' && (
          <div className="space-y-8 animate-fade-in">
            <section className="bg-gradient-to-br from-primary/10 to-accent/5 rounded-lg p-8 md:p-12">
              <div className="max-w-3xl">
                <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
                  Региональное отраслевое объединение работодателей
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Координационный центр руководителей охранных структур Липецкой области
                </p>
                <div className="flex flex-wrap gap-4">
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
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                    <Icon name="FileText" size={24} className="text-primary" />
                  </div>
                  <CardTitle>Документы</CardTitle>
                  <CardDescription>Нормативные акты и регламенты</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="link" className="p-0 h-auto">
                    Перейти к документам
                    <Icon name="ArrowRight" size={16} className="ml-2" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                    <Icon name="Database" size={24} className="text-primary" />
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
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                    <Icon name="Newspaper" size={24} className="text-primary" />
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
              <div className="grid md:grid-cols-2 gap-6">
                {newsData.slice(0, 2).map((news) => (
                  <Card key={news.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">{news.date}</Badge>
                      </div>
                      <CardTitle className="text-lg">{news.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{news.excerpt}</p>
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
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-3xl font-bold text-secondary mb-4">Реестр организаций</h2>
              <div className="h-1 w-20 bg-primary rounded mb-6"></div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Поиск в реестре</CardTitle>
                <CardDescription>
                  Введите название организации, ИНН или категорию для поиска
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Поиск по названию, ИНН, категории..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline">
                    <Icon name="SlidersHorizontal" size={20} />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="all">Все</TabsTrigger>
                <TabsTrigger value="active">Активные</TabsTrigger>
                <TabsTrigger value="suspended">Приостановлено</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="space-y-4 mt-6">
                <div className="text-sm text-muted-foreground mb-4">
                  Найдено записей: <span className="font-semibold text-foreground">{filteredRegistry.length}</span>
                </div>
                {filteredRegistry.map((item) => (
                  <Card key={item.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">{item.name}</CardTitle>
                          <CardDescription>ИНН: {item.inn}</CardDescription>
                        </div>
                        <Badge variant={item.status === 'Активно' ? 'default' : 'secondary'}>
                          {item.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Icon name="Tag" size={16} className="text-muted-foreground" />
                          <span className="text-muted-foreground">{item.category}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon name="Calendar" size={16} className="text-muted-foreground" />
                          <span className="text-muted-foreground">{item.date}</span>
                        </div>
                        <Button variant="link" className="p-0 h-auto ml-auto">
                          Подробнее
                          <Icon name="ExternalLink" size={16} className="ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              <TabsContent value="active" className="space-y-4 mt-6">
                <div className="text-sm text-muted-foreground mb-4">
                  Найдено записей: <span className="font-semibold text-foreground">
                    {filteredRegistry.filter(item => item.status === 'Активно').length}
                  </span>
                </div>
                {filteredRegistry.filter(item => item.status === 'Активно').map((item) => (
                  <Card key={item.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">{item.name}</CardTitle>
                          <CardDescription>ИНН: {item.inn}</CardDescription>
                        </div>
                        <Badge variant="default">{item.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Icon name="Tag" size={16} className="text-muted-foreground" />
                          <span className="text-muted-foreground">{item.category}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon name="Calendar" size={16} className="text-muted-foreground" />
                          <span className="text-muted-foreground">{item.date}</span>
                        </div>
                        <Button variant="link" className="p-0 h-auto ml-auto">
                          Подробнее
                          <Icon name="ExternalLink" size={16} className="ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              <TabsContent value="suspended" className="space-y-4 mt-6">
                <div className="text-sm text-muted-foreground mb-4">
                  Найдено записей: <span className="font-semibold text-foreground">
                    {filteredRegistry.filter(item => item.status === 'Приостановлено').length}
                  </span>
                </div>
                {filteredRegistry.filter(item => item.status === 'Приостановлено').map((item) => (
                  <Card key={item.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">{item.name}</CardTitle>
                          <CardDescription>ИНН: {item.inn}</CardDescription>
                        </div>
                        <Badge variant="secondary">{item.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Icon name="Tag" size={16} className="text-muted-foreground" />
                          <span className="text-muted-foreground">{item.category}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon name="Calendar" size={16} className="text-muted-foreground" />
                          <span className="text-muted-foreground">{item.date}</span>
                        </div>
                        <Button variant="link" className="p-0 h-auto ml-auto">
                          Подробнее
                          <Icon name="ExternalLink" size={16} className="ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
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
                <Card key={news.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        <Icon name="Calendar" size={14} className="mr-1" />
                        {news.date}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{news.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">{news.excerpt}</p>
                    <Button variant="link" className="p-0 h-auto">
                      Читать полностью
                      <Icon name="ArrowRight" size={16} className="ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
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
                      <span className="text-muted-foreground">info@roor-lipetsk.ru</span>
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
                    src="https://yandex.ru/map-widget/v1/?um=constructor%3A2d8c0e8f8c8f8f8f8f8f8f8f8f8f8f8f&amp;source=constructor&ll=39.569814%2C52.625070&z=16&pt=39.569814,52.625070,pm2rdm"
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
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Ваше имя</label>
                      <Input placeholder="Иванов Иван Иванович" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input type="email" placeholder="example@mail.ru" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Телефон</label>
                    <Input type="tel" placeholder="+7 (___) ___-__-__" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Сообщение</label>
                    <textarea
                      className="w-full min-h-[120px] px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Ваше сообщение..."
                    />
                  </div>
                  <Button type="submit" className="w-full md:w-auto">
                    <Icon name="Send" size={18} className="mr-2" />
                    Отправить сообщение
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <footer className="bg-secondary text-white mt-16 py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-3">РООР КЦРОС</h3>
              <p className="text-sm text-gray-300">
                Координационный центр руководителей охранных структур Липецкой области
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Быстрые ссылки</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button onClick={() => setActiveSection('about')} className="text-gray-300 hover:text-primary transition-colors">
                    О организации
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveSection('registry')} className="text-gray-300 hover:text-primary transition-colors">
                    Реестры
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveSection('news')} className="text-gray-300 hover:text-primary transition-colors">
                    Новости
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Контакты</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +7-919-161-00-30
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  info@roor-lipetsk.ru
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-700 text-center text-sm text-gray-400">
            <p>&copy; 2024 РООР КЦРОС Липецкой области. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;