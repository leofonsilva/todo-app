# Grupo de segurança principal para o cluster EKS
resource "aws_security_group" "this" {
  name_prefix = "${var.name}-eks-"
  description = "EKS Cluster Security Group - Controls traffic for Kubernetes cluster ${var.name} and nodes"
  vpc_id      = var.vpc_id
  tags        = merge(var.tags, { Name = "${var.name}-eks-sg" })
}

# Permite todo tráfego interno dentro da VPC
resource "aws_security_group_rule" "internal_ingress" {
  description       = "Allow Internal VPC communication - All protocols and ports within VPC"
  type              = "ingress"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  cidr_blocks       = [var.vpc_cidr]
  security_group_id = aws_security_group.this.id
}

# Permite acesso HTTPS à API do Kubernetes
resource "aws_security_group_rule" "allow_https" {
  description       = "Allow Kubernetes API HTTPS access - From internet to API server"
  type              = "ingress"
  from_port         = 443
  to_port           = 443
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.this.id
}

# Permite todo tráfego de saída para internet
resource "aws_security_group_rule" "allow_all_egress" {
  description       = "Allow Internet outbound access - All traffic to internet for nodes"
  type              = "egress"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.this.id
}
