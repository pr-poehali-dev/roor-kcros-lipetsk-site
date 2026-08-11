import DocumentsSection from '@/components/DocumentsSection';

const AdminPanel = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Админ-панель</h2>
      <DocumentsSection isAdmin />
    </div>
  );
};

export default AdminPanel;
