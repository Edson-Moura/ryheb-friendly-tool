import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Shield, 
  Users, 
  Package, 
  ChefHat,
  BarChart3,
  Settings,
  FileText,
  Trash2,
  Eye,
  Edit,
  Plus,
  Save
} from 'lucide-react';

const modules = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: BarChart3,
    description: 'Visualização de relatórios e estatísticas',
    permissions: ['view', 'export']
  },
  {
    id: 'users',
    name: 'Gestão de Usuários',
    icon: Users,
    description: 'Gerenciamento de usuários e permissões',
    permissions: ['view', 'create', 'edit', 'delete']
  },
  {
    id: 'inventory',
    name: 'Inventário',
    icon: Package,
    description: 'Controle de estoque e produtos',
    permissions: ['view', 'create', 'edit', 'delete', 'import', 'export']
  },
  {
    id: 'menu',
    name: 'Cardápio',
    icon: ChefHat,
    description: 'Gestão de pratos e receitas',
    permissions: ['view', 'create', 'edit', 'delete', 'publish']
  },
  {
    id: 'reports',
    name: 'Relatórios',
    icon: FileText,
    description: 'Geração e visualização de relatórios',
    permissions: ['view', 'create', 'export', 'schedule']
  },
  {
    id: 'settings',
    name: 'Configurações',
    icon: Settings,
    description: 'Configurações do sistema',
    permissions: ['view', 'edit', 'backup', 'restore']
  }
];

const roles = [
  { id: 'admin', name: 'Administrador' },
  { id: 'manager', name: 'Gerente' },
  { id: 'chef', name: 'Chef' },
  { id: 'inventory', name: 'Estoque' },
  { id: 'waiter', name: 'Garçom' }
];

const permissionLabels = {
  view: 'Visualizar',
  create: 'Criar',
  edit: 'Editar',
  delete: 'Excluir',
  import: 'Importar',
  export: 'Exportar',
  publish: 'Publicar',
  schedule: 'Agendar',
  backup: 'Backup',
  restore: 'Restaurar'
};

