variable "name" {
  description = "Nome base para o security group"
  type        = string
}

variable "vpc_id" {
  description = "ID da VPC onde o security group será criado"
  type        = string
}

variable "vpc_cidr" {
  description = "Bloco CIDR da VPC para regras de tráfego interno"
  type        = string
}

variable "tags" {
  description = "Tags comuns para todos os recursos"
  type        = map(string)
  default     = {}
}
