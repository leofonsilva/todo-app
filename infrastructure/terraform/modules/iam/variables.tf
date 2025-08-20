variable "name" { 
  type = string 
}

variable "cluster_assume_role_policy" { 
  type = string 
}

variable "node_assume_role_policy" { 
  type = string 
  default = "" 
}

variable "create_node_role" { 
  type = bool 
  default = true 
}

variable "tags" { 
  type = map(string) 
  default = {} 
}
