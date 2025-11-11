# Security group para controlar acesso ao DocumentDB
resource "aws_security_group" "documentdb" {
  name_prefix = "${var.name}-docdb-"
  vpc_id      = var.vpc_id
  description = "Security group for DocumentDB ${var.name}"

  tags = merge(var.tags, { Name = "${var.name}-docdb-sg" })
}

# Permite acesso ao DocumentDB apenas de dentro da VPC
resource "aws_security_group_rule" "allow_vpc" {
  description       = "Allow access from within VPC"
  type              = "ingress"
  from_port         = 27017 # Porta padrão do MongoDB
  to_port           = 27017
  protocol          = "tcp"
  cidr_blocks       = [var.vpc_cidr] # Apenas da própria VPC
  security_group_id = aws_security_group.documentdb.id
}

# Cria o cluster DocumentDB (banco de dados MongoDB compatível)
resource "aws_docdb_cluster" "this" {
  cluster_identifier = var.name

  engine          = "docdb" # Motor DocumentDB
  engine_version  = "5.0"   # Versão compatível com MongoDB 5.0
  master_username = var.master_username
  master_password = random_password.db_password.result # Senha gerada automaticamente

  vpc_security_group_ids = [aws_security_group.documentdb.id] # Security group
  db_subnet_group_name   = aws_docdb_subnet_group.this.name   # Subnet group
  storage_encrypted      = var.storage_encrypted              # Criptografia

  backup_retention_period = var.backup_retention_days # Dias de backup
  skip_final_snapshot     = true                      # Não criar snapshot ao deletar
  deletion_protection     = var.deletion_protection   # Proteção contra deleção

  tags = merge(var.tags, { Name = "${var.name}" })
}

# Cria instâncias do cluster DocumentDB
resource "aws_docdb_cluster_instance" "this" {
  count              = var.instance_count
  identifier         = "${var.name}-instance-${count.index}"
  cluster_identifier = aws_docdb_cluster.this.id
  instance_class     = var.instance_class # Tipo da instância (ex: db.t4g.medium)
  promotion_tier     = 2                  # Tier de promoção para réplicas
}

# Define grupo de subnets para o DocumentDB
resource "aws_docdb_subnet_group" "this" {
  name       = "${var.name}-docdb-subnet-group"
  subnet_ids = var.subnet_ids # Subnets onde o banco será implantado
  tags       = merge(var.tags, { Name = "${var.name}-docdb-subnet-group" })
}

# Gera senha aleatória para o usuário master do banco
resource "random_password" "db_password" {
  length  = 16
  special = false # Sem caracteres especiais para compatibilidade
}
