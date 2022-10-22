import React from 'react';
import { useRef } from 'react'
import { sha512 } from 'crypto-hash';
import { Label, Input } from '@rebass/forms'
import { Box, Button } from 'rebass'
import './styles.css'

const PW = 'gamble777'

const ACCESS_LEVELS = {
    usual: "",
    admin: "",
}

export default function PassPhrase({ verifyUser }) {
    const passphraseInput = useRef(null);
    const validatePhrase = () => {
        if (passphraseInput.current.value.toLowerCase().replaceAll(' ', '') === PW) {
            verifyUser()
        }
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