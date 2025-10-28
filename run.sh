#!/bin/bash

echo "🚀 Cosmos AI Sage - Complete Setup & Run Script"
echo "================================================"
echo ""

# Colors
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

# Check if running from correct directory
check_directory() {
    if [ ! -d "/home/neeraj/Downloads/cosmos-ai-sage-main" ]; then
        print_error "Please run this script from /home/neeraj/Downloads/cosmos-ai-sage-main"
        exit 1
    fi
    
    cd "/home/neeraj/Downloads/cosmos-ai-sage-main"
    print_success "Running from correct directory: $(pwd)"
}

# Install dependencies
install_dependencies() {
    print_status "Installing project dependencies..."
    
    # Install Node.js dependencies
    if [ -f "package.json" ]; then
        npm install
        if [ $? -eq 0 ]; then
            print_success "Node.js dependencies installed"
        else
            print_error "Failed to install Node.js dependencies"
            exit 1
        fi
    fi
    
    # Install Python dependencies for AI engine
    if command -v pip3 &> /dev/null; then
        print_status "Installing Python dependencies..."
        pip3 install numpy aiohttp requests
        print_success "Python dependencies installed"
    else
        print_warning "pip3 not found, skipping Python dependencies"
    fi
    
    # Install Rust for CosmWasm (if needed)
    if ! command -v cargo &> /dev/null; then
        print_status "Installing Rust..."
        curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
        source $HOME/.cargo/env
        print_success "Rust installed"
    fi
}

# Setup environment
setup_environment() {
    print_status "Setting up environment..."
    
    # Copy environment file if it doesn't exist
    if [ ! -f ".env" ]; then
        cp .env.example .env
        print_warning "Please update .env file with your configuration"
    fi
    
    # Create necessary directories
    mkdir -p deployments logs
    
    print_success "Environment setup completed"
}

# Compile contracts
compile_contracts() {
    print_status "Compiling smart contracts..."
    
    npx hardhat compile
    if [ $? -eq 0 ]; then
        print_success "Smart contracts compiled successfully"
    else
        print_error "Failed to compile smart contracts"
        exit 1
    fi
}

# Run tests
run_tests() {
    print_status "Running tests..."
    
    # Run contract tests
    npx hardhat test
    if [ $? -eq 0 ]; then
        print_success "All tests passed"
    else
        print_error "Some tests failed"
        exit 1
    fi
}

# Deploy contracts locally
deploy_contracts() {
    print_status "Deploying contracts to local network..."
    
    # Start local Hardhat node in background
    print_status "Starting local Hardhat node..."
    npx hardhat node &
    HARDHAT_PID=$!
    sleep 5
    
    # Deploy contracts
    npx hardhat run blockchain/scripts/deploy/deploy-all.ts --network localhost
    if [ $? -eq 0 ]; then
        print_success "Contracts deployed successfully"
    else
        print_error "Failed to deploy contracts"
        kill $HARDHAT_PID 2>/dev/null
        exit 1
    fi
}

# Start backend services
start_backend() {
    print_status "Starting backend services..."
    
    # Start API server
    cd backend/api
    npm install
    node server.js &
    API_PID=$!
    cd ../..
    
    sleep 3
    
    # Check if API is running
    if curl -s http://localhost:3001/health > /dev/null; then
        print_success "Backend API is running on port 3001"
    else
        print_error "Backend API failed to start"
        exit 1
    fi
}

# Start frontend
start_frontend() {
    print_status "Starting frontend..."
    
    if [ -d "frontend" ]; then
        cd frontend
        # Install dependencies if needed
        if [ ! -d "node_modules" ]; then
            npm install
        fi
        
        # Start development server
        npm run dev &
        FRONTEND_PID=$!
        cd ..
        
        sleep 5
        print_success "Frontend should be available at http://localhost:3000"
    else
        print_warning "Frontend directory not found, skipping frontend startup"
    fi
}

# Test AI components
test_ai_components() {
    print_status "Testing AI components..."
    
    # Test Portfolio Manager
    if [ -f "ai-engine/portfolio-manager/manager.py" ]; then
        python3 ai-engine/portfolio-manager/manager.py
        if [ $? -eq 0 ]; then
            print_success "Portfolio Manager test completed"
        else
            print_error "Portfolio Manager test failed"
        fi
    fi
    
    # Test Contract Auditor
    if [ -f "ai-engine/contract-auditor/auditor.py" ]; then
        python3 ai-engine/contract-auditor/auditor.py
        if [ $? -eq 0 ]; then
            print_success "Contract Auditor test completed"
        else
            print_error "Contract Auditor test failed"
        fi
    fi
    
    # Test Chain Monitor
    if [ -f "ai-engine/chain-monitor/monitor.py" ]; then
        python3 ai-engine/chain-monitor/monitor.py
        if [ $? -eq 0 ]; then
            print_success "Chain Monitor test completed"
        else
            print_error "Chain Monitor test failed"
        fi
    fi
}

# Main execution function
main() {
    echo "Cosmos AI Sage Setup Menu"
    echo "1. Full Setup (Dependencies + Deploy + Start)"
    echo "2. Install Dependencies Only"
    echo "3. Deploy Contracts Only"
    echo "4. Start Services Only"
    echo "5. Test AI Components"
    echo "6. Exit"
    echo ""
    read -p "Choose an option (1-6): " choice
    
    case $choice in
        1)
            check_directory
            install_dependencies
            setup_environment
            compile_contracts
            run_tests
            deploy_contracts
            start_backend
            start_frontend
            test_ai_components
            ;;
        2)
            check_directory
            install_dependencies
            ;;
        3)
            check_directory
            compile_contracts
            deploy_contracts
            ;;
        4)
            check_directory
            start_backend
            start_frontend
            ;;
        5)
            check_directory
            test_ai_components
            ;;
        6)
            print_status "Exiting..."
            exit 0
            ;;
        *)
            print_error "Invalid option"
            exit 1
            ;;
    esac
    
    echo ""
    print_success "Setup completed successfully!"
    echo ""
    echo "📊 Services Overview:"
    echo "   - Local Blockchain: http://localhost:8545"
    echo "   - Backend API: http://localhost:3001"
    echo "   - Frontend: http://localhost:3000"
    echo ""
    echo "🔧 Useful Commands:"
    echo "   - View contracts: npx hardhat console"
    echo "   - Run tests: npx hardhat test"
    echo "   - Deploy to testnet: npx hardhat run scripts/deploy/deploy-all.ts --network evmosTestnet"
    echo ""
}

# Handle script interruption
cleanup() {
    print_status "Cleaning up..."
    kill $HARDHAT_PID 2>/dev/null
    kill $API_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

trap cleanup SIGINT SIGTERM

# Run main function
main
