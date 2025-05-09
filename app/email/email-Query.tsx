import { EmailTemplPw } from '../components/email-temp-Pw';
import { EmailTemplate5 } from '../components/email-template5';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

//---------------------------------------------------------------------
//------------------------1.1 Fonction email inscription  ------------
//---------------------------------------------------------------------
export async function emailInscription(emailProps: string) {
  console.log("1.1.0 email-Query Email-Inscri debut");

  try {

    // Attendre la résolution de EmailTemplate3 en passant un objet vide pour les props
    const reactContent = await EmailTemplate5 ({email: emailProps});

    const { data, error } = await resend.emails.send({
      from: 'Nethelvetic <do-not-reply@test.nethelvetic.ch>',
      to: ['golliard73@gmail.com'],
      subject: 'Hello world',
      react: reactContent,
    });

    console.log("1.1.3 email-Query Email-Inscri SUCCES", data);
    return { 
      success: true, 
      message: "email envoyé avec succès !" };

  } catch (error) {
    console.error("1.1.4 email-Query Email-Inscri NO SUCCES ", error);
    return { 
      success: false, 
      message: "Une erreur est survenue lors de l'envoi d'un email." };
  }
}




//---------------------------------------------------------------------
//------------------------1.1 Fonction email Pw  ----------------------
//---------------------------------------------------------------------
export async function emailPw(emailProps: string) {
  console.log("1.1.0 email-Query Email-Pw debut");

  try {
    // Attendre la résolution de EmailTemplate3 en passant un objet vide pour les props
    const reactContent = await EmailTemplPw ({email: emailProps});

    const { data, error } = await resend.emails.send({
      from: 'Nethelvetic <do-not-reply@test.nethelvetic.ch>',
      to: ['golliard73@gmail.com'],
      subject: 'Hello world',
      react: reactContent,
    });

    console.log("1.1.3 email-Query try après data= ", data);
    return { 
      success: true, 
      message: "email envoyé avec succès !" };

  } catch (error) {
    console.error("1.1.4 email-Query try après error= ", error);
    return { 
      success: false, 
      message: "Une erreur est survenue lors de l'envoi d'un email." };
  }
}

