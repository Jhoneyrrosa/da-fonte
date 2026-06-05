import { Product, Client } from '../types';

export const initialProducts: Product[] = [
  // Hidratação
  { id: 'p1', name: 'Máscara Hidratante Intensiva 500g', category: 'Hidratação', description: 'Máscara com ativos de hidratação profunda para cabelos ressecados e quebradiços.', price: 45.00, imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop', active: true },
  { id: 'p2', name: 'Hidratação com Manteiga de Karité 1kg', category: 'Hidratação', description: 'Tratamento intensivo com manteiga de karité para cabelos secos e sem vida.', price: 85.00, imageUrl: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop', active: true },
  { id: 'p3', name: 'Leave-in Hidratante 300ml', category: 'Hidratação', description: 'Leave-in sem enxágue para hidratação prolongada e facilidade no desembaraço.', price: 32.00, imageUrl: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop', active: true },
  { id: 'p4', name: 'Óleo de Tratamento Capilar 100ml', category: 'Hidratação', description: 'Óleo multifuncional para brilho, hidratação e proteção térmica dos fios.', price: 58.00, imageUrl: 'https://images.unsplash.com/photo-1631390064660-dc32a0c4fa4f?w=400&h=400&fit=crop', active: true },
  { id: 'p5', name: 'Spray Hidratante Diário 200ml', category: 'Hidratação', description: 'Spray de uso diário para repor a hidratação entre as lavagens.', price: 28.00, imageUrl: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=400&h=400&fit=crop', active: true },

  // Shampoo
  { id: 'p6', name: 'Shampoo Reconstrutor Profissional 1L', category: 'Shampoo', description: 'Shampoo com proteínas da seda para reconstrução de fios danificados por química.', price: 55.00, imageUrl: 'https://images.unsplash.com/photo-1585751119414-ef2636f8aede?w=400&h=400&fit=crop', active: true },
  { id: 'p7', name: 'Shampoo Antirresíduo 500ml', category: 'Shampoo', description: 'Remove resíduos de produtos e prepara os fios para tratamentos químicos.', price: 38.00, imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop', active: true },
  { id: 'p8', name: 'Shampoo de Crescimento com Biotina 1L', category: 'Shampoo', description: 'Estimula o crescimento capilar com complexo de biotina, zinco e niacinamida.', price: 62.00, imageUrl: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop', active: true },
  { id: 'p9', name: 'Shampoo Low Poo 400ml', category: 'Shampoo', description: 'Limpeza suave sem sulfatos para cabelos cacheados, ondulados e coloridos.', price: 42.00, imageUrl: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop', active: true },
  { id: 'p10', name: 'Shampoo Matizador Violeta 500ml', category: 'Shampoo', description: 'Neutraliza tons amarelados e deixa cabelos loiros com brilho prateado.', price: 48.00, imageUrl: 'https://images.unsplash.com/photo-1631390064660-dc32a0c4fa4f?w=400&h=400&fit=crop', active: true },

  // Alisamento
  { id: 'p11', name: 'Progressiva Definitiva Premium 1L', category: 'Alisamento', description: 'Alisamento definitivo de alta performance com queratina e colágeno.', price: 120.00, imageUrl: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=400&h=400&fit=crop', active: true },
  { id: 'p12', name: 'Botox Capilar Sem Formol 1kg', category: 'Alisamento', description: 'Tratamento de reconstrução, hidratação e alisamento suave sem formol.', price: 95.00, imageUrl: 'https://images.unsplash.com/photo-1585751119414-ef2636f8aede?w=400&h=400&fit=crop', active: true },
  { id: 'p13', name: 'Relaxamento Guanidina Kit Completo', category: 'Alisamento', description: 'Kit completo de relaxamento com guanidina para profissionais. Alta durabilidade.', price: 75.00, imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop', active: true },
  { id: 'p14', name: 'Progressiva Orgânica 500ml', category: 'Alisamento', description: 'Alisamento orgânico sem formol e sem odor. Resultado natural e duradouro.', price: 88.00, imageUrl: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop', active: true },
  { id: 'p15', name: 'Lissagem Marroquina com Argan 500ml', category: 'Alisamento', description: 'Alisamento enriquecido com óleo de argan marroquino para brilho intenso.', price: 98.00, imageUrl: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop', active: true },

  // Descoloração
  { id: 'p16', name: 'Pó Descolorante com Filtro UV 500g', category: 'Descoloração', description: 'Descolorante em pó com proteção UV para menos danos durante o processo.', price: 65.00, imageUrl: 'https://images.unsplash.com/photo-1631390064660-dc32a0c4fa4f?w=400&h=400&fit=crop', active: true },
  { id: 'p17', name: 'Pasta Descolorante Azul Premium 500g', category: 'Descoloração', description: 'Descolorante em pasta azul de alta performance com agentes condicionantes.', price: 58.00, imageUrl: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=400&h=400&fit=crop', active: true },
  { id: 'p18', name: 'Descolorante em Creme 500g', category: 'Descoloração', description: 'Descolorante cremoso de fácil aplicação, sem escorrer e sem ressecamento excessivo.', price: 52.00, imageUrl: 'https://images.unsplash.com/photo-1585751119414-ef2636f8aede?w=400&h=400&fit=crop', active: true },
  { id: 'p19', name: 'Kit Mega Descoloração Profissional', category: 'Descoloração', description: 'Kit completo com pó descolorante, oxidante 30vol e máscara pós-química.', price: 135.00, imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop', active: true },
  { id: 'p20', name: 'Pó Descolorante Branco Fortalecedor 400g', category: 'Descoloração', description: 'Descolorante em pó branco com ativos fortalecedores que minimizam a quebra.', price: 48.00, imageUrl: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop', active: true },

  // Oxidantes
  { id: 'p21', name: 'Água Oxigenada 10 Vol 900ml', category: 'Oxidantes', description: 'Oxidante líquido 10 volumes para coloração suave, tonalização e retoques delicados.', price: 22.00, imageUrl: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop', active: true },
  { id: 'p22', name: 'Água Oxigenada 20 Vol 900ml', category: 'Oxidantes', description: 'Oxidante líquido 20 volumes, padrão para coloração permanente.', price: 22.00, imageUrl: 'https://images.unsplash.com/photo-1631390064660-dc32a0c4fa4f?w=400&h=400&fit=crop', active: true },
  { id: 'p23', name: 'Água Oxigenada 30 Vol 900ml', category: 'Oxidantes', description: 'Oxidante líquido 30 volumes para clareamento e colorações mais claras.', price: 24.00, imageUrl: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=400&h=400&fit=crop', active: true },
  { id: 'p24', name: 'Água Oxigenada 40 Vol 900ml', category: 'Oxidantes', description: 'Oxidante líquido 40 volumes para descoloração e máximo clareamento.', price: 24.00, imageUrl: 'https://images.unsplash.com/photo-1585751119414-ef2636f8aede?w=400&h=400&fit=crop', active: true },
  { id: 'p25', name: 'Oxidante em Creme 20 Vol 900ml', category: 'Oxidantes', description: 'Oxidante cremoso 20 volumes para melhor aderência e distribuição uniforme.', price: 35.00, imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop', active: true },
];

export const initialClients: Client[] = [
  {
    id: 'DF-0001',
    username: 'cliente',
    password: 'dafonte123',
    name: 'João Silva',
    company: 'Salão Beleza Total',
    cnpj: '12.345.678/0001-90',
    phone: '(44) 99999-0001',
    address: 'Rua das Flores, 123 - Maringá/PR',
    active: true,
    profileComplete: true,
    createdAt: new Date().toISOString(),
  },
];
