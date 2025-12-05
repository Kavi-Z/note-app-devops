# main.tf (Updated)

provider "aws" {
  region = var.aws_region
}

# --- Key Management (Best Practice) ---
# Check if the public key file already exists
resource "tls_private_key" "noteapp" {
  count     = fileexists(pathexpand(var.public_key_path)) ? 0 : 1
  algorithm = "RSA"
  rsa_bits  = 4096
}

# Key pair resource
resource "aws_key_pair" "noteapp" {
  key_name   = "noteapp-key"
  public_key = fileexists(pathexpand(var.public_key_path)) ? file(pathexpand(var.public_key_path)) : tls_private_key.noteapp[0].public_key_openssh
}

# --- Security Group ---
resource "aws_security_group" "noteapp_sg" {
  # ... (Keep your existing security group configuration, it's fine)
  # ...
}

# --- EC2 instance ---
resource "aws_instance" "noteapp" {
  ami           = var.ami_id
  instance_type = var.instance_type
  key_name      = aws_key_pair.noteapp.key_name
  # Use VpcSecurityGroupIds for best practice, though security_groups works for default VPC
  vpc_security_group_ids = [aws_security_group.noteapp_sg.id] 

  # User Data (Updated to use variables)
  user_data = <<-EOF
    #!/bin/bash
    set -e
    
    # ... (Your existing apt-get update/upgrade/docker install steps) ...
    apt-get update
    apt-get upgrade -y
    apt-get install -y docker.io docker-compose
    systemctl enable docker
    systemctl start docker
    usermod -aG docker ubuntu
    
    # Login to Docker Hub
    echo "${var.docker_password}" | docker login -u ${var.docker_username} --password-stdin
    
    # Pull and Run containers
    
    docker pull kza1331/noteapp-backend:latest
    docker pull kza1331/noteapp-frontend:latest
    
    docker run -d -p 5000:5000 --name backend --restart unless-stopped ${var.docker_username}/noteapp-backend:latest
    docker run -d -p 3000:3000 --name frontend --restart unless-stopped ${var.docker_username}/noteapp-frontend:latest
    
    docker logout
  EOF

  tags = {
    Name = "noteapp-server"
  }
}

# --- Outputs (Keep your existing outputs) ---
output "server_ip" {
  value = aws_instance.noteapp.public_ip
  # ...
}

output "ssh_command" {
  value = "ssh -i ~/.ssh/new-noteapp-key ubuntu@${aws_instance.noteapp.public_ip}"
  # ...
}

# ... (Continue with frontend_url and backend_url outputs) ...