# Test UNISYSTEM Frontend

Este projeto é uma aplicação Angular que implementa um sistema de gestão empresarial com funcionalidades de autenticação, configuração de empresa e gerenciamento de usuários.

## Tecnologias Utilizadas

- Angular 17
- TypeScript
- SCSS
- Font Awesome
- NgxMask
- RxJS

## Funcionalidades

- **Autenticação**
  - Login de usuários
  - Gerenciamento de sessão
  - Proteção de rotas

- **Configuração da Empresa**
  - Cadastro de informações básicas
  - Validação de CNPJ
  - Busca automática de endereço por CEP
  - Campos obrigatórios:
    - Tipo da Empresa
    - Nome da Empresa
    - CNPJ
    - CEP
    - Celular
    - Email
    - Nome do Administrador
    - CPF

- **Perfil do Usuário**
  - Visualização e edição de dados
  - Alteração de senha
  - Validação de campos

## Estrutura do Projeto

```
src/
├── app/
│   ├── configuracao/
│   │   ├── configuracao.component.ts
│   │   ├── configuracao.component.html
│   │   ├── configuracao.component.scss
│   │   └── configuracao.component.spec.ts
│   ├── login/
│   │   ├── login.component.ts
│   │   ├── login.component.html
│   │   ├── login.component.scss
│   │   └── login.component.spec.ts
│   ├── perfil/
│   │   ├── perfil.component.ts
│   │   ├── perfil.component.html
│   │   ├── perfil.component.scss
│   │   └── perfil.component.spec.ts
│   ├── services/
│   │   └── auth.service.ts
│   └── app.component.ts
├── assets/
└── styles/
    └── main.scss
```

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Guidaio/TestUNISYSTEM_Frontend
```

2. Instale as dependências:
```bash
cd test-unisystem
npm install
```

3. Execute o projeto:
```bash
ng serve
```

4. Acesse a aplicação:
```
http://localhost:4200
```

## Testes

O projeto inclui testes unitários para garantir a qualidade do código. Para executar os testes:

```bash
ng test
```

Os testes cobrem:
- Validação de formulários
- Lógica de negócios
- Interações com serviços
- Comportamento dos componentes

## Validações Implementadas

- **CNPJ**: Formato e tamanho (14 dígitos)
- **CEP**: Formato e tamanho (8 dígitos)
- **Celular**: Formato e tamanho mínimo (10 dígitos)
- **Email**: Formato válido
- **CPF**: Formato e tamanho (11 dígitos)

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT.



