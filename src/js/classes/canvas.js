export default class Canvas {
    constructor( container ) {
        this.element = document.createElement( "canvas" );
        this.context = this.element.getContext( "2d" );

        this.element.width = 896;
        this.element.height = 768;
        this.ground = new Image();
        this.ground.src = "images/content/background.png"

        container.appendChild(this.element);
    }

    draw(){
      this.context.drawImage(this.ground, 0, 0)
    }
}
