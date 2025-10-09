# Cria a IAM Role para o cluster EKS gerenciar recursos AWS
resource "aws_iam_role" "eks_cluster" {
  name               = "${var.name}-eks-cluster-role"
  description        = "EKS Cluster Role - Allows EKS control plane to manage AWS resources"
  assume_role_policy = var.cluster_assume_role_policy
  tags               = var.tags
}

# Cria a IAM Role para os nodes EKS executarem workloads
resource "aws_iam_role" "node" {
  name               = "${var.name}-eks-node-role"
  description        = "EKS Node Role - Allows worker nodes to register with cluster and run pods"
  assume_role_policy = var.node_assume_role_policy
  tags               = var.tags
}

# Cria IAM Role para administradores do EKS
resource "aws_iam_role" "eks_admin" {
  count              = var.admin_assume_role_policy != null ? 1 : 0
  name               = "${var.name}-eks-admin-role"
  description        = "EKS Admin Role - Allows admin group to administer the EKS cluster"
  assume_role_policy = var.admin_assume_role_policy
  tags               = var.tags
}

# Policy que permite ao grupo assumir a EKS admin role
resource "aws_iam_policy" "assume_eks_admin" {
  count       = var.admin_assume_role_policy != null ? 1 : 0
  name        = "${var.name}-assume-eks-admin"
  description = "Allows lfs-admin-group to assume EKS admin role"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = "sts:AssumeRole"
        Resource = aws_iam_role.eks_admin[0].arn
      }
    ]
  })
  tags = var.tags
}

# Anexa política que permite ao cluster EKS gerenciar recursos AWS
resource "aws_iam_role_policy_attachment" "eks_cluster_policy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
  role       = aws_iam_role.eks_cluster.name
}

# Anexa política que permite aos nodes se registrarem no cluster EKS
resource "aws_iam_role_policy_attachment" "eks_worker_node_policy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy"
  role       = aws_iam_role.node.name
}

# Anexa política que permite aos nodes gerenciar rede dos pods
resource "aws_iam_role_policy_attachment" "eks_cni_policy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy"
  role       = aws_iam_role.node.name
}

# Anexa política que permite aos nodes acessar imagens no ECR
resource "aws_iam_role_policy_attachment" "ecr_read_only" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
  role       = aws_iam_role.node.name
}

# Anexa política que permite a grupo de administradores administrar o cluster EKS
resource "aws_iam_role_policy_attachment" "eks_admin_policy" {
  count      = var.admin_assume_role_policy != null ? 1 : 0
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
  role       = aws_iam_role.eks_admin[0].name
}

# Anexa a policy ao grupo lfs-admin-group
resource "aws_iam_group_policy_attachment" "assume_eks_admin" {
  count      = var.admin_assume_role_policy != null ? 1 : 0
  group      = "lfs-admin-group"
  policy_arn = aws_iam_policy.assume_eks_admin[0].arn
}
