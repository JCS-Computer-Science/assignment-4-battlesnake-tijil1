export default function move(gameState){
    let moveSafety = {
        up: true,
        down: true,
        left: true,
        right: true
    };
    
    // We've included code to prevent your Battlesnake from moving backwards
    const myHead = gameState.you.body[0];
    const myNeck = gameState.you.body[1];
    
    if (myNeck.x < myHead.x) {        // Neck is left of head, don't move left
        moveSafety.left = false;
        
    } else if (myNeck.x > myHead.x) { // Neck is right of head, don't move right
        moveSafety.right = false;
        
    } else if (myNeck.y < myHead.y) { // Neck is below head, don't move down
        moveSafety.down = false;
        
    } else if (myNeck.y > myHead.y) { // Neck is above head, don't move up
        moveSafety.up = false;
    }
    
    // TODO: Step 1 - Prevent your Battlesnake from moving out of bounds
    // gameState.board contains an object representing the game board including its width and height
    // https://docs.battlesnake.com/api/objects/board
    const boardWidth = gameState.board.width;
    const boardHeight = gameState.board.height;
  if(myHead.x === 0) {
    moveSafety.left = false;
  }
  if(myHead.x === boardWidth - 1) {
    moveSafety.right = false;
  }
  if(myHead.y === 0) {
    moveSafety.down = false;
  }
  if(myHead.y === boardHeight - 1) {
    moveSafety.up = false;
  }
    // TODO: Step 2 - Prevent your Battlesnake from colliding with itself
    // gameState.you contains an object representing your snake, including its coordinates
    // https://docs.battlesnake.com/api/objects/battlesnake

    gameState.you.body.slice(1).forEach(segment => {
    const { x, y } = segment;
    if (myHead.x === x && myHead.y + 1 === y) {
        moveSafety.up = false;
    }
    if (myHead.x === x && myHead.y - 1 === y) {
        moveSafety.down = false;
    }
    if (myHead.x - 1 === x && myHead.y === y) {
        moveSafety.left = false;
    }
    if (myHead.x + 1 === x && myHead.y === y) {
        moveSafety.right = false;
    }
});

    // TODO: Step 3 - Prevent your Battlesnake from colliding with other Battlesnakes
    // gameState.board.snakes contains an array of enemy snake objects, which includes their coordinates
    // https://docs.battlesnake.com/api/objects/battlesnake
  const enemies = gameState.board.snakes;
  enemies.forEach(snake => { 
  snake.body.forEach(segment => {
    const { x, y } = segment;
    if (myHead.x=== x && myHead.y + 1===y) {
      moveSafety.up = false;
    }
    if (myHead.x===x && myHead.y - 1===y) {
      moveSafety.down = false;
    }
    if (myHead.x - 1===x && myHead.y===y) {
      moveSafety.left = false;
    }
    if (myHead.x + 1=== x && myHead.y===y) {
      moveSafety.right = false;
    }
  });
});

    
    // Are there any safe moves left?
    

    const safeMoves = Object.keys(moveSafety).filter(direction => moveSafety[direction]);
    if (safeMoves.length == 0) {
        console.log(`MOVE ${gameState.turn}: No safe moves detected! Moving down`);
        return { move: "down" };
    }
    
    // Choose a random move from the safe moves
    const nextMove = safeMoves[Math.floor(Math.random() * safeMoves.length)];
    
    // TODO: Step 4 - Move towards food instead of random, to regain health and survive longer
    // gameState.board.food contains an array of food coordinates https://docs.battlesnake.com/api/objects/board


if (myNeck.x < myHead.x) moveSafety.left = false;
else if (myNeck.x > myHead.x) moveSafety.right = false;
else if (myNeck.y < myHead.y) moveSafety.down = false;
else if (myNeck.y > myHead.y) moveSafety.up = false;

if (myHead.x === 0) moveSafety.left = false;
if (myHead.x === boardWidth - 1) moveSafety.right = false;
if (myHead.y === 0) moveSafety.down = false;
if (myHead.y === boardHeight - 1) moveSafety.up = false;

gameState.you.body.slice(1).forEach(segment => {
    const { x, y } = segment;
    if (myHead.x === x && myHead.y + 1 === y) moveSafety.up = false;
    if (myHead.x === x && myHead.y - 1 === y) moveSafety.down = false;
    if (myHead.x - 1 === x && myHead.y === y) moveSafety.left = false;
    if (myHead.x + 1 === x && myHead.y === y) moveSafety.right = false;
});

gameState.board.snakes.forEach(snake => { 
    snake.body.forEach(segment => {
        const { x, y } = segment;
        if (myHead.x === x && myHead.y + 1 === y) moveSafety.up = false;
        if (myHead.x === x && myHead.y - 1 === y) moveSafety.down = false;
        if (myHead.x - 1 === x && myHead.y === y) moveSafety.left = false;
        if (myHead.x + 1 === x && myHead.y === y) moveSafety.right = false;
    });
});

function distance(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

const food = gameState.board.food;
if (food.length > 0) {
    let closest = food[0];
    let minDistance = distance(myHead, closest);
    for (let i = 1; i < food.length; i++) {
        const d = distance(myHead, food[i]);
        if (d < minDistance) {
            closest = food[i];
            minDistance = d;
        }
    }
    if (closest.x < myHead.x && moveSafety.left) return { move:'left' };
    if (closest.x > myHead.x && moveSafety.right) return { move:'right' };
    if (closest.y < myHead.y && moveSafety.down) return { move:'down' };
    if (closest.y > myHead.y && moveSafety.up) return { move:'up' };
}

    return { move: safeMoves[Math.floor(Math.random() * safeMoves.length)] };


}