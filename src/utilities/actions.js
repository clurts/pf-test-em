import { redirect } from "react-router";
import { z } from "zod/v4";

const contactSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Please enter a valid email address"), // Fjernet optional så email er påkrævet
    message: z.string().min(10, "Message must be at least 10 characters long"),
    website: z.string().optional(), // Honeypot felt - skal være tomt
});

export async function handleSubmit({ request }) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());
    console.log("Form Submitted", data);
    
    // Tjek honeypot først - hvis udfyldt, lad som om alt er OK
    if (data.website && data.website.trim() !== '') {
        console.log("Bot detected through honeypot, pretending success");
        // Redirect til success side eller return null for at "simulere" success
        return null; // Dette vil få komponenten til at tro valideringen var succesfuld
    }
    
    const result = contactSchema.safeParse(data);
    
    if (!result.success) {
        const errors = z.treeifyError(result.error);
        console.log("Validation errors:", errors.properties);
        return errors.properties;
    }
    
    // Validering succesfuld - returner null så komponenten ved det lykkedes
    // EmailJS håndtering sker i komponenten
    console.log("Validation successful");
    return null;
    
    // Hvis du vil redirecte efter succesfuld email-sending, 
    // skal det ske i komponenten efter EmailJS er færdig
    // redirect("/success") 
}