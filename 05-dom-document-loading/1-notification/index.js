export default class NotificationMessage {
    static activeNotification;
    constructor(message = "Success", params = {}){
        this.message = message;
        this.duration = params.duration || 2000;
        this.type = params.type || "success";
        this.element = this.createElement(this.createTemplate());
    }
    timerId;
    createElement(template){
        const element = document.createElement("div")
        element.innerHTML = template;
    return element.firstElementChild;
    }
    createTemplate(){
        return`
        <div class="notification ${this.type}" style="--value:${this.duration / 1000}s">
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header"> ${this.type}</div>
          <div class="notification-body">
           ${this.message}
          </div>
        </div>
      </div>
        `;
    }
    show(container = document.body){
        if(NotificationMessage.activeNotification){
            NotificationMessage.activeNotification.destroy();
        }
        NotificationMessage.activeNotification = this;
        container.append(this.element);
        this.timerId = setTimeout(() => this.destroy(), this.duration);
    }
    remove(){
        this.element.remove();
    }
    destroy(){
        clearTimeout(this.timerId);
        this.remove();
    }
    }