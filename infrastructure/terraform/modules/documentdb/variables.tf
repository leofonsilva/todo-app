variable "name" {
  description = "Nome base para os recursos do DocumentDB"
  type        = string
}

variable "vpc_id" {
  description = "ID da VPC onde o DocumentDB será criado"
  type        = string
}

variable "vpc_cidr" {
  description = "CIDR da VPC para regras de security group"
  type        = string
}

variable "subnet_ids" {
  description = "Lista de IDs das subnets para o DocumentDB"
  type        = list(string)
}

variable "master_username" {
  description = "Nome de usuário master para o DocumentDB"
  type        = string
  default     = "mainuser"
}

variable "instance_class" {
  description = "Classe da instância do DocumentDB"
  type        = string
  default     = "db.t4g.medium"
}

variable "instance_count" {
  description = "Número de instâncias no cluster DocumentDB"
  type        = number
  default     = 1
}

variable "backup_retention_days" {
  description = "Número de dias para retenção de backups"
  type        = number
  default     = 1
}

variable "deletion_protection" {
  description = "Habilita proteção contra deleção do cluster"
  type        = bool
  default     = false
}

variable "storage_encrypted" {
  description = "Habilita criptografia do armazenamento"
  type        = bool
  default     = true
}

variable "tags" {
  description = "Tags para aplicar aos recursos"
  type        = map(string)
  default     = {}
}
