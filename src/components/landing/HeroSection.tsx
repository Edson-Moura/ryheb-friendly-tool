import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, ArrowRight, Clock } from 'lucide-react';

const HeroSection = () => {
  const navigate = useNavigate();

  const stats = [
    { number: "10K+", label: "Restaurantes ativos" },
    { number: "98%", label: "Satisfação dos clientes" },
    { number: "30%", label: "Redução de desperdício" },
    { number: "24/7", label: "Suporte disponível" }
  ];

  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-primary/5 to-secondary/10">
      <div className="container-mobile mx-auto text-center">
        <Badge variant="secondary" className="mb-6">
          <TrendingUp className="h-4 w-4 mr-2" />
          Sistema #1 em gestão de restaurantes
        </Badge>
        
        <h1 className="text-3xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
          Transforme seu
          <span className="text-primary block">Restaurante</span>
          em um
          <span className="text-primary"> negócio inteligente</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          Gerencie estoque, cardápio, equipe e finanças em uma única plataforma. 
          Reduza custos, aumente a eficiência e tome decisões baseadas em dados.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6"
            onClick={() => navigate('/auth')}
          >
            Experimentar Grátis
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-6">
            <Clock className="mr-2 h-5 w-5" />
            Agendar Demo
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;