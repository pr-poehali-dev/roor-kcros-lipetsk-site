import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import DocumentsSection from '@/components/DocumentsSection';

interface Organization {
  id: string;
  name: string;
  inn: string;
  status: string;
  category: string;
  registration_date: string;
}

const AdminPanel = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [adminKey, setAdminKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [editingOrg, setEditingOrg] = useState<Organization | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const API_URL = 'https://functions.poehali.dev/ec36e20b-1fb4-4b98-a732-dcaef3168230';

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

  useEffect(() => {
    loadOrganizations();
  }, []);

  const handleLogin = () => {
    if (adminKey.trim()) {
      setIsAuthenticated(true);
    }
  };

  const handleCreate = async (formData: Organization) => {
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Key': adminKey
        },
        body: JSON.stringify(formData)
      });
      await loadOrganizations();
      setIsCreating(false);
    } catch (error) {
      console.error('Ошибка создания:', error);
    }
  };

  const handleUpdate = async (formData: Organization) => {
    try {
      await fetch(API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Key': adminKey
        },
        body: JSON.stringify(formData)
      });
      await loadOrganizations();
      setEditingOrg(null);
    } catch (error) {
      console.error('Ошибка обновления:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить организацию?')) return;
    
    try {
      await fetch(`${API_URL}?id=${id}`, {
        method: 'DELETE',
        headers: {
          'X-Admin-Key': adminKey
        }
      });
      await loadOrganizations();
    } catch (error) {
      console.error('Ошибка удаления:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <Card className="max-w-md mx-auto mt-12">
        <CardHeader>
          <CardTitle>Вход в админ-панель</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="password"
            placeholder="Введите админ-ключ"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
          />
          <Button onClick={handleLogin} className="w-full">
            Войти
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Icon name="Loader2" className="animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Админ-панель</h2>

      <Tabs defaultValue="registry" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mb-6">
          <TabsTrigger value="registry">Реестр</TabsTrigger>
          <TabsTrigger value="documents">Документы</TabsTrigger>
        </TabsList>

        <TabsContent value="registry" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold">Управление реестром</h3>
            <Button onClick={() => setIsCreating(true)}>
              <Icon name="Plus" size={16} className="mr-2" />
              Добавить организацию
            </Button>
          </div>

          {(isCreating || editingOrg) && (
            <OrganizationForm
              organization={editingOrg}
              onSave={editingOrg ? handleUpdate : handleCreate}
              onCancel={() => {
                setIsCreating(false);
                setEditingOrg(null);
              }}
            />
          )}

          <div className="space-y-4">
            {organizations.map((org) => (
              <Card key={org.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{org.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">ИНН: {org.inn}</p>
                    </div>
                    <Badge variant={org.status === 'Активно' ? 'default' : 'secondary'}>
                      {org.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1 text-sm">
                      <p className="text-muted-foreground">Категория: {org.category}</p>
                      <p className="text-muted-foreground">
                        Дата регистрации: {new Date(org.registration_date).toLocaleDateString('ru-RU')}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingOrg(org)}
                      >
                        <Icon name="Pencil" size={16} />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(org.id)}
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="documents">
          <DocumentsSection isAdmin />
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface OrganizationFormProps {
  organization: Organization | null;
  onSave: (data: Organization) => void;
  onCancel: () => void;
}

const OrganizationForm = ({ organization, onSave, onCancel }: OrganizationFormProps) => {
  const [formData, setFormData] = useState<Organization>(
    organization || {
      id: '',
      name: '',
      inn: '',
      status: 'Активно',
      category: '',
      registration_date: new Date().toISOString().split('T')[0]
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{organization ? 'Редактировать' : 'Новая'} организация</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Название</label>
            <Input
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium">ИНН</label>
            <Input
              required
              value={formData.inn}
              onChange={(e) => setFormData({ ...formData, inn: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Категория</label>
            <Input
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Статус</label>
            <select
              className="w-full border rounded-md p-2"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="Активно">Активно</option>
              <option value="Приостановлено">Приостановлено</option>
              <option value="Неактивно">Неактивно</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Дата регистрации</label>
            <Input
              type="date"
              required
              value={formData.registration_date}
              onChange={(e) => setFormData({ ...formData, registration_date: e.target.value })}
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit">Сохранить</Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Отмена
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminPanel;