# Aula 0
- [x] Setup do banco de dados.
- [x] Seeding do banco de dados (colocar dados no banco de dados).
- [x] Introdução ao Next.js
- [x] Tailwind e Shadcn
- [] Git Hooks
- [] Botão Copiar telephone aula 02 tempo=57m29s
- [] Aula 03 Finalizada:
    : Alterando o arquivo sidebar-button.tsx
    : Instalção do shadcn dialog popup para login.
    : Integração do Next Auth para autenticar login do Google.
    : Criando o arquivo route.tsx dentro de app/api/auth/[...]
    : Usando o adaptador do Auth.js para integrar ao Prisma, lembrar de fazer as adaptações no esquema de tabela do prisma como está na documentação do Auth.js.
    : Formatar a tabela do prisma e fazer a migração das tabelas novas mudando o estado do banco de dados. #npx prisma format #npx prisma migrate dev --name add_auth_tables #npx prisma studio
    : ir para https://console.cloud.google.com, criar um novo projeto para criar o GOOGLE_CLIENT_ID e GOOGLE_CLIENT_SECRET. *em "APIs e serviços/credenciais" ir em "Criar Credenciais" e clicar em "ID do Cliente OAuth" e configurar a tela de consentimento: Nome do app, E-mail para suporte do usuário e dados de contato do desenvolvedor. Ir em Voltar ao Painel. Clicar em "Publicar App". Clicar en "Credenciais", "Criar Credenciais" e "ID do Cliente OAuth", selecionar o tipo da aplicação e dê nome a aplicação. Em "Origens JavaScript autorizadas" colocar "http://localhost:3000" e em "URIs de redirecionamento autorizados" colocar "http://localhost:3000/api/auth/callback/google" depois clicar em "Criar". Então, após criar o "Cliente OAuth criado" copiar o ID do cliente e a chave secreta do cliente e colar no arquivo ".env" na pasta raiz da aplicação.
    : Alteração do arquivo "sidebar-button.tsx"
    : Alteração do arquivo "layout.tsx"
    : Reiciniar a aplicação para aplicar as alterações.
    : Criar o arquivo "search.tsx" que irá conter a ação de busca do input formulário e importar esse componente no arquivo "page.tsx", nesse arquivo usaremos o hock do react em conjunto com o shadcn form fazendo a instalação do mesmo com "npx shadcn@latest add form". Vamos instalar também o "zodResolver" npm install @hookform/resolvers
    : Configurando todas as buscas contidas na aplicação para buscarem por titulo ou por serviço.
[] Aula 04: 1h56m00s Criando  a página de agendamento.
    :Instalei a partir do Shadcn o calendário, e a localização veio do React Daypicker.
    :Fiz toda configuração da aparência do calenário.
    :Criando um objeto lista com os horários disponíveis para agendamento.
    :Criando o componente no HTML para aparecerem os horários.
    :Criando a função que seleciona a data e aparecem os horários.
    :Criando o estado que seleciona o horário desejado.
    :Criando a função que seleciona e marca o horário desejado.
    :Criando o Card no HTML onde aparecerão todas os dados da data, horário e nome da barbearia.
    :Criando o botão Confirmar no HTML.
    :Criando o componente create-booking.ts que é um "use server", serviço que será executado do lado do servidor, que será usado para armazenar as informações do agendamento no banco de dados Prisma.
    :Dentro do arquivo route.ts do NextOff, criar um parâmetro de callbacks que irá armazenar os dados de usuário que estará logado no app.
    :Desabilitando o botão de confirmar agendamento caso o usuário não tenha selecionado o dia ou o horário desejado.
    :Criando um componente "server action" "get-gookings.ts" para monitorar os agendamentos no banco de dados, para que não haja reservas duplicadas.
    :Trabalhando na função de mostrar a opção de fazer login caso o usuário não estiver logado e tente fazer uma reserva, nesse caso, componentizei a caixa de dialogo para login no componente "sign-in-dialog.tsx" 
    :


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
