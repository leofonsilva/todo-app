# Cria repositórios ECR para armazenar imagens Docker das aplicações
resource "aws_ecr_repository" "this" {
  for_each = toset(var.repository_names) # Cria um repositório para cada nome

  name                 = each.key                 # Nome do repositório
  image_tag_mutability = var.image_tag_mutability # MUTABLE ou IMMUTABLE
  tags                 = merge(var.tags, { Name = each.key })
}
