variable "name" {
  description = "Nome base para todos os recursos de rede"
  type        = string
}

variable "vpc_cidr" {
  description = "Bloco CIDR para a VPC"
  type        = string
}

variable "private_subnets_cidrs" {
  description = "Lista de CIDRs para subnets privadas"
  type        = list(string)
}

variable "public_subnets_cidrs" {
  description = "Lista de CIDRs para subnets públicas"
  type        = list(string)
}

variable "azs" {
  description = "Lista de Availability Zones"
  type        = list(string)
}

variable "tags" {
  description = "Tags comuns para todos os recursos"
  type        = map(string)
}
