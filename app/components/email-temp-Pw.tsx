import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Preview,
    Text,
    Tailwind
  } from '@react-email/components';

const baseUrl = process.env.VERCEL_URL || 'http://localhost:3000';


  interface EmailTempPwProps {
    email: string;
  }
  
  export const EmailTemplPw: React.FC<Readonly<EmailTempPwProps>> =  (email) => (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              brand: "#007291",
            },
          },
        },
      }}
    >
      <html className="bg-white font-open-sans-light">
        <head>
          <title>Demande de réinitialisation de mot de passe</title>
        </head>
        <Container>
          <Heading>Salutation</Heading>
          <Text>
          Nous avons bien reçu votre demande de réinitialisation de mot de passe.
          Pour créer un nouveau mot de passe, veuillez cliquer sur le lien suivant :
          </Text>
          <Button
            href={`${baseUrl}/formulaire/init-Pw`}
            className="bg-red-400 text-white py-3 px-5"
          >
            lien de réinitialisation
          </Button>
          Bien cordialement,
        </Container>
      </html>
    </Tailwind>
  );
  