export const UserPermissions = () => {
  const [selectedRole, setSelectedRole] = useState('admin');
  const [permissions, setPermissions] = useState<Record<string, Record<string, boolean>>>({});
  const [hasChanges, setHasChanges] = useState(false);

  // Simulação de permissões padrão
  const defaultPermissions = {
    admin: {
      'dashboard-view': true, 'dashboard-export': true,
      'users-view': true, 'users-create': true, 'users-edit': true, 'users-delete': true,
      'inventory-view': true, 'inventory-create': true, 'inventory-edit': true, 'inventory-delete': true, 'inventory-import': true, 'inventory-export': true,
      'menu-view': true, 'menu-create': true, 'menu-edit': true, 'menu-delete': true, 'menu-publish': true,
      'reports-view': true, 'reports-create': true, 'reports-export': true, 'reports-schedule': true,
      'settings-view': true, 'settings-edit': true, 'settings-backup': true, 'settings-restore': true
    },
    manager: {
      'dashboard-view': true, 'dashboard-export': true,
      'users-view': true, 'users-create': false, 'users-edit': true, 'users-delete': false,
      'inventory-view': true, 'inventory-create': true, 'inventory-edit': true, 'inventory-delete': true, 'inventory-import': true, 'inventory-export': true,
      'menu-view': true, 'menu-create': true, 'menu-edit': true, 'menu-delete': false, 'menu-publish': true,
      'reports-view': true, 'reports-create': true, 'reports-export': true, 'reports-schedule': false,
      'settings-view': true, 'settings-edit': false, 'settings-backup': false, 'settings-restore': false
    },
    chef: {
      'dashboard-view': true, 'dashboard-export': false,
      'users-view': false, 'users-create': false, 'users-edit': false, 'users-delete': false,
      'inventory-view': true, 'inventory-create': false, 'inventory-edit': true, 'inventory-delete': false, 'inventory-import': false, 'inventory-export': false,
      'menu-view': true, 'menu-create': true, 'menu-edit': true, 'menu-delete': false, 'menu-publish': false,
      'reports-view': true, 'reports-create': false, 'reports-export': false, 'reports-schedule': false,
      'settings-view': false, 'settings-edit': false, 'settings-backup': false, 'settings-restore': false
    }
  };

  React.useEffect(() => {
    setPermissions(defaultPermissions);
  }, []);

  const handlePermissionChange = (moduleId: string, permission: string, value: boolean) => {
    const key = `${moduleId}-${permission}`;
    setPermissions(prev => ({
      ...prev,
      [selectedRole]: {
        ...prev[selectedRole],
        [key]: value
      }
    }));
    setHasChanges(true);
  };

  const savePermissions = () => {
    // Aqui seria feita a chamada para salvar as permissões no backend
    console.log('Salvando permissões:', permissions[selectedRole]);
    setHasChanges(false);
  };

  const getPermissionIcon = (permission: string) => {
    switch (permission) {
      case 'view': return <Eye className="h-3 w-3" />;
      case 'create': return <Plus className="h-3 w-3" />;
      case 'edit': return <Edit className="h-3 w-3" />;
      case 'delete': return <Trash2 className="h-3 w-3" />;
      default: return <Shield className="h-3 w-3" />;
    }
  };

  const currentRolePermissions = permissions[selectedRole] || {};

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Configurar Permissões</h2>
          <p className="text-muted-foreground">
            Defina o que cada função pode acessar e fazer no sistema
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Selecione uma função" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role.id} value={role.id}>
                  {role.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {hasChanges && (
            <Button onClick={savePermissions}>
              <Save className="h-4 w-4 mr-2" />
              Salvar
            </Button>
          )}
        </div>
      </div>

      {/* Permissions Matrix */}
      <div className="space-y-4">
        {modules.map((module) => {
          const IconComponent = module.icon;
          return (
            <Card key={module.id}>
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{module.name}</CardTitle>
                    <CardDescription>{module.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                  {module.permissions.map((permission) => {
                    const key = `${module.id}-${permission}`;
                    const isEnabled = currentRolePermissions[key] || false;
                    
                    return (
                      <div key={permission} className="flex items-center space-x-3 p-3 border rounded-lg">
                        <Switch
                          checked={isEnabled}
                          onCheckedChange={(value) => handlePermissionChange(module.id, permission, value)}
                        />
                        <div className="flex items-center space-x-2">
                          {getPermissionIcon(permission)}
                          <span className="text-sm font-medium">
                            {permissionLabels[permission as keyof typeof permissionLabels]}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Permission Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo de Permissões</CardTitle>
          <CardDescription>
            Resumo das permissões ativas para a função selecionada
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {modules.map((module) => {
              const activePermissions = module.permissions.filter(permission => {
                const key = `${module.id}-${permission}`;
                return currentRolePermissions[key];
              });

              if (activePermissions.length === 0) return null;

              const IconComponent = module.icon;
              return (
                <div key={module.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <IconComponent className="h-4 w-4" />
                    <span className="font-medium">{module.name}</span>
                  </div>
                  <div className="flex space-x-1">
                    {activePermissions.map((permission) => (
                      <Badge key={permission} variant="outline" className="text-xs">
                        {permissionLabels[permission as keyof typeof permissionLabels]}
                      </Badge>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Help Section */}
      <Card>
        <CardHeader>
          <CardTitle>Como Usar as Permissões</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              <strong>Visualizar:</strong> Permite ver o conteúdo do módulo
            </p>
            <p>
              <strong>Criar:</strong> Permite adicionar novos itens
            </p>
            <p>
              <strong>Editar:</strong> Permite modificar itens existentes
            </p>
            <p>
              <strong>Excluir:</strong> Permite remover itens (use com cuidado)
            </p>
            <p>
              <strong>Importar/Exportar:</strong> Permite transferir dados
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};