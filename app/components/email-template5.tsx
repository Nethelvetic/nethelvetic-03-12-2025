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


  interface EmailTemplate4Props {
    email: string;
  }
  
  export const EmailTemplate5: React.FC<Readonly<EmailTemplate4Props>> =  (email) => (
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
          <title>Bienvenue au test d'envoi d'email</title>
        </head>
        <Container>
          <Heading>Salutation</Heading>
          <Text>
            Vous venez de vous inscrire, et cet email vous confirme que
            c'est un succès !
          </Text>
          <Button
            href="http://localhost:3000/"
            className="bg-red-400 text-white py-3 px-5"
          >
            Accéder au site
          </Button>
        </Container>
      </html>
    </Tailwind>
  );
  