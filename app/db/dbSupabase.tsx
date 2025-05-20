import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import {
  formationTable,
  evenementsTable,
  usersTable,
  messageTable,
  crmUsersTable,
  crmUser_UsersTable,
} from "./schema";
import { drizzle } from "drizzle-orm/postgres-js";
import { and, eq, isNotNull, not } from "drizzle-orm";
import postgres from "postgres";

//------------------------------------------------------------------------
// 0.1 Instanciation Supabase
//------------------------------------------------------------------------
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;
const supabase    = createClient(supabaseUrl, supabaseKey);
const client      = postgres(process.env.DATABASE_URL!);
const db          = drizzle({ client });

type FormatUserInput = {
  nom_entreprise:       string;
  personne_a_contacter: string;
  ville:                string;
  code_postal:          string;
  telephone:            string;
  date_de_naissance:    string;
  date_creation:        string;
  email:                string;
  username:             string;
  status:               string;
  domaine_activite:     string;
  employeur:            string;
  status_professionnel: string;
  adresse:              string;
  imgUrl:               string;
  btnUrlInt:            string;
  btnUrlExt:            string;
  btnTexte:             string;
  btnModifUrl:          string;
};

type TypeCrmUsers = {
  plan: string;                           
  plan_details: any;                      
  date_debut_abonnement: string;          
  date_fin_abonnement?: string;           
  date_debut_test?: string;               
  date_fin_test?: string;                 
  status_abonnement: string;              
  date_dernier_payment?: string;          
  date_prochain_payment?: string;         
  status_paiement: string;                
  mode_paiement?: string;                 
  facturation_info?: string;              
  mot_de_passe?: string;
  identification: string;
  userId: number;                         
};

//---------------------------------------------------------------------
// 1.0 Début userOneInsert----------------------------------------------
//---------------------------------------------------------------------
export async function userOneInsert(user: FormatUserInput) {
  console.log("1.0 dbSupabase userOneInsert : début", user);

  try {
    console.log("1.1 dbSupabase userOneInsert => vérifier existence pour :", user.email);
    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, user.email));

    if (existingUser.length > 0) {
      console.log("1.2 dbSupabase userOneInsert => utilisateur existe, mise à jour :", user.email);
      function isNullOrEmpty(val?: string) { return val == null || val.trim() === ""; }

      const toUpdate: FormatUserInput = {
        nom_entreprise:       isNullOrEmpty(user.nom_entreprise)       ? existingUser[0].nom_entreprise!       : user.nom_entreprise,
        personne_a_contacter: isNullOrEmpty(user.personne_a_contacter) ? existingUser[0].personne_a_contacter! : user.personne_a_contacter,
        ville:                isNullOrEmpty(user.ville)                ? existingUser[0].ville!                : user.ville,
        code_postal:          isNullOrEmpty(user.code_postal)          ? existingUser[0].code_postal!          : user.code_postal,
        telephone:            isNullOrEmpty(user.telephone)            ? existingUser[0].telephone!            : user.telephone,
        date_de_naissance:    isNullOrEmpty(user.date_de_naissance)    ? existingUser[0].date_de_naissance!    : user.date_de_naissance,
        date_creation:        isNullOrEmpty(user.date_creation)        ? existingUser[0].date_creation!        : user.date_creation,
        email:                existingUser[0].email!,  // email ne change pas
        username:             isNullOrEmpty(user.username)             ? existingUser[0].username!             : user.username,
        status:               isNullOrEmpty(user.status)               ? existingUser[0].status!               : user.status,
        domaine_activite:     isNullOrEmpty(user.domaine_activite)     ? existingUser[0].domaine_activite!     : user.domaine_activite,
        employeur:            isNullOrEmpty(user.employeur)            ? existingUser[0].employeur!            : user.employeur,
        status_professionnel: isNullOrEmpty(user.status_professionnel) ? existingUser[0].status_professionnel! : user.status_professionnel,
        adresse:              isNullOrEmpty(user.adresse)              ? existingUser[0].adresse!              : user.adresse,
        imgUrl:               isNullOrEmpty(user.imgUrl)               ? existingUser[0].imgUrl!               : user.imgUrl,
        btnUrlInt:            isNullOrEmpty(user.btnUrlInt)            ? existingUser[0].btnUrlInt!            : user.btnUrlInt,
        btnUrlExt:            isNullOrEmpty(user.btnUrlExt)            ? existingUser[0].btnUrlExt!            : user.btnUrlExt,
        btnTexte:             isNullOrEmpty(user.btnTexte)             ? existingUser[0].btnTexte!             : user.btnTexte,
        btnModifUrl:          isNullOrEmpty(user.btnModifUrl)          ? existingUser[0].btnModifUrl!          : user.btnModifUrl,
      };

      console.log("1.3 dbSupabase userOneInsert => toUpdate :", toUpdate);
      const updateRes = await userOneUpDate(existingUser[0].id, toUpdate);

      if (updateRes.success) {
        console.log("1.4 dbSupabase userOneInsert => mise à jour réussie");
        return { success: true, message: "Utilisateur mis à jour.", user: existingUser[0] };
      } else {
        console.error("1.5 dbSupabase userOneInsert => échec mise à jour:", updateRes.message);
        return { success: false, message: updateRes.message, user: existingUser[0] };
      }
    }

    console.log("1.6 dbSupabase userOneInsert => aucun utilisateur, insertion :", user.email);
    const defaultDate = new Date().toISOString().slice(0, 10);
    const newUser = {
      ...user,
      date_creation:     user.date_creation.trim()     === "" ? defaultDate : user.date_creation,
      date_de_naissance: user.date_de_naissance?.trim() === "" ? defaultDate : user.date_de_naissance,
    };
    console.log("1.7 dbSupabase userOneInsert => payload insertion :", newUser);

    const insertRes = await db
      .insert(usersTable)
      .values(newUser)
      .returning();

    console.log("1.8 dbSupabase userOneInsert => insertion réussie, id =", insertRes[0].id);
    return { success: true, message: "Utilisateur ajouté.", user: insertRes[0] };

  } catch (error) {
    console.error("1.9 dbSupabase userOneInsert => erreur :", error);
    return { success: false, message: "Erreur lors de l'opération.", user: null };
  }
}





