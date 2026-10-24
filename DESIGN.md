# Design System: Niobio

Registro do sistema visual como foi construído (index.html, 404.html, css/styles.css). Os tokens vivem em `:root` no CSS; este arquivo explica o porquê de cada um. Onde o briefing do cliente contraria uma regra genérica de skill, vale o briefing, e a exceção está marcada.

## 1. Atmosfera

Vidro líquido sobre luz azul. A página abre clara e limpa, quase papel (Paper Mist), para o globo azul da marca respirar; ao rolar, o fundo atravessa em crossfade para um bokeh azul elétrico fixo sob um véu escuro, e tudo o que é texto e vidro troca de cor junto. Leitura confortável primeiro, encantamento depois.

- **Densidade:** 4/10, arejada. Muito espaço entre seções, blocos de texto com medida de leitura.
- **Variação:** 6/10. Cada seção tem composição própria (split no hero, foto + texto em vidro, cards desencontrados nos projetos, trio central nos planos, coluna fixa + blocos no "Por que", faixa de contato, slogan centralizado).
- **Movimento:** 5/10, CSS fluido. Uma assinatura (a lente de vidro que refrata o globo), revelações discretas ao rolar e micro-interações de hover/foco.

## 2. Cores e funções

| Nome | Valor | Função |
|---|---|---|
| Paper Mist | `#F5F8FE` | Fundo do estado claro (hero) |
| Ink Navy | `#0A1430` | Texto principal no estado claro |
| Slate Navy | `#33405F` | Texto secundário no estado claro |
| Royal Blue | `#0A4DFF` | Única cor de ação: botões, ícones de contato, selo "Recomendado", links no claro |
| Electric Blue | `#1E6BFF` | Brilho da borda do plano em destaque, anel de foco, seleção de texto |
| Sky Blue | `#8DB4FF` | Destaques sobre o fundo escuro (segunda linha do slogan, check dos planos) |
| Ice White | `#F4F7FF` | Texto principal no estado profundo |
| Mist Blue | `#C9D6F2` | Texto secundário no estado profundo |
| Link Sky | `#A9C4FF` | Links no estado profundo |
| Off-Black | `#04060C` | Base do fundo profundo e do véu (nunca `#000`) |

**Véu do fundo profundo:** gradiente horizontal de `rgb(4 6 12 / .78)` a `/ .5` sobre a imagem `fundo-azul`, mais uma camada `rgb(4 10 30 / .25)`. É ele que garante contraste AA do texto em qualquer ponto do bokeh.

**Troca de estado:** as cores são propriedades registradas com `@property` (`--ink`, `--ink-soft`, `--link`, `--glass-*`), por isso fazem transição suave junto com o crossfade do fundo (850 ms, `cubic-bezier(0.32, 0.72, 0, 1)`). A classe `is-deep` em `<html>` é ligada por um `IntersectionObserver` quando menos de 45% do hero está visível.

## 3. Tipografia

Somente duas famílias do Google Fonts, carregadas sem bloquear a renderização e com fallbacks de métricas ajustadas (Arial com `size-adjust`), para a troca de fonte não deslocar o layout.

- **Display: DM Sans** (pesos 500 a 700, eixo `opsz` 40 nos tamanhos grandes). Títulos, preços, botões, slogan. Tracking de -0.02em a -0.035em, entrelinha de 1.0 a 1.06. *Exceção do briefing: a skill de taste lista DM Sans como fonte "padrão de IA"; o cliente fixou essa fonte.*
- **Texto: Work Sans** (400 a 600). Texto corrido, rótulos e navegação. Corpo de 16 a 18 px (`clamp`), entrelinha 1.65 a 1.7, medida de 36 a 40rem.
- **Escala:** `--step--1` 14–15 px · `--step-0` 16–18 px · `--step-1` 19–23 px · `--step-2` 24–34 px · `--step-3` 34–60 px (títulos de seção) · `--step-4` 40–88 px (h1). Slogan 40–96 px.
- **Preços:** algarismos tabulares (`font-variant-numeric: tabular-nums`).
- **Proibido:** qualquer terceira fonte, monoespaçada decorativa, rótulos minúsculos em caixa-alta espaçada, "eyebrow" acima de título.

## 4. Componentes

