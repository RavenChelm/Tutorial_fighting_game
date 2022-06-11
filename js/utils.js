function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        (rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
            rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
            rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
            rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height &&
            (rectangle1.lastKey == 'd' || rectangle1.lastKey == 'ArrowRight')) ||
        (rectangle1.attackBox.position.x1 + rectangle1.attackBox.width >= rectangle2.position.x &&
            rectangle1.attackBox.position.x1 <= rectangle2.position.x + rectangle2.width &&
            rectangle1.attackBox.position.y1 + rectangle1.attackBox.height >= rectangle2.position.y &&
            rectangle1.attackBox.position.y1 <= rectangle2.position.y + rectangle2.height &&
            (rectangle1.lastKey == 'a' || rectangle1.lastKey == 'ArrowLeft'))
    )
}


function determineWinner({ player, enemy, timerId }) {
    SwitchMusic('AfterFight')
    clearTimeout(timerId)
    document.querySelector('#displayText').style.display = 'flex'
    if (player.health === enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Tie'
    } else if (player.health > enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Player 1 Wins'
    } else if (player.health < enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Player 2 Wins'
    }
}

let timer = 61
let timerId

function decreaseTimer() {
    if (timer > 0) {
        timerId = setTimeout(decreaseTimer, 1000)
        timer--
        document.querySelector('#timer').innerHTML = timer
    }

    if (timer === 0) {
        determineWinner({ player, enemy, timerId })
    }
}

function SwitchMusic(music) {
    switch (music) {
        case 'AfterFight':
            fight.pause()
            AfterFight.play()
            break
        case 'Fight':
            menu.pause()
            fight.play()
            break
        case 'Menu':
            menu.play()
            break
    }
}
