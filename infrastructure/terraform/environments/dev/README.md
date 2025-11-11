# Ambiente Dev - Infraestrutura

## Visão Geral
Infraestrutura completa para aplicação Todo em ambiente de desenvolvimento otimizada para custo.

## Módulos criados para esse ambiente

### Módulo Network
- **1 VPC**: lfs-todo-dev-vpc (10.0.0.0/16)
- **2 Subnets Privadas**: 
  - 10.0.1.0/24 (us-east-1a) - Para EKS e banco de dados
  - 10.0.2.0/24 (us-east-1b) - Para EKS (requer 2 AZs)
- **1 Subnet Pública**: 10.0.101.0/24 (us-east-1a) - Para NAT Gateway e Load Balancers
- **1 NAT Gateway**: Para permitir internet nas subnets privadas
- **1 Internet Gateway**: Para conectar a VPC à internet

### Módulo IAM
- **1 IAM Role**: lfs-todo-dev-eks-cluster-role - Permissões para o cluster EKS
- **1 IAM Role**: lfs-todo-dev-eks-node-role - Permissões para os nodes do EKS
- **1 IAM Role**: lfs-todo-dev-eks-admin-role - Permissões para administrar o cluster Kubernetes
- **1 IAM Policy**: lfs-todo-dev-assume-eks-admin - Permite assumir a role de admin do EKS

### Módulo Security Groups
- **1 Security Group**: lfs-todo-dev-eks-sg - Firewall para o cluster EKS
- **Regras**:
  - **Porta 443**: Acesso HTTPS à API Kubernetes (0.0.0.0/0)
  - **Portas 0-0**: Comunicação interna VPC (10.0.0.0/16) - Todos protocolos
  - **Egress**: Todo tráfego de saída para internet (0.0.0.0/0)

### Módulo EKS Cluster
- **1 EKS Cluster**: lfs-todo-dev-eks - Cluster Kubernetes gerenciado

### Módulo NodeGroups
- **1 Node Group**: default - Grupo de nodes EKS com instâncias t3.small

### Módulo DocumentDB
- **1 Cluster DocumentDB**: lfs-todo-dev - Banco de dados MongoDB compatível
- **1 Security Group**: lfs-todo-dev-docdb-sg - Acesso apenas da VPC
- **1 Instância**: db.t4g.medium - Instância econômica ARM
- **Backup**: 1 dia de retenção - Configuração econômica para dev

### Módulo Secrets
- **1 Secret**: lfs-todo-dev-db-credentials - Armazena credenciais do DocumentDB de forma segura
- **Contém**: String de conexão, usuário, senha, endpoint e nome do banco
- **Segurança**: Criptografia automática, acesso controlado por IAM

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

## Passos para resolver falhas na criação de recursos

1. **Interrompa o apply travado**
  - No terminal onde o Terraform está rodando
  ~~~sh
  Ctrl + C
  ~~~

2. **Remova o lock no state remoto (se necessário)**
  ~~~sh
  terraform force-unlock <LOCK_ID>
  ~~~
  - `<LOCK_ID>` é informado na mensagem de erro do Terraform quando o state está travado.

3. **Atualize o state local com o estado real da AWS**
  ~~~sh
  terraform refresh
  ~~~

4. **Gere um novo plano**
  - Sempre gere um novo plano após travamento, não reaplique planos antigos.
  ~~~sh
  terraform plan -out plan.out
  ~~~

5. **Aplique o novo plano**
  ~~~sh
  terraform apply plan.out
  ~~~

6. **Se houver erro de recurso já existente**
  - Verifique se o recurso está ativo na AWS (por exemplo, para EKS Node Group), se estiver ativo, remova o recurso do state antigo:
  ~~~sh
  terraform state rm 'module.<modulo>.<tipo_recurso>.<nome_recurso>'
  ~~~

7. **Importe o recurso existente para o Terraform**
  ~~~sh
  terraform import 'module.<modulo>.<tipo_recurso>.<nome_recurso>' <identificador_na_aws>
  ~~~

8. **Valide novamente**
  ~~~sh
  terraform plan -out plan.out
  ~~~
  - O Terraform deve mostrar `No changes. Infrastructure is up-to-date`.  
  - O recurso não estará mais marcado como tainted.
  - Pode ser que ainda precise ajustar algo como tag e outras coisas que não foram criadas, mas aí nesse caso será apenas uma atualização.