//---------------------------------------------------------------------
// 2.0 Début update user ----------------------------------------------
//---------------------------------------------------------------------
export async function userOneUpDate(id: number, user: FormatUserInput) {
  console.log("2.0 dbSupabase userOneUpDate : début pour id =", id);

  try {
    const userToUpdateRaw = {
      ...user,
      date_de_naissance: user.date_de_naissance?.trim() === "" ? undefined : user.date_de_naissance,
      date_creation:     user.date_creation?.trim()     === "" ? undefined : user.date_creation,
      telephone:         user.telephone?.trim()         === "" ? undefined : user.telephone,
      username:          user.username?.trim()          === "" ? undefined : user.username,
    };

    console.log("2.1 dbSupabase userOneUpDate => payload mise à jour :", userToUpdateRaw);
    await db
      .update(usersTable)
      .set(userToUpdateRaw)
      .where(eq(usersTable.id, id));

    console.log("2.2 dbSupabase userOneUpDate => mise à jour réussie");
    return { success: true, message: "Utilisateur mis à jour.", user: userToUpdateRaw };

  } catch (error) {
    console.error("2.3 dbSupabase userOneUpDate => erreur :", error);
    return { success: false, message: "Erreur mise à jour utilisateur.", user: null };
  }
}





//---------------------------------------------------------------------
// 3.8 Début insert CrmUser pour inscription --------------------------
//---------------------------------------------------------------------
export async function crmUserInscrit(user: FormatUserInput, crmMotdePasse: string) {
  console.log("3.8.1 dbSupabase crmUserInscrit, user:", user);

  try {
    console.log("3.8.2 .?/ dbSupabase crmUserInscrit, USER ok/NO");
    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, user.email));

    if (existingUser.length > 0) {
      console.log("3.8.4 ../ dbSupabase crmUserInscrit USER EXIST:", user.email);
      console.log("3.8.5 ../../ dbSupabase crmUserInscrit USER EXIST => crmUser ACTIF/NO");

      const crmUserActifRes = await db
        .select()
        .from(usersTable)
        .innerJoin(crmUsersTable, eq(usersTable.id, crmUsersTable.userId))
        .where(
          and(
            eq(usersTable.email, user.email),
            eq(crmUsersTable.status_abonnement, "actif")
          )
        )
        .limit(1);

      if (crmUserActifRes.length > 0) {
        console.log("3.8.7 ../../ dbSupabase crmUserInscrit USER EXIST => crmUser ACTIF");
        console.log("3.8.8 ../../../ dbSupabase crmUserInscrit USER EXIST => crmUser ACTIF => crmUser Pw/NO");

        const crmUserPwRes = await db
          .select()
          .from(usersTable)
          .innerJoin(crmUsersTable, eq(usersTable.id, crmUsersTable.userId))
          .where(
            and(
              eq(usersTable.email, user.email),
              eq(crmUsersTable.mot_de_passe, crmMotdePasse),
              eq(crmUsersTable.status_abonnement, "actif")
            )
          )
          .limit(1);

        if (crmUserPwRes.length > 0) {
          console.log("3.8.10 ../../../ dbSupabase crmUserInscrit USER EXIST => crmUser ACTIF => crmUser Pw/Yes");
          return {
            success: false,
            message: "Vous êtes déjà inscrit",
            user: crmUserPwRes[0].users,
            crm: crmUserPwRes[0].crmUsers
          };
        }

        const crmUserMiseAJour: TypeCrmUsers = {
          plan:                  crmUserActifRes[0].crmUsers.plan,
          plan_details:          crmUserActifRes[0].crmUsers.plan_details,
          date_debut_abonnement: crmUserActifRes[0].crmUsers.date_debut_abonnement,
          date_fin_abonnement:   crmUserActifRes[0].crmUsers.date_fin_abonnement   ?? undefined,
          date_debut_test:       crmUserActifRes[0].crmUsers.date_debut_test       ?? undefined,
          date_fin_test:         crmUserActifRes[0].crmUsers.date_fin_test         ?? undefined,
          status_abonnement:     crmUserActifRes[0].crmUsers.status_abonnement,
          date_dernier_payment:  crmUserActifRes[0].crmUsers.date_dernier_payment ?? undefined,
          date_prochain_payment: crmUserActifRes[0].crmUsers.date_prochain_payment ?? undefined,
          status_paiement:       crmUserActifRes[0].crmUsers.status_paiement,
          mode_paiement:         crmUserActifRes[0].crmUsers.mode_paiement       ?? undefined,
          facturation_info:      crmUserActifRes[0].crmUsers.facturation_info    ?? undefined,
          mot_de_passe:          crmMotdePasse,
          identification:        crmUserActifRes[0].crmUsers.identification,
          userId:                crmUserActifRes[0].crmUsers.userId!,
        };

        const crmUserPwUpdateRes = await crmUserUpdate(
          crmUserActifRes[0].crmUsers.id,
          crmUserMiseAJour
        );

        if (crmUserPwUpdateRes.success) {
          console.log("3.8.11 ../../../../ dbSupabase crmUserInscrit USER EXIST => crmUser ACTIF => update Pw Yes");
          return {
            success: true,
            message: "Mot de passe crm mis à jour avec succès.",
            user:    crmUserActifRes[0].users,
            crm:     crmUserMiseAJour,
          };
        }
      }

      console.log("3.8.11 ../../ dbSupabase crmUserInscrit USER EXIST => crmUser ACTIF NO => crmUserInsert");
      const crmDataForExistingUser: TypeCrmUsers = {
        plan: "Free",
        plan_details: {},
        date_debut_abonnement: new Date().toISOString().slice(0,10),
        status_abonnement:      "actif",
        status_paiement:        "non payé",
        mot_de_passe:           crmMotdePasse,
        identification:         user.email === "golliard73@gmail.com"
                                  ? "jerome1872Troistorrents"
                                  : "user2025Nethelvetic",
        userId: existingUser[0].id,
      };
      const crmUserInsertRes = await crmUserInsert(crmDataForExistingUser);

      if (crmUserInsertRes.success) {
        console.log("3.8.12 ../../../ dbSupabase crmUserInscrit USER EXIST => crmUser ACTIF NO => crmUserInsert SUCCES");
        return {
          success: true,
          message: "Client inscrit",
          user:    existingUser,
          crm:     crmUserInsertRes.crm
        };
      } else {
        console.log("3.8.11 ../../ dbSupabase crmUserInscrit USER EXIST => crmUser ACTIF NO => crmUserInsert NO SUCCES");
        return {
          success: false,
          message: "Client non inscrit",
          user:    existingUser,
          crm:     null
        };
      }

    } else {
      console.log("3.8.8 ../ dbSupabase crmUserInscrit => USER NO EXIST");
      const defaultDate = new Date().toISOString().slice(0,10);
      const userToInsert = {
        ...user,
        date_creation:     user.date_creation.trim() === "" ? defaultDate : user.date_creation,
        date_de_naissance: user.date_de_naissance?.trim() === ""  ? null : user.date_de_naissance,
        telephone:         user.telephone?.trim() === ""          ? null : user.telephone,
        username:          user.username?.trim() === ""           ? null : user.username,
        imgUrl:            user.imgUrl?.trim() === ""             ? "/singeCalculateur.webp" : user.imgUrl,
      };

      console.log("3.8.9 ../.?/ dbSupabase crmUserInscrit => USER NO EXIST => userInsert :", userToInsert);
      const userInserted = await db
        .insert(usersTable)
        .values(userToInsert)
        .returning();
      console.log("3.8.9 ../.?/ dbSupabase crmUserInscrit => USER NO EXIST => userInsert OK");

      if (userInserted) {
        console.log("3.8.10 ../../.?/ dbSupabase crmUserInscrit => USER NO EXIST => userInsert OK => crmUserInsert");
        const crmData: TypeCrmUsers = {
          plan: "Free",
          plan_details:     {},
          date_debut_abonnement: new Date().toISOString().slice(0,10),
          status_abonnement:      "actif",
          status_paiement:        "non payé",
          mot_de_passe:           crmMotdePasse,
          identification:         user.email === "golliard73@gmail.com"
                                    ? "jerome1872Troistorrents"
                                    : "user2025Nethelvetic",
          userId: userInserted[0].id,
        };
        const crmUserInsertRes2 = await crmUserInsert(crmData);
        if (crmUserInsertRes2.success) {
          console.log("3.8.12 ../../../ dbSupabase crmUserInscrit => USER NO EXIST => crmUserInsert OK");
          return {
            success: true,
            message: "Utilisateur ajouté avec succès !",
            user:    userInserted[0],
            crm:     crmUserInsertRes2.crm,
          };
        } else {
          console.log("3.8.13 ../../../ dbSupabase crmUserInscrit => USER NO EXIST => crmUserInsert NO OK");
          return {
            success: false,
            message: "Utilisateur non inscrit !",
            user:    userInserted[0],
            crm:     crmUserInsertRes2.crm,
          };
        }
      } else {
        console.log("3.8.14 ../../ dbSupabase crmUserInscrit USER NO EXIST => userInsert NO OK");
        return {
          success: false,
          message: "erreur d'inscription !",
          user:    null,
          crm:     null
        };
      }
    }
  } catch (error) {
    console.error("3.8.14 dbSupabase crmUserInscrit erreur", error);
    return {
      success: false,
      message: "Une erreur est survenue lors de l'ajout de l'utilisateur.",
    };
  }
}

