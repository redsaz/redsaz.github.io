"use strict";
/// <reference path="types/phaser.d.ts"t/>
class TargetTotals {
    constructor() {
        this.cell1 = 0;
        this.cell2 = 0;
        this.cell3 = 0;
    }
}
const LEVELS = [
    { numTargets: 4, highestRow: 10 },
    { numTargets: 8, highestRow: 10 },
    { numTargets: 12, highestRow: 10 },
    { numTargets: 16, highestRow: 10 },
    { numTargets: 20, highestRow: 10 },
    { numTargets: 24, highestRow: 10 },
    { numTargets: 28, highestRow: 10 },
    { numTargets: 32, highestRow: 10 },
    { numTargets: 36, highestRow: 10 },
    { numTargets: 40, highestRow: 10 },
    { numTargets: 44, highestRow: 10 },
    { numTargets: 48, highestRow: 10 },
    { numTargets: 52, highestRow: 10 },
    { numTargets: 56, highestRow: 10 },
    { numTargets: 60, highestRow: 10 },
    { numTargets: 64, highestRow: 11 },
    { numTargets: 68, highestRow: 11 },
    { numTargets: 72, highestRow: 12 },
    { numTargets: 76, highestRow: 12 },
    { numTargets: 80, highestRow: 13 },
    { numTargets: 84, highestRow: 13 },
];
class SceneBackground extends Phaser.Scene {
    constructor(config) {
        super(config);
    }
    preload() {
        this.load.image('background', 'assets/pics/background.jpg');
    }
    create() {
        this.add.image(400, 300, 'background');
    }
    update(time, delta) {
    }
}
class SceneMultitouch extends Phaser.Scene {
    constructor(config) {
        super(config);
        this.controlsEvents = new Phaser.Events.EventEmitter();
        this.press = Symbol("press");
        this.release = Symbol("release");
        this.btns = [];
    }
    preload() {
        this.load.image('target', 'assets/pics/target.png');
    }
    create(data) {
        this.controlsEvents = data.controlsEvents;
        this.input.addPointer(3);
        let alpha = 0.25;
        let left = this.add.sprite(100, 300, 'target').setScale(0.75, 0.75).setTint(CELL_1_COLOR).setAlpha(alpha);
        this.btns.push(left);
        let right = this.add.sprite(300, 300, 'target').setScale(0.75, 0.75).setTint(CELL_2_COLOR).setAlpha(alpha);
        this.btns.push(right);
        let shove = this.add.sprite(200, 500, 'target').setScale(0.75, 0.75).setTint(0x00ffff).setAlpha(alpha);
        this.btns.push(shove);
        let rotateCcw = this.add.sprite(500, 500, 'target').setScale(0.75, 0.75).setTint(CELL_3_COLOR).setAlpha(alpha);
        this.btns.push(rotateCcw);
        let rotateCw = this.add.sprite(700, 500, 'target').setScale(0.75, 0.75).setTint(0xffff00).setAlpha(alpha);
        this.btns.push(rotateCw);
        this.input.on('pointermove', (pointer) => this.pointer(pointer));
        this.input.on('pointerdown', (pointer) => this.pointer(pointer));
        this.input.on('pointerup', (pointer) => this.pointer(pointer));
        left.on(this.press, (pointer) => {
            left.setTint(0xffffff);
            this.controlsEvents.emit('_internal_leftpressed');
        });
        left.on(this.release, (pointer) => {
            left.setTint(CELL_1_COLOR);
            this.controlsEvents.emit('_internal_leftreleased');
        });
        right.on(this.press, (pointer) => {
            right.setTint(0xffffff);
            this.controlsEvents.emit('_internal_rightpressed');
        });
        right.on(this.release, (pointer) => {
            right.setTint(CELL_2_COLOR);
            this.controlsEvents.emit('_internal_rightreleased');
        });
        shove.on(this.press, (pointer) => {
            shove.setTint(0xffffff);
            this.controlsEvents.emit('_internal_shovepressed');
        });
        shove.on(this.release, (pointer) => {
            shove.setTint(0x00ffff);
            this.controlsEvents.emit('_internal_shovereleased');
        });
        rotateCcw.on(this.press, (pointer) => {
            rotateCcw.setTint(0xffffff);
            this.controlsEvents.emit('_internal_rotateccw');
        });
        rotateCcw.on(this.release, (pointer) => {
            rotateCcw.setTint(CELL_3_COLOR);
        });
        rotateCw.on(this.press, (pointer) => {
            rotateCw.setTint(0xffffff);
            this.controlsEvents.emit('_internal_rotatecw');
        });
        rotateCw.on(this.release, (pointer) => {
            rotateCw.setTint(0xffff00);
        });
    }
    update(time, delta) {
    }
    pointer(pointer) {
        this.btns.forEach(btn => {
            let bounds = btn.getBounds();
            if (pointer.primaryDown && bounds.contains(pointer.x, pointer.y)) {
                if (!btn.getData(pointer.identifier.toString())) {
                    btn.setData(pointer.identifier.toString(), true);
                    btn.emit(this.press, pointer);
                }
            }
            else {
                if (btn.getData(pointer.identifier.toString())) {
                    btn.setData(pointer.identifier.toString(), false);
                    btn.emit(this.release, pointer);
                }
            }
        });
    }
}
class SceneLevelClear extends Phaser.Scene {
    constructor(config) {
        super(config);
    }
    preload() {
    }
    create(data) {
        var _a, _b;
        var text = this.add.text(400, 300, 'CLEAR!', { fontSize: '66px', fontFamily: 'Sans-Serif', fontStyle: 'bold', color: '#fff', stroke: '#000', strokeThickness: 10, align: 'center' });
        text.setX(this.cameras.default.centerX - (text.width / 2));
        text.setY(this.cameras.default.centerY - (text.height / 2));
        (_a = this.input.keyboard) === null || _a === void 0 ? void 0 : _a.addKey(13, false, false).on('down', this.goNext, this);
        (_b = this.input.keyboard) === null || _b === void 0 ? void 0 : _b.addKey(32, false, false).on('down', this.goNext, this);
        gameThingies = data;
    }
    update(time, delta) {
    }
    // Move on from this screen
    goNext() {
        if (gameThingies != undefined) {
            gameThingies.gameSettings.level++;
        }
        this.scene.get('SceneGrid').scene.restart();
        this.scene.stop(this.scene.key);
    }
}
class SceneLevelLost extends Phaser.Scene {
    constructor(config) {
        super(config);
    }
    preload() {
    }
    create() {
        var text = this.add.text(400, 300, ['GAME', 'OVER'], { fontSize: '66px', fontFamily: 'Sans-Serif', fontStyle: 'bold', color: '#fff', stroke: '#000', strokeThickness: 10, align: 'center' });
        text.setX(this.cameras.default.centerX - (text.width / 2));
        text.setY(this.cameras.default.centerY - (text.height / 2));
    }
    update(time, delta) {
    }
}
const CELL_TYPE_MASK = 7;
const CELL_EMPTY = 0;
const CELL_JOINED_TOP = 16;
const CELL_JOINED_RIGHT = 32;
const CELL_JOINED_BOTTOM = 64;
const CELL_JOINED_LEFT = 128;
const CELL_TARGET = 8;
const CELL_1 = 1;
const CELL_2 = 2;
const CELL_3 = 3;
const CELL_1_COLOR = 0xff0000;
const CELL_2_COLOR = 0x00ff00;
const CELL_3_COLOR = 0x4466ff;
const CELL_TYPES = [CELL_1, CELL_2, CELL_3];
function getCellColor(cellValue) {
    let color = 0xffffff;
    if ((CELL_TYPE_MASK & cellValue) == 1) {
        color = CELL_1_COLOR;
    }
    else if ((CELL_TYPE_MASK & cellValue) == 2) {
        color = CELL_2_COLOR;
    }
    else if ((CELL_TYPE_MASK & cellValue) == 3) {
        color = CELL_3_COLOR;
    }
    return color;
}
const SHIFT_TICKS_REPEAT_DELAY = 15;
const SHIFT_TICKS_REPEAT_RATE = 6;
const SHOVE_TICKS_REPEAT_DELAY = 2;
const GAME_STATE_PREGAME = 1; // Game hasn't started yet (counting down, whatever)
const GAME_STATE_RELEASING = 2; // The active cells are preparing into the grid
const GAME_STATE_ACTIVE = 3; // The player can control the active cells
const GAME_STATE_SETTLE = 4; // The active cells have been set, and possibly cleared and gravity needs to affect the board.
const GAME_STATE_DONE_LOST = 5; // The game is finished, the player lost.
const GAME_STATE_DONE_WON = 6; // The game is finished, the player won.
class ControlsState {
    constructor() {
        this.leftPressed = false;
        this.leftPressedTicks = 0;
        this.rightPressed = false;
        this.rightPressedTicks = 0;
        this.shovePressed = false;
        this.shovePressedTicks = 0;
        // Rotates are non-repeating, so this only applies to a single tick
        this.rotateCw = false;
        this.rotateCcw = false;
    }
}
/**
 * Translates mouse/touches/keypress events into game actions.
 * This exists for several reasons:
 * 1. The core game logic itself doesn't have to deal with multiple input sources and conflicts
 *    that can result. For example, it is possible for the player to press the left key while
 *    pressing the onscreen right button at the same time.
 * 2. So that multiple events do not get sent within the same "tick" of the game. Like, say,
 *    spamming the "leftpressed" and "leftreleased" events multiple times in a single tick in
 *    order to get the active block shoved all the way to the left.
 * 3. Similar to the first two reasons, this can prevent multiple events from different inputs
 *    from "stomping" on each other. For example, if the player holds down the left key, then
 *    presses the left onscreen button and releases it, and then releases the left key,
 *    there won't be two "left action pressed" and two "left action released" events sent to the
 *    core game logic. (Would the game consider the left button release after the first "released
 *    event", or some time later after the second "released event")?
 */
