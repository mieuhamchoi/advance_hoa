
class Play {
    play: string;
    point:number;
    id: number;
  
    constructor(play: string, point:number=0, id: number = Date.now() * Math.random()) {
        this.play = play;
        this.point=point;
        this.id = id;
       
    }
}
class PlayManager {
    listPlay: Play[] = [];
 
    constructor() {
        let listPlayLocal = JSON.parse((localStorage.getItem("plays")) ?? "[]")
        let template = [];
        for (let i in listPlayLocal) {
            template.push(new Play(listPlayLocal[i].play, listPlayLocal[i].point,listPlayLocal[i].id))
        }
        this.listPlay = template;
        this.getTotalPlayers();
        this.getTotalPoints()
        this.renderPlay()
    }
    createPlay(newPlay:Play){
        this.listPlay.push(newPlay);
        this.savePlayersToLocalStorage()
        this.getTotalPlayers();
        //this.checkCrown();
        this.renderPlay()

    }
    // checkCrown() {
    //     const highestScore = Math.max(...this.listPlay.map(play => play.point));
    //     this.listPlay.forEach(play => {
    //         play.hasCrown = play.point === highestScore;
    //         this.renderPlay()
    //     });
    // }
    getTotalPoints(){
        (document.getElementById('points') as HTMLElement).innerHTML=`Total points : ${this.listPlay.reduce((total, play) => total + play.point, 0)}`;
this.renderPlay()
    }

    getTotalPlayers() {
        (document.getElementById('players') as HTMLElement).innerHTML=`Players : ${this.listPlay.length}`;
        this.renderPlay()
    }
    renderPlay(): void {
        let renderEl = document.getElementById("table") as HTMLElement;
        let playString = ``;
        console.log("lishgk", this.listPlay);

        this.listPlay.map((item, index) => {
            playString += `
           <tr>
            <th scope="row">
                <button class="delete" onclick="handleDeletePlay(${item.id})">x</button>
                <i class="fa-solid fa-crown">
            </th>
            <td class="name">${item.play}</td>
            <td class="button">
            <button class="increase" onclick="increasePoints(${item.id})">+</button>
            <p>${item.point}</p>
            <button class="decrease" onclick="decreasePoints(${item.id})">-</button>
            </td>
            </tr>
            `
        })
        renderEl.innerHTML = playString
     
        
    }
    deletePlayById(id: number) {
        this.listPlay=this.listPlay.filter(play => play.id !== id)
        this.savePlayersToLocalStorage()
        this.renderPlay();
    }
    savePlayersToLocalStorage() {
        localStorage.setItem("plays", JSON.stringify(this.listPlay));
    }
  
}
const listPlay = new PlayManager()
function addNewPlay() {
    let playValue = (document.getElementById("input") as HTMLInputElement).value;
    if (playValue.trim() === "") { return }
    let newPlay = new Play(playValue);
    listPlay.createPlay(newPlay);
    (document.getElementById("play") as HTMLInputElement).value = "";
}
function handleDeletePlay(id: number) {
    if (confirm("Bạn có muốn xóa không")) {
        listPlay.deletePlayById(id)
    }

}
function increasePoints(id: number) {
    const player = listPlay.listPlay.find(play => play.id === id);
    if (player) {
        player.point++
        listPlay.savePlayersToLocalStorage();
        listPlay.getTotalPlayers();
        listPlay.getTotalPoints();
        listPlay.renderPlay();
        
    }
}

function decreasePoints(id: number) {
    const player = listPlay.listPlay.find(play => play.id === id);
    if (player && player.point > 0) {
        player.point--;
        listPlay.savePlayersToLocalStorage();
        listPlay.getTotalPlayers();
        listPlay.getTotalPoints();
        listPlay.renderPlay();
    }
}

