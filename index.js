const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

context.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.7
const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/background.png'
})
const shop = new Sprite({
    position: {
        x: 625,
        y: 128
    },
    imageSrc: './img/shop.png',
    scale: 2.75,
    frameMax: 6
})
const player = new Fighter({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0
    },
    imageSrc: './img/player/Sprites/Idle_right.png',
    scale: 2.5,
    frameMax: 8,
    offset: {
        x: 215,
        y: 157
    },
    sprites: {
        idle_right: {
            imageSrc: './img/player/Sprites/Idle_right.png',
            frameMax: 8,
        },
        idle_left: {
            imageSrc: './img/player/Sprites/Idle_left.png',
            frameMax: 8,
        },
        run_right: {
            imageSrc: './img/player/Sprites/Run_right.png',
            frameMax: 8,
        },
        run_left: {
            imageSrc: './img/player/Sprites/Run_left.png',
            frameMax: 8,
        },
        jump_right: {
            imageSrc: './img/player/Sprites/Jump_right.png',
            frameMax: 2,
        },
        jump_left: {
            imageSrc: './img/player/Sprites/Jump_left.png',
            frameMax: 2,
        },
        fall_right: {
            imageSrc: './img/player/Sprites/Fall_right.png',
            frameMax: 2,
        },
        fall_left: {
            imageSrc: './img/player/Sprites/Fall_left.png',
            frameMax: 2,
        },
        attack_right: {
            imageSrc: './img/player/Sprites/attack_right.png',
            frameMax: 6,
        },
        attack_left: {
            imageSrc: './img/player/Sprites/attack_left.png',
            frameMax: 6,
        },
        takeHit_right: {
            imageSrc: './img/player/Sprites/Take_Hit_right.png',
            frameMax: 4
        },
        takeHit_left: {
            imageSrc: './img/player/Sprites/Take_Hit_left.png',
            frameMax: 4
        },
        death_right: {
            imageSrc: './img/player/Sprites/Death_right.png',
            frameMax: 6
        },
        death_left: {
            imageSrc: './img/player/Sprites/Death_left.png',
            frameMax: 6
        }

    },
    attackBox: {
        offset: {
            x: 100,
            y: 50
        },
        width: 160,
        height: 50
    }
})
const enemy = new Fighter({
    position: {
        x: 940,
        y: 200
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'blue',
    offset: {
        x: -50,
        y: 0
    },
    imageSrc: './img/enemy/Sprites/Idle_left.png',
    scale: 2.5,
    frameMax: 4,
    offset: {
        x: 215,
        y: 157
    },
    sprites: {
        idle_right: {
            imageSrc: './img/enemy/Sprites/Idle_right.png',
            frameMax: 4,
        },
        idle_left: {
            imageSrc: './img/enemy/Sprites/Idle_left.png',
            frameMax: 4,
        },
        run_right: {
            imageSrc: './img/enemy/Sprites/Run_right.png',
            frameMax: 8,
        },
        run_left: {
            imageSrc: './img/enemy/Sprites/Run_left.png',
            frameMax: 8,
        },
        jump_right: {
            imageSrc: './img/enemy/Sprites/Jump_right.png',
            frameMax: 2,
        },
        jump_left: {
            imageSrc: './img/enemy/Sprites/Jump_left.png',
            frameMax: 2,
        },
        fall_right: {
            imageSrc: './img/enemy/Sprites/Fall_right.png',
            frameMax: 2,
        },
        fall_left: {
            imageSrc: './img/enemy/Sprites/Fall_left.png',
            frameMax: 2,
        },
        attack_right: {
            imageSrc: './img/enemy/Sprites/attack_right.png',
            frameMax: 4,
        },
        attack_left: {
            imageSrc: './img/enemy/Sprites/attack_left.png',
            frameMax: 4,
        },
        takeHit_right: {
            imageSrc: './img/enemy/Sprites/Take_Hit_right.png',
            frameMax: 3
        },
        takeHit_left: {
            imageSrc: './img/enemy/Sprites/Take_Hit_left.png',
            frameMax: 3
        },
        death_right: {
            imageSrc: './img/enemy/Sprites/Death_right.png',
            frameMax: 7
        },
        death_left: {
            imageSrc: './img/enemy/Sprites/Death_left.png',
            frameMax: 7
        }
    },
    attackBox: {
        offset: {
            x: 100,
            y: 50
        },
        width: 150,
        height: 50
    }
})
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}

