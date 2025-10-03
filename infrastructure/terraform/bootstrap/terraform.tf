terraform {
  required_version = ">= 1.12.1"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # Backend local inicial
  # backend "local" {
  #   path = "terraform.tfstate"
  # }

  # Após a criação dos recursos, migrar o state desse projeto para o backend S3
  backend "s3" {
    bucket         = "lfs-todo-dev-terraform-state"
    key            = "todo-bootstrap/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "lfs-todo-dev-terraform-locks"
    encrypt        = true
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      project    = "todo-app-bootstrap"
      owner      = "leofonsilva"
      managed-by = "terraform"
    }
  }
}