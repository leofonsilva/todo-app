terraform {
  required_version = ">= 1.12.1"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }

  backend "s3" {
    bucket         = "lfs-todo-dev-terraform-state"
    key            = "todo-dev/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "lfs-todo-dev-terraform-locks"
    encrypt        = true
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = var.common_tags
  }
}
