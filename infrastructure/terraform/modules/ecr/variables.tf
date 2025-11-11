variable "repository_names" {
  description = "Lista de nomes de repositórios ECR a serem criados"
  type        = list(string)
  default     = []
}

variable "image_tag_mutability" {
  description = "Controla se tags de imagem podem ser sobrescritas (MUTABLE) ou não (IMMUTABLE)"
  type        = string
  default     = "MUTABLE"
}

variable "tags" {
  description = "Tags para aplicar aos repositórios"
  type        = map(string)
  default     = {}
}
