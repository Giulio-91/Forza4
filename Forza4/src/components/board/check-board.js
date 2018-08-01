export const CheckBoard = (board, colIndex, rowIndex, player, rows, id) => {
    //
    let neighbour = {};
    neighbour[player] = [];
    var count = {};
    var winner;
    // find neighbour of the same player
    for (let x = colIndex-1; x <= colIndex+1; x++) {                
        for (let y = rowIndex-1; y <= rowIndex+1; y++) {
            try {
                if (board[x][y]['color'] == player && board[x][y]['id'] != id) {
                    var disc = {'x':x,'y':y};
                    neighbour[player].push(disc);
                    exploreDirection(disc, colIndex, rowIndex)
                }
                
            } catch (error) {
                continue;
            }
            
        } 
    }    
    // explore in the direction
    function exploreDirection(disc, initX, initY) {
        var direction = {'x':initX-disc.x, 'y':initY-disc.y};
        var loop = true;
        var winnerDiscs = [{'x':colIndex, 'y':rowIndex}];
        var versor = direction.x.toString() + direction.y.toString();
        var versorInverso = (-direction.x).toString() + (-direction.y).toString();
        count[versor] = count[versor] ? count[versor] : count[versorInverso] ? count[versorInverso] : 1;
        while (loop) {
            try {
                var nextDisc = board[initX-direction.x][initY-direction.y]
                if (nextDisc.color == player) {
                    winnerDiscs.push({'x':initX-direction.x, 'y':initY-direction.y});
                    count[versor]++;  
                    if (count[versor] >= 4) {
                        winner = winnerDiscs; // array of winner disks
                        return;     
                    }
                    initX = initX-direction.x;
                    initY = initY-direction.y;
                } else {
                    loop = false;
                }
            } catch (error) {
                loop = false;
            }
        }
    }
    //
    return winner;
}