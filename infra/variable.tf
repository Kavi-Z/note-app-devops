# variables.tf
variable "aws_region" {
  description = "The AWS region to deploy resources in."
  type        = string
  default     = "ap-south-1"
}

variable "ami_id" {
  description = "The AMI ID for the Ubuntu 22.04 LTS instance."
  type        = string
  # Check for the latest Ubuntu 22.04 LTS AMI in ap-south-1
  default     = "ami-0f5ee92e2d63afc18" 
}

variable "instance_type" {
  description = "The EC2 instance type."
  type        = string
  default     = "t3.micro"
}

variable "public_key_path" {
  description = "Path to the public key file for SSH."
  type        = string
  default     = "~/.ssh/new-noteapp-key.pub" # Match your existing file path
}

# The Docker Hub password will be passed via a tfvars file or environment variable
variable "docker_password" {
  description = "Docker Hub password"
  type        = string
  sensitive   = true
}

variable "docker_username" {
  description = "Docker Hub username"
  type        = string
  default     = "kza1331" # Match your existing username
}