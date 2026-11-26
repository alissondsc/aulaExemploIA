## Prompt 00
Quero que você desenvolva e organize uma aplicação utilizando os projetos existentes no meu computador, respeitando os seguintes caminhos:

**CAMINHOS DOS PROJETOS**

- Back-end: `C:\Users\alisson62314316\aula-exemplo-backend-jp-2026`
- Front-end: `C:\Users\alisson62314316\Documents\spec-to-solution`

## 1. BACK-END

Desenvolva e organize o back-end utilizando Node.js e Express, seguindo boas práticas de desenvolvimento e organização de código.

### Tecnologias obrigatórias:
- Node.js
- Express
- PostgreSQL (PG)
- Sequelize (ORM)
- NPM
- Nodemon para desenvolvimento

### Requisitos de desenvolvimento:

1. Utilize o Express para configurar o servidor e gerenciar as rotas HTTP, respeitando os métodos e códigos de status HTTP adequados.
2. Implemente as operações CRUD completas:
   - Create (criar).
   - Read (consultar).
   - Update (atualizar).
   - Delete (excluir).
3. Utilize PostgreSQL como banco de dados.
4. Utilize Sequelize para realizar o mapeamento e as operações com o banco de dados.
5. Implemente tratamento adequado de erros e exceções, evitando que falhas interrompam inesperadamente a aplicação.
6. Utilize respostas HTTP apropriadas para situações de sucesso, erros de validação, recursos não encontrados e erros internos.
7. Organize o código seguindo o padrão MVC e separação de responsabilidades.

### Estrutura obrigatória de pastas e arquivos:

Organize o back-end seguindo esta estrutura:

```text
back-end/
│
├── src/
│   ├── router/
│   │   └── routes.js
│   │
│   ├── model/
│   │   └── models.js
│   │
│   ├── service/
│   │   └── services.js
│   │
│   ├── controller/
│   │   └── controllers.js
│   │
│   └── config/
│       └── database.js
│
├── index.html
├── server.js
├── .gitignore
├── .env
├── .env.example
└── package.json
```

Os nomes dos arquivos podem ser ajustados conforme a necessidade do projeto, desde que a separação entre rotas, modelos, serviços e controladores seja mantida.

### Configurações adicionais:

- Configure corretamente a conexão com o PostgreSQL utilizando Sequelize.
- Utilize variáveis de ambiente para armazenar credenciais e configurações sensíveis.
- Configure o `.gitignore` para ignorar `node_modules`, `.env` e outros arquivos desnecessários.
- Configure o Nodemon para monitorar alterações durante o desenvolvimento.
- Disponibilize o comando `npm run dev` no `package.json` para iniciar o servidor em modo de desenvolvimento.
- Utilize `npm start` para execução em produção, se aplicável.

## 2. FRONT-END

Utilize o projeto existente no seguinte diretório:

`C:\Users\alisson62314316\Documents\spec-to-solution`

Analise a estrutura atual do front-end antes de realizar qualquer alteração.

Mantenha a identidade visual, os componentes e as funcionalidades já existentes, realizando apenas as modificações necessárias para integrar o front-end ao back-end.

Configure corretamente as requisições HTTP para consumir as rotas disponibilizadas pela API.

## 3. INTEGRAÇÃO ENTRE FRONT-END E BACK-END

- Configure a comunicação entre front-end e back-end.
- Utilize requisições HTTP para realizar as operações CRUD.
- Garanta que os dados cadastrados sejam armazenados no PostgreSQL.
- Implemente a atualização e exclusão de registros.
- Trate os erros retornados pela API no front-end.
- Configure o CORS quando necessário.

## 4. ORIENTAÇÕES IMPORTANTES

Antes de começar:

1. Analise os arquivos e a estrutura dos dois projetos.
2. Verifique quais funcionalidades já estão implementadas.
3. Identifique o que precisa ser criado, corrigido ou reorganizado.
4. Evite excluir ou sobrescrever funcionalidades existentes sem necessidade.
5. Preserve o que já está funcionando.

Durante o desenvolvimento:

- Escreva códigos limpos, organizados e reutilizáveis.
- Utilize boas práticas de programação.
- Mantenha a separação de responsabilidades.
- Evite duplicação de código.
- Comente trechos importantes quando necessário.
- Garanta que os arquivos estejam corretamente conectados entre si.

## 5. VALIDAÇÃO FINAL

Ao concluir o desenvolvimento:

- Verifique se todas as dependências estão instaladas.
- Confirme se a conexão com o PostgreSQL está funcionando.
- Teste todas as operações CRUD.
- Verifique se as rotas estão respondendo corretamente.
- Confirme se o front-end está consumindo a API.
- Verifique se não existem erros de execução.

