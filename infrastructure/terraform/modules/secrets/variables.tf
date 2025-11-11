variable "name" {
  description = "Nome do segredo (sem prefixo de ambiente)"
  type        = string
}

variable "secret_data" {
  description = "Pares chave-valor com os dados sensíveis do segredo"
  type        = map(string)
  sensitive   = true
}

variable "tags" {
  description = "Tags para aplicar aos recursos"
  type        = map(string)
  default     = {}
}
