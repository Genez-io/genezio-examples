// Filename - App.tsx
// Importing modules
import { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";
import "./App.css";
import { Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthService } from "@genezio/auth";
import { BackendService } from "@genezio-sdk/my-web3-project";

AuthService.getInstance().setTokenAndRegion("0-ds6m2tusdol2ociabvmjjlk3va0apctj", "eu-central-1");

function App() {
	// usetstate for storing and retrieving wallet details
	const [data, setdata] = useState({
		address: "",
		Balance: null as string | null,
	});
    const [authenticated, setAuthenticated] = useState(true)
    const [securedInfo, setSecuredInfo] = useState("")

	const getBalance = useCallback((address: string) => {
		// Requesting balance method
		window.ethereum
			.request({
				method: "eth_getBalance",
				params: [address, "latest"],
			})
			.then((balance: string) => {
				// Setting balance
				setdata({
                    address: address,
					Balance:
						ethers.formatEther(balance),
				});
			});
	}, [setdata]);
    
    useEffect(() => {
        AuthService.getInstance().userInfo().then((user) => {
            if (user.address) {
                getBalance(user.address)
                setAuthenticated(true)
            } else {
                throw new Error("No address")
            }
        }).catch((e: unknown) => {
            console.error("Not authenticated. Redirecting to login screen...", e)
            setAuthenticated(false)
        })
    }, [getBalance])

    const logout = () => {
        AuthService.getInstance().logout()
        setAuthenticated(false)
    }

    const getSecuredInfo = () => {
        BackendService.hello("Friend").then((res) => {
            setSecuredInfo(res)
        }).catch((e) => {
            console.error(e)
            setSecuredInfo("Error")
        })
    }

    const loginWithMetamask = () => {
		if (window.ethereum) {
			// res[0] for fetching a first wallet
			window.ethereum
				.request({ method: "eth_requestAccounts" })
				.then(async (res: string[]) => {
                    const address = res[0]
                    const nonce = await AuthService.getInstance().web3GetNonce(address)
                    const signature = await window.ethereum.request({
                        method: 'personal_sign',
                        params: [nonce, address]
                    })
                    await AuthService.getInstance().web3Login(address, signature)
                    setAuthenticated(true)
                    getBalance(address)
                })
		} else {
			alert("install metamask extension!!");
		}
    }

    return (
        <div className="App">
            <Card className="text-center">
                <Card.Body>
                    { !authenticated ? 
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
                           {data.Balance}
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