**IMPORTANTE:** Não quero apenas exemplos de código ou explicações. Quero que você trabalhe diretamente nos arquivos dos projetos, implementando e organizando o código necessário.

Ao finalizar, apresente um resumo das alterações realizadas, os arquivos criados ou modificados, as dependências necessárias e os comandos para executar o front-end e o back-end.

## Prompt 01

Quero iniciar um processo de auditoria e refinamento deste projeto.

Neste primeiro momento, NÃO REALIZE NENHUMA ALTERAÇÃO NOS ARQUIVOS.

Sua tarefa é exclusivamente analisar o projeto aberto no VS Code.

Atue como um Desenvolvedor Full Stack Sênior e faça uma análise técnica completa, considerando:

1. Estrutura de diretórios e arquivos.
2. Tecnologias e dependências utilizadas.
3. Arquitetura do Front-end e Back-end.
4. Organização de rotas, controllers, services e models.
5. Funcionamento das operações CRUD.
6. Comunicação entre Front-end e Back-end.
7. Validação e integridade dos dados.
8. Tratamento de erros e exceções.
9. Segurança da aplicação.
10. Interface, experiência do usuário e responsividade.
11. Desempenho e otimização.
12. Organização e qualidade do código.
13. Documentação existente.

Identifique problemas, inconsistências, riscos e oportunidades de melhoria.

Organize o resultado em um relatório contendo:

- Visão geral do projeto.
- Funcionalidades identificadas.
- Problemas encontrados.
- Funcionalidades que aparentam estar funcionando.
- Pontos que precisam de testes para confirmação.
- Melhorias recomendadas.
- Arquivos que provavelmente precisarão de alterações.
- Prioridade de cada melhoria: alta, média ou baixa.
- Possíveis riscos de implementação.

Ao final, apresente um plano de execução dividido em etapas.

IMPORTANTE:
Não modifique, exclua, crie ou sobrescreva nenhum arquivo.
Não execute comandos que alterem o projeto.
Não presuma que uma funcionalidade está funcionando sem evidências.

Quero apenas o diagnóstico e o planejamento para aprovação antes de iniciar qualquer implementação.

## Prompt 2

# PAPEL E RESPONSABILIDADE

Atue como um Desenvolvedor Full Stack Sênior, especialista em arquitetura de software, Node.js, Express, JavaScript, APIs REST, Front-end, segurança da informação, qualidade de código e testes de aplicações web.

Sua missão é realizar uma auditoria técnica completa e promover o refinamento do projeto atualmente aberto no VS Code, identificando problemas, corrigindo falhas e implementando melhorias necessárias.

O objetivo é elevar a qualidade do projeto, tornando-o mais robusto, seguro, organizado, responsivo e confiável.

# REGRA PRINCIPAL: PRESERVAÇÃO DO PROJETO

Antes de realizar qualquer alteração:

- Analise toda a estrutura existente do projeto.
- Identifique as tecnologias, bibliotecas e dependências utilizadas.
- Entenda a arquitetura e a comunicação entre Front-end e Back-end.
- Identifique as funcionalidades já implementadas.
- Verifique quais recursos estão funcionando corretamente.
- Preserve todas as funcionalidades existentes.
- Não remova recursos, componentes, rotas ou funcionalidades sem justificativa técnica e autorização.
- Não substitua tecnologias ou frameworks sem necessidade comprovada.
- Evite reconstruções desnecessárias.
- Não sobrescreva arquivos de configuração sem analisar suas dependências.

**IMPORTANTE:** Toda alteração deve ser realizada com o máximo de cuidado para evitar regressões ou perda de funcionalidades.

# ETAPA 1 — DIAGNÓSTICO E ANÁLISE GERAL

Realize uma análise completa do projeto.

Verifique:

1. Estrutura dos diretórios e arquivos.
2. Organização e separação de responsabilidades.
3. Dependências e bibliotecas instaladas.
4. Configurações do ambiente.
5. Rotas e endpoints existentes.
6. Controllers, services e models.
7. Comunicação entre Front-end e Back-end.
8. Integração com banco de dados, caso exista.
9. Funcionalidades implementadas.
10. Possíveis erros, inconsistências e vulnerabilidades.

Identifique problemas e oportunidades de melhoria.

Antes de modificar arquivos, apresente um diagnóstico com:
- Problemas encontrados.
- Funcionalidades que precisam de correção.
- Melhorias recomendadas.
- Possíveis riscos das alterações.

# ETAPA 2 — CORREÇÃO DE FALHAS

Identifique e corrija:

