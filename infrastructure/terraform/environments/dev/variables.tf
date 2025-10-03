variable "aws_region" {
  description = "Região da AWS"
  type        = string
  default     = "us-east-1"
}

variable "common_tags" {
  description = "Tags comuns para todos os recursos"
  type        = map(string)
  default = {
    project     = "todo-app-dev"
    environment = "development"
    owner       = "leofonsilva"
    managed-by  = "terraform"
  }
}
