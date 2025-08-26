resource "aws_security_group" "this" {
  name_prefix = "${var.name}-eks-"
  description = "Security group for EKS cluster ${var.name}"
  vpc_id      = var.vpc_id
  tags        = merge(var.tags, { Name = "${var.name}-eks-sg" })
}

resource "aws_security_group_rule" "internal_ingress" {
  description       = "Allow all internal traffic within VPC"
  type              = "ingress"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  cidr_blocks       = [var.vpc_cidr]
  security_group_id = aws_security_group.this.id
}

resource "aws_security_group_rule" "allow_https" {
  description       = "Allow HTTPS access to Kubernetes API"
  type              = "ingress"
  from_port         = 443
  to_port           = 443
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.this.id
}

resource "aws_security_group_rule" "allow_all_egress" {
  description       = "Allow all outbound traffic"
  type              = "egress"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.this.id
}
