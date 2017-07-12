// Action Creators

export function loginAction(playerName) {
    return {
        type: "LOGIN",
        playerName,
        event : {
            name : "player joined",
            data : {
                playerName
            }
        }
    }
}


export function turnComplete(cellInfo) {
    return {
        type: "TURN_COMPLETE",
        cellInfo,
        event : {
            name : "turn complete",
            data : {
                cellInfo
            }
        }
    }
}


export function startNewGame() {
    return {
        type: "START_NEW_GAME",
        event : {
            name : "new game",
            data : {}
        }
    }
}
