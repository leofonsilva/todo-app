variable "aws_region" {
  type        = string
  default     = "us-east-1"
  description = "AWS region"
}

variable "common_tags" {
  type        = map(string)
  description = "Common tags for all resources"
  default = {
    project     = "todo-app-dev"
    environment = "development"
    owner       = "leofonsilva"
    managed-by  = "terraform"
  }
}
