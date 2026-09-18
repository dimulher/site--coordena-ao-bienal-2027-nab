# Guia de uso do MCP

Aprenda a conectar sua IA aos seus formulários via Model Context Protocol.

## O que é o MCP do Spotform?

O Spotform expõe um servidor MCP (Model Context Protocol) read-only que permite conectar sua IA (Claude, Cursor, etc.) aos seus formulários e submissões. A IA pode consultar dados, mas não criar, editar ou apagar nada.

## Como conectar (3 passos)

1. Crie uma credencial na página de credenciais.
2. Copie o token — ele é exibido uma única vez após a criação.
3. Cole a configuração abaixo no seu cliente de IA.

URL do servidor: `https://api.spotform.com.br/mcp`

```json
{
  "mcpServers": {
    "spotform": {
      "url": "https://api.spotform.com.br/mcp",
      "headers": {
        "Authorization": "Bearer spf_mcp_SEU_TOKEN"
      }
    }
  }
}
```

## Ferramentas disponíveis

Seu cliente de IA pode usar as seguintes ferramentas para consultar seus dados no Spotform.

### `list_forms`

Lista os formulários acessíveis pela credencial.

- `search` — string
- `page` — number

**Retorna:** `id`, `name`, `description`, `isPublished`, `slug`, `shareUrl`, `publicUrl`, `visits`, `submissions`, `createdAt`, `updatedAt`

### `get_form`

Retorna a estrutura e configuração de um formulário.

- `formId` — string (obrigatório)

**Retorna:** `id`, `name`, `description`, `isPublished`, `slug`, `shareUrl`, `publicUrl`, `content`, `conditionsV2Json`, `conditionsVersion`, `layoutVariant`, `funnelConfigJson`, `quizEnabled`, `quizConfigJson`, `visits`, `submissions`, `moderationStatus`, `createdAt`, `updatedAt`

### `get_form_analytics`

Onde o formulário perde gente: visitas, iniciados, concluídos, desqualificados, taxa de conclusão e o abandono POR ETAPA — a pergunta em que cada pessoa parou. Aceita recorte por período e por UTM. Em formulário com quiz, traz também a distribuição por faixa de resultado.

- `formId` — string (obrigatório)
- `from` — string (ISO date)
- `to` — string (ISO date)
- `utmSource` — string
- `utmCampaign` — string

**Retorna:** `visitas`, `iniciados`, `concluidos`, `abandonos`, `desqualificados`, `taxaDeConclusao`, `abandonoPorEtapa`, `quiz`

### `check_form`

Diagnostica o formulário antes de publicar: pergunta de escolha sem opções ou com rótulos repetidos, campo múltiplo que trava o avanço automático do funil, texto de ajuda padrão vazando para quem responde, tela inicial ilegível sob tema claro, condição apontando para campo que sumiu, quiz cuja faixa mais alta não alcança a nota máxima. Só lê.

- `formId` — string (obrigatório)

**Retorna:** `erros`, `avisos`, `achados`

### `list_user_images`

Lista as imagens da galeria do usuário com a URL pública de cada uma. Use essas URLs no logo, nos fundos de tela ou na imagem de uma opção.

- `search` — string

**Retorna:** `id`, `name`, `url`, `size`, `type`, `createdAt`

### `list_submissions`

Lista submissões de um formulário com filtros opcionais de data, UTM, localização, dispositivo e qualificação.

- `formId` — string (obrigatório)
- `from` — string (ISO date)
- `to` — string (ISO date)
- `utmSource` — string
- `utmCampaign` — string
- `city` — string
- `state` — string
- `country` — string
- `browser` — string
- `os` — string
- `finished` — boolean
- `qualified` — boolean
- `search` — string
- `page` — number

**Retorna:** `id`, `content`, `createdAt`, `utmSource`, `utmCampaign`, `city`, `country`, `notFinished`, `isDisqualified`

### `get_submission`

Retorna os dados completos de uma submissão específica.

- `submissionId` — string (obrigatório)

**Retorna:** `id`, `formId`, `content`, `createdAt`

### `get_form_statistics`

Retorna estatísticas de um formulário: visitas, submissões e finalizadas.

- `formId` — string (obrigatório)

**Retorna:** `formId`, `visits`, `submissions`, `finished`

### `get_account_statistics`

Retorna estatísticas agregadas de todos os formulários no escopo da credencial.

**Retorna:** `forms`, `totalVisits`, `totalSubmissions`

## Ferramentas de escrita

As ferramentas abaixo requerem permissão WRITE ou DELETE na credencial. A IA pode criar, editar e excluir formulários conforme o nível de acesso configurado.

Níveis de permissão: READ permite apenas leitura. WRITE permite criar e editar. DELETE permite criar, editar e excluir (exige escopo de formulários específicos).

### `create_form` — Leitura e escrita

