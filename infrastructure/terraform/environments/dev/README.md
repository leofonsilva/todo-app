# Ambiente Dev - Infraestrutura

## Visão Geral
Infraestrutura completa para aplicação Todo em ambiente de desenvolvimento otimizada para custo.

## Módulos criados para esse ambiente

### Módulo Network
- **1 VPC**: lfs-todo-dev-vpc (10.0.0.0/16)
- **2 Subnets Privadas**: 
  - 10.0.1.0/24 (us-east-1a) - Para EKS e banco de dados
  - 10.0.2.0/24 (us-east-1b) - Para EKS (requer 2 AZs)
- **1 Subnet Pública**: 
  - 10.0.101.0/24 (us-east-1a) - Para Load Balancers

### Módulo IAM
- **1 IAM Role**: lfs-todo-dev-eks-cluster-role - Permissões para o cluster EKS
- **1 IAM Role**: lfs-todo-dev-eks-node-role - Permissões para os nodes do EKS

### Módulo EKS Cluster
- **1 EKS Cluster**: lfs-todo-dev-eks - Cluster Kubernetes gerenciado

## Pré-requisitos
- [Terraform](https://www.terraform.io/downloads.html) instalado
- Credenciais AWS configuradas com permissões adequadas
- WSL2 recomendado para execução dos comandos

## Passos para execução

1. **Acesse o diretório**
  ~~~sh
  cd infrastructure/terraform/environments/dev
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

6. **(Opcional) Destrua a infraestrutura:**
  ~~~sh
  terraform destroy
  ~~~