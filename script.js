"use strict";

const Player = (sign) => {
  this.sign = sign;
  const getSign = () => {
    return sign;
  };
  return { getSign };
};

const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const setcell = (index, sign) => {
    //if (index > board.length) return;
    board[index] = sign;
  };
  const getcell = (index) => {
    //if (index > board.length) return;
    return board[index];
  };
  const reset = () => {
    for (let i = 0; i < board.length; i++)
    {
      board[i] = "";
    }
  };

  return { setcell, getcell, reset };
})();

const dispcon = (() => {
  const cellElements = document.querySelectorAll(".cell");
  const messageElement = document.getElementById("message");
  const restartButton = document.getElementById("restart");

  cellElements.forEach((cell) =>
    cell.addEventListener("click", (e) => {
      if (gamecon.getIsOver() || e.target.textContent !== "")
      return;
      gamecon.playRound(parseInt(e.target.dataset.index));
      updtboard();
    })
  );

  restartButton.addEventListener("click", (e) => {
    gameBoard.reset();
    gamecon.reset();
    updtboard();
    setMessageElement("Player X's turn");
  });

  const updtboard = () => {
    for (let i = 0; i < cellElements.length; i++)
    {
      cellElements[i].textContent = gameBoard.getcell(i);
    }
  };

  const setmsg = (winner) => {
    if (winner === "Draw")
    setMessageElement("It's a draw!");
     else 
      setMessageElement(`Player ${winner} has won!`);
  };

  const setMessageElement = (message) => {
    messageElement.textContent = message;
  };

  return { setmsg, setMessageElement };
})();

const gamecon = (() => {
  const playerX = Player("X");
  const playerO = Player("O");
  let round = 1;
  let isOver = false;

  const playRound = (cellIndex) => {
    gameBoard.setcell(cellIndex, getCurrentPlayerSign());
    if (checkWinner(cellIndex)) {
      dispcon.setmsg(getCurrentPlayerSign());
      isOver = true;
      return;
    }
    if (round === 9) {
      dispcon.setmsg("Draw");
      isOver = true;
      return;
    }
    round++;
    dispcon.setMessageElement(
      `Player ${getCurrentPlayerSign()}'s turn`
    );
  };

  const getCurrentPlayerSign = () => {
    return round % 2 === 1 ? playerX.getSign() : playerO.getSign();
  };

  const checkWinner = (cellIndex) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winConditions
      .filter((combination) => combination.includes(cellIndex))
      .some((possibleCombination) =>
        possibleCombination.every(
          (index) => gameBoard.getcell(index) === getCurrentPlayerSign()
        )
      );
  };

  const getIsOver = () => {
    return isOver;
  };

  const reset = () => {
    round = 1;
    isOver = false;
  };

  return { playRound, getIsOver, reset };
})();