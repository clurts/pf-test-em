export default function email() {
    const emailJsScript = document.createElement('script');
    emailJsScript.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    document.head.appendChild(emailJsScript);
    
    // Rate limiting værktøj
    const rateLimiter = {
        lastSubmission: 0,
        cooldownPeriod: 60000,
        isRateLimited: function() {
            const now = Date.now();
            const timeSinceLastSubmission = now - this.lastSubmission;
            
            if (timeSinceLastSubmission < this.cooldownPeriod) {
                return {
                    limited: true,
                    remainingTime: Math.ceil((this.cooldownPeriod - timeSinceLastSubmission) / 1000)
                };
            }
            
            this.lastSubmission = now;
            return { limited: false };
        }
    };
    
    // Initialiser EmailJS når scriptet er indlæst
    emailJsScript.onload = () => {
        emailjs.init("Y4XhddjIFhPfQnfXA");
        
        // Tilføj EmailJS-funktionalitet når scriptet er indlæst
        setupEmailJSSubmit();
    };
    
    function setupEmailJSSubmit() {
        const form = document.querySelector(".formula");
        const errorMessage = document.getElementById('errorMessage');
        const submitButton = document.getElementById('submitBtn');
        const honeypotField = document.getElementById('website');
        
        if (!form) {
            console.error("Form element not found");
            return;
        }
        
        console.log("EmailJS setup initialized");
        
        // Problem: validator.js stopper event propagation med preventDefault() og returnerer false
        // Løsning: Tilføj en direkte click handler på submitButton i stedet for form submit event

        submitButton.addEventListener('click', function(clickEvent) {
            // Lad os ikke forhindre standard form submit handling endnu,
            // så validator.js får lov til at køre først
            
            console.log("Submit button clicked");
            
            // Vent kort tid for at give validator.js mulighed for at køre
            setTimeout(function() {
                // Nu tjekker vi om validator.js har fundet fejl
                const currentErrorText = errorMessage.textContent;
                
                // Debug information
                console.log("Current error state:", currentErrorText);
                
                // Tjek honeypot
                if (honeypotField && honeypotField.value !== '') {
                    console.log("Bot detected through honeypot field");
                    errorMessage.textContent = "Message sent successfully!"; // Falsk positiv besked
                    return;
                }
                
                // Hvis der er en fejlbesked fra validator (ikke tom og ikke success eller sending)
                if (currentErrorText && 
                    currentErrorText !== "Sending..." && 
                    !currentErrorText.includes("successfully") &&
                    !currentErrorText.includes("wait")) {
                    console.log("Validation error detected, stopping EmailJS send");
                    return; // Stop her - der er en valideringsfejl
                }
                
                // Hvis vi når hertil, er validering OK
                console.log("Validation passed, proceeding with EmailJS");
                
                // Tjek rate limiting
                const rateLimitStatus = rateLimiter.isRateLimited();
                if (rateLimitStatus.limited) {
                    errorMessage.textContent = `Please wait ${rateLimitStatus.remainingTime} seconds before sending another message.`;
                    errorMessage.style.color = "red";
                    return;
                }
                
                // Alle check er passeret - send email
                submitButton.disabled = true;
                errorMessage.textContent = "Sending...";
                errorMessage.style.color = "black";
                
                const templateParams = {
                    from_name: document.getElementById('name').value,
                    reply_to: document.getElementById('mail').value,
                    message: document.getElementById('text').value.trim()
                };
                
                console.log("Sending email with params:", templateParams);
                
                emailjs.send('service_r94fdda', 'template_2c8nsm4', templateParams)
                    .then((response) => {
                        console.log("EmailJS success response:", response);
                        errorMessage.textContent = "Message sent successfully!";
                        errorMessage.style.color = "green";
                        form.reset();
                        submitButton.disabled = false;
                    }, (error) => {
                        console.error('EmailJS error:', error);
                        errorMessage.textContent = "Failed to send message. Please try again.";
                        errorMessage.style.color = "red";
                        submitButton.disabled = false;
                    });
            }, 100); // Kort ventetid for at give validator.js mulighed for at køre først
        });
        
        // Forhindrer standard form submit efter validering for at undgå side-reload
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            return false;
        });
    }
    }
