import { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";
import "./App.css";
import { Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthService } from "@genezio/auth";
import { BackendService } from "@genezio-sdk/genezio-login-metamask";

// TODO: Replace with your own API key and region
AuthService.getInstance().setTokenAndRegion("<YOUR_TOKEN>", "<YOUR_PROJECT_REGION>");

function App() {
    // This is the user's address and balance
    // We will fetch this info from the blockchain
    // Only authenticated users can access this info
    const [data, setData] = useState({
        address: null as string | null,
        balance: null as string | null,
    });
    // This is the secured info that we will fetch from the backend
    // Only authenticated users can access this info
    const [securedInfo, setSecuredInfo] = useState("")

    const getBalance = useCallback(async (address: string) => {
        // Requesting balance method
        const balance = await window.ethereum.request({
            method: "eth_getBalance",
            params: [address, "latest"],
        })
        setData({
            address: address,
            balance: ethers.formatEther(balance),
        });
    }, [setData]);

    useEffect(() => {
        // Check if the user is authenticated
        // If the user is authenticated, fetch the user's address and balance
        // If the user is not authenticated, redirect to the login screen
        AuthService.getInstance().userInfo().then((user) => {
            if (user.address) {
                getBalance(user.address)
            } else {
                throw new Error("No address")
            }
        }).catch((e: unknown) => {
                console.error("Not authenticated. Redirecting to login screen...", e)
                setData({
                    address: null,
                    balance: null,
                })
            })
    }, [getBalance])


    const logout = () => {
        AuthService.getInstance().logout()
        setData({
            address: null,
            balance: null,
        })
    }

    const getSecuredInfo = async () => {
        try {
            const greetingMessage = await BackendService.hello("Friend")
            setSecuredInfo(greetingMessage)
        } catch {
            logout()
        }
    }

    const loginWithMetamask = async () => {
        // Check if Metamask is installed
        if (window.ethereum) {
            // Fetch the accounts
            const addresses = await window.ethereum.request({ method: "eth_requestAccounts" })
            const address = addresses[0]

            // Retrieve a nonce for this address
            const nonce = await AuthService.getInstance().web3GetNonce(address)

            // Sign the nonce
            const signature = await window.ethereum.request({
                method: 'personal_sign',
                params: [nonce, address]
            })

            // Login with the signature
            await AuthService.getInstance().web3Login(address, signature)
            await getBalance(address)
        } else {
            alert("Install Metamask extension!");
        }
    }

    return (
        <div className="App">
            <Card className="text-center">
                <Card.Body>
                    { !data.address ? 
                        <Card.Body>
                            <Button
                                onClick={loginWithMetamask}
                                variant="primary"
                            >
                                Login with Metamask 
                            </Button>
                        </Card.Body>
                        : 
                        <Card.Body>
                            <Card.Header>
                                <strong>Address: </strong>
                                {data.address}
                            </Card.Header>
                            <Card.Text>
                                <strong>Balance: </strong>
                                {data.balance}
                            </Card.Text>
                            <Button
                                onClick={() => logout()}
                                variant="primary">
                                Logout
                            </Button>
                            <Button
                                onClick={getSecuredInfo}
                                variant="primary"
                            >
                                Get Secured Info
                            </Button>
                            <Card.Text>
                                {securedInfo}
                            </Card.Text>
                        </Card.Body>
                    }
                </Card.Body>
            </Card>
        </div>
    );
}

export default App;
