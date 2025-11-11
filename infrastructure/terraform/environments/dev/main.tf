locals {
  name = "lfs-todo-dev"
}

module "network" {
  source                = "../../modules/network"
  name                  = local.name
  vpc_cidr              = "10.0.0.0/16"                  # 65k IPs disponíveis
  private_subnets_cidrs = ["10.0.1.0/24", "10.0.2.0/24"] # 2 privadas (EKS obrigatório)
  public_subnets_cidrs  = ["10.0.101.0/24"]              # 1 pública (Load Balancer)
  azs                   = ["us-east-1a", "us-east-1b"]   # 2 AZs (EKS obrigatório)
  tags                  = var.common_tags
}

module "iam" {
  source                     = "../../modules/iam"
  name                       = local.name
  cluster_assume_role_policy = file("${path.module}/../../templates/eks-cluster-assume-role.json") # Permite EKS assumir role
  node_assume_role_policy    = file("${path.module}/../../templates/eks-node-assume-role.json")    # Permite EC2 assumir role
  admin_assume_role_policy   = file("${path.module}/../../templates/eks-admin-assume-role.json")   # Permite grupo assumir administrar cluster
  tags                       = var.common_tags
}

module "sg" {
  source   = "../../modules/security-groups"
  name     = local.name
  vpc_id   = module.network.vpc_id   # ID da VPC criada
  vpc_cidr = module.network.vpc_cidr # CIDR para regras internas
  tags     = var.common_tags
}

module "eks" {
  source                    = "../../modules/eks-cluster"
  cluster_name              = "${local.name}-eks"            # Nome do cluster
  cluster_role_arn          = module.iam.cluster_role_arn    # Role IAM do cluster
  subnet_ids                = module.network.private_subnets # Subnets privadas
  security_group_ids        = [module.sg.security_group_id]  # Security group
  cluster_version           = "1.34"                         # Versão Kubernetes
  endpoint_public_access    = true                           # API acessível publicamente
  endpoint_private_access   = false                          # API não acessível privadamente
  enabled_cluster_log_types = ["api", "audit"]               # Logs habilitados
  admin_role_arn            = module.iam.admin_role_arn      # Conectar admin role
  tags                      = var.common_tags
  depends_on                = [module.iam, module.sg]
}

module "nodegroups" {
  source       = "../../modules/nodegroups"
  cluster_name = module.eks.cluster_name        # Nome do cluster EKS criado
  subnet_ids   = module.network.private_subnets # Subnets privadas para os nodes

  node_groups = {
    # Criado apenas um tipo de Node Group que será usado no EKS
    default = {
      node_role_arn  = module.iam.node_role_arn # Role IAM para os nodes
      desired_size   = 1                        # 1 node rodando
      min_size       = 1                        # Mínimo 1 node
      max_size       = 2                        # Máximo 2 nodes (auto-scaling)
      instance_types = ["t3.small"]             # Instância com 2GB RAM
      disk_size      = 20                       # 20GB de disco
      ami_type       = "AL2023_x86_64_STANDARD" # Amazon Linux 2023 | Outros: "AL2_x86_64" Amazon Linux 2 (Legado)
      capacity_type  = "ON_DEMAND"              # Instâncias sob demanda
    }
  }

  tags       = var.common_tags
  depends_on = [module.eks]
}

module "documentdb" {
  source     = "../../modules/documentdb"
  name       = local.name
  vpc_id     = module.network.vpc_id          # VPC onde o banco será criado
  vpc_cidr   = module.network.vpc_cidr        # CIDR para regras de segurança
  subnet_ids = module.network.private_subnets # Subnets privadas para o banco

  master_username       = "mainuser"      # Main user
  instance_class        = "db.t4g.medium" # Instância econômica ARM
  instance_count        = 1               # Apenas 1 instância para dev
  backup_retention_days = 1               # 1 dia de backup (econômico)
  deletion_protection   = false           # Permite deletar facilmente em dev
  storage_encrypted     = true            # Criptografia de dados ativada

  tags = var.common_tags
}

module "db_secret" {
  source = "../../modules/secrets"
  name   = "${local.name}-db-credentials" # Nome do segredo

  secret_data = {
    connection_string = module.documentdb.connection_string # String de conexão MongoDB
    username          = module.documentdb.cluster_username  # Usuário do banco
    password          = module.documentdb.cluster_password  # Senha do banco
    endpoint          = module.documentdb.cluster_endpoint  # Endpoint do cluster
    database          = "tododb"                            # Nome do banco de dados
  }

  tags       = var.common_tags
  depends_on = [module.documentdb] # Aguarda DocumentDB estar pronto
}

module "ecr" {
  source           = "../../modules/ecr"
  repository_names = ["lfs-todo-backend", "lfs-todo-frontend"] # Repositórios para as aplicações
  tags             = var.common_tags
}
