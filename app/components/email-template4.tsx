import * as React from 'react';
import { Button, Html, Tailwind } from "@react-email/components";

interface EmailTemplate4Props {
  firstName: string;
}

export const EmailTemplate4: React.FC<Readonly<EmailTemplate4Props>> = ({
  firstName }) => (

    <Tailwind>
 
        <h1>Welcome, {firstName}!</h1>

        <button className='bg-red-400 text-white py-3 px-5'>clique ti to</button>

    </Tailwind>

  
);