import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { MenuItemList } from '@/components/menu/MenuItemList';
import { MenuSuggestions } from '@/components/menu/MenuSuggestions';
import { MenuCostAnalysis } from '@/components/menu/MenuCostAnalysis';
import { ChefHat, TrendingUp, AlertCircle, BarChart3, ArrowLeft } from 'lucide-react';

const MenuManagement = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          onClick={() => navigate('/')}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar</span>
        </Button>
      </div>
      
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Gerenciamento de Cardápio</h1>
        <p className="text-muted-foreground">
          Gerencie pratos, ingredientes e analise custos integrados ao inventário
        </p>
      </div>

      <Tabs defaultValue="items" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="items" className="flex items-center gap-2">
            <ChefHat className="h-4 w-4" />
            Pratos
          </TabsTrigger>
          <TabsTrigger value="suggestions" className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Sugestões
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Análise de Custos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="items">
          <Card>
            <CardHeader>
              <CardTitle>Pratos do Cardápio</CardTitle>
              <CardDescription>
                Gerencie os pratos do seu cardápio e suas receitas com ingredientes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MenuItemList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suggestions">
          <Card>
            <CardHeader>
              <CardTitle>Sugestões Baseadas no Estoque</CardTitle>
              <CardDescription>
                Recomendações automáticas para otimizar seu cardápio com base no inventário
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MenuSuggestions />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Custos</CardTitle>
              <CardDescription>
                Analise a lucratividade e custos dos pratos baseados nos preços dos ingredientes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MenuCostAnalysis />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MenuManagement;