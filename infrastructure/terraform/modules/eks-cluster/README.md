# Módulo EKS Cluster

## Para que serve?
Cria um cluster Kubernetes gerenciado na AWS (EKS) que atua como o plano de controle para orquestrar containers.

## Recursos criados

### EKS Cluster
- **O que é**: Serviço gerenciado de Kubernetes que fornece o plano de controle
- **Função**: Orquestrar e gerenciar containers, escalar aplicações, fornecer API Kubernetes
- **Características**: Versão específica do Kubernetes, endpoints público/privado, logging integrado
- **Uso típico**: Ambiente de execução para aplicações containerizadas com auto-scaling e alta disponibilidade

## Como usar
~~~hcl
module "eks_cluster" {
  source = "../../modules/eks-cluster"
  cluster_name    = "my-cluster"
  cluster_role_arn = "arn:aws:iam::123456789012:role/eks-cluster-role"
  subnet_ids       = ["subnet-123", "subnet-456"]
  security_group_ids = ["sg-123456"]
  cluster_version = "1.29"  # Versões suportadas: 1.30, 1.29, 1.28
  endpoint_public_access  = true
  endpoint_private_access = false
  enabled_cluster_log_types = ["api", "audit"]
  tags = {}
}
~~~

## Saídas disponíveis
- `cluster_id`: ID do cluster EKS criado
- `cluster_name`: Nome do cluster EKS
- `cluster_endpoint`: Endpoint da API do Kubernetes
- `cluster_certificate_authority_data`: Dados do certificado CA para autenticação
- `cluster_status`: Status atual do cluster (CREATING, ACTIVE, UPDATING)
- `cluster_arn`: ARN completo do cluster EKS