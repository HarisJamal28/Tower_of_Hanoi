var FirstScreen = document.getElementById('FirstScreen')
var SecondScreen = document.getElementById('SecondScreen')
var ThirdScreen = document.getElementById('ThirdScreen')
var FourthScreen = document.getElementById('FourthScreen')
var audio = document.getElementById("audio");
var audio1 = document.getElementById("audio1");
var auioWin = document.getElementById("audioWin"); 
var Moves = document.getElementById("Moves"); 
var MoveCount = 0;
var MoveTally = document.getElementById('MoveTally');
Moves.innerText = `Moves: ${MoveCount}`
let selectedDisk = null;
var Message = document.getElementById('message');
let rods = {
    rod1: [3, 2, 1],
    rod2: [],
    rod3: []
};
var PickingStage = true;
var timerInterval;
var Time = document.getElementById('Time');
var seconds = 0;

function Show1(){
    FirstScreen.style.display = 'none'
    SecondScreen.style.display = 'flex'
    audio.play();
}
function Show2(){
    SecondScreen.style.display = 'none'
    ThirdScreen.style.display = 'flex'
    audio1.play();
    startTimer();
}
// startTimer();


function startTimer() {
    timerInterval = setInterval(() => {
        seconds++;
        const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        document.getElementById('Timer').textContent = `${hours}:${minutes}:${secs}`;
    }, 1000);
}

function SelectDisk(Disk){
    if(PickingStage){
    const rodKey = `rod${Disk}`;
    if(rods[rodKey].length === 0){
        // alert("EMPTY ROD")
        Message.innerText = 'This Rod is Empty!'
    }else{
        // selectedDisk = rods[rodKey][rods[rodKey].length - 1]//rod1[rod1.length-1]
        selectedDisk = rods[rodKey].pop();
        let x,y;
        if(selectedDisk == 1){
            x = document.getElementById('Small');
            y = 'Small Disk'
        }else if(selectedDisk == 2){
            x = document.getElementById('Medium');
            y = 'Medium Disk'
        }else if(selectedDisk == 3){
            x = document.getElementById('Large');
            y = 'Large Disk'
        }
        // alert(selectedDisk)
        Message.innerText = `You have Selected the ${y} from Rod${Disk}`
        if(x){
            x.style.opacity = '0.5';
        }
        PickingStage = false;
    }
    }else{
        // alert("Move The selected DISK");
        Message.innerText = 'Now, Move the Selected Disk!'
    }
}

function MoveDisk(Rod){
    if(!PickingStage && selectedDisk !== null){
        const rodKey = `rod${Rod}`; //rod1, rod2, rod3
        const topDisk = rods[rodKey][rods[rodKey].length-1]; ///rods[rod1[rod1.length-1]]
        if(topDisk === undefined || selectedDisk < topDisk){
            rods[rodKey].push(selectedDisk);

            let x,y;
            if (selectedDisk === 1) {
                x = document.getElementById('Small');
                y = 'Small Disk'
            } else if (selectedDisk === 2) {
                x = document.getElementById('Medium');
                y = 'Medium Disk'
            } else if (selectedDisk === 3) {
                x = document.getElementById('Large');
                y = 'Large Disk'
            }
            // alert(selectedDisk + ' is pushed onto ' + rodKey);
            Message.innerText = `You pushed the ${y} onto Rod${Rod}`
            MoveCount++;
            Moves.innerText = `Moves: ${MoveCount}`
            if (x) {
                const newRod = document.getElementById(Rod);
                newRod.insertBefore(x, newRod.firstChild);
                x.style.opacity = '1';
            }
            console.log(rods)
            selectedDisk = null;
            PickingStage = true;
            Win();
        } else{
            // alert("CANT PUT BIG ON SMALL")
            Message.innerText = 'You cannot place Larger Disks on Smaller Disks!'
        }
    }else{
        // alert("SELECT A DISK FIRST")
        Message.innerText = 'Select a Disk First!'
    }
}

function Win() {
    if (rods.rod3.length === 3 && 
        rods.rod3[0] === 3 && 
        rods.rod3[1] === 2 && 
        rods.rod3[2] === 1) {
        Message.innerText = '';
        Message.style.transition = '2s ease';
        Message.style.visibility = 'hidden';
        Message.style.opacity = '0';
        audioWin.play();
        clearInterval(timerInterval);
            Time.innerText = document.getElementById('Timer').textContent;
            MoveTally.innerText = MoveCount;
        setTimeout(() => {
            ThirdScreen.style.display = 'none';
            FourthScreen.style.display = 'flex';
            audio.play();
        }, 1500);
    }
}

function reloadGame() {
    location.reload();
}