- **Vidro (`.glass`):** fundo translúcido (`--glass-bg`), `backdrop-filter: blur(18px) saturate(170%)`, luz interna de 1 px no topo (`--glass-hi`), anel interno de 1 px (`--glass-line`), sombra difusa com deslocamento vertical. `::before` desenha a borda de luz (forte no canto superior esquerdo, some no lado oposto) com máscara; `::after` desenha o reflexo especular.
- **Refração (`.glass--refract`):** só no Chromium, filtro SVG `#lg-refract` (turbulência + deslocamento) no `backdrop-filter`. Usado só na lente do hero e no botão da 404. Na navegação, combinado com o blur, ele anulava o desfoque e deixava o texto de trás nítido; por isso a barra usa só blur, com tom mais denso (branco 80% no claro, `rgb(6 12 30 / .74)` no profundo) para leitura sobre o conteúdo.
- **Moldura dupla (`.bezel` + `.core`):** casca de vidro com 0.4rem de respiro e núcleo com raio concêntrico (`calc(2rem - 0.4rem)`). Usada na foto do fundador e nos cards de projeto.
- **Botões:** pílula, DM Sans 600, altura mínima de 48 px. Ícone aninhado num círculo Royal Blue à direita, que desliza em diagonal no hover. Primário em Royal Blue sólido; secundário em vidro. Pressionar: `scale(0.98)`.
- **Plano em destaque:** borda de 1,5 px em `conic-gradient` girando com `@property --border-angle` (6 s, só quando a seção está visível), halo azul suave, card 1rem maior em cima e embaixo (margem negativa compensada no padding, para título, preço e botão seguirem alinhados com os vizinhos) e selo "Recomendado".
- **Lista dos planos:** cada item com check SVG (Royal Blue no claro, Sky Blue no profundo), 0.85rem entre itens. A linha "Tudo do plano ..." usa ícone de soma e texto em `--ink` 600, para mostrar que o plano inclui o anterior. Botão sempre na base do card (`margin-top: auto`, cards esticados na linha). *Exceção do briefing: brilho azul pedido explicitamente; nos outros cards o vidro é neutro.*
- **Cards de contato:** ícone SVG inline (traço 1.7) num quadrado arredondado Royal Blue, rótulo + valor, seta que sobe em diagonal no hover.
- **Navegação:** pílula de vidro flutuante e centralizada (máx. 62rem), logo + 5 âncoras + "Conversar". Abaixo de 960 px vira logo + botão "Menu" (hambúrguer que vira X), com painel de vidro e links em cascata. Fecha com Esc, clique fora ou ao escolher um link.
- **Foco:** contorno de 2 px Electric Blue (Sky Blue no estado profundo) com 3 px de afastamento. Seleção de texto em Electric Blue.

## 5. Layout

- Container de 76rem com margem lateral fluida de 16 a 40 px; seções separadas por 96 a 192 px.
- Hero `min-height: 100svh`, inteiro visível em 1280×720. Desktop: texto à esquerda (1.15fr), palco do logo à direita (0.85fr). Celular: logo pequeno em cima, texto embaixo.
- Quem somos: texto em vidro à esquerda, foto 4:5 à direita (4:3 no celular) com etiqueta do nome em vidro.
- Projetos: duas colunas, a segunda desce 4rem.
- Planos: três colunas (1 : 1.08 : 1) com a mesma altura, empilham no celular. Básico, Padrão (destaque) e Pro. *Exceção do briefing: a regra genérica "sem três cards iguais" não se aplica; o cliente pediu três planos lado a lado, e o do meio é diferente.*
- Por que a Niobio: título fixo (sticky) à esquerda, seis blocos de vidro à direita com recuo alternado. A primeira frase de cada bloco vai em `<strong>` e resume o bloco; o último termina no botão do WhatsApp.
- Tudo vira uma coluna abaixo de 768 px; sem rolagem horizontal (testado em 375, 768, 1280, 1366 e 1440 px).

## 6. Movimento

- **Curvas:** `--ease-out` `cubic-bezier(0.16, 1, 0.3, 1)` para entradas; `--ease-glass` `cubic-bezier(0.32, 0.72, 0, 1)` para vidro e botões. Nada linear, exceto o giro contínuo da borda.
- **Assinatura:** a lente de vidro passeia sobre o globo (14 s, alternado). Começa só depois do carregamento e pausa quando o fundo fica azul.
- **Revelação:** elementos sobem 24 px com opacidade em 900 ms, com atraso em cascata de 80 ms (`--i`). Conteúdo visível sem JavaScript. Vidro ainda não revelado fica sem `backdrop-filter`, para aliviar o carregamento.
- **Movimento reduzido:** troca de fundo instantânea, sem revelações nem lente animada.
- **Transparência reduzida:** vidro vira superfície sólida (branca no claro, `#0B1736` no profundo) e o véu do fundo fica mais opaco.

## 7. Anti-padrões (não fazer)

- Nenhuma fonte além de DM Sans e Work Sans.
- Nada de urgência falsa, contagem regressiva, "só hoje" ou botão agressivo.
- Não acrescentar entregas além das definidas pelo cliente nos planos, nem prazos, promessas de ranking, depoimentos, logos de clientes, números ou endereço.
- Nenhum emoji, nenhum ícone de fonte; só SVG inline com traço consistente.
- Nenhum preto puro `#000000`; usar Off-Black `#04060C`.
- Nenhum texto em gradiente e nenhuma palavra de título pintada à parte além da segunda linha do h1 e do slogan.
- Nenhum eyebrow, numeração 01/02/03 ou rótulo em caixa-alta espaçada.
- Nenhum brilho azul fora do plano em destaque e da luz do globo na 404.
- Nunca usar `backdrop-filter` em elementos grandes que rolam fora do sistema `.glass`.
