import { useState } from "react";
import { ChainNetwork } from "oreid-js";
import { useOreId, useUser } from "oreid-react";


export const SignTransaction = () => {
    const oreId = useOreId();
    const user = useUser();
    const chainNetwork = ChainNetwork.EthRopsten;
    const[ error, setError ] = useState("")

    const onError = (error) => {
        console.log("Transaction failed ", error);
        setError( error );
    };

    const onSuccess = ( result ) => {
        console.log( 
            "Transaction Successful. ", JSON.stringify(result)
        );
    };

    const handleSign = async () => {
        const signingAccount = user.chainAccounts.find(
            (ca) => ca.chainNetwork ===  chainNetwork
        );
    
        const errorMsg = `User doesn't not have any accounts on ${chainNetwork}`;
    
        if (!signingAccount) {
            console.log( errorMsg );
            onError( errorMsg )
            return;
        };
    
        const transactionBody = {
            from: signingAccount.chainAccount,
            to: signingAccount.chainAccount,
            value: 0
        };

        const transaction = await oreId.createTransaction({
            chainAccount: signingAccount.chainAccount,
            chainNetwork: signingAccount.chainNetwork,
            //@ts-ignore
            transaction: transactionBody,
            signOptions: {
                broadcast: true,
                returnSignedTransaction: false,
            },
        });
        
        oreId.popup
            .sign({ transaction })
            .then( onSuccess )
            .catch( onError );
    };

    return(
        <div>
            <button
                onClick={() => {
                    handleSign()
                }}
            >
                Send Sample Transaction
            </button>

            {error && <div>Error: {error.message}</div>}
        </div>
    );
};