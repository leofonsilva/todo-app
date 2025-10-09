# Módulo NodeGroups

## Para que serve?
Cria grupos de nodes (máquinas EC2) que se conectam ao cluster EKS para executar containers e workloads Kubernetes.

## Recursos criados

### EKS Node Group
- **O que é**: Grupo de instâncias EC2 que atuam como workers do Kubernetes
- **Função**: Executar pods, containers e aplicações no cluster EKS
- **Características**: Auto-scaling, tipos de instância configuráveis, disk size, AMI type
- **Uso típico**: Prover capacidade computacional para rodar aplicações containerizadas

## Como usar
~~~hcl
module "nodegroups" {
  source = "../../modules/nodegroups"
  cluster_name = "my-cluster"
  subnet_ids   = ["subnet-123", "subnet-456"]
  
  node_groups = {
    default = {
      node_role_arn  = "arn:aws:iam::123456789012:role/eks-node-role"
      desired_size   = 2
      min_size       = 1
      max_size       = 3
      instance_types = ["t3.small"]
      disk_size      = 20
      ami_type       = "AL2_x86_64"
      capacity_type  = "ON_DEMAND"
    }
  }
  
  tags = {}
}
~~~

## Saídas disponíveis
- `nodegroup_ids`: Mapa de nomes de node groups para seus IDs
- `nodegroup_arns`: Mapa de nomes de node groups para seus ARNs
- `nodegroup_statuses`: Mapa de nomes de node groups para seus status