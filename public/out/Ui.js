export class ui {
    constructor(keyboard) {
        // this class will handle ui althout it is just overlayed html elements
        // mabey i will make a new ui from sractch idk
        // this class will be used to make a ui for the canvas and the game
        this.showUi = false;
        this.keyboard = keyboard;
        // create the ui element
        var ui = document.createElement("div");
        ui.id = "ui";
        ui.innerHTML = `
        <h5>Ui Overlay</h5>
        <div id="debug">
            <button>Redraw ↻</button> <br>
            <button>Redraw ↻ (no clear screen)</button><br>
            <button id="drawbox">
            Draw Box pos: <input type="text" id="drawbox-pos">
            whv: <input type="text" id="drawbox-whv">
            color: <input type="text" id="drawbox-color">
            </button><br>
            <input type="text" placeholder="execute commands here (js)"><br>
            <button id="execute">execute</button>
        </div>
        `;
        document.body.appendChild(ui);
        this.keyboard.bind("u", {
            onPress: () => {
                this.showUi = !this.showUi;
                if (this.showUi)
                    this.show();
                else
                    this.hide();
            }
        });
    }
    hide() {
        // hide the ui
        const ui = document.getElementById("ui");
        if (ui) {
            ui.style.display = "none";
        }
    }
    show() {
        // show the ui
        const ui = document.getElementById("ui");
        if (ui) {
            ui.style.display = "block";
        }
    }
}
