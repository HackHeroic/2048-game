// const gridDisplay = document.querySelector('.grid');
// let squares = [];

function createBoard(){
    let gridDiv = document.querySelector(".grid");
    for(let i =0;i<16;i++){
        let div = document.createElement('div');
        div.setAttribute('id',`id_${i}`);
        div.textContent = 0;
        gridDiv.appendChild(div);
    }
}
createBoard();
// Part 2: Generate a New Number
function generate(){
    let numArray = [2,2,2,2,2,2,2,2,2,4];
    let index = Math.floor(Math.random()*numArray.length);
    let allBlocks = document.querySelectorAll('.grid >div');

    let filteredBlocks = [...allBlocks].filter((a) => a.textContent == 0);
    if (filteredBlocks.length == 0){
        return 
    }
    let filteredBlock = filteredBlocks[Math.floor(Math.random()*filteredBlocks.length)];
    
    filteredBlock.textContent = numArray[index];
}

generate();
generate();
// generate();
// generate();
// generate();


//part3

function shiftArrayLeft(values){
  let finalArray = values.filter((item) =>{
    return item!=0
  })
  let index = finalArray.length;
  while(index < 4){
    finalArray.push(0);
    index += 1;
  }
  return finalArray
}

function shiftArrayRight(values){
  let finalArray = values.filter((item) =>{
    return item!=0
  })
  let index = finalArray.length;
  while(index < 4){
    finalArray.unshift(0);
    index += 1;
  }
  return finalArray
}

function shiftRow(rowNumber,direction){
  let rowValues = []
  for (let i = 4*(rowNumber-1);i <4*rowNumber ;i++){
    let rowValue = document.querySelector(`#id_${i}`).textContent;
    rowValues.push(rowValue)

  }

  if (direction == 'L'){
    rowValues = shiftArrayLeft(rowValues);
  }else if (direction == 'R'){
    rowValues = shiftArrayRight(rowValues);
  }

  for (let i = 4*(rowNumber-1);i <4*rowNumber ;i++){
    document.querySelector(`#id_${i}`).textContent = rowValues[i%4]
  }

}

function shiftLeft(){
  for (let i = 1;i<5;i++){
    shiftRow(i,'L');
  }
}

function shiftRight(){
  for (let i = 1;i<5;i++){
    shiftRow(i,'R');
  }
}


function shiftColumn(columnNumber,direction){
  let columnValues = [];
  for(let i = columnNumber-1;i < (16);i = i + 4){
    let columnValue = document.querySelector(`#id_${i}`).textContent;
    columnValues.push(columnValue);
  }

  if (direction == "U"){
    columnValues = shiftArrayLeft(columnValues);
  }else if (direction == "D"){
    columnValues = shiftArrayRight(columnValues);
  }
  
  for(let i = columnNumber-1;i < (16);i = i + 4){
    document.querySelector(`#id_${i}`).textContent = columnValues[i/4|0]
  }  

}

function shiftUp(){
  for (let i = 1;i<5;i++){
    shiftColumn(i,"U");
  }
}


function shiftDown(){
  for (let i = 1;i<5;i++){
    shiftColumn(i,"D");
  }
}


function mergeArrayRow(arr,direction){
  let score = document.querySelector('#score');
    if (direction  == "L"){
        for (let i = 0;i<3;i++){
            if(arr[i] == arr[i+1]){
                arr[i] = parseInt(arr[i]) + parseInt(arr[i+1])
                score.textContent = parseInt(score.textContent) + parseInt(arr[i]);
                arr[i+1] = 0;
            }
        }
    }else if(direction == "R"){
        for(let i = 0;i<3;i++){
            if(arr[i] == arr[i+1]){
                arr[i+1] = parseInt(arr[i+1])+ parseInt(arr[i]);
                score.textContent = parseInt(score.textContent) + parseInt(arr[i+1]);
                arr[i] = 0;
            }
        }
    }

    return arr
}


function mergeArrayColumn(arr,direction){
    let score = document.querySelector('#score');
    if (direction  == "U"){
        for (let i = 0;i<3;i++){
            if(arr[i] == arr[i+1]){
                arr[i] = parseInt(arr[i]) + parseInt(arr[i+1]);
                score.textContent = parseInt(score.textContent) + parseInt(arr[i]);
                arr[i+1] = 0;
            }
        }
    }else if(direction == "D"){
        for(let i = 0;i<3;i++){
            if(arr[i] == arr[i+1]){
                arr[i+1] = parseInt(arr[i+1])+ parseInt(arr[i]);
                score.textContent = parseInt(score.textContent) + parseInt(arr[i+1]);
                arr[i] = 0;
            }
        }
    }

    return arr
}

