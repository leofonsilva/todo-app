# Cria grupos de nodes EKS para executar containers no cluster Kubernetes
resource "aws_eks_node_group" "this" {
  for_each = var.node_groups

  cluster_name    = var.cluster_name
  node_group_name = each.key
  node_role_arn   = each.value.node_role_arn
  subnet_ids      = var.subnet_ids

  instance_types = each.value.instance_types # Tipos de instância EC2
  disk_size      = each.value.disk_size      # Tamanho do disco em GB
  ami_type       = each.value.ami_type       # Tipo de AMI (Amazon Linux 2)
  capacity_type  = each.value.capacity_type  # ON_DEMAND ou SPOT

  scaling_config {
    desired_size = each.value.desired_size # Número desejado de nodes
    max_size     = each.value.max_size     # Número máximo de nodes
    min_size     = each.value.min_size     # Número mínimo de nodes
  }

  update_config {
    max_unavailable_percentage = 50 # Máximo de nodes indisponíveis durante atualizações
  }

  lifecycle {
    create_before_destroy = true                             # Cria novo antes de destruir antigo
    ignore_changes        = [scaling_config[0].desired_size] # Ignora mudanças manuais no desired_size
  }

  tags = merge(var.tags, { Name = "${var.cluster_name}-${each.key}" })
}
