# Genezio Web3 Wallet Authentication Example

This repository demonstrates the integration of Genezio with Web3 wallet authentication to secure access to your application's functionalities.

# Run

1. Install genezio.

```
npm install genezio -g
```

2. Deploy the project. If you are not logged in, you will be redirected to login or register with a genezio account.

```
genezio deploy
```

3. Go to your project on the genezio dashboard and active the Authentication for your project from the "Authentication" section. 
4. Activate the Web 3 Auth provider and after that copy the `Token` and `Region` values. Paste them in `client/src/App.tsx`:

```typescript
// Add your own values here
AuthService.getInstance().setTokenAndRegion("<token>", "<region>");
```

4. Deploy again the client

```
genezio deploy --frontend
```

# How does it work?

A Web3 wallet login system allows users to securely authenticate with your platform using their digital wallets. This process utilizes blockchain technology, offering a decentralized and secure method of verification without sharing personal information. This method leverages public-key cryptography, eliminating the need for traditional username and password combinations.

What is the flow?

1. Connect Wallet: User clicks "Login with Metamask" and approves the connection in their wallet.
2. Sign Message: The platform sends a unique message, which the user signs with their private key via their wallet.
3. Verify Signature: The platform verifies the signature using the user's public key to authenticate identity.
4. Establish Session: Upon verification, the platform starts a session, granting access to the user.

