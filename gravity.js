// Web3 Wallet Connection Script
let provider;
let signer;

const connectWalletBtn = document.getElementById('connect-wallet');
const walletStatus = document.getElementById('wallet-status');
const userDashboard = document.getElementById('user-dashboard');
const userAddressEl = document.getElementById('user-address');
const userBalanceEl = document.getElementById('user-balance');

async function connectWallet() {
    // Check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
        try {
            // Request account access
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            
            // Create provider and signer
            provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();
            
            const address = await signer.getAddress();
            const balance = await provider.getBalance(address);
            
            // Update UI
            userAddressEl.textContent = address;
            userBalanceEl.textContent = `${ethers.utils.formatEther(balance)} ETH`;
            
            walletStatus.textContent = 'Wallet Connected Successfully!';
            connectWalletBtn.textContent = 'Connected';
            connectWalletBtn.disabled = true;
            
            userDashboard.classList.remove('hidden');
        } catch (error) {
            walletStatus.textContent = 'Failed to connect wallet: ' + error.message;
        }
    } else {
        walletStatus.textContent = 'Please install MetaMask!';
    }
}

connectWalletBtn.addEventListener('click', connectWallet);

// Optional: Detect network changes
if (window.ethereum) {
    window.ethereum.on('chainChanged', () => {
        window.location.reload();
    });
    
    window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
            // Disconnected
            userDashboard.classList.add('hidden');
            connectWalletBtn.disabled = false;
            connectWalletBtn.textContent = 'Connect Wallet';
            walletStatus.textContent = 'Wallet Disconnected';
        }
    });
}