- Erros de execução.
- Bugs nas funcionalidades.
- Problemas de comunicação entre componentes.
- Falhas nas requisições HTTP.
- Erros de lógica de programação.
- Problemas de carregamento.
- Inconsistências no processamento de dados.
- Problemas de navegação.
- Erros no console do navegador e terminal.

Não faça alterações desnecessárias em funcionalidades que já estão funcionando.

# ETAPA 3 — REVISÃO DO BACK-END

Analise toda a estrutura do Back-end.

Verifique:

- Organização das rotas.
- Controllers e services.
- Models e integração com banco de dados.
- Separação de responsabilidades.
- Padronização dos endpoints.
- Métodos HTTP utilizados.
- Códigos de status HTTP.
- Validação dos dados recebidos.
- Tratamento de erros e exceções.
- Respostas padronizadas da API.

Garanta que a aplicação utilize corretamente os métodos HTTP:

- GET: consulta de informações.
- POST: criação de registros.
- PUT: atualização completa.
- PATCH: atualização parcial.
- DELETE: exclusão de registros.

Não altere a arquitetura atual sem necessidade técnica.

# ETAPA 4 — TESTES DE CRUD E API (POSTMAN)

Realize uma revisão completa das operações CRUD.

Teste os seguintes cenários:

**CREATE — POST**
- Cadastro com dados válidos.
- Cadastro com campos obrigatórios ausentes.
- Cadastro com dados inválidos.
- Cadastro de informações duplicadas, quando aplicável.

**READ — GET**
- Consulta de todos os registros.
- Consulta de registro específico.
- Consulta de registro inexistente.
- Verificação do formato das respostas.

**UPDATE — PUT/PATCH**
- Atualização com dados válidos.
- Atualização com dados inválidos.
- Atualização de registro inexistente.
- Verificação da persistência das alterações.

**DELETE — DELETE**
- Exclusão de registro existente.
- Exclusão de registro inexistente.
- Verificação da exclusão efetiva.

Para cada endpoint, valide:
- Método HTTP.
- URL.
- Parâmetros.
- Headers.
- Body.
- Status HTTP.
- Estrutura da resposta.
- Comportamento esperado.

Se possível, crie uma coleção do Postman organizada por funcionalidades, com exemplos de requisições e testes automatizados.

Não considere uma API funcional apenas porque retorna status 200. Verifique também se os dados foram realmente processados corretamente.

# ETAPA 5 — MELHORIAS NO FRONT-END (UI/UX)

Realize uma análise visual e funcional da interface.

Aprimore:

- Organização dos elementos.
- Hierarquia visual.
- Alinhamento e espaçamento.
- Tipografia.
- Cores e contrastes.
- Botões e formulários.
- Menus e navegação.
- Feedback visual das ações.
- Mensagens de sucesso e erro.
- Estados de carregamento.
- Exibição de informações.

Verifique se a interface oferece uma experiência intuitiva e consistente.

Preserve a identidade visual existente, salvo quando houver necessidade de correção.

# ETAPA 6 — RESPONSIVIDADE E COMPATIBILIDADE

Verifique o comportamento da aplicação em:

- Desktops.
- Notebooks.
- Tablets.
- Smartphones.

Corrija problemas de:
- Dimensionamento.
- Elementos sobrepostos.
- Quebra de layout.
- Rolagem horizontal indevida.
- Formulários desalinhados.
- Menus inadequados para dispositivos móveis.

Verifique também a compatibilidade com os principais navegadores.

# ETAPA 7 — INTEGRAÇÃO FRONT-END E BACK-END

Analise a comunicação entre as aplicações.

Verifique:

- URLs e endpoints.
- Requisições HTTP.
- Envio e recebimento de dados.
- Headers.
- CORS.
- Tratamento de respostas.
- Tratamento de erros.
- Sincronização dos dados.
- Atualização das informações na interface.

Garanta que todas as operações realizadas no Front-end estejam corretamente integradas ao Back-end.

# ETAPA 8 — VALIDAÇÃO E INTEGRIDADE DOS DADOS

Revise todas as entradas de dados.

Implemente ou corrija, quando necessário:

- Validação de campos obrigatórios.
- Validação de tipos de dados.
- Validação de formatos.
- Limites de caracteres.
- Verificação de duplicidade.
- Sanitização de entradas.
- Consistência dos registros.
- Regras de negócio.

As validações devem existir também no Back-end, não apenas no Front-end.

# ETAPA 9 — SEGURANÇA DA APLICAÇÃO

Realize uma revisão de segurança considerando boas práticas para aplicações web.

Verifique:

- Validação e sanitização de entradas.
- Proteção contra SQL Injection ou NoSQL Injection, conforme o banco utilizado.
- Proteção contra XSS.
- Configuração de CORS.
- Proteção de rotas.
- Autenticação e autorização, caso existam.
- Exposição de informações sensíveis.
- Armazenamento de credenciais.
- Uso de variáveis de ambiente.
- Segurança dos endpoints.
- Dependências vulneráveis.
- Tratamento de erros sem exposição de informações internas.

