import { Alert, Container, Snackbar } from '@mui/material';

import { clusterApiUrl, Connection } from '@solana/web3.js';
import { FC, useState } from 'react';
import BtnFaucet from './components/btn-faucet/btn-faucet';
import WalletInput from './components/wallet-input/wallet-input';
import Plausible from 'plausible-tracker';
const { trackPageview ,enableAutoPageviews } = Plausible()
trackPageview()
enableAutoPageviews();

require('./App.css');
const App: FC = () => {
    const [address, setAddress] = useState<any>("");
    const connection = new Connection(clusterApiUrl('devnet'));

    const [alertConfig, setAlertConfig] = useState({ open: false, message: null });
    const [isValid, setIsValid] = useState<boolean | any>();

    return (
        <div className="App">
            <Container maxWidth="sm">

                <h1>Solana Devnet Faucet</h1>
                <WalletInput address={address} setAddress={setAddress} setIsValid={setIsValid} />
                {isValid === false && <Alert severity="error">Invalid address</Alert>}
                <BtnFaucet walletAddress={address} isValid={isValid} connection={connection} setAlertConfig={setAlertConfig} />
                <Snackbar open={alertConfig.open} autoHideDuration={6000} onClose={() => setAlertConfig({ open: false, message: null })}>
                    <Alert severity="success" sx={{ width: '100%' }}>
                        {alertConfig.message}
                    </Alert>
                </Snackbar>
            </Container>
        </div>
    );
};
export default App;



