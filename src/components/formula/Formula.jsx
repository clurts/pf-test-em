import { Form, useActionData, useNavigation, useSubmit } from "react-router";
import { useState, useEffect, useRef } from "react";
import "./_Formula.scss";

export default function Formula() {
    const errors = useActionData();
    const navigation = useNavigation();
    const submit = useSubmit();
    const [submitMessage, setSubmitMessage] = useState("");
    const [emailSent, setEmailSent] = useState(false);
    const emailJsInitialized = useRef(false);
    const isSubmitting = navigation.state === "submitting";
    
    // Rate limiting - kun aktiv efter succesfuld email
    const rateLimiter = useRef({
        lastSubmission: 0,
        cooldownPeriod: 60000,
        isRateLimited: function() {
            if (this.lastSubmission === 0) return { limited: false }; // Ingen tidligere sending
            
            const now = Date.now();
            const timeSinceLastSubmission = now - this.lastSubmission;
            
            if (timeSinceLastSubmission < this.cooldownPeriod) {
                return {
                    limited: true,
                    remainingTime: Math.ceil((this.cooldownPeriod - timeSinceLastSubmission) / 1000)
                };
            }
            
            return { limited: false };
        }
    });

    // Initialize EmailJS
    useEffect(() => {
        if (!emailJsInitialized.current) {
            const emailJsScript = document.createElement('script');
            emailJsScript.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
            
            emailJsScript.onload = () => {
                window.emailjs.init("Y4XhddjIFhPfQnfXA");
                emailJsInitialized.current = true;
                console.log("EmailJS initialized");
            };
            
            document.head.appendChild(emailJsScript);
        }
    }, []);

    // Send email når validering er succesfuld
    useEffect(() => {
        // Kun send email hvis: ingen fejl, ikke i gang med submit, og ikke allerede sendt
        if (!errors && !isSubmitting && navigation.state === "idle" && !emailSent && emailJsInitialized.current) {
            sendEmail();
        }
    }, [errors, isSubmitting, navigation.state, emailSent]);

    const sendEmail = async () => {
        setSubmitMessage("Sending...");
        
        const form = document.querySelector('.formula');
        const formData = new FormData(form);
        
        const templateParams = {
            from_name: formData.get('name'),
            reply_to: formData.get('email'),
            message: formData.get('message')
        };
        
        try {
            const response = await window.emailjs.send('service_r94fdda', 'template_2c8nsm4', templateParams);
            console.log("EmailJS success response:", response);
            
            // Email sendt succesfuldt
            setSubmitMessage("Message sent successfully!");
            setEmailSent(true);
            rateLimiter.current.lastSubmission = Date.now(); // Start timer
            form.reset();
        } catch (error) {
            console.error('EmailJS error:', error);
            setSubmitMessage("Failed to send message. Please try again.");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        
        // Tjek honeypot
        const honeypot = formData.get('website');
        if (honeypot && honeypot.trim() !== '') {
            console.log("Bot detected");
            setSubmitMessage("Message sent successfully!");
            return;
        }
        
        // Tjek rate limiting (kun hvis der er sendt email før)
        const rateLimitStatus = rateLimiter.current.isRateLimited();
        if (rateLimitStatus.limited) {
            setSubmitMessage(`Please wait ${rateLimitStatus.remainingTime} seconds before sending another message.`);
            return;
        }
        
        // Reset states
        setSubmitMessage("");
        setEmailSent(false);
        
        // Submit til React Router validering
        submit(formData, { method: "post" });
    };

    // Få første fejl (kun hvis email ikke er sendt)
    const getFirstError = () => {
        if (!errors || emailSent) return null;
        
        if (errors.name?.errors?.[0]) return errors.name.errors[0];
        if (errors.email?.errors?.[0]) return errors.email.errors[0];
        if (errors.message?.errors?.[0]) return errors.message.errors[0];
        
        return null;
    };

    const firstError = getFirstError();

    return (
        <Form method="post" className="formula" onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input 
                type="text" 
                name="name" 
                id="name"
                placeholder="Name" 
            />
            
            <label htmlFor="email">Email</label>
            <input 
                type="email" 
                name="email" 
                id="email"
                placeholder="Email" 
            />
            
            <label htmlFor="message">Message</label>
            <textarea 
                name="message" 
                id="message" 
                placeholder="Message"
            ></textarea>
            
            {/* Vis kun første fejl (og kun hvis email ikke er sendt) */}
            {firstError && (
                <p className="errorMessage" style={{color: 'red'}}>
                    {firstError}
                </p>
            )}
            
            {/* Submit besked */}
            {submitMessage && (
                <p className="submitMessage" style={{
                    color: submitMessage.includes('successfully') ? 'green' : 
                           submitMessage.includes('wait') || submitMessage.includes('Failed') ? 'red' : 'black'
                }}>
                    {submitMessage}
                </p>
            )}
            
            {/* Honeypot */}
            <div className="hp-field" aria-hidden="true" style={{display: 'none'}}>
                <label htmlFor="website">Website (Don't fill out)</label>
                <input 
                    type="text" 
                    name="website" 
                    id="website" 
                    tabIndex="-1" 
                    autoComplete="off" 
                />
            </div>
            
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Validating...' : 'Send!'}
            </button>
        </Form>
    );
}