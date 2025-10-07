# Define nomes dos buckets S3 e tabelas DynamoDB para cada ambiente
locals {
  bucket_names = { for e in var.environments : e => "lfs-todo-${e}-terraform-state" }
  table_names  = { for e in var.environments : e => "lfs-todo-${e}-terraform-locks" }
}

# Cria bucket S3 para armazenar o estado remoto do Terraform
resource "aws_s3_bucket" "tf_state" {
  for_each      = toset(var.environments)
  bucket        = local.bucket_names[each.key]
  force_destroy = true # Definido 'true' apenas por ser um projeto de teste

  tags = {
    Name        = local.bucket_names[each.key]
    Environment = each.key
    project     = "todo-app-bootstrap"
    owner       = "leofonsilva"
    managed-by  = "terraform"
  }
}

# Habilita versionamento no bucket S3 para backup do estado do Terraform
resource "aws_s3_bucket_versioning" "tf_state" {
  for_each = toset(var.environments)
  bucket   = aws_s3_bucket.tf_state[each.key].id

  versioning_configuration {
    status = "Enabled"
  }
}

# Configura criptografia no bucket S3 para proteger o estado do Terraform
resource "aws_s3_bucket_server_side_encryption_configuration" "tf_state" {
  for_each = toset(var.environments)
  bucket   = aws_s3_bucket.tf_state[each.key].id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# Bloqueia acesso público ao bucket S3 por segurança
resource "aws_s3_bucket_public_access_block" "tf_state" {
  for_each = toset(var.environments)
  bucket   = aws_s3_bucket.tf_state[each.key].id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# Cria tabela DynamoDB para travar o estado do Terraform e evitar conflitos
resource "aws_dynamodb_table" "tf_locks" {
  for_each     = toset(var.environments)
  name         = local.table_names[each.key]
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }

  tags = {
    Environment = each.key
    project     = "todo-app-bootstrap"
    owner       = "leofonsilva"
    managed-by  = "terraform"
  }
}
