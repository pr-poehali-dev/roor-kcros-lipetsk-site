import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import DocumentsSection from '@/components/DocumentsSection';
import NewsSection from '@/components/NewsSection';

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
    { 
      id: 2, 
      title: 'С Новым 2026 годом!', 
      date: '01.01.2026', 
      image: 'https://cdn.poehali.dev/projects/10e7fd4c-5234-4d78-be4b-8a34049f73f2/files/b2ef6112-4958-4140-9c34-3b2da0cb5c46.jpg',
      excerpt: 'Уважаемые коллеги! Поздравляем вас с наступающим Новым 2026 годом!',
      fullText: `Уважаемые коллеги!

От имени Координационного центра руководителей охранных структур Липецкой области поздравляем вас с Новым 2026 годом!

Пусть новый год принесёт нашей отрасли новые достижения, стабильность и процветание. Желаем всем сотрудникам охранных предприятий крепкого здоровья, благополучия и успехов в профессиональной деятельности.

Пусть каждый рабочий день будет безопасным, а объекты под надёжной защитой. Благодарим за ваш нелёгкий труд и профессионализм!

С наступающим Новым годом! Пусть 2026 год станет годом новых возможностей и свершений!

С уважением,
РООР КЦРОС Липецкой области`
    },
    { 
      id: 1, 
      title: 'Мы рады сообщить о запуске сайта!', 
      date: '23.12.2024', 
      image: 'https://cdn.poehali.dev/files/57b6ff2a94ac9.png',
      excerpt: 'Уважаемые посетители! Рады сообщить Вам об открытии нашего сайта!',
      fullText: `Уважаемые посетители! Рады сообщить Вам об открытии нашего сайта!

Мы постарались сделать наш новый сайт максимально удобным и информативным, чтобы вы могли быстро найти всю интересующую вас информацию в полном объеме, а его оформление приятно порадовало вас в процессе работы с ним.

Мы еще над ним трудимся: добавляем новые рубрики, статьи, делаем его более информативным. Мобильная версия сайта адаптирована под любое разрешение экрана и открывается на любых гаджетах.

Сейчас наш сайт еще очень молод, поэтому просим отнестись с пониманием к возможным техническим проблемам и недоработкам. Мы постоянно работаем над его улучшением. Будем рады любым Вашим пожеланиям и идеям по улучшению портала, которые Вы можете направлять на почту: roorktsros@yandex.ru

Надеемся, что наш сайт оставит у Вас приятные впечатления и принесёт пользу в получении необходимой информации о нас и наших возможностях!`
    },
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
              <img src="https://cdn.poehali.dev/files/РООР Герб.png" alt="РООР КЦРОС" className="h-12 w-auto" />
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
              >Об организации</button>
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
                onClick={() => setActiveSection('documents')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === 'documents' ? 'text-primary' : 'text-white'
                }`}
              >
                Документы
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
                <div className="flex items-start gap-4 mb-6">
                  <img src="https://cdn.poehali.dev/files/РООР Герб.png" alt="РООР КЦРОС" className="h-20 w-auto" />
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
                    <img src="https://cdn.poehali.dev/files/РООР Герб.png" alt="Документы" className="h-full w-auto" />
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
                    <img src="https://cdn.poehali.dev/files/РООР Герб.png" alt="Реестры" className="h-full w-auto" />
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
                    <img src="https://cdn.poehali.dev/files/РООР Герб.png" alt="Новости" className="h-full w-auto" />
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

      <footer className="bg-secondary text-white mt-16 py-12 border-t border-border relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none">
          <img src="https://cdn.poehali.dev/files/РООР Герб.png" alt="" className="h-64 w-auto" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img src="https://cdn.poehali.dev/files/РООР Герб.png" alt="РООР КЦРОС" className="h-16 w-auto" />
                <div>
                  <h3 className="font-bold text-xl mb-1">РООР КЦРОС</h3>
                  <p className="text-sm text-gray-300">Липецкая область</p>
                </div>
              </div>
              <p className="text-sm text-gray-300 max-w-md">
                Координационный центр руководителей охранных структур Липецкой области
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Быстрые ссылки</h4>
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
                  <button onClick={() => setActiveSection('documents')} className="text-gray-300 hover:text-primary transition-colors">
                    Документы
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
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <Icon name="MapPin" size={16} className="mt-1 flex-shrink-0" />
                  <span>г. Липецк, ул. Тельмана, д. 92, оф. 1</span>
                </li>
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
          <div className="mt-12 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
            <p>&copy; 2024 РООР КЦРОС Липецкой области. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;