function mergeRow(rowNumber,direction){
  let rowValues = []
  for (let i = 4*(rowNumber-1);i <4*rowNumber ;i++){
    let rowValue = document.querySelector(`#id_${i}`).textContent;
    rowValues.push(rowValue)
  }
  rowValues = mergeArrayRow(rowValues,direction);

  for (let i = 4*(rowNumber-1);i <4*rowNumber ;i++){
  document.querySelector(`#id_${i}`).textContent = rowValues[i%4]
  }
}

function mergeLeft(){
  for (let i  = 1;i < 5;i++){
    mergeRow(i,"L")
  }
}

function mergeRight(){
  for (let i  = 1;i < 5;i++){
    mergeRow(i,"R")
  }
}


function mergeColumn(columnNumber,direction){
  let columnValues = [];
  for(let i = columnNumber-1;i < (16);i = i + 4){
    let columnValue = document.querySelector(`#id_${i}`).textContent;
    columnValues.push(columnValue);
  }

  columnValues = mergeArrayColumn(columnValues,direction);
  for(let i = columnNumber-1;i < (16);i = i + 4){
    document.querySelector(`#id_${i}`).textContent = columnValues[i/4|0]
  }  

}


function mergeUp(){
  for (let i  = 1;i < 5;i++){
    mergeColumn(i,"U")
  }
}

function mergeDown(){
  for (let i  = 1;i < 5;i++){
    mergeColumn(i,"D")
  }
}

function control(e){
  switch(e.keyCode){
    case 37:
      shiftLeft();
      mergeLeft();
      shiftLeft();
      generate();
      isGameOver();
      checkForWin();
      break;
    case 38:
      shiftUp();
      mergeUp();
      shiftUp();
      generate();
      isGameOver();
      checkForWin();
      break;
    case 39:
      shiftRight();
      mergeRight();
      shiftRight();
      generate();
      isGameOver();
      checkForWin();

      break
    case 40:
      shiftDown();
      mergeDown();
      shiftDown();
      generate();
      isGameOver();
      checkForWin();
      break
    }
  }

document.addEventListener('keyup',control);


function arrayChecker(rowValues,ans){
  let count = 0;
  for(let i = 0;i<3;i++){
    if (rowValues[i]== rowValues[i+1]){
      count+=1;
    }
  }
  if (count > 0){
    ans = false
  }
  return ans;
}

function rowArrayChecker(rowNumber,ans){
  let rowValues = []
  for (let i = 4*(rowNumber-1);i <4*rowNumber ;i++){
    let rowValue = document.querySelector(`#id_${i}`).textContent;
    rowValues.push(rowValue)
  }
  
  ans = arrayChecker(rowValues,ans)

  return ans;
}

function rowChecker(ans){
  let countOftrues = 0
  for (let i = 1;i<5;i++){
    ans = rowArrayChecker(i,ans)
    if (ans == true){
      countOftrues += 1;
    }
  }

  if (countOftrues == 4){
    return true
  }else{
    return false;
  }

}


function columnArrayChecker(columnNumber,ans){
  let columnValues = [];
  for(let i = columnNumber-1;i < (16);i = i + 4){
    let columnValue = document.querySelector(`#id_${i}`).textContent;
    columnValues.push(columnValue);
  }
  console.log("columnValues", columnValues);
  ans = arrayChecker(columnValues,ans)

  return ans

}

function columnChecker(ans){
  let countOftrues = 0;
  for (let i = 1;i<5;i++){
    ans = columnArrayChecker(i,ans)
    if (ans == true){
      countOftrues += 1;
    }
  }

  if (countOftrues == 4){
    return true
  }else{
    return false
  }

}




function isGameOver(){
  let ans = true;
  const allBlocks = document.querySelectorAll('.grid > div');
  const emptyblocks = [...allBlocks].filter(item => item.textContent == 0);
  if (emptyblocks.length > 0){
    return false;
  }
  
  ans = rowChecker(ans);

  ans = columnChecker(ans);

  if (ans){
    document.querySelector('#result').textContent = "Game Over!"
    document.removeEventListener('keyup',control)
  }

  return ans
}


function checkForWin(){
  const allBlocks = document.querySelectorAll('.grid > div');
  const winBlocks = [...allBlocks].filter(item => item.textContent == 2048);

  if (winBlocks.length > 0){
    document.querySelector('#result').textContent = "YOU WIN";
        document.removeEventListener('keyup',control)
  }
}



function removeAllTiles(){
  const grid = document.querySelector(".grid");
  const allBlocks = grid.querySelectorAll('div');
  console.log(allBlocks)
  allBlocks.forEach(childDiv =>{
      grid.removeChild(childDiv);
    })
  
}

function scoreReset(){
  document.querySelector('#score').textContent = 0;
}

function messageReset(){
  const result = document.querySelector('#result');
  result.innerHTML = "Join the numbers and get to the <b>2048</b> tile!"

}

function restartGame(){
  removeAllTiles();
  scoreReset();
  messageReset();
  createBoard();
  generate();
  generate();
  document.addEventListener('keyup',control)
}

const restart = document.querySelector('#restart-button');
restart.addEventListener('click',restartGame)