Cria um formulário vazio com o nome informado. Com layoutVariant "funnel" ele já nasce sem a tela de "Iniciar", que o formato de uma pergunta por tela raramente precisa.

### `update_form_config` — Leitura e escrita

Atualiza a configuração do formulário: textos, cores, telas inicial e final, logo e imagens de fundo, termos, contagem regressiva e o layout (clássico ou funil). Não altera webhook, redirecionamento nem tracking.

### `set_form_published` — Leitura e escrita

Publica ou despublica o formulário.

### `set_form_conditions` — Leitura e escrita

Define a lógica condicional V2 do formulário.

### `clone_form` — Leitura e escrita

Duplica um formulário com tudo dentro: campos, aparência, layout, tema do funil, quiz e lógica condicional. O clone nasce como rascunho, sem endereço próprio e sem as respostas do original.

### `set_form_slug` — Leitura e escrita

Define o endereço público do formulário (form.spotform.com.br/<slug>). O texto é normalizado — sem acento, minúsculo, espaço vira hífen — e precisa ser único na plataforma; endereço já em uso é recusado e nada é gravado.

### `set_funnel_config` — Leitura e escrita

Tema e comportamento do layout funil: cores, arredondamento, largura, alinhamento, estilo do progresso, colunas das opções e as telas de análise entre perguntas. Envie só o que quiser mudar.

### `set_quiz_config` — Leitura e escrita

Configuração do quiz: modo, agregação dos pontos, o que o respondente vê e as faixas de resultado. A pontuação das perguntas tem tool própria e nunca é apagada aqui.

### `set_question_scoring` — Leitura e escrita

Define a pontuação de uma pergunta. Em campo de escolha, cada entrada aceita o RÓTULO da opção — não é preciso conhecer o id interno. Substitui a pontuação anterior daquele campo.

### `delete_form` — Escrita e exclusão

Exclui permanentemente o formulário e todas as suas submissões.

## Campos do formulário

Ferramentas para adicionar, editar, remover e reordenar campos. Todas exigem permissão WRITE.

### `add_field` — Leitura e escrita

Adiciona um campo ao formulário. Informe o tipo e, opcionalmente, a posição e atributos semânticos (label, required, placeholder, helperText, options, accept, quantity, rows, content, startsNewScreen, multiple, isName). As opções aceitam o rótulo puro ou um objeto com imagem, emoji e cor. Em pergunta de resposta única, mande multiple: false — o default do tipo aceita várias, e campo múltiplo não avança sozinho no layout funil.

### `update_field` — Leitura e escrita

Edita os atributos semânticos de um campo existente. Valida contra o tipo atual do campo.

### `delete_field` — Leitura e escrita

Remove o campo do formulário. Condições V2 que o referenciam são removidas automaticamente.

### `reorder_fields` — Leitura e escrita

Reordena os campos passando todos os ids na nova ordem desejada.

**Tipos de campo suportados:**

`TextField`, `EmailField`, `PhoneField`, `NumberField`, `TextAreaField`, `SelectField`, `MultipleChoiceField`, `RatingField`, `DateField`, `Date2Field`, `UploadField`, `StatementField`, `CpfCnpjField`, `CepField`, `RgField`

Atributos visuais (cores, fontes, mídia) usam os padrões do Spotform e podem ser ajustados no dashboard.

## Webhooks

Crie e gerencie webhooks que disparam a cada submissão do formulário. Exigem permissão de escrita (exceto a listagem).

### `list_webhooks` — Somente leitura

Lista os webhooks do formulário (valores de headers omitidos).

### `create_webhook` — Leitura e escrita

Cria um webhook (url, name, headers opcionais). Máximo de 5 por formulário.

### `update_webhook` — Leitura e escrita

Edita um webhook existente; headers substituem o conjunto inteiro.

### `delete_webhook` — Leitura e escrita

Remove um webhook do formulário.

### `test_webhook` — Leitura e escrita

Dispara um POST de teste para os webhooks ativos.

Por segurança, a URL precisa ser https e hosts internos são bloqueados; na listagem, apenas as chaves dos headers são retornadas (nunca os valores).

## Escopo de acesso

Ao criar uma credencial, você define quais formulários ela pode acessar:

- **ALL_FORMS** (Todos os formulários) — A IA acessa todos os seus formulários presentes e futuros.
- **SPECIFIC_FORMS** (Formulários específicos) — A IA acessa apenas os formulários selecionados no momento da criação.

Em ambos os casos, a credencial só acessa formulários dos quais você é dono. Solicitar um formulário fora do escopo retorna erro.

## Segurança e limites

- Acesso somente leitura — a IA nunca cria, edita ou apaga nada.
- Recurso premium — requer assinatura ativa.
- Limite de uso: 120 requisições por minuto por credencial.
- O token é exibido uma única vez; se perder, revogue e crie outra credencial.
- Revogue uma credencial a qualquer momento na página de credenciais.
