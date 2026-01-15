import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Organization {
  id: string;
  name: string;
  inn: string;
  status: string;
  category: string;
  registration_date: string;
}

const RegistrySection = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const API_URL = 'https://functions.poehali.dev/7a1fa008-8875-4dbd-92b9-c15e540bea4d';

  useEffect(() => {
    const loadOrganizations = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setOrganizations(data.organizations || []);
        setLoading(false);
      } catch (error) {
        console.error('Ошибка загрузки:', error);
        setLoading(false);
      }
    };

    loadOrganizations();
  }, []);

  const filteredOrganizations = organizations.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.inn.includes(searchQuery) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Icon name="Loader2" className="animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-secondary mb-4">Реестр организаций</h2>
        <div className="h-1 w-20 bg-primary rounded mb-6"></div>
        <p className="text-muted-foreground mb-8">
          Официальный реестр охранных организаций Липецкой области
        </p>
      </div>

      <div className="mb-6">
        <Input
          placeholder="Поиск по названию, ИНН или категории..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="all">
            Все организации ({filteredOrganizations.length})
          </TabsTrigger>
          <TabsTrigger value="active">
            Активные ({filteredOrganizations.filter(o => o.status === 'Активно').length})
          </TabsTrigger>
          <TabsTrigger value="suspended">
            Приостановленные ({filteredOrganizations.filter(o => o.status === 'Приостановлено').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          <div className="text-sm text-muted-foreground mb-4">
            Найдено записей: <span className="font-semibold text-foreground">{filteredOrganizations.length}</span>
          </div>
          {filteredOrganizations.map((item) => (
            <OrganizationCard key={item.id} organization={item} />
          ))}
        </TabsContent>

        <TabsContent value="active" className="space-y-4 mt-6">
          <div className="text-sm text-muted-foreground mb-4">
            Найдено записей: <span className="font-semibold text-foreground">
              {filteredOrganizations.filter(item => item.status === 'Активно').length}
            </span>
          </div>
          {filteredOrganizations.filter(item => item.status === 'Активно').map((item) => (
            <OrganizationCard key={item.id} organization={item} />
          ))}
        </TabsContent>

        <TabsContent value="suspended" className="space-y-4 mt-6">
          <div className="text-sm text-muted-foreground mb-4">
            Найдено записей: <span className="font-semibold text-foreground">
              {filteredOrganizations.filter(item => item.status === 'Приостановлено').length}
            </span>
          </div>
          {filteredOrganizations.filter(item => item.status === 'Приостановлено').map((item) => (
            <OrganizationCard key={item.id} organization={item} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

const OrganizationCard = ({ organization }: { organization: Organization }) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{organization.name}</CardTitle>
            <CardDescription>ИНН: {organization.inn}</CardDescription>
          </div>
          <Badge variant={organization.status === 'Активно' ? 'default' : 'secondary'}>
            {organization.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Icon name="Tag" size={16} className="text-muted-foreground" />
            <span className="text-muted-foreground">{organization.category}</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Calendar" size={16} className="text-muted-foreground" />
            <span className="text-muted-foreground">
              {new Date(organization.registration_date).toLocaleDateString('ru-RU')}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegistrySection;
