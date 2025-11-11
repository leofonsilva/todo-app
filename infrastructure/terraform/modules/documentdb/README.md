# Módulo DocumentDB

## Para que serve?
Cria um cluster de banco de dados MongoDB compatível gerenciado pela AWS (DocumentDB) para armazenar dados da aplicação.

## Recursos criados

### DocumentDB Cluster
- **O que é**: Serviço de banco de dados MongoDB compatível e gerenciado
- **Função**: Armazenar dados da aplicação de forma persistente e escalável
- **Características**: Compatível com MongoDB, backup automático, alta disponibilidade, criptografia
- **Uso típico**: Banco de dados principal para aplicações que usam MongoDB

### DocumentDB Security Group
- **O que é**: Grupo de segurança que controla acesso ao banco de dados
- **Função**: Permitir acesso apenas de dentro da VPC na porta 27017
- **Características**: Acesso restrito à VPC, porta MongoDB padrão

### DocumentDB Subnet Group
- **O que é**: Grupo de subnets onde o banco será implantado
- **Função**: Definir em quais subnets o DocumentDB pode criar instâncias

## Como usar
~~~hcl
module "documentdb" {
  source = "../../modules/documentdb"
  name = "my-app"
  vpc_id = "vpc-123456"
  vpc_cidr = "10.0.0.0/16"
  subnet_ids = ["subnet-123", "subnet-456"]
  master_username = "admin"
  instance_class = "db.t4g.medium"
  instance_count = 1
  backup_retention_days = 1
  deletion_protection = false
  storage_encrypted = true
  tags = {}
}
~~~

## Saídas disponíveis
- `cluster_endpoint`: Endpoint do cluster DocumentDB
- `cluster_username`: Nome de usuário master do banco
- `cluster_password`: Senha master do banco (gerada automaticamente)
- `connection_string`: String de conexão MongoDB completa
- `security_group_id`: ID do security group criado
