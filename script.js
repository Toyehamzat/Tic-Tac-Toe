
const Player = (marker) => {
  this.marker = marker;

  const getmarker = () => {
    return marker;
  };

  return { getmarker };
};

const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const setField = (index, marker) => {
    if (index > board.length) return;
    board[index] = marker;
  };

  const getField = (index) => {
    if (index > board.length) return;
    return board[index];
  };

  const reset = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  };

  return { setField, getField, reset };
})();

const displayController = (() => {
  const fieldElements = document.querySelectorAll(".field");
  const messageElement = document.getElementById("message");
  const restartButton = document.getElementById("restart-button");

  fieldElements.forEach((field) =>
    field.addEventListener("click", (e) => {
      if (gameController.getIsOver() || e.target.textContent !== "") return;
      gameController.playRound(parseInt(e.target.dataset.index));
      updateGameboard();
    })
  );

  restartButton.addEventListener("click", (e) => {
    gameBoard.reset();
    gameController.reset();
    updateGameboard();
    setMessageElement("Player X's turn");
  });

  const updateGameboard = () => {
    for (let i = 0; i < fieldElements.length; i++) {
      fieldElements[i].textContent = gameBoard.getField(i);
    }
  };

  const setResultMessage = (winner) => {
    if (winner === "Draw") {
      setMessageElement("It's a draw!");
    } else {
      setMessageElement(`Player ${winner} has won!`);
    }
  };

  const setMessageElement = (message) => {
    messageElement.textContent = message;
  };

  return { setResultMessage, setMessageElement };
})();

const gameController = (() => {
  const playerX = Player("X");
  const playerO = Player("O");
  let round = 1;
  let isOver = false;

  const playRound = (fieldIndex) => {
    gameBoard.setField(fieldIndex, getCurrentPlayermarker());
    if (checkWinner(fieldIndex)) {
      displayController.setResultMessage(getCurrentPlayermarker());
      isOver = true;
      return;
    }
    if (round === 9) {
      displayController.setResultMessage("Draw");
      isOver = true;
      return;
    }
    round++;
    displayController.setMessageElement(
      `Player ${getCurrentPlayermarker()}'s turn`
    );
  };

  const getCurrentPlayermarker = () => {
    return round % 2 === 1 ? playerX.getmarker() : playerO.getmarker();
  };

  const checkWinner = (fieldIndex) => {
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
      .filter((combination) => combination.includes(fieldIndex))
      .some((possibleCombination) =>
        possibleCombination.every(
          (index) => gameBoard.getField(index) === getCurrentPlayermarker()
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

//
// const Player = (marker) => {
//   this.marker = marker;

//   const getmarker = () => {
//     return marker;
//   };

//   return { getmarker };
// };

// const gameBoard = (() => {
//   const board = ["", "", "", "", "", "", "", "", ""];

//   const setField = (index, marker) => {
//     if (index > board.length) return;
//     board[index] = marker;
//   };

//   const getField = (index) => {
//     if (index > board.length) return;
//     return board[index];
//   };

//   const reset = () => {
//     for (let i = 0; i < board.length; i++) {
//       board[i] = "";
//     }
//   };

//   return { setField, getField, reset };
// })();

// const displayController = (() => {
//   const fieldElements = document.querySelectorAll(".field");
//   const messageElement = document.getElementById("message");
//   const restartButton = document.getElementById("restart-button");

//   fieldElements.forEach((field) =>
//     field.addEventListener("click", (e) => {
//       if (gameController.getIsOver() || e.target.textContent !== "") return;
//       gameController.playRound(parseInt(e.target.dataset.index));
//       updateGameboard();
//     })
//   );

//   restartButton.addEventListener("click", (e) => {
//     gameBoard.reset();
//     gameController.reset();
//     updateGameboard();
//     setMessageElement("Player X's turn");
//   });

//   const updateGameboard = () => {
//     for (let i = 0; i < fieldElements.length; i++) {
//       fieldElements[i].textContent = gameBoard.getField(i);
//     }
//   };

//   const setResultMessage = (winner) => {
//     if (winner === "Draw") {
//       setMessageElement("It's a draw!");
//     } else {
//       setMessageElement(`Player ${winner} has won!`);
//     }
//   };

//   const setMessageElement = (message) => {
//     messageElement.textContent = message;
//   };

//   return { setResultMessage, setMessageElement };
// })();

// const gameController = (() => {
//   const playerX = Player("X");
//   const playerO = Player("O");
//   let round = 1;
//   let isOver = false;

//   const playRound = (fieldIndex) => {
//     gameBoard.setField(fieldIndex, getCurrentPlayermarker());
//     if (checkWinner(fieldIndex)) {
//       displayController.setResultMessage(getCurrentPlayermarker());
//       isOver = true;
//       return;
//     }
//     if (round === 9) {
//       displayController.setResultMessage("Draw");
//       isOver = true;
//       return;
//     }
//     round++;
//     displayController.setMessageElement(
//       `Player ${getCurrentPlayermarker()}'s turn`
//     );
//   };

//   const getCurrentPlayermarker = () => {
//     return round % 2 === 1 ? playerX.getmarker() : playerO.getmarker();
//   };

//   const checkWinner = (fieldIndex) => {
//     const winConditions = [
//       [0, 1, 2],
//       [3, 4, 5],
//       [6, 7, 8],
//       [0, 3, 6],
//       [1, 4, 7],
//       [2, 5, 8],
//       [0, 4, 8],
//       [2, 4, 6],
//     ];

//     return winConditions
//       .filter((combination) => combination.includes(fieldIndex))
//       .some((possibleCombination) =>
//         possibleCombination.every(
//           (index) => gameBoard.getField(index) === getCurrentPlayermarker()
//         )
//       );
//   };

//   const getIsOver = () => {
//     return isOver;
//   };

//   const reset = () => {
//     round = 1;
//     isOver = false;
//   };

//   return { playRound, getIsOver, reset };
// })();

// //