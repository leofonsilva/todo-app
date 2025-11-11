# Módulo Secrets

## Para que serve?
Armazena credenciais e informações sensíveis de forma segura no AWS Secrets Manager para uso pela aplicação.

## Recursos criados

### Secrets Manager Secret
- **O que é**: Serviço gerenciado para armazenar segredos de forma segura
- **Função**: Armazenar credenciais de banco, chaves API, tokens de forma criptografada
- **Características**: Criptografia automática, controle de acesso via IAM, versionamento, rotação automática
- **Uso típico**: Credenciais de banco de dados, chaves de API, tokens de aplicação

### Secret Version
- **O que é**: Versão específica do conteúdo do segredo
- **Função**: Armazenar o valor atual do segredo com versionamento
- **Características**: Mantém histórico de versões, permite rollback

## Como usar
~~~hcl
module "secrets" {
  source = "../../modules/secrets"
  name = "db-credentials"
  secret_data = {
    username = "admin"
    password = "secret123"
    host     = "db.example.com"
  }
  tags = {}
}
~~~

## Saídas disponíveis
- `secret_arn`: ARN do segredo criado para uso em IAM policies
- `secret_name`: Nome completo do segredo
- `secret_short_name`: Nome curto sem prefixo de ambiente
