# Bootstrap do Projeto Terraform

Este diretório reúne os arquivos essenciais para iniciar a infraestrutura do projeto com Terraform. Ele inclui a configuração para armazenar o state remoto do projeto principal, garantindo o versionamento e a integridade do ambiente em cada estágio (ex: desenvolvimento, homologação e produção).

## Pré-requisitos

- [Terraform](https://www.terraform.io/downloads.html) instalado na máquina
- Credenciais de acesso à nuvem configuradas (ex: AWS, Azure, GCP)
- Usar WSL2 para executar os comandos pois o Terraform está instalado dentro do Ubuntu

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

6. **Modifique o terraform.tf para usar o backend remoto**
  ~~~sh
  backend "s3" {
    bucket         = "lfs-todo-dev-terraform-state"
    key            = "todo-boostrap/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "lfs-todo-dev-terraform-locks"
    encrypt        = true
  }
  ~~~

7. **Comando de migração**
  É importante sempre realizar uma cópia do local state e não iniciar um novo
  ~~~sh
  terraform init -migrate-state
  ~~~

8. **Verificação do estado remoto**
  ~~~sh
  terraform state list
  aws s3 ls s3://lfs-todo-dev-terraform-state/todo-bootstrap/
  ~~~

9. **(Opcional) Destrua a infraestrutura:**
  Necessário realizar o processo contrário, onde primeiramente migra-se o state de volta para o local antes de destruir a infraestrutura
  ~~~sh
  backend "local" {
    path = "terraform.tfstate"
  }
  ~~~
  ~~~sh
  terraform init -migrate-state
  terraform destroy
  ~~~

10. **(Opcional) Verificação após destruição**
  ~~~sh
  aws s3api head-bucket --bucket lfs-todo-dev-terraform-state
  aws dynamodb describe-table --table-name lfs-todo-dev-terraform-locks
  ~~~