function animate() {
    window.requestAnimationFrame(animate)
    context.fillStyle = 'black'
    context.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    shop.update()
    context.fillStyle = 'rgba(255, 255, 255, 0.1)'
    context.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()


    //player movement
    player.velocity.x = 0
    if (keys.a.pressed && player.lastKey === 'a') {
        if (player.position.x <= 0) {
            player.velocity.x = 0
            player.switchSprite('run_left')
        } else {
            player.velocity.x = -5
            player.switchSprite('run_left')
        }
    } else if (keys.d.pressed && player.lastKey === 'd') {
        if (player.position.x >= 955) {
            player.velocity.x = 0
            player.switchSprite('run_right')
        } else {
            player.velocity.x = 5
            player.switchSprite('run_right')
        }
    } else if (player.lastKey === 'd') {
        player.switchSprite('idle_right')
    } else {
        player.switchSprite('idle_left')
    }
    if (player.velocity.y < 0 && (player.velocity.x > 0 || player.lastKey === 'd')) {
        player.switchSprite('jump_right')
    } else if (player.velocity.y < 0 && (player.velocity.x < 0 || player.lastKey === 'a')) {
        player.switchSprite('jump_left')
    } else if (player.velocity.y > 0 && (player.velocity.x > 0 || player.lastKey === 'd')) {
        player.switchSprite('fall_right')
    } else if (player.velocity.y > 0 && (player.velocity.x < 0 || player.lastKey === 'a')) {
        player.switchSprite('fall_left')
    }

    //enemy movement
    enemy.velocity.x = 0
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        if (enemy.position.x <= 0) {
            enemy.velocity.x = 0
            enemy.switchSprite('run_left')
        } else {
            enemy.velocity.x = -5
            enemy.switchSprite('run_left')
        }
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        if (enemy.position.x >= 955) {
            enemy.velocity.x = 0
            enemy.switchSprite('run_right')
        } else {
            enemy.velocity.x = 5
            enemy.switchSprite('run_right')
        }
    } else if (enemy.lastKey === 'ArrowRight') {
        enemy.switchSprite('idle_right')
    } else {
        enemy.switchSprite('idle_left')
    }
    if (enemy.velocity.y < 0 && (enemy.velocity.x > 0 || enemy.lastKey === 'ArrowRight')) {
        enemy.switchSprite('jump_right')
    } else if (enemy.velocity.y < 0 && (enemy.velocity.x < 0 || enemy.lastKey === 'ArrowLeft')) {
        enemy.switchSprite('jump_left')
    } else if (enemy.velocity.y > 0 && (enemy.velocity.x > 0 || enemy.lastKey === 'ArrowRight')) {
        enemy.switchSprite('fall_right')
    } else if (enemy.velocity.y > 0 && (enemy.velocity.x < 0 || enemy.lastKey === 'ArrowLeft')) {
        enemy.switchSprite('fall_left')
    }

    //detect Collision  
    if (rectangularCollision({
            rectangle1: player,
            rectangle2: enemy
        }) && player.isAttacking && player.frameCurrent === 4) {
        enemy.takeHit()
        player.isAttacking = false
        gsap.to('#enemyHealth', {
            width: enemy.health + '%'
        })
    }

    if (player.isAttacking && player.frameCurrent === 4) {
        player.isAttacking = false
    }

    if (rectangularCollision({
            rectangle1: enemy,
            rectangle2: player
        }) && enemy.isAttacking && enemy.frameCurrent === 2) {
        enemy.isAttacking = false
        player.takeHit()
        gsap.to('#playerHealth', {
            width: player.health + '%'
        })
    }
    if (enemy.isAttacking && enemy.frameCurrent === 2) {
        enemy.isAttacking = false
    }
    //end gane based on health
    if (enemy.health <= 0 || player.health <= 0) determineWinner({ player, enemy, timerId })
}

animate()
decreaseTimer()
window.addEventListener('keydown', (event) => {
    if (!player.dead) {
        switch (event.key) {
            case 'd':
                keys.d.pressed = true
                player.lastKey = 'd'
                break
            case 'a':
                keys.a.pressed = true
                player.lastKey = 'a'
                break
            case 'w':
                if (player.position.y < 330) {
                    player.velocity.y += 0
                } else { player.velocity.y = -20 }
                break
            case 's':
                player.attack()
                break
        }

    }
    if (!enemy.dead) {
        switch (event.key) {
            case 'ArrowRight':
                keys.ArrowRight.pressed = true
                enemy.lastKey = 'ArrowRight'
                break
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true
                enemy.lastKey = 'ArrowLeft'
                break
            case 'ArrowUp':
                if (enemy.position.y < 330) {
                    enemy.velocity.y += 0
                } else { enemy.velocity.y = -20 }
                break
            case 'ArrowDown':
                enemy.attack()
                break;
        }
    }
})
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 'w':
            //player.velocity.y = -10
            break

        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowUp':
            //
            break
    }
})