Não exponha senhas, tokens, chaves de API ou informações confidenciais.

Não introduza autenticação ou novos mecanismos de segurança que alterem o fluxo atual sem necessidade ou autorização.

# ETAPA 10 — DESEMPENHO E OTIMIZAÇÃO

Identifique oportunidades de melhoria no desempenho.

Analise:

- Consultas ao banco de dados.
- Requisições desnecessárias.
- Carregamento de componentes.
- Reutilização de código.
- Processamento de informações.
- Arquivos e recursos estáticos.
- Dependências desnecessárias.
- Possíveis gargalos.

Implemente somente otimizações que tragam benefícios reais e não comprometam a estabilidade.

# ETAPA 11 — QUALIDADE E ORGANIZAÇÃO DO CÓDIGO

Revise o código considerando:

- Boas práticas de programação.
- Nomenclatura de variáveis e funções.
- Organização dos arquivos.
- Separação de responsabilidades.
- Reutilização de componentes.
- Eliminação de redundâncias.
- Legibilidade.
- Manutenibilidade.
- Padronização.

Evite refatorações extensas quando uma correção pontual for suficiente.

# ETAPA 12 — TESTES DE REGRESSÃO

Após implementar as melhorias:

- Teste novamente todas as funcionalidades principais.
- Verifique se as rotas continuam funcionando.
- Confirme que o CRUD permanece operacional.
- Verifique a integração entre Front-end e Back-end.
- Teste os formulários.
- Teste a navegação.
- Verifique se os dados continuam sendo persistidos corretamente.
- Confirme que nenhuma funcionalidade existente foi comprometida.

Compare o comportamento anterior e posterior às alterações sempre que possível.

# ETAPA 13 — DOCUMENTAÇÃO TÉCNICA

Atualize ou crie a documentação do projeto.

Inclua:

- Descrição geral da aplicação.
- Tecnologias utilizadas.
- Estrutura de diretórios.
- Instruções de instalação.
- Configuração das variáveis de ambiente.
- Como executar o Front-end.
- Como executar o Back-end.
- Endpoints disponíveis.
- Métodos HTTP.
- Exemplos de requisições.
- Exemplos de respostas.
- Instruções para execução dos testes.

Atualize o README.md sem remover informações importantes que já existam.

# ETAPA 14 — VALIDAÇÃO FINAL

Ao finalizar, realize uma revisão geral.

Apresente um relatório contendo:

1. Problemas identificados.
2. Problemas corrigidos.
3. Arquivos modificados.
4. Funcionalidades aprimoradas.
5. Melhorias realizadas no Front-end.
6. Melhorias realizadas no Back-end.
7. Testes executados.
8. Resultados dos testes CRUD.
9. Vulnerabilidades identificadas e tratadas.
10. Melhorias de desempenho.
11. Problemas que permaneceram pendentes.
12. Recomendações para futuras melhorias.

Não declare testes como aprovados se eles não tiverem sido efetivamente executados.

# DIRETRIZES OBRIGATÓRIAS DE EXECUÇÃO

- Trabalhe diretamente nos arquivos do projeto aberto no VS Code.
- Não crie um novo projeto para substituir o atual.
- Não exclua arquivos sem necessidade comprovada.
- Não remova funcionalidades existentes.
- Não altere tecnologias sem justificativa.
- Não invente funcionalidades que não fazem parte dos requisitos.
- Não oculte erros para fazer a aplicação parecer funcional.
- Não utilize dados fictícios para simular sucesso em operações reais.
- Preserve as configurações e dependências necessárias.
- Faça alterações graduais e verificáveis.
- Execute os testes disponíveis após cada conjunto relevante de alterações.
- Caso encontre um problema que exija uma mudança estrutural significativa, explique o motivo antes de prosseguir.
- Caso uma funcionalidade dependa de credenciais, serviços externos ou configurações indisponíveis, registre a limitação em vez de simular sua execução.

# RESULTADO ESPERADO

Ao concluir, quero ter o projeto original refinado, com:

- Funcionalidades preservadas.
- Falhas corrigidas.
- Front-end aprimorado.
- Back-end revisado.
- CRUD validado.
- Integração funcionando.
- Dados consistentes.
- Segurança revisada.
- Código organizado.
- Melhor desempenho.
- Documentação atualizada.
- Testes executados e documentados.

**PRIORIDADE ABSOLUTA: preservar a integridade do projeto e garantir que todas as melhorias sejam implementadas sem comprometer os recursos que já funcionam.**