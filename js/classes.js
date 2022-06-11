class Sprite {
    constructor({ position, imageSrc, scale = 1, frameMax = 1, offset = { x: 0, y: 0 } }) {
        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.frameMax = frameMax
        this.frameCurrent = 0
        this.frameElapsed = 0
        this.frameHold = 5
        this.offset = offset
    }
    draw() {
        context.drawImage(
            this.image,
            this.frameCurrent * (this.image.width / this.frameMax),
            0,
            this.image.width / this.frameMax,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width / this.frameMax) * this.scale,
            (this.image.height * this.scale))
    }

    animateFrame() {
        this.frameElapsed++
            if (this.frameElapsed % this.frameHold === 0) {
                if (this.frameCurrent < this.frameMax - 1) {
                    this.frameCurrent++
                } else {
                    this.frameCurrent = 0
                }
            }
    }
    update() {
        this.draw()
        this.animateFrame()
    }
}
class Fighter extends Sprite {
    constructor({
        position,
        velocity,
        color = 'red',
        imageSrc,
        scale = 1,
        frameMax = 1,
        offset = { x: 0, y: 0 },
        sprites,
        sounds,
        attackBox = { offset: {}, width: undefined, height: undefined }
    }) {
        super({
            position,
            imageSrc,
            scale,
            frameMax,
            offset
        })
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
                x1: this.position.x,
                y1: this.position.y
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height
        }
        this.color = color
        this.isAttacking
        this.health = 100
        this.frameCurrent = 0
        this.frameElapsed = 0
        this.frameHold = 5
        this.dead = false
        this.onGround = false
        this.fallTime = false
        this.sprites = sprites
        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }
    }

    update() {
        this.draw()
        if (!this.dead) this.animateFrame()

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y
        this.attackBox.position.x1 = this.position.x - this.attackBox.offset.x - 80
        this.attackBox.position.y1 = this.position.y + this.attackBox.offset.y
            // context.fillRect(
            //     this.attackBox.position.x,
            //     this.attackBox.position.y,
            //     this.attackBox.width,
            //     this.attackBox.height)
            // context.fillRect(
            //     this.attackBox.position.x1,
            //     this.attackBox.position.y1,
            //     this.attackBox.width,
            //     this.attackBox.height)

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        //gravity function
        if (this.position.y + this.velocity.y + this.height >= canvas.height - 97) {
            this.velocity.y = 0
            this.position.y = 331
            this.onGround = true
        } else {
            this.velocity.y += gravity
            this.onGround = false
            this.fallTime = true
        }
        if (this.onGround) {
            if (this.fallTime) {
                this.fallTime = false
                sounds.fall.play()
            }
        }
        if (this.onGround && this.velocity.x != 0) { sounds.run.play() }


    }

    attack() {
        sounds.attack.play()
        if (this.lastKey === 'd' || this.lastKey === 'ArrowRight') {
            this.switchSprite('attack_right')
        }
        if (this.lastKey === 'a' || this.lastKey === 'ArrowLeft') {
            this.switchSprite('attack_left')
        }
        this.isAttacking = true

    }

    takeHit() {
        this.health -= 20
        sounds.hit.play()
        if (this.health <= 0 && (this.lastKey === 'd' || this.lastKey === "ArrowRight")) {
            this.switchSprite('death_right')
        } else if (this.health <= 0 && (this.lastKey === 'a' || this.lastKey === "ArrowLeft")) {
            this.switchSprite('death_left')
        } else if (this.lastKey === 'd' || this.lastKey === "ArrowRight") {
            this.switchSprite('takeHit_right')
        } else if (this.lastKey === 'a' || this.lastKey === "ArrowLeft") {
            this.switchSprite('takeHit_left')
        }
    }

    switchSprite(sprite) {
        if (this.image === this.sprites.death_right.image ||
            this.image === this.sprites.death_left.image) {
            if (this.frameCurrent === this.sprites.death_right.frameMax - 1)
                this.dead = true
            return
        }

        if ((this.image === this.sprites.attack_right.image ||
                this.image === this.sprites.attack_left.image) &&
            this.frameCurrent < this.sprites.attack_right.frameMax - 1) return

        if ((this.image == this.sprites.takeHit_right.image ||
                this.image == this.sprites.takeHit_left.image) &&
            this.frameCurrent < this.sprites.takeHit_right.frameMax - 1) return

        switch (sprite) {
            case 'idle_right':
                if (this.image !== this.sprites.idle_right.image) {
                    this.image = this.sprites.idle_right.image
                    this.frameMax = this.sprites.idle_right.frameMax
                    this.frameCurrent = 0
                }
                break;
            case 'idle_left':
                if (this.image !== this.sprites.idle_left.image) {
                    this.image = this.sprites.idle_left.image
                    this.frameMax = this.sprites.idle_left.frameMax
                    this.frameCurrent = 0
                }
                break;
            case 'run_right':
                if (this.image !== this.sprites.run_right.image) {
                    this.image = this.sprites.run_right.image
                    this.frameMax = this.sprites.run_right.frameMax
                    this.frameCurrent = 0
                }
                break;
            case 'run_left':
                if (this.image !== this.sprites.run_left.image) {
                    this.image = this.sprites.run_left.image
                    this.frameMax = this.sprites.run_left.frameMax
                    this.frameCurrent = 0
                }
                break;
            case 'jump_right':
                sounds.jump.play()
                if (this.image !== this.sprites.jump_right.image) {
                    this.image = this.sprites.jump_right.image
                    this.frameMax = this.sprites.jump_right.frameMax
                    this.frameCurrent = 0
                }
                break;
            case 'jump_left':
                sounds.jump.play()
                if (this.image !== this.sprites.jump_left.image) {
                    this.image = this.sprites.jump_left.image
                    this.frameMax = this.sprites.jump_left.frameMax
                    this.frameCurrent = 0
                }
                break;
            case 'fall_right':
                if (this.image !== this.sprites.fall_right.image) {
                    this.image = this.sprites.fall_right.image
                    this.frameMax = this.sprites.fall_right.frameMax
                    this.frameCurrent = 0
                }

                break;
            case 'fall_left':
                if (this.image !== this.sprites.fall_left.image) {
                    this.image = this.sprites.fall_left.image
                    this.frameMax = this.sprites.fall_left.frameMax
                    this.frameCurrent = 0
                }
                break;
            case 'attack_right':
                if (this.image !== this.sprites.attack_right.image) {
                    this.image = this.sprites.attack_right.image
                    this.frameMax = this.sprites.attack_right.frameMax
                    this.frameCurrent = 0
                }
                break;
            case 'attack_left':
                if (this.image !== this.sprites.attack_left.image) {
                    this.image = this.sprites.attack_left.image
                    this.frameMax = this.sprites.attack_left.frameMax
                    this.frameCurrent = 0
                }
                break;
            case 'takeHit_right':
                if (this.image !== this.sprites.takeHit_right.image) {
                    this.image = this.sprites.takeHit_right.image
                    this.frameMax = this.sprites.takeHit_right.frameMax
                    this.frameCurrent = 0
                }
                break;
            case 'takeHit_left':
                if (this.image !== this.sprites.takeHit_left.image) {
                    this.image = this.sprites.takeHit_left.image
                    this.frameMax = this.sprites.takeHit_left.frameMax
                    this.frameCurrent = 0
                }
                break;
            case 'death_right':
                if (this.image !== this.sprites.death_right.image) {
                    this.image = this.sprites.death_right.image
                    this.frameMax = this.sprites.death_right.frameMax
                    this.frameCurrent = 0
                }
                break;
            case 'death_left':
                if (this.image !== this.sprites.death_left.image) {
                    this.image = this.sprites.death_left.image
                    this.frameMax = this.sprites.death_left.frameMax
                    this.frameCurrent = 0
                }
                break;
        }

    }
}