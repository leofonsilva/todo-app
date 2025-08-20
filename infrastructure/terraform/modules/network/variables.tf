variable "name" { 
  type = string 
}

variable "vpc_cidr" { 
  type = string 
}

variable "private_subnets_cidrs" { 
  type = list(string) 
}

variable "public_subnets_cidrs" { 
  type = list(string) 
}

variable "azs" { 
  type = list(string) 
}

variable "tags" { 
  type = map(string) 
}
