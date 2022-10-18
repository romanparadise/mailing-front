import React from 'react';
import { useRef } from 'react'
import { sha512 } from 'crypto-hash';
import { Label, Input } from '@rebass/forms'
import { Box, Button } from 'rebass'
import './styles.css'

const HASHED_PW = '9efca55a385225e7295aa260ffc90a39244237b7fcf6d1077d8f362cbb522ae88a203c80c5ca95e39c94b30f3d61d08287fef5f78811c4791ac36830de0aa99c'

const ACCESS_LEVELS = {
    usual: "",
    admin: "",
}

export default function PassPhrase({ verifyUser }) {
    const passphraseInput = useRef(null);
    const validatePhrase = () => {
        sha512(passphraseInput.current.value.toLowerCase().replaceAll(' ', ''))
        .then(hash => {
            if (hash === HASHED_PW) {
                verifyUser()
            }
        })
    }
    
    return (
        <div className='passphrase-box'>
            <Box>
                <Label htmlFor='passphrase'>Codephrase?</Label>
                <Input
                    ref={passphraseInput}
                    id='passphrase'
                    name='passphrase'
                    type='text'
                    placeholder=''
                />
                <Button onClick={validatePhrase} variant='secondary'> Войти</Button>
            </Box>
        </div>
    )
}