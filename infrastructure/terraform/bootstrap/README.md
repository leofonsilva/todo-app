# Bootstrap do Projeto Terraform

## Para que serve?
Criar a infraestrutura básica necessária para gerenciar estados remotos do Terraform de forma segura e versionada.

## Recursos criados

### Bucket S3
- **O que é**: Armazenamento de objetos seguro e durável na AWS
- **Função**: Armazenar o estado remoto do Terraform com versionamento
- **Características**: Versionamento ativado, criptografia SSE-S3, bloqueio público completo
- **Uso típico**: Backup e versionamento dos arquivos de estado do Terraform

### Tabela DynamoDB
- **O que é**: Banco de dados NoSQL gerenciado na AWS
- **Função**: Controle de locking para evitar conflitos de concorrência no estado
- **Características**: Billing mode PAY_PER_REQUEST, chave primária LockID
- **Uso típico**: Garantir que apenas uma operação Terraform ocorra por vez

## Recursos criados para cada ambiente:
- **1 Bucket S3**: `lfs-todo-[ambiente]-terraform-state`
- **1 tabela DynamoDB**: `lfs-todo-[ambiente]-terraform-locks`

## Pré-requisitos
- [Terraform](https://www.terraform.io/downloads.html) instalado
- Credenciais AWS configuradas com permissões adequadas
- WSL2 recomendado para execução dos comandos

## Passos para execução

1. **Acesse o diretório**
~~~sh
cd infrastructure/terraform/bootstrap
~~~

2. **Inicialize o Terraform**
~~~sh
terraform init
~~~

3. **Formata e valida arquivos**
~~~sh
terraform fmt
terraform validate
~~~

4. **Visualize o plano de execução**
~~~sh
terraform plan -out plan.out
~~~

5. **Aplique as mudanças**
~~~sh
terraform apply plan.out
~~~

6. **Configure o backend remoto no projeto principal**
No arquivo `terraform.tf` do projeto principal, adicione:
~~~hcl
backend "s3" {
  bucket         = "lfs-todo-dev-terraform-state"
  key            = "todo-dev/terraform.tfstate"
  region         = "us-east-1"
  dynamodb_table = "lfs-todo-dev-terraform-locks"
  encrypt        = true
}
~~~

7. **Migre o estado para remoto**
~~~sh
terraform init -migrate-state
~~~

8. **Verifique o estado remoto**
~~~sh
terraform state list
aws s3 ls s3://lfs-todo-dev-terraform-state/todo-dev/
~~~

## Destruindo a infraestrutura

1. **Migre o estado de volta para local**
No arquivo `terraform.tf` do projeto principal, altere para:
~~~hcl
backend "local" {
  path = "terraform.tfstate"
}
~~~

2. **Execute a migração**
~~~sh
terraform init -migrate-state
~~~

3. **Destrua a infraestrutura**
~~~sh
terraform destroy
~~~

4. **Verifique a remoção**
~~~sh
aws s3api head-bucket --bucket lfs-todo-dev-terraform-state
aws dynamodb describe-table --table-name lfs-todo-dev-terraform-locks
~~~
