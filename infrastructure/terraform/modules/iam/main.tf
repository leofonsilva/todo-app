resource "aws_iam_role" "eks_cluster" {
  name               = "${var.name}-eks-cluster-role"
  assume_role_policy = var.cluster_assume_role_policy
  tags               = var.tags
}

resource "aws_iam_role" "node" {
  count              = var.create_node_role ? 1 : 0
  name               = "${var.name}-eks-node-role"
  assume_role_policy = var.node_assume_role_policy
  tags               = var.tags
}

resource "aws_iam_role_policy_attachment" "eks_cluster_policy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
  role       = aws_iam_role.eks_cluster.name
}

resource "aws_iam_role_policy_attachment" "eks_worker_node_policy" {
  count      = var.create_node_role ? 1 : 0
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy"
  role       = aws_iam_role.node[0].name
}

resource "aws_iam_role_policy_attachment" "eks_cni_policy" {
  count      = var.create_node_role ? 1 : 0
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy"
  role       = aws_iam_role.node[0].name
}

resource "aws_iam_role_policy_attachment" "ecr_read_only" {
  count      = var.create_node_role ? 1 : 0
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
  role       = aws_iam_role.node[0].name
}
