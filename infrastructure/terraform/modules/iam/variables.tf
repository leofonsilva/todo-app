variable "name" {
  description = "Nome base para os recursos IAM"
  type        = string
}

variable "cluster_assume_role_policy" {
  description = "Conteúdo do arquivo JSON com a política de assume role para o cluster EKS"
  type        = string
}

variable "node_assume_role_policy" {
  description = "Conteúdo do arquivo JSON com a política de assume role para os nodes EKS"
  type        = string
  default     = ""
}

variable "create_node_role" {
  description = "Controla se a role para os nodes deve ser criada"
  type        = bool
  default     = true
}

variable "tags" {
  description = "Tags comuns para todos os recursos"
  type        = map(string)
  default     = {}
}
