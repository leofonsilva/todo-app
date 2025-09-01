resource "aws_security_group" "documentdb" {
  name_prefix = "${var.name}-docdb-"
  vpc_id      = var.vpc_id
  description = "Security group for DocumentDB ${var.name}"

  tags = merge(var.tags, { Name = "${var.name}-docdb-sg" })
}

resource "aws_security_group_rule" "allow_vpc" {
  description       = "Allow access from within VPC"
  type              = "ingress"
  from_port         = 27017
  to_port           = 27017
  protocol          = "tcp"
  cidr_blocks       = [var.vpc_cidr]
  security_group_id = aws_security_group.documentdb.id
}

resource "aws_docdb_cluster" "this" {
  cluster_identifier = "${var.name}"

  engine              = "docdb"
  engine_version      = "5.0"
  master_username     = var.master_username
  master_password     = random_password.db_password.result
  
  vpc_security_group_ids = [aws_security_group.documentdb.id]
  db_subnet_group_name   = aws_docdb_subnet_group.this.name
  storage_encrypted      = var.storage_encrypted

  backup_retention_period = var.backup_retention_days
  skip_final_snapshot     = true
  deletion_protection     = var.deletion_protection

  tags = merge(var.tags, { Name = "${var.name}" })
}

resource "aws_docdb_cluster_instance" "this" {
  count              = var.instance_count
  identifier         = "${var.name}-instance-${count.index}"
  cluster_identifier = aws_docdb_cluster.this.id
  instance_class     = var.instance_class
  promotion_tier     = 2
}

resource "aws_docdb_subnet_group" "this" {
  name       = "${var.name}-docdb-subnet-group"
  subnet_ids = var.subnet_ids
  tags       = merge(var.tags, { Name = "${var.name}-docdb-subnet-group" })
}

resource "random_password" "db_password" {
  length  = 16
  special = false
}