import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface News {
  id: string;
  title: string;
  content: string;
  category: string;
  image_url?: string;
  video_url?: string;
  published_at: string;
  is_holiday: boolean;
}

const NewsSection = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);

  useEffect(() => {
    // Здесь будет загрузка новостей из БД через backend
    // Пока показываем заглушку
    setLoading(false);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Icon name="Loader2" className="animate-spin" size={32} />
      </div>
    );
  }

  if (selectedNews) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedNews(null)}
          className="flex items-center gap-2 text-primary hover:underline"
        >
          <Icon name="ArrowLeft" size={20} />
          Вернуться к списку новостей
        </button>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <CardTitle className="text-2xl mb-2">{selectedNews.title}</CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon name="Calendar" size={16} />
                  {formatDate(selectedNews.published_at)}
                  {selectedNews.is_holiday && (
                    <Badge variant="secondary" className="ml-2">
                      <Icon name="Star" size={14} className="mr-1" />
                      Праздник
                    </Badge>
                  )}
                </div>
              </div>
              <Badge>{selectedNews.category}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedNews.image_url && (
              <img
                src={selectedNews.image_url}
                alt={selectedNews.title}
                className="w-full h-auto rounded-lg"
              />
            )}
            {selectedNews.video_url && (
              <div className="w-full aspect-video rounded-lg overflow-hidden">
                <iframe
                  src={selectedNews.video_url.replace('vkvideo.ru/video', 'vk.com/video_ext.php?oid=')
                    .replace('_', '&id=')
                    .replace(/&hash=.*/, '')}
                  width="100%"
                  height="100%"
                  allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
                  frameBorder="0"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            )}
            <div className="prose max-w-none">
              <p className="whitespace-pre-wrap text-foreground">{selectedNews.content}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Новости</h2>
      </div>

      {news.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Icon name="Newspaper" size={48} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg text-muted-foreground">Новостей пока нет</p>
            <p className="text-sm text-muted-foreground mt-2">
              Праздники будут появляться автоматически
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <Card
              key={item.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedNews(item)}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                  {item.is_holiday && (
                    <Icon name="Star" size={20} className="text-yellow-500 flex-shrink-0" />
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon name="Calendar" size={14} />
                  {formatDate(item.published_at)}
                </div>
              </CardHeader>
              <CardContent>
                {item.image_url && (
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-40 object-cover rounded-md mb-3"
                  />
                )}
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {item.content}
                </p>
                <Badge variant="secondary" className="mt-3">
                  {item.category}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsSection;