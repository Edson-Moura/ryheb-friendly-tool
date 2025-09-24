import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface UserProfile {
  user_id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  avatar_url: string | null;
  role: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateUserData {
  email: string;
  password: string;
  full_name: string;
  phone?: string;
  role: string;
}

export const useUsers = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Buscar todos os usuários
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      // Primeiro, buscar todos os membros de restaurante com informações do usuário
      const { data: members, error: membersError } = await supabase
        .from('restaurant_members')
        .select('user_id, role, created_at');

      if (membersError) {
        throw membersError;
      }

      if (!members || members.length === 0) {
        setUsers([]);
        return;
      }

      // Buscar profiles para cada usuário
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*');

      if (profilesError) {
        console.warn('Erro ao buscar profiles:', profilesError);
      }

      // Combinar dados de members com profiles
      const usersWithRoles = members.map(member => {
        const profile = profiles?.find(p => p.user_id === member.user_id);
        return {
          user_id: member.user_id,
          full_name: profile?.full_name || null,
          email: null, // Será preenchido se necessário
          phone: profile?.phone || null,
          avatar_url: profile?.avatar_url || null,
          role: member.role,
          created_at: member.created_at,
          updated_at: profile?.updated_at || member.created_at
        };
      });

      setUsers(usersWithRoles);
    } catch (error: any) {
      console.error('Erro ao buscar usuários:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar lista de usuários.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Criar novo usuário
  const createUser = useCallback(async (userData: CreateUserData) => {
    try {
      setLoading(true);
      console.log('Iniciando criação de usuário:', userData);

      // Chamar Edge Function para criar usuário
      console.log('Chamando edge function create-user...');
      const { data, error } = await supabase.functions.invoke('create-user', {
        body: {
          email: userData.email,
          password: userData.password,
          full_name: userData.full_name,
          phone: userData.phone || null,
          role: userData.role
        }
      });

      console.log('Resposta da edge function:', { data, error });

      if (error) {
        console.error('Erro na chamada da edge function:', error);
        throw error;
      }

      if (data?.error) {
        console.error('Erro retornado pela edge function:', data.error);
        throw new Error(data.error);
      }

      console.log('Usuário criado com sucesso, atualizando lista...');
      // Atualizar lista de usuários
      await fetchUsers();

      return { success: true };

    } catch (error: any) {
      console.error('Erro ao criar usuário:', error);
      throw new Error(error.message || 'Erro ao criar usuário');
    } finally {
      setLoading(false);
    }
  }, [fetchUsers]);

  // Atualizar role do usuário
  const updateUserRole = useCallback(async (userId: string, newRole: string) => {
    try {
      // Buscar um restaurante para associar (simplificado)
      const { data: restaurants } = await supabase
        .from('restaurants')
        .select('id')
        .limit(1);

      if (!restaurants || restaurants.length === 0) {
        throw new Error('Nenhum restaurante encontrado');
      }

      // Verificar se o usuário já está associado ao restaurante
      const { data: existingMember } = await supabase
        .from('restaurant_members')
        .select('id')
        .eq('user_id', userId)
        .eq('restaurant_id', restaurants[0].id)
        .single();

      if (existingMember) {
        // Atualizar role existente
        const { error } = await supabase
          .from('restaurant_members')
          .update({ role: newRole })
          .eq('user_id', userId)
          .eq('restaurant_id', restaurants[0].id);

        if (error) throw error;
      } else {
        // Criar nova associação
        const { error } = await supabase
          .from('restaurant_members')
          .insert({
            user_id: userId,
            restaurant_id: restaurants[0].id,
            role: newRole
          });

        if (error) throw error;
      }

      // Atualizar lista local
      setUsers(prev => 
        prev.map(user => 
          user.user_id === userId 
            ? { ...user, role: newRole }
            : user
        )
      );

    } catch (error: any) {
      console.error('Erro ao atualizar role:', error);
      throw error;
    }
  }, []);

  // Deletar usuário
  const deleteUser = useCallback(async (userId: string) => {
    try {
      // Remover das associações de restaurante
      const { error: memberError } = await supabase
        .from('restaurant_members')
        .delete()
        .eq('user_id', userId);

      if (memberError) {
        console.warn('Erro ao remover associações:', memberError);
      }

      // Remover perfil
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('user_id', userId);

      if (profileError) {
        console.warn('Erro ao remover perfil:', profileError);
      }

      // Atualizar lista local
      setUsers(prev => prev.filter(user => user.user_id !== userId));

    } catch (error: any) {
      console.error('Erro ao deletar usuário:', error);
      throw error;
    }
  }, []);

  return {
    users,
    loading,
    fetchUsers,
    refreshUsers: fetchUsers,
    createUser,
    updateUserRole,
    deleteUser
  };
};