class GameControls extends Phaser.Scene {
    constructor(config) {
        super(config);
        this.controlsEvents = new Phaser.Events.EventEmitter(); // To be overwritten by create.
        this.controlsState = new ControlsState(); // To be overwritten by create.
        this.rotateCwClearNext = false;
        this.rotateCcwClearNext = false;
    }
    preload() {
    }
    create(data) {
        this.controlsEvents = data.controlsEvents;
        this.controlsState = data.controlsState;
        let cevents = this.controlsEvents;
        if (this.input.keyboard !== null) {
            let cursors = this.input.keyboard.createCursorKeys();
            cursors.space.on('down', () => cevents.emit('_internal_rotateccw'), this);
            cursors.up.on('down', () => cevents.emit('_internal_rotatecw'), this);
            cursors.left.on('down', () => cevents.emit('_internal_leftpressed'), this);
            cursors.left.on('up', () => cevents.emit('_internal_leftreleased'), this);
            cursors.right.on('down', () => cevents.emit('_internal_rightpressed'), this);
            cursors.right.on('up', () => cevents.emit('_internal_rightreleased'), this);
            cursors.down.on('down', () => cevents.emit('_internal_shovepressed'), this);
            cursors.down.on('up', () => cevents.emit('_internal_shovereleased'), this);
        }
        cevents.on('_internal_leftpressed', this.receivedLeftPressed, this);
        cevents.on('_internal_leftreleased', this.receivedLeftReleased, this);
        cevents.on('_internal_rightpressed', this.receivedRightPressed, this);
        cevents.on('_internal_rightreleased', this.receivedRightReleased, this);
        cevents.on('_internal_shovepressed', this.receivedShovePressed, this);
        cevents.on('_internal_shovereleased', this.receivedShoveReleased, this);
        cevents.on('_internal_rotateccw', this.receivedRotateCcw, this);
        cevents.on('_internal_rotatecw', this.receivedRotateCw, this);
    }
    receivedLeftPressed() {
        // NOTE: THIS WON'T DO THE ADVERTIZED LOGIC (but it's a good mvp)
        this.controlsState.leftPressed = true;
    }
    receivedLeftReleased() {
        // NOTE: THIS WON'T DO THE ADVERTIZED LOGIC (but it's a good mvp)
        this.controlsState.leftPressed = false;
    }
    receivedRightPressed() {
        // NOTE: THIS WON'T DO THE ADVERTIZED LOGIC (but it's a good mvp)
        this.controlsState.rightPressed = true;
    }
    receivedRightReleased() {
        // NOTE: THIS WON'T DO THE ADVERTIZED LOGIC (but it's a good mvp)
        this.controlsState.rightPressed = false;
    }
    receivedShovePressed() {
        // NOTE: THIS WON'T DO THE ADVERTIZED LOGIC (but it's a good mvp)
        this.controlsState.shovePressed = true;
    }
    receivedShoveReleased() {
        // NOTE: THIS WON'T DO THE ADVERTIZED LOGIC (but it's a good mvp)
        this.controlsState.shovePressed = false;
    }
    receivedRotateCcw() {
        // NOTE: THIS WON'T DO THE ADVERTIZED LOGIC (but it's a good mvp)
        this.controlsState.rotateCcw = true;
        this.rotateCcwClearNext = true;
        this.controlsEvents.emit('rotateccw');
    }
    receivedRotateCw() {
        this.controlsState.rotateCw = true;
        this.rotateCwClearNext = true;
        this.controlsEvents.emit('rotatecw');
    }
    update(time, delta) {
        if (this.controlsState.leftPressed) {
            if (repeaty(this.controlsState.leftPressedTicks, SHIFT_TICKS_REPEAT_DELAY, SHIFT_TICKS_REPEAT_RATE)) {
                // then fire event? Dunno.
            }
            ++this.controlsState.leftPressedTicks;
        }
        else {
            this.controlsState.leftPressedTicks = 0;
        }
        if (this.controlsState.rightPressed) {
            if (repeaty(this.controlsState.rightPressedTicks, SHIFT_TICKS_REPEAT_DELAY, SHIFT_TICKS_REPEAT_RATE)) {
                // then fire event? Dunno.
            }
            ++this.controlsState.rightPressedTicks;
        }
        else {
            this.controlsState.rightPressedTicks = 0;
        }
        if (this.controlsState.shovePressed) {
            if (repeaty(this.controlsState.shovePressedTicks, SHIFT_TICKS_REPEAT_DELAY, SHIFT_TICKS_REPEAT_RATE)) {
                // then fire event? Dunno.
            }
            ++this.controlsState.shovePressedTicks;
        }
        else {
            this.controlsState.shovePressedTicks = 0;
        }
        if (this.controlsState.rotateCcw) {
            // then fire event? Dunno.
            if (this.rotateCcwClearNext) {
                this.rotateCcwClearNext = false;
            }
            else {
                this.controlsState.rotateCcw = false; // Effect has no repeats, so it's done
            }
        }
        if (this.controlsState.rotateCcw) {
            // then fire event? Dunno.
            if (this.rotateCwClearNext) {
                this.rotateCwClearNext = false;
            }
            else {
                this.controlsState.rotateCw = false; // Effect has no repeats, so it's done
            }
        }
    }
}
class SceneTargetTotals extends Phaser.Scene {
    constructor(config) {
        super(config);
        this.targetTotals = new TargetTotals(); // Will be replaced with instance from create
        this.oldTargetTotals = new TargetTotals(); // If different, update text
    }
    preload() {
        this.load.image('target', 'assets/pics/target.png');
        this.cameras.main.setViewport(60, 350, 160, 210);
    }
    create(data) {
        var _a;
        this.targetTotals = (_a = data.targetTotals) !== null && _a !== void 0 ? _a : this.targetTotals;
        this.add.rectangle(80, 105, 200, 220, 0, 0.5);
        let cell1 = this.add.sprite(40, 44, 'target').setScale(0.125, 0.125).setTint(CELL_1_COLOR);
        let cell2 = this.add.sprite(40, 104, 'target').setScale(0.125, 0.125).setTint(CELL_2_COLOR);
        let cell3 = this.add.sprite(40, 164, 'target').setScale(0.125, 0.125).setTint(CELL_3_COLOR);
        this.tweens.add({
            targets: [cell1, cell2, cell3],
            angle: 360,
            repeat: -1,
            duration: 1000
        });
        this.text1 = this.add.text(35, 25, '0', { fontSize: '30px', fontFamily: 'Sans-Serif', fontStyle: 'bold', color: '#fff', stroke: '#000', strokeThickness: 5, align: 'right', fixedWidth: 100 });
        this.text2 = this.add.text(35, 85, '0', { fontSize: '30px', fontFamily: 'Sans-Serif', fontStyle: 'bold', color: '#fff', stroke: '#000', strokeThickness: 5, align: 'right', fixedWidth: 100 });
        this.text3 = this.add.text(35, 145, '0', { fontSize: '30px', fontFamily: 'Sans-Serif', fontStyle: 'bold', color: '#fff', stroke: '#000', strokeThickness: 5, align: 'right', fixedWidth: 100 });
    }
    update(time, delta) {
        var _a, _b, _c;
        if (this.oldTargetTotals.cell1 != this.targetTotals.cell1) {
            this.oldTargetTotals.cell1 = this.targetTotals.cell1;
            (_a = this.text1) === null || _a === void 0 ? void 0 : _a.setText(this.targetTotals.cell1.toString());
        }
        if (this.oldTargetTotals.cell2 != this.targetTotals.cell2) {
            this.oldTargetTotals.cell2 = this.targetTotals.cell2;
            (_b = this.text2) === null || _b === void 0 ? void 0 : _b.setText(this.targetTotals.cell2.toString());
        }
        if (this.oldTargetTotals.cell3 != this.targetTotals.cell3) {
            this.oldTargetTotals.cell3 = this.targetTotals.cell3;
            (_c = this.text3) === null || _c === void 0 ? void 0 : _c.setText(this.targetTotals.cell3.toString());
        }
    }
}
class SceneNextCells extends Phaser.Scene {
    constructor(config) {
        super(config);
    }
    preload() {
        this.load.image('joined', 'assets/pics/joined.png');
        this.cameras.main.setViewport(575, 38, 160, 100);
    }
    create(data) {
        this.add.rectangle(0, 0, 320, 200, 0, 0.5);
        this.add.text(0, 10, 'NEXT', { fontSize: '20px', fontFamily: 'Sans-Serif', fontStyle: 'bold', color: '#fff', stroke: '#000', strokeThickness: 4, align: 'center', fixedWidth: 160 });
        this.leftCell = this.add.sprite(64, 64, 'joined');
        this.leftCell.setScale(0.125, 0.125);
        this.rightCell = this.add.sprite(96, 64, 'joined');
        this.rightCell.setScale(0.125, 0.125);
        this.rightCell.flipX = true;
        data.boardEvents.on('newNext', this.handler, this);
    }
    update(time, delta) {
    }
    handler(leftCellType, rightCellType) {
        var _a, _b;
        (_a = this.leftCell) === null || _a === void 0 ? void 0 : _a.setTint(getCellColor(leftCellType));
        (_b = this.rightCell) === null || _b === void 0 ? void 0 : _b.setTint(getCellColor(rightCellType));
    }
}
class SceneLevelInfo extends Phaser.Scene {
    constructor(config) {
        super(config);
    }
    preload() {
        this.cameras.main.setViewport(575, 160, 160, 88);
    }
    create(data) {
        this.add.rectangle(0, 0, 320, 176, 0, 0.5);
        this.add.text(0, 10, 'LEVEL', { fontSize: '20px', fontFamily: 'Sans-Serif', fontStyle: 'bold', color: '#fff', stroke: '#000', strokeThickness: 4, align: 'center', fixedWidth: 160 });
        this.levelText = this.add.text(0, 40, '0', { fontSize: '30px', fontFamily: 'Sans-Serif', fontStyle: 'bold', color: '#fff', stroke: '#000', strokeThickness: 5, align: 'center', fixedWidth: 160 });
        data.boardEvents.on('newBoard', this.handler, this);
    }
    update(time, delta) {
    }
    handler(level) {
        var _a;
        (_a = this.levelText) === null || _a === void 0 ? void 0 : _a.setText(level.toString());
    }
}
class SceneGrid extends Phaser.Scene {
    constructor(config) {
        super(config !== null && config !== void 0 ? config : { key: 'SceneGrid', active: true });
        this.tickDuration = 1000 / 60;
        this.ticks = 0;
        this.ticksLeftover = 0; // sometimes a little extra or a little less delta is between updates.
        this.gameState = GAME_STATE_PREGAME;
        this.gridRows = 17;
        this.gridCols = 8;
        this.grid = Array(this.gridRows * this.gridCols);
        this.level = 0;
        this.startRow = 15;
        this.startCol = 3;
        this.activePosRow = 0;
        this.activePosCol = 0;
        this.activeRotation = 0;
        this.cellsActive = Array();
        this.cellsNext = Array();
        this.dropCounter = 0;
        this.dropRate = 40;
        this.targetTotals = new TargetTotals(); // a new instance should get passed in with create();
        this.releaseCounter = 0;
        this.settleCounter = 0;
        this.gridDisplay = Array(this.gridRows * this.gridCols);
        this.cellsActiveDisplay = Array();
        for (let i = 0; i < this.gridRows * this.gridCols; ++i) {
            this.grid[i] = CELL_EMPTY;
            this.gridDisplay[i] = null;
        }
    }
    colToX(col) {
        // cols go from left (0) to right (7)
        return col * 32 + 16;
    }
    rowToY(row) {
        // rows go from bottom (0) to top (15), which is reverse of how pixels are done.
        return 544 - (row * 32 + 16);
    }
    cellToScene(row, col, cellValue) {
        let sprite;
        // cols go from left (0) to right (7)
        let xPos = this.colToX(col);
        // rows go from bottom (0) to top (15), which is reverse of how pixels are done.
        let yPos = this.rowToY(row);
        if (cellValue == 0) {
            return null;
        }
        else if ((cellValue & CELL_TARGET) > 0) {
            sprite = this.add.sprite(xPos, yPos, 'target');
            this.tweens.add({
                targets: sprite,
                angle: 360,
                repeat: -1,
                duration: 1000
            });
        }
        else if ((cellValue & CELL_JOINED_RIGHT) > 0) {
            sprite = this.add.sprite(xPos, yPos, 'joined');
        }
        else if ((cellValue & CELL_JOINED_LEFT) > 0) {
            sprite = this.add.sprite(xPos, yPos, 'joined');
            sprite.flipX = true;
        }
        else if ((cellValue & CELL_JOINED_TOP) > 0) {
            sprite = this.add.sprite(xPos, yPos, 'joined');
            sprite.setRotation(Math.PI / 2);
            sprite.flipX = true;
        }
        else if ((cellValue & CELL_JOINED_BOTTOM) > 0) {
            sprite = this.add.sprite(xPos, yPos, 'joined');
            sprite.setRotation(Math.PI / 2);
        }
        else {
            sprite = this.add.sprite(xPos, yPos, 'filled');
        }
        sprite.setScale(0.125, 0.125);
        let color = 0xffffff;
        if ((CELL_TYPE_MASK & cellValue) == 1) {
            color = CELL_1_COLOR;
        }
        else if ((CELL_TYPE_MASK & cellValue) == 2) {
            color = CELL_2_COLOR;
        }
        else if ((CELL_TYPE_MASK & cellValue) == 3) {
            color = CELL_3_COLOR;
        }
        sprite.setTint(color);
        return sprite;
    }
    cellActiveToScene(row, col, rotation, index, cellValue) {
        let abs = this.cellActiveGetPosAbsolute(row, col, rotation, index, cellValue);
        return this.cellToScene(abs[0], abs[1], abs[2]);
    }
    cellActiveGetPosAbsolute(row, col, rotation, index, cellValue) {
        // In 0th rotation, first cell is at the row and col, second cell is to the right.
        let join1 = 0;
        let join2 = 0;
        if (rotation == 0) {
            col += index;
            join1 = CELL_JOINED_RIGHT;
            join2 = CELL_JOINED_LEFT;
        }
        else if (rotation == 1) {
            // In 1st rotation, first cell is above, second cell is at row and col.
            row += 1 - index;
            join1 = CELL_JOINED_BOTTOM;
            join2 = CELL_JOINED_TOP;
        }
        else if (rotation == 2) {
            // In 2nd rotation, first cell is to the right, second cell is at row and col.
            col += 1 - index;
            join1 = CELL_JOINED_LEFT;
            join2 = CELL_JOINED_RIGHT;
        }
        else if (rotation == 3) {
            // In 3rd rotation, first cell is at row and col, second cell is above.
            row += index;
            join1 = CELL_JOINED_TOP;
            join2 = CELL_JOINED_BOTTOM;
        }
        // Use the correct join depending on which active cell we're looking at
        cellValue &= CELL_TYPE_MASK;
        if (index == 0) {
            cellValue |= join1;
        }
        else {
            cellValue |= join2;
        }
        return [row, col, cellValue];
    }
    cellActiveUpdatePos(row, col, rotation, index, sprite) {
        if (sprite == null) {
            return;
        }
        // In 0th rotation, first cell is at the row and col, second cell is to the right.
        let join1 = 0;
        let join2 = 0;
        if (rotation == 0) {
            col += index;
        }
        else if (rotation == 1) {
            // In 1st rotation, first cell is above, second cell is at row and col.
            row += 1 - index;
        }
        else if (rotation == 2) {
            // In 2nd rotation, first cell is to the right, second cell is at row and col.
            col += 1 - index;
        }
        else if (rotation == 3) {
            // In 3rd rotation, first cell is at row and col, second cell is above.
            row += index;
        }
        sprite.setPosition(this.colToX(col), this.rowToY(row) + 4);
    }
    gridGet(row, col) {
        let index = row * this.gridCols + col;
        return this.grid[index];
    }
    gridSet(row, col, cellValue) {
        let index = row * this.gridCols + col;
        let oldCell = this.grid[index];
        if (oldCell != cellValue) {
            this.grid[index] = cellValue;
            let sprite = this.gridDisplay[index];
            if (sprite != null) {
                sprite.destroy();
            }
            this.gridDisplay[index] = this.cellToScene(row, col, cellValue);
        }
    }
    gridMove(row, col, rowChange, colChange) {
        var _a;
        let sourceIndex = row * this.gridCols + col;
        let targetIndex = (row + rowChange) * this.gridCols + col + colChange;
        let sourceCell = this.grid[sourceIndex];
        let oldTargetCell = this.grid[targetIndex];
        if (oldTargetCell != CELL_EMPTY) {
            let sprite = this.gridDisplay[targetIndex];
            sprite === null || sprite === void 0 ? void 0 : sprite.destroy();
        }
        this.grid[targetIndex] = sourceCell;
        this.grid[sourceIndex] = CELL_EMPTY;
        this.gridDisplay[targetIndex] = this.gridDisplay[sourceIndex];
        this.gridDisplay[sourceIndex] = null;
        (_a = this.gridDisplay[targetIndex]) === null || _a === void 0 ? void 0 : _a.setPosition(this.colToX(col + colChange), this.rowToY(row + rowChange));
    }
    // Deletes the cell at the location, and "unjoins" any cells joined to that cell.
    gridDelete(fancy, row, col) {
        let old = this.gridGet(row, col);
        // If cell is connected above, remove that cell's respective join.
        if ((old & CELL_JOINED_TOP) != 0) {
            this.gridSet(row + 1, col, this.gridGet(row + 1, col) & ~CELL_JOINED_BOTTOM);
        }
        // If cell is connected right, remove that cell's respective join.
        if ((old & CELL_JOINED_RIGHT) != 0) {
            this.gridSet(row, col + 1, this.gridGet(row, col + 1) & ~CELL_JOINED_LEFT);
        }
        // If cell is connected below, remove that cell's respective join.
        if ((old & CELL_JOINED_BOTTOM) != 0) {
            this.gridSet(row - 1, col, this.gridGet(row - 1, col) & ~CELL_JOINED_TOP);
        }
        // If cell is connected left, remove that cell's respective join.
        if ((old & CELL_JOINED_LEFT) != 0) {
            this.gridSet(row, col - 1, this.gridGet(row, col - 1) & ~CELL_JOINED_RIGHT);
        }
        // Fancy delete the given cell
        let index = row * this.gridCols + col;
        let oldCell = this.grid[index];
        if (oldCell != CELL_EMPTY) {
            this.grid[index] = CELL_EMPTY;
            let sprite = this.gridDisplay[index];
            if (fancy) {
                this.tweens.add({
                    targets: sprite,
                    alpha: 0,
                    scaleX: 0,
                    scaleY: 0,
                    persist: false,
                    duration: 250,
                    callbackScope: sprite,
                    onComplete: () => sprite === null || sprite === void 0 ? void 0 : sprite.destroy()
                });
            }
            else {
                sprite === null || sprite === void 0 ? void 0 : sprite.destroy();
            }
        }
        return old;
    }
    cellsActiveCanMove(posRow, posCol, rotation) {
        // NOTE: It may be possible to rotate if the active cells can shift left one
        let legit = true;
        // If horizontal, check at pos and to the right.
        if (rotation % 2 == 0) {
            legit = legit && (posRow >= 0) && (posRow <= this.gridRows - 1)
                && (posCol >= 0) && (posCol <= this.gridCols - 2);
            legit = legit
                && this.grid[(posRow * this.gridCols) + posCol] == CELL_EMPTY
                && this.grid[(posRow * this.gridCols) + posCol + 1] == CELL_EMPTY;
        }
        else {
            // If vertical, check at pos and above.
            legit = legit && (posRow >= 0) && (posRow <= this.gridRows - 2)
                && (posCol >= 0) && (posCol <= this.gridCols - 1);
            legit = legit
                && this.grid[(posRow * this.gridCols) + posCol] == CELL_EMPTY
                && this.grid[((posRow + 1) * this.gridCols) + posCol] == CELL_EMPTY;
        }
        return legit;
    }
    activeSet() {
        var _a;
        this.cellsActive.forEach((cell, index) => {
            let abs = this.cellActiveGetPosAbsolute(this.activePosRow, this.activePosCol, this.activeRotation, index, cell);
            this.gridSet(abs[0], abs[1], abs[2]);
        });
        // Clear the grid's topmost row of cells, as cells shouldn't be set there
        for (let col = 0; col < this.gridCols; ++col) {
            this.gridDelete(false, this.gridRows - 1, col);
        }
        // Delete the active sprites
        while (this.cellsActiveDisplay.length) {
            (_a = this.cellsActiveDisplay.shift()) === null || _a === void 0 ? void 0 : _a.destroy();
        }
    }
    // Returns sets of cells to clear from the board (but doesn't clear them itself).
    // Only settled cells are considered for clearing.
    getCellsToClear() {
        let setsToClear = [];
        // Find any horizontal clears
        for (let row = 0; row < this.gridRows; ++row) {
            let seriesType = 0;
            let seriesLength = 0;
            for (let col = 0; col < this.gridCols; ++col) {
                let cell = this.gridGet(row, col);
                let currType = cell & CELL_TYPE_MASK;
                if (currType == seriesType) {
                    ++seriesLength;
                }
                else {
                    // If series is long enough, add cols to clear
                    if (seriesType != 0 && seriesLength >= 4) {
                        let cellsToClear = [];
                        for (let i = col - seriesLength; i < col; ++i) {
                            cellsToClear.push([row, i]);
                        }
                        setsToClear.push(cellsToClear);
                    }
                    seriesType = currType;
                    seriesLength = 1;
                }
            }
            // Must check at end of each row if there is a series long enough to clear.
            // If series is long enough, add cols to clear
            if (seriesType != 0 && seriesLength >= 4) {
                let cellsToClear = [];
                for (let i = this.gridCols - seriesLength; i < this.gridCols; ++i) {
                    cellsToClear.push([row, i]);
                }
                setsToClear.push(cellsToClear);
            }
        }
        // Find any vertical clears
        for (let col = 0; col < this.gridCols; ++col) {
            let seriesType = 0;
            let seriesLength = 0;
            for (let row = 0; row < this.gridRows; ++row) {
                let cell = this.gridGet(row, col);
                let currType = cell & CELL_TYPE_MASK;
                if (currType == seriesType) {
                    ++seriesLength;
                }
                else {
                    // If series is long enough, add rows to clear
                    if (seriesType != 0 && seriesLength >= 4) {
                        let cellsToClear = [];
                        for (let i = row - seriesLength; i < row; ++i) {
                            cellsToClear.push([i, col]);
                        }
                        setsToClear.push(cellsToClear);
                    }
                    seriesType = currType;
                    seriesLength = 1;
                }
            }
            // Must check at end of each col if there is a series long enough to clear.
            // If series is long enough, add rows to clear
            if (seriesType != 0 && seriesLength >= 4) {
                let cellsToClear = [];
                for (let i = this.gridRows - seriesLength; i < this.gridRows; ++i) {
                    cellsToClear.push([i, col]);
                }
                setsToClear.push(cellsToClear);
            }
        }
        return setsToClear;
    }
    receivedRotateCcw() {
        this.rotate(-1);
    }
    receivedRotateCw() {
        this.rotate(1);
    }
    rotate(amount) {
        var _a;
        // Can only rotate when active cell is in play
        if (this.gameState != GAME_STATE_ACTIVE) {
            return;
        }
        // If the proposed rotation will not clobber a filled cell, then allow it, but if rotating
        // from a vertical position to a horizontal one and it would clobber a filled cell,
        // try kicking left one col. If no clobbers, then go with that.
        let rotation = 3 - ((3 - ((this.activeRotation + amount) % 4)) % 4);
        let posCol = this.activePosCol;
        if (!this.cellsActiveCanMove(this.activePosRow, posCol, rotation) && (rotation % 2) == 0) {
            --posCol;
        }
        if (this.cellsActiveCanMove(this.activePosRow, posCol, rotation)) {
            this.activeRotation = rotation;
            this.activePosCol = posCol;
            // Update display
            // Delete the current sprites then create new ones at correct position
            while (this.cellsActiveDisplay.length) {
                (_a = this.cellsActiveDisplay.shift()) === null || _a === void 0 ? void 0 : _a.destroy();
            }
            this.cellsActive.forEach((cell, index) => this.cellsActiveDisplay.push(this.cellActiveToScene(this.activePosRow, this.activePosCol, this.activeRotation, index, cell)));
        }
    }
    // Drop (by one) all cells that are not settled.
    dropDanglingCells() {
        let dropped = false; // if at least one cell dropped by gravity, the function will need to run again.
        let dropline = new Array(this.gridCols); // Calculate drops for an entire line before dropping.
        // Work from the bottom up (well, not the bottom-most row though)
        for (let row = 1; row < this.gridRows; ++row) {
            for (let col = 0; col < this.gridCols; ++col) {
                let nodrop = false; // If nodrop is true, do not drop the cell.
                let cell = this.gridGet(row, col);
                // If the cell is empty, do not drop.
                nodrop || (nodrop = cell == CELL_EMPTY);
                // If the cell is a target, do not drop
                nodrop || (nodrop = (cell & CELL_TARGET) > 0);
                // If the cell below this cell is occupied, do not drop this cell.
                nodrop || (nodrop = this.gridGet(row - 1, col) != CELL_EMPTY);
                // If the cell is joined right, and the cell below that is occupied, don't drop.
                nodrop || (nodrop = (cell & CELL_JOINED_RIGHT) != 0 && this.gridGet(row - 1, col + 1) != CELL_EMPTY);
                // If the cell is joined left, and the cell below that is occupied, don't drop.
                nodrop || (nodrop = (cell & CELL_JOINED_LEFT) != 0 && this.gridGet(row - 1, col - 1) != CELL_EMPTY);
                dropline[col] = !nodrop;
            }
            // Now that each column has been calculated to drop or not, drop the correct parts of the line
            for (let col = 0; col < this.gridCols; ++col) {
                let shouldDrop = dropline[col];
                dropped || (dropped = shouldDrop);
                if (shouldDrop) {
                    this.gridMove(row, col, -1, 0);
                }
            }
        }
        return dropped;
    }
    sameType(cell, ...cells) {
        return cells.every(c => (c & CELL_TYPE_MASK) == (cell & CELL_TYPE_MASK));
    }
    canPlaceTarget(row, col, cell) {
        // If the placement would collide with a filled cell, then the answer is no.
        if (this.gridGet(row, col) != CELL_EMPTY) {
            return false;
        }
        // If the placement results in three or more consecutive targets of the same type, then
        // it cannot be placed there.
        let cellType = cell & CELL_TYPE_MASK;
        // If two cells left...
        if (col >= 2 && this.sameType(this.gridGet(row, col - 2), this.gridGet(row, col - 1), cellType)) {
            return false;
        }
        // If one cell left and one cell right...
        if (col >= 1 && col <= this.gridCols - 2 && this.sameType(this.gridGet(row, col - 1), cellType, this.gridGet(row, col + 1))) {
            return false;
        }
        // If two cells right...
        if (col <= this.gridCols - 3 && this.sameType(cellType, this.gridGet(row, col + 1), this.gridGet(row, col + 2))) {
            return false;
        }
        // If two cells below...
        if (row >= 2 && this.sameType(this.gridGet(row - 2, col), this.gridGet(row - 1, col), cellType)) {
            return false;
        }
        // If one cell below and one cell above...
        if (row >= 1 && col <= this.gridRows - 2 && this.sameType(this.gridGet(row - 1, col), cellType, this.gridGet(row + 1, col))) {
            return false;
        }
        // If two cells above...
        if (row <= this.gridRows - 3 && this.sameType(cellType, this.gridGet(row + 1, col), this.gridGet(row + 2, col))) {
            return false;
        }
        return true;
    }
    startup(data) {
        var _a, _b, _c;
        if (((_a = this.gameThingies) === null || _a === void 0 ? void 0 : _a.controlsEvents) != data.controlsEvents) {
            data.controlsEvents.on('rotateccw', this.receivedRotateCcw, this);
            data.controlsEvents.on('rotatecw', this.receivedRotateCw, this);
        }
        this.gameThingies = data;
        this.gameState = GAME_STATE_PREGAME;
        this.grid.forEach((item, i, arr) => arr[i] = CELL_EMPTY);
        this.level = (_b = data.gameSettings.level) !== null && _b !== void 0 ? _b : 0;
        let level = LEVELS[Math.min(this.level, 20)];
        let numTargets = level.numTargets;
        this.targetTotals = (_c = data.targetTotals) !== null && _c !== void 0 ? _c : this.targetTotals;
        this.gameThingies.boardEvents.emit('newBoard', this.level);
        this.add.rectangle(128, 272, 256, 544, 0, 0.5);
        this.cellsNext.length = 0;
        this.cellsNext.push(CELL_TYPES[Math.floor(Math.random() * CELL_TYPES.length)]);
        this.cellsNext.push(CELL_TYPES[Math.floor(Math.random() * CELL_TYPES.length)]);
        this.gameThingies.boardEvents.emit('newNext', this.cellsNext[0], this.cellsNext[1]);
        // Add some targets on the board
        let maxRow = level.highestRow;
        for (let i = 0; i < numTargets; ++i) {
            let row = Math.floor(Math.random() * maxRow);
            let col = Math.floor(Math.random() * (this.gridCols));
            let target = CELL_TYPES[Math.floor(Math.random() * CELL_TYPES.length)] | CELL_TARGET;
            let placed = false;
            for (let attempts = 0; attempts < maxRow * this.gridCols; ++attempts) {
                if (this.canPlaceTarget(row, col, target)) {
                    this.gridSet(row, col, target);
                    if ((target & CELL_TYPE_MASK) == CELL_1) {
                        ++this.targetTotals.cell1;
                    }
                    else if ((target & CELL_TYPE_MASK) == CELL_2) {
                        ++this.targetTotals.cell2;
                    }
                    else if ((target & CELL_TYPE_MASK) == CELL_3) {
                        ++this.targetTotals.cell3;
                    }
                    break;
                }
                ++col;
                if (col >= this.gridCols) {
                    col = 0;
                    --row;
                    if (row < 0) {
                        row = maxRow - 1;
                    }
                }
            }
        }
        // Init the active cells
        this.activePosRow = this.startRow;
        this.activePosCol = this.startCol;
        this.activeRotation = 0;
    }
    preload() {
        this.load.image('target', 'assets/pics/target.png');
        this.load.image('joined', 'assets/pics/joined.png');
        this.load.image('filled', 'assets/pics/filled.png');
        this.cameras.main.setViewport(272, 38, 256, 544);
    }
    create(data) {
        this.startup(data);
    }
    update(time, delta) {
        var _a;
        let ticksAndFraction = (delta / this.tickDuration) + this.ticksLeftover;
        let ticksToUpdate;
        // If not enough time has passed for a full tick, but for over half a tick, then
        // count it as a tick, but have a negative leftover value to indicate it's ahead.
        if (ticksAndFraction < 1.0 && ticksAndFraction > 0.5) {
            ticksToUpdate = 1;
        }
        else {
            ticksToUpdate = Math.floor(ticksAndFraction);
        }
        this.ticksLeftover = ticksAndFraction - ticksToUpdate;
        for (let i = 0; i < ticksToUpdate; ++i) {
            switch (this.gameState) {
                case GAME_STATE_PREGAME: {
                    // This is normally used to set up the board, but it kinda already is,
                    // so we do nothing but start the game... for now.
                    this.gameState = GAME_STATE_RELEASING;
                    break;
                }
                case GAME_STATE_RELEASING: {
                    if (this.releaseCounter == 0) {
                        // TODO Find better place for getting next cell colors.
                        this.cellsActive.length = 0;
                        this.cellsActive.push(this.cellsNext[0], this.cellsNext[1]);
                        this.cellsNext.length = 0;
                        this.cellsNext.push(CELL_TYPES[Math.floor(Math.random() * CELL_TYPES.length)]);
                        this.cellsNext.push(CELL_TYPES[Math.floor(Math.random() * CELL_TYPES.length)]);
                        (_a = this.gameThingies) === null || _a === void 0 ? void 0 : _a.boardEvents.emit('newNext', this.cellsNext[0], this.cellsNext[1]);
                    }
                    if (this.releaseCounter < 45) {
                        ++this.releaseCounter;
                    }
                    else {
                        this.releaseCounter = 0;
                        // If any of the cells where the active cells are placed is filled, then game over.
                        // (still place the active cells anyway, to show why)
                        let start1 = this.gridGet(this.startRow, this.startCol);
                        let start2 = this.gridGet(this.startRow, this.startCol + 1);
                        this.gameState = GAME_STATE_ACTIVE;
                        // position and display the active cells
                        this.activePosRow = this.startRow;
                        this.activePosCol = this.startCol;
                        this.activeRotation = 0;
                        this.cellsActive.forEach((cell, index) => this.cellsActiveDisplay.push(this.cellActiveToScene(this.activePosRow, this.activePosCol, this.activeRotation, index, cell)));
                        if (start1 != CELL_EMPTY || start2 != CELL_EMPTY) {
                            this.gameState = GAME_STATE_DONE_LOST;
                        }
                    }
                    break;
                }
                case GAME_STATE_ACTIVE: {
                    // Some systems may have so much lag that it can't keep up with a full 60 fps,
                    // and we must process 2 or more ticks in an update (that is, if we expect 60
                    // fps but are only getting 15, then we're doing 4 loop iterations every
                    // update to keep the speed correct.) However, we should only read the controls
                    // on the first iteration of the loop, otherwise it is possible for the active
                    // cells to shift over more positions than the user wants.
                    this.activeStateUpdate(i == 0);
                    break;
                }
                case GAME_STATE_SETTLE: {
                    ++this.settleCounter;
                    if (this.settleCounter % 15 == 0) {
                        if (!this.dropDanglingCells()) {
                            // TODO: This should not be instant.
                            let seriesToClear = this.getCellsToClear();
                            seriesToClear.forEach(series => series.forEach(cell => {
                                let deleted = this.gridDelete(true, ...cell);
                                // Decrement the counter corresponding to the target cleared.
                                if ((deleted & CELL_TARGET) != 0) {
                                    let deletedType = deleted & CELL_TYPE_MASK;
                                    if (deletedType == CELL_1) {
                                        --this.targetTotals.cell1;
                                    }
                                    else if (deletedType == CELL_2) {
                                        --this.targetTotals.cell2;
                                    }
                                    else if (deletedType == CELL_3) {
                                        --this.targetTotals.cell3;
                                    }
                                }
                            }));
                            // If all the targets are gone, then the level is cleared.
                            if (this.targetTotals.cell1 + this.targetTotals.cell2 + this.targetTotals.cell3 < 1) {
                                this.gameState = GAME_STATE_DONE_WON;
                            }
                            // If nothing was cleared, then release the next active piece.
                            if (seriesToClear.length == 0) {
                                this.settleCounter = 0;
                                this.gameState = GAME_STATE_RELEASING;
                            }
                        }
                    }
                    break;
                }
                case GAME_STATE_DONE_LOST: {
                    // TODO: This should not be instant.
                    if (!this.scene.isActive("SceneLevelLostr")) {
                        this.scene.run("SceneLevelLost");
                    }
                    break;
                }
                case GAME_STATE_DONE_WON: {
                    // TODO: This should not be instant.
                    if (!this.scene.isActive("SceneLevelClear")) {
                        this.scene.run("SceneLevelClear");
                    }
                    break;
                }
            }
            ++this.ticks;
        }
    }
    activeStateUpdate(shouldReadControls) {
        var _a, _b, _c, _d, _e, _f;
        ++this.dropCounter;
        let changed = false;
        let shouldSettle = false;
        if (shouldReadControls && ((_a = this.gameThingies) === null || _a === void 0 ? void 0 : _a.controlsState.leftPressed)) {
            // If the active cells can go left, then go.
            if (repeaty((_b = this.gameThingies) === null || _b === void 0 ? void 0 : _b.controlsState.leftPressedTicks, SHIFT_TICKS_REPEAT_DELAY, SHIFT_TICKS_REPEAT_RATE)
                && this.cellsActiveCanMove(this.activePosRow, this.activePosCol - 1, this.activeRotation)) {
                --this.activePosCol;
                changed = true;
            }
        }
        if (shouldReadControls && ((_c = this.gameThingies) === null || _c === void 0 ? void 0 : _c.controlsState.rightPressed)) {
            // If the active cells can go right, then go.
            if (repeaty((_d = this.gameThingies) === null || _d === void 0 ? void 0 : _d.controlsState.rightPressedTicks, SHIFT_TICKS_REPEAT_DELAY, SHIFT_TICKS_REPEAT_RATE)
                && this.cellsActiveCanMove(this.activePosRow, this.activePosCol + 1, this.activeRotation)) {
                ++this.activePosCol;
                changed = true;
            }
        }
        if (shouldReadControls && ((_e = this.gameThingies) === null || _e === void 0 ? void 0 : _e.controlsState.shovePressed)) {
            // If the active cells can go down, then go.
            if (repeaty((_f = this.gameThingies) === null || _f === void 0 ? void 0 : _f.controlsState.shovePressedTicks, SHOVE_TICKS_REPEAT_DELAY, SHOVE_TICKS_REPEAT_DELAY)) {
                if (this.cellsActiveCanMove(this.activePosRow - 1, this.activePosCol, this.activeRotation)) {
                    --this.activePosRow;
                    changed = true;
                    this.dropCounter = 0;
                }
                else {
                    shouldSettle = true;
                }
            }
        }
        if (this.dropCounter >= this.dropRate) {
            this.dropCounter = 0;
            if (this.cellsActiveCanMove(this.activePosRow - 1, this.activePosCol, this.activeRotation)) {
                --this.activePosRow;
            }
            else {
                shouldSettle = true;
            }
            changed = true;
        }
        if (shouldSettle) {
            this.activeSet();
            this.gameState = GAME_STATE_SETTLE;
            changed = true;
        }
        // Update the positions of the active cells if anything changed
        if (changed) {
            this.cellsActiveDisplay.forEach((sprite, index) => this.cellActiveUpdatePos(this.activePosRow, this.activePosCol, this.activeRotation, index, sprite));
        }
    }
}
function repeaty(ticksActive, ticksRepeatDelay, ticksRepeatRate) {
    return ticksActive == 0
        || ticksActive == ticksRepeatDelay
        || (ticksActive > ticksRepeatDelay
            && ((ticksActive - ticksRepeatDelay) % ticksRepeatRate) == 0);
}
let config = {
    type: Phaser.AUTO,
    parent: 'content',
    backgroundColor: '#253912',
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-example',
        width: 800,
        height: 600,
        zoom: 1,
        autoCenter: Phaser.Scale.Center.CENTER_BOTH
    }
};
const GAME = new Phaser.Game(config);
let counter = new TargetTotals();
let gameSettings = { level: 0, speed: 40 };
let gameThingies = { gameSettings: gameSettings, targetTotals: counter, controlsState: new ControlsState(), controlsEvents: new Phaser.Events.EventEmitter(), boardEvents: new Phaser.Events.EventEmitter() };
GAME.scene.add('SceneBackground', SceneBackground, true);
GAME.scene.add('SceneTargetTotals', SceneTargetTotals, true, { targetTotals: counter });
GAME.scene.add('SceneNextCells', SceneNextCells, true, gameThingies);
GAME.scene.add('SceneLevelInfo', SceneLevelInfo, true, gameThingies);
GAME.scene.add('Controls', GameControls, true, gameThingies);
GAME.scene.add('SceneGrid', SceneGrid, true, gameThingies);
GAME.scene.add('SceneMultitouch', SceneMultitouch, true, gameThingies);
GAME.scene.add('SceneLevelClear', SceneLevelClear, false, gameThingies);
GAME.scene.add('SceneLevelLost', SceneLevelLost, false);
