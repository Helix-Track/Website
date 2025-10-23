#!/bin/bash

# HelixTrack Website Docker Compose Stop Script
# This script stops the HelixTrack website using Docker Compose

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
        print_error "Docker is not installed."
        exit 1
    fi
    
    if ! docker info &> /dev/null; then
        print_error "Docker is not running."
        exit 1
    fi
    
    print_success "Docker is installed and running"
}

# Check if Docker Compose is installed
check_docker_compose() {
    if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
        print_error "Docker Compose is not installed."
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

# Check if we're in the right directory
check_directory() {
    if [[ ! -f "docker-compose.yml" ]]; then
        print_error "docker-compose.yml not found in current directory"
        print_error "Please run this script from the website root directory"
        exit 1
    fi
    
    print_success "In correct directory"
}

# Stop containers
stop_containers() {
    print_status "Stopping HelixTrack website containers..."
    
    if $DOCKER_COMPOSE ps -q | grep -q .; then
        $DOCKER_COMPOSE down
        print_success "Containers stopped successfully"
    else
        print_warning "No running containers found"
    fi
}

# Optional: Remove images (if --clean flag is provided)
clean_images() {
    if [[ "$1" == "--clean" ]]; then
        print_status "Removing Docker images..."
        $DOCKER_COMPOSE down --rmi all
        print_success "Docker images removed"
    fi
}

# Optional: Remove volumes (if --clean-all flag is provided)
clean_all() {
    if [[ "$1" == "--clean-all" ]]; then
        print_status "Removing containers, images, and volumes..."
        $DOCKER_COMPOSE down --rmi all --volumes --remove-orphans
        print_success "All Docker resources removed"
    fi
}

# Show final status
show_status() {
    echo ""
    echo "==================================="
    echo "🛑 HelixTrack Website Stopped"
    echo "==================================="
    echo ""
    echo "✅ Website is no longer accessible"
    echo "📍 Port 8080 is now free"
    echo ""
    
    if [[ "$1" != "--clean" && "$1" != "--clean-all" ]]; then
        echo "🔄 To restart: ./start.sh"
        echo "🧹 To clean images: ./stop.sh --clean"
        echo "🗑️  To clean everything: ./stop.sh --clean-all"
    fi
    
    echo ""
    echo "📊 Remaining Docker resources:"
    if command -v docker &> /dev/null; then
        docker system df
    fi
    echo ""
}

# Main execution
main() {
    local clean_flag=""
    
    # Parse arguments
    for arg in "$@"; do
        case $arg in
            --clean)
                clean_flag="--clean"
                ;;
            --clean-all)
                clean_flag="--clean-all"
                ;;
            -h|--help)
                echo "Usage: $0 [OPTIONS]"
                echo ""
                echo "Options:"
                echo "  --clean      Remove containers and images"
                echo "  --clean-all  Remove containers, images, and volumes"
                echo "  -h, --help   Show this help message"
                echo ""
                exit 0
                ;;
            *)
                print_error "Unknown option: $arg"
                echo "Use -h or --help for usage information"
                exit 1
                ;;
        esac
    done
    
    echo "==================================="
    echo "🛑 Stopping HelixTrack Website"
    echo "==================================="
    echo ""
    
    check_docker
    check_docker_compose
    check_directory
    stop_containers
    clean_images "$clean_flag"
    clean_all "$clean_flag"
    show_status "$clean_flag"
    
    print_success "HelixTrack website stopped successfully!"
}

# Handle script interruption
trap 'print_warning "Script interrupted"; exit 1' INT TERM

# Run main function
main "$@"