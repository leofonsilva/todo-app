locals {
  name = "lfs-todo-dev"
}

module "network" {
  source = "../../modules/network"
  name = local.name
  vpc_cidr = "10.0.0.0/16"
  private_subnets_cidrs = ["10.0.1.0/24","10.0.2.0/24"]
  public_subnets_cidrs = ["10.0.101.0/24","10.0.102.0/24"]
  azs = ["us-east-1a","us-east-1b"]
  tags = var.common_tags
}

module "iam" {
  source = "../../modules/iam"
  name = local.name
  cluster_assume_role_policy = file("${path.module}/../templates/eks-cluster-assume-role.json")
  node_assume_role_policy = file("${path.module}/../templates/eks-node-assume-role.json")
  create_node_role = true
  tags = var.common_tags
}

module "sg" {
  source = "../../modules/security-groups"
  name = local.name
  vpc_id = module.network.vpc_id
  vpc_cidr = module.network.vpc_cidr
  tags = var.common_tags
}

module "eks" {
  source = "../../modules/eks-cluster"  
  cluster_name    = "${local.name}-eks"
  cluster_role_arn = module.iam.cluster_role_arn
  subnet_ids       = module.network.private_subnets
  security_group_ids = [module.sg.security_group_id]
  cluster_version = "1.27"
  endpoint_public_access  = true
  endpoint_private_access = false
  enabled_cluster_log_types = ["api", "audit"]

  tags = var.common_tags
  depends_on = [module.iam, module.sg]
}

module "nodegroups" {
  source = "../../modules/nodegroups"  
  cluster_name = module.eks.cluster_name
  subnet_ids   = module.network.private_subnets
  
  node_groups = {
    default = {
      node_role_arn  = module.iam.node_role_arn
      desired_size   = 1
      min_size       = 1
      max_size       = 2
      instance_types = ["t3.small"] # Others: t3.micro, t3.medium
      disk_size      = 20
      ami_type       = "AL2_x86_64"
      capacity_type  = "ON_DEMAND"
    }
  }
  
  tags = var.common_tags
  depends_on = [module.eks]
}

module "documentdb" {
  source = "../../modules/documentdb"  
  name        = local.name
  vpc_id      = module.network.vpc_id
  vpc_cidr    = module.network.vpc_cidr
  subnet_ids  = module.network.private_subnets

  instance_class        = "db.t4g.medium"
  instance_count        = 1
  backup_retention_days = 1
  deletion_protection   = false
  storage_encrypted     = true

  tags = var.common_tags
}

module "db_secret" {
  source = "../../modules/secrets"
  name        = "${local.name}-db-credentials"

  secret_data = {
    connection_string = module.documentdb.connection_string
    username          = module.documentdb.cluster_username
    password          = module.documentdb.cluster_password
    endpoint          = module.documentdb.cluster_endpoint
    database          = "tododb"
  }
  
  tags = var.common_tags  
  depends_on = [module.documentdb]
}

module "ecr" {
  source = "../../modules/ecr"
  repository_names = ["lfs-todo-backend", "lfs-todo-frontend"]
  tags = var.common_tags
}
