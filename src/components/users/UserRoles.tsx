import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Users, 
  ChefHat, 
  Package, 
  Coffee,
  Settings,
  Eye,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';

const roles = [
  {
    id: 'admin',
    name: 'Administrador',
    description: 'Acesso total ao sistema com todas as permissões',
    icon: Shield,
    color: 'destructive',
    permissions: [
      'Gestão completa de usuários',
      'Configurações do sistema',
      'Acesso a todos os módulos',
      'Relatórios administrativos',
      'Gestão de permissões',
      'Backup e segurança'
    ],
    users_count: 2
  },
  {
    id: 'manager',
    name: 'Gerente',
    description: 'Gestão de operações e equipe',
    icon: Users,
    color: 'default',
    permissions: [
      'Gestão de equipe',
      'Relatórios operacionais',
      'Controle de inventário',
      'Gestão de fornecedores',
      'Análise de vendas',
      'Configurações básicas'
    ],
    users_count: 3
  },
  {
    id: 'chef',
    name: 'Chef',
    description: 'Gestão de cardápio e cozinha',
    icon: ChefHat,
    color: 'secondary',
    permissions: [
      'Gestão de cardápio',
      'Criação de receitas',
      'Controle de ingredientes',
      'Planejamento de produção',
      'Controle de qualidade',
      'Gestão de desperdício'
    ],
    users_count: 5
  },
  {
    id: 'inventory',
    name: 'Estoque',
    description: 'Controle de inventário e suprimentos',
    icon: Package,
    color: 'outline',
    permissions: [
      'Controle de estoque',
      'Gestão de fornecedores',
      'Recebimento de mercadorias',
      'Controle de validade',
      'Relatórios de estoque',
      'Solicitações de compra'
    ],
    users_count: 4
  },
  {
    id: 'waiter',
    name: 'Garçom',
    description: 'Operações básicas de atendimento',
    icon: Coffee,
    color: 'outline',
    permissions: [
      'Visualizar cardápio',
      'Consultar disponibilidade',
      'Registro básico de vendas',
      'Atendimento ao cliente',
      'Relatórios básicos'
    ],
    users_count: 8
  }
];

export const UserRoles = () => {
  const getBadgeVariant = (color: string) => {
    switch (color) {
      case 'destructive': return 'destructive';
      case 'default': return 'default';
      case 'secondary': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Funções do Sistema</h2>
        <p className="text-muted-foreground">
          Gerencie as funções e suas respectivas permissões
        </p>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => {
          const IconComponent = role.icon;
          return (
            <Card key={role.id} className="relative">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{role.name}</CardTitle>
                      <Badge variant={getBadgeVariant(role.color)} className="text-xs">
                        {role.users_count} usuários
                      </Badge>
                    </div>
                  </div>
                  <Settings className="h-4 w-4 text-muted-foreground cursor-pointer" />
                </div>
                <CardDescription>{role.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Permissões:</h4>
                  <div className="space-y-2">
                    {role.permissions.map((permission, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <div className="w-1 h-1 bg-primary rounded-full"></div>
                        <span className="text-muted-foreground">{permission}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Total de Funções</p>
                <p className="text-2xl font-bold">{roles.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm font-medium">Total de Usuários</p>
                <p className="text-2xl font-bold">
                  {roles.reduce((sum, role) => sum + role.users_count, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Eye className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-sm font-medium">Maior Função</p>
                <p className="text-xl font-bold">Garçom</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Settings className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-sm font-medium">Configurável</p>
                <p className="text-xl font-bold">100%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Role Management Info */}
      <Card>
        <CardHeader>
          <CardTitle>Como Gerenciar Funções</CardTitle>
          <CardDescription>
            Informações importantes sobre a gestão de funções no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Plus className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Hierarquia de Funções</h4>
                <p className="text-sm text-muted-foreground">
                  As funções seguem uma hierarquia: Admin &gt; Gerente &gt; Chef/Estoque &gt; Garçom
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Edit className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Permissões Personalizadas</h4>
                <p className="text-sm text-muted-foreground">
                  Cada função pode ter suas permissões customizadas conforme a necessidade
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-purple-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Segurança</h4>
                <p className="text-sm text-muted-foreground">
                  Somente administradores podem alterar funções e permissões de outros usuários
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};