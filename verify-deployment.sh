#!/bin/bash

echo "🔍 Verifying Cosmos AI Sage Deployment"
echo "======================================"

# Check if services are running
echo "1. Checking services..."

# Check Hardhat node
if curl -s http://localhost:8545 > /dev/null; then
    echo "✅ Hardhat node is running"
else
    echo "❌ Hardhat node is not running"
fi

# Check API
if curl -s http://localhost:3001/health > /dev/null; then
    echo "✅ Backend API is running"
    API_HEALTH=$(curl -s http://localhost:3001/health)
    echo "   API Health: $API_HEALTH"
else
    echo "❌ Backend API is not running"
fi

# Check frontend
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Frontend is running"
else
    echo "⚠️ Frontend may not be running (expected if not started)"
fi

# Check contracts
echo ""
echo "2. Checking deployed contracts..."
if [ -d "deployments" ]; then
    LATEST_DEPLOYMENT=$(ls -t deployments/*.json | head -1)
    if [ -n "$LATEST_DEPLOYMENT" ]; then
        echo "✅ Contracts deployed: $LATEST_DEPLOYMENT"
        cat $LATEST_DEPLOYMENT | jq '.contracts'
    else
        echo "❌ No deployments found"
    fi
else
    echo "❌ Deployments directory not found"
fi

# Test AI components
echo ""
echo "3. Testing AI components..."
if command -v python3 > /dev/null; then
    # Test portfolio manager
    python3 ai-engine/portfolio-manager/manager.py > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        echo "✅ Portfolio Manager working"
    else
        echo "❌ Portfolio Manager test failed"
    fi
    
    # Test contract auditor
    python3 ai-engine/contract-auditor/auditor.py > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        echo "✅ Contract Auditor working"
    else
        echo "❌ Contract Auditor test failed"
    fi
else
    echo "⚠️ Python3 not available, skipping AI tests"
fi

echo ""
echo "📊 Deployment Verification Complete"
