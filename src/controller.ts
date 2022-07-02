export class Controller {
    upKey: boolean = false;
    downKey: boolean = false;
    leftKey: boolean = false;
    rightKey: boolean = false;
    
    constructor() {
        window.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowUp':
                    this.upKey = true;
                    break;
                case 'ArrowDown':
                    this.downKey = true;
                    break;
                case 'ArrowLeft':
                    this.leftKey = true;
                    break;
                case 'ArrowRight':
                    this.rightKey = true;
                    break;
            }
        }
        );
        window.addEventListener('keyup', (e) => {
            switch (e.key) {
                case 'ArrowUp':
                    this.upKey = false;
                    break;
                case 'ArrowDown':
                    this.downKey = false;
                    break;
                case 'ArrowLeft':
                    this.leftKey = false;
                    break;
                case 'ArrowRight':
                    this.rightKey = false;
                    break;
            }
        }
        );
    }



}