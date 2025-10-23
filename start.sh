#!/bin/bash

# HelixTrack Website Docker Compose Start Script
# This script starts the HelixTrack website using Docker Compose

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed and running
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    if ! docker info &> /dev/null; then
        print_error "Docker is not running. Please start Docker first."
        exit 1
    fi
    
    print_success "Docker is installed and running"
}

# Check if Docker Compose is installed
check_docker_compose() {
    if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    
    # Use docker compose if available, otherwise docker-compose
    if docker compose version &> /dev/null; then
        DOCKER_COMPOSE="docker compose"
    else
        DOCKER_COMPOSE="docker-compose"
    fi
    
    print_success "Docker Compose is available: $DOCKER_COMPOSE"
}

# Check if required files exist
check_files() {
    local required_files=("Dockerfile" "docker-compose.yml" "nginx.conf")
    
    for file in "${required_files[@]}"; do
        if [[ ! -f "$file" ]]; then
            print_error "Required file '$file' not found in current directory"
            exit 1
        fi
    done
    
    if [[ ! -d "docs" ]]; then
        print_error "docs directory not found. This directory contains the website files."
        exit 1
    fi
    
    print_success "All required files found"
}

# Stop any existing container
stop_existing() {
    print_status "Checking for existing containers..."
    
    if $DOCKER_COMPOSE ps -q | grep -q .; then
        print_warning "Existing containers found. Stopping them..."
        $DOCKER_COMPOSE down
        print_success "Existing containers stopped"
    else
        print_status "No existing containers found"
    fi
}

# Build and start the containers
start_containers() {
    print_status "Building Docker image..."
    $DOCKER_COMPOSE build --no-cache
    
    print_status "Starting containers..."
    $DOCKER_COMPOSE up -d
    
    print_success "Containers started successfully"
}

# Wait for the service to be healthy
wait_for_health() {
    print_status "Waiting for the website to be ready..."
    
    local max_attempts=30
    local attempt=1
    
    while [[ $attempt -le $max_attempts ]]; do
        if curl -f http://localhost:8080 &> /dev/null; then
            print_success "Website is ready and accessible!"
            break
        fi
        
        if [[ $attempt -eq $max_attempts ]]; then
            print_error "Website failed to become ready after $max_attempts attempts"
            print_status "Checking container logs:"
            $DOCKER_COMPOSE logs helixtrack-website
            exit 1
        fi
        
        print_status "Attempt $attempt/$max_attempts: Waiting for website to be ready..."
        sleep 2
        ((attempt++))
    done
}

# Show status and access information
show_info() {
    echo ""
    echo "==================================="
    echo "🚀 HelixTrack Website is Running!"
    echo "==================================="
    echo ""
    echo "📍 Website URL: http://localhost:8080"
    echo "🏠 Main Page: http://localhost:8080/index.html"
    echo "📊 Diagrams: http://localhost:8080/diagrams.html"
    echo "📚 API Docs: http://localhost:8080/api.html"
    echo ""
    echo "🔧 Management Commands:"
    echo "  View logs: $DOCKER_COMPOSE logs -f"
    echo "  Stop website: ./stop.sh"
    echo "  Restart: $DOCKER_COMPOSE restart"
    echo ""
    echo "📈 Container Status:"
    $DOCKER_COMPOSE ps
    echo ""
}

# Main execution
main() {
    echo "==================================="
    echo "🐳 Starting HelixTrack Website"
    echo "==================================="
    echo ""
    
    check_docker
    check_docker_compose
    check_files
    stop_existing
    start_containers
    wait_for_health
    show_info
    
    print_success "HelixTrack website started successfully!"
}

# Handle script interruption
trap 'print_warning "Script interrupted. Cleaning up..."; $DOCKER_COMPOSE down; exit 1' INT TERM

# Run main function
main "$@"