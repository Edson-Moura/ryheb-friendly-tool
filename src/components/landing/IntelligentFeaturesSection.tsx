import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Package, 
  DollarSign, 
  BarChart3, 
  TrendingUp,
  Brain,
  Zap
} from 'lucide-react';

const IntelligentFeaturesSection = () => {
  const intelligentFeatures = [
    {
      icon: Package,
      title: "Controle de Estoque Inteligente",
      description: "IA monitora ingredientes em tempo real com alertas automáticos de baixo estoque, previsão de validade e sugestões de reposição baseadas em padrões de consumo."
    },
    {
      icon: DollarSign,
      title: "Otimização de Preços Inteligente",
      description: "Algoritmos avançados ajustam preços automaticamente baseados em custos, demanda histórica, sazonalidade e metas de lucratividade."
    },
    {
      icon: TrendingUp,
      title: "Previsões Inteligentes de Demanda",
      description: "IA analisa padrões históricos, eventos locais e tendências para prever demanda futura e otimizar compras, evitando faltas e excessos."
    },
    {
      icon: BarChart3,
      title: "Análise Inteligente de Performance",
      description: "Machine Learning identifica tendências ocultas nos dados, sugere melhorias operacionais e detecta oportunidades de crescimento."
    },
    {
      icon: Brain,
      title: "Decisões Baseadas em IA",
      description: "Sistema de recomendações inteligentes para cardápio, fornecedores, horários de pico e estratégias de redução de desperdício."
    },
    {
      icon: Zap,
      title: "Automação Inteligente",
      description: "Automatize tarefas repetitivas como pedidos de reposição, alertas de vencimento e ajustes de preços sazonais."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-primary/10 to-secondary/10">
      <div className="container-mobile mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            O Poder da <span className="text-primary">Inteligência Artificial</span> 
            no seu Restaurante
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transforme dados em insights acionáveis e automatize decisões complexas 
            para maximizar lucros e eficiência operacional
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {intelligentFeatures.map((feature, index) => (
            <Card key={index} className="border-2 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-card/50 backdrop-blur p-8 rounded-xl border">
            <h3 className="text-2xl font-bold mb-4">
              Negócio Inteligente = Resultados Extraordinários
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">40%</div>
                <div className="text-sm text-muted-foreground">Menos desperdício com IA</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">25%</div>
                <div className="text-sm text-muted-foreground">Aumento na margem de lucro</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">60%</div>
                <div className="text-sm text-muted-foreground">Redução do tempo de gestão</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntelligentFeaturesSection;