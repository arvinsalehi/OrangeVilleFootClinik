import {get_data} from './utilities/api.js'

document.addEventListener("DOMContentLoaded", async () => {
    const templates = await get_data("http://127.0.0.1:5001/emailService/get_email_templates");
    
    unlayer.init({
        id: 'editor',
        displayMode: 'email',
        projectId: 1234 // REPLACE
    })

    console.log(templates);
    const design = templates['construct'];

    unlayer.loadDesign(design);
})