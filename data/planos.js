/*
  Planos de assinatura de SEO da Niobio.
  Edite este arquivo para mudar nomes, preços e o que cada plano inclui.

  - nome: aparece no card e na mensagem do WhatsApp.
  - preco: valor mensal em reais, só o número.
  - destaque: true deixa o card com borda azul brilhante e o selo "Recomendado".
  - itens: lista do que o plano inclui. Um item por linha, entre aspas.
    Um item que começa com "Tudo do plano" aparece em destaque, como base do plano.
*/
window.NIOBIO_PLANOS = [
  {
    id: "basico",
    nome: "Plano Básico",
    preco: 350,
    destaque: false,
    itens: [
      "Autoridade digital",
      "Configuração e revisão do Google Search Console",
      "Melhoria básica do SEO",
      "Otimização de até 3 páginas por mês",
      "Relatório mensal"
    ]
  },
  {
    id: "padrao",
    nome: "Plano Padrão",
    preco: 550,
    destaque: true,
    itens: [
      "Tudo do plano Básico",
      "Pesquisa de palavras-chave e concorrentes",
      "Otimização contínua de páginas",
      "Melhoria de velocidade e experiência móvel",
      "Acompanhamento de tráfego"
    ]
  },
  {
    id: "pro",
    nome: "Plano Pro",
    preco: 850,
    destaque: false,
    itens: [
      "Tudo do plano Padrão",
      "Estratégia avançada",
      "Planejamento editorial ampliado",
      "Análise competitiva recorrente",
      "Relatório e reuniões estratégicas",
      "Acompanhamento de oportunidades comerciais"
    ]
  }
];

/* Número do WhatsApp usado nos botões dos planos (só dígitos, com DDI e DDD). */
window.NIOBIO_WHATSAPP = "5514998001784";
