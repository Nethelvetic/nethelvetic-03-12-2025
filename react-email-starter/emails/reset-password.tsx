import {
    Body,
    Button,
    Container,
    Head,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
    Tailwind,
  } from '@react-email/components';

  
  interface DropboxResetPasswordEmailProps {
    userFirstname?: string;
    resetPasswordLink?: string;
  }
  
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : '';
  
  export const DropboxResetPasswordEmail = ({
    userFirstname,
    resetPasswordLink,
  }: DropboxResetPasswordEmailProps) => {
    return (
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
      <Html>
        <Head />
        <Body className="bg-[#f6f9fc] py-[10px]">
          <Preview>Réinitialisation de votre mot de passe Dropbox</Preview>
          <Container className="bg-white border border-[#f0f0f0] p-[45px]">
            <Img
              src={`${baseUrl}/static/dropbox-logo.png`}
              width="40"
              height="33"
              alt="Dropbox"
            />
            <Section>
              <Text className="text-[16px] font-light text-[#404040] leading-[26px]">
                Bonjour {userFirstname},
              </Text>
              <Text className="text-[16px] font-light text-[#404040] leading-[26px]">
                Quelqu'un a récemment demandé de changer le mot de passe de votre compte Dropbox. Si c'était vous, vous pouvez définir un nouveau mot de passe ici&nbsp;:
              </Text>
              <Button
                className="bg-[#007ee6] rounded text-white font-sans text-[15px] text-center block w-[210px] py-[14px] px-[7px]"
                href={resetPasswordLink}
              >
                Réinitialiser le mot de passe
              </Button>
              <Text className="text-[16px] font-light text-[#404040] leading-[26px]">
                Si vous ne souhaitez pas changer votre mot de passe ou si vous n'avez pas fait cette demande, ignorez simplement ce message et supprimez-le.
              </Text>
              <Text className="text-[16px] font-light text-[#404040] leading-[26px]">
                Pour garder votre compte sécurisé, merci de ne pas transférer cet e-mail à qui que ce soit. Consultez notre Centre d'aide pour{' '}
                <Link className="underline" href={resetPasswordLink}>
                  plus de conseils de sécurité.
                </Link>
              </Text>
              <Text className="text-[16px] font-light text-[#404040] leading-[26px]">
                Profitez bien de Dropbox&nbsp;!
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
      </Tailwind>
    );
  };
  
  DropboxResetPasswordEmail.PreviewProps = {
    userFirstname: 'Alan',
    resetPasswordLink: 'https://www.dropbox.com',
  } as DropboxResetPasswordEmailProps;
  
  export default DropboxResetPasswordEmail;
  