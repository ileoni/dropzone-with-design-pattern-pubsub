import { dropzone } from "./src/modules/dropzone.js";
import { draggable } from "./src/modules/draggble.js";
import { preview } from "./src/modules/preview.js";

window.addEventListener('DOMContentLoaded', () => {
    const app = document.querySelector('.app')
    
    dropzone.render(app);
    draggable.render(app);
    preview.render(app);
})