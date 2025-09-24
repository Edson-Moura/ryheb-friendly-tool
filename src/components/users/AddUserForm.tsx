import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useUsers } from '@/hooks/useUsers';
import { UserPlus, Mail, User, Phone, Shield } from 'lucide-react';

export const AddUserForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    phone: '',
    role: ''
  });
  const [loading, setLoading] = useState(false);
  const { createUser } = useUsers();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password || !formData.full_name || !formData.role) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      console.log('Tentando criar usuário:', formData);
      await createUser(formData);
      console.log('Usuário criado com sucesso');
      toast({
        title: "Usuário criado",
        description: "O usuário foi criado com sucesso.",
      });
      
      // Reset form
      setFormData({
        email: '',
        password: '',
        full_name: '',
        phone: '',
        role: ''
      });
    } catch (error: any) {
      console.error('Erro completo ao criar usuário:', error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao criar usuário.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <UserPlus className="h-5 w-5" />
            <span>Novo Usuário</span>
          </CardTitle>
          <CardDescription>
            Preencha as informações para criar um novo usuário no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informações Básicas */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Informações Básicas</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="full_name" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>Nome Completo *</span>
                  </Label>
                  <Input
                    id="full_name"
                    type="text"
                    value={formData.full_name}
                    onChange={(e) => handleInputChange('full_name', e.target.value)}
                    placeholder="Digite o nome completo"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>Telefone</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>
            </div>

            {/* Credenciais de Acesso */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Credenciais de Acesso</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>Email *</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="usuario@email.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Senha Temporária *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Digite uma senha temporária"
                    required
                    minLength={6}
                  />
                  <p className="text-xs text-muted-foreground">
                    Mínimo 6 caracteres. O usuário deverá alterar na primeira conexão.
                  </p>
                </div>
              </div>
            </div>

            {/* Função e Permissões */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Função e Permissões</h3>
              
              <div className="space-y-2">
                <Label htmlFor="role" className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Função no Sistema *</span>
                </Label>
                <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma função" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrador - Acesso total ao sistema</SelectItem>
                    <SelectItem value="manager">Gerente - Gestão de operações</SelectItem>
                    <SelectItem value="chef">Chef - Gestão de cardápio e cozinha</SelectItem>
                    <SelectItem value="inventory">Estoque - Gestão de inventário</SelectItem>
                    <SelectItem value="staff">Garçom - Operações básicas</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  A função determina quais módulos o usuário pode acessar
                </p>
              </div>
            </div>

            {/* Informações sobre Funções */}
            <div className="border rounded-lg p-4 bg-muted/50">
              <h4 className="font-medium mb-2">Descrição das Funções:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li><strong>Administrador:</strong> Acesso completo a todos os módulos</li>
                <li><strong>Gerente:</strong> Gestão de operações, relatórios e equipe</li>
                <li><strong>Chef:</strong> Gestão de cardápio, receitas e cozinha</li>
                <li><strong>Estoque:</strong> Controle de inventário e fornecedores</li>
                <li><strong>Garçom:</strong> Operações básicas de atendimento</li>
              </ul>
            </div>

            {/* Botões de Ação */}
            <div className="flex justify-end space-x-3">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setFormData({
                  email: '',
                  password: '',
                  full_name: '',
                  phone: '',
                  role: ''
                })}
              >
                Limpar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Criando...
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Criar Usuário
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};