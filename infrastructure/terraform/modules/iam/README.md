# Módulo IAM

## Para que serve?
Cria as roles e permissões IAM necessárias para o funcionamento do cluster EKS e seus nodes.

## Recursos criados

### IAM Role - Cluster EKS
- **O que é**: Role que o serviço EKS assume para gerenciar o cluster
- **Função**: Permissões para o control plane do EKS gerenciar recursos AWS
- **Características**: Assume role policy para `eks.amazonaws.com`, política AmazonEKSClusterPolicy
- **Uso típico**: Cluster EKS precisa desta role para criar Load Balancers, gerenciar networking e coordenar nodes

### IAM Role - Node Group
- **O que é**: Role que as instâncias EC2 dos nodes assumem
- **Função**: Permissões para os nodes se registrarem no cluster e executarem workloads
- **Características**: Assume role policy para `ec2.amazonaws.com`, políticas AmazonEKSWorkerNodePolicy, AmazonEKS_CNI_Policy, AmazonEC2ContainerRegistryReadOnly
- **Uso típico**: Instâncias EC2 do node group precisam desta role para operar no cluster EKS

## Como usar
~~~hcl
module "iam" {
  source = "../../modules/iam"
  name = "meu-projeto"
  cluster_assume_role_policy = file("templates/eks-cluster-assume-role.json")
  node_assume_role_policy = file("templates/eks-node-assume-role.json")
  create_node_role = true
  tags = {}
}
~~~

## Saídas disponíveis
- `cluster_role_arn`: ARN da role do cluster EKS
- `node_role_arn`: ARN da role dos nodes (apenas se create_node_role = true)