//---------------------------------------------------------------------
// 5.0 Fonction crmUser Insert ----------------------------------------
//---------------------------------------------------------------------
export async function crmUserInsert(crm: TypeCrmUsers) {
  console.log("5.0.1 dbSupabase crmUserInsert - Début, données:", crm);
  try {
    const crmUsersTableInsertResult = await db
      .insert(crmUsersTable)
      .values(crm)
      .returning();
    return {
      success: true,
      message: "crm record inserted successfully",
      user:    null,
      crm:     crmUsersTableInsertResult
    };
  } catch (error) {
    console.error("5.0.3 dbSupabase insertcrm - No succès", error);
    return {
      success: false,
      message: "Error inserting crm record",
      user:    null,
      crm:     null
    };
  }
}

//---------------------------------------------------------------------
// 5.4 Fonction crmUserUpdate -----------------------------------------
//---------------------------------------------------------------------
export async function crmUserUpdate(id: number, crm: TypeCrmUsers) {
  console.log("5.4.1 dbSupabase crmUserUpdate - Début, id:", id);
  try {
    await db
      .update(crmUsersTable)
      .set(crm)
      .where(eq(crmUsersTable.id, id));
    console.log("5.4.2 dbSupabase crmUserUpdate - crm record mis à jour avec succès");
    return {
      success: true,
      message: "crm record updated successfully"
    };
  } catch (error) {
    console.error("5.4.3 dbSupabase crmUserUpdate - Erreur lors de la mise à jour :", error);
    return {
      success: false,
      message: "Error updating crm record"
    };
  }
}
