import { EmailTemplate4 } from '../components/email-template4';
import { Resend } from 'resend';

const resend = new Resend("re_NxZRa7bC_Q6DNSPB7y9fai8ZJLWAVrwYg");

//---------------------------------------------------------------------
//------------------------1.1 Fonction envoi d'un email  --------------
//---------------------------------------------------------------------
export async function emailInscription() {
  console.log("1.1.0 email-Query envoi d'un email");

  try {
    console.log("1.1.2 email-Query try avant");

    // Attendre la résolution de EmailTemplate3 en passant un objet vide pour les props
    const reactContent = await EmailTemplate4({firstName: "Leatitia Golliard"});

    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['golliard73@gmail.com'],
      subject: 'Hello world',
      react: reactContent,
    });

    console.log("1.1.3 email-Query try après data= ", data);
    return { success: true, message: "email envoyé avec succès !" };

  } catch (error) {
    console.error("1.1.4 email-Query try après error= ", error);
    return { success: false, message: "Une erreur est survenue lors de l'envoi d'un email." };
  }
}
