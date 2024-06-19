# Starter Next/Hardhat Project

After cloning the github, you will want to do the following to get the code running on your computer.

1. Inside the project directory, in the terminal type: npm i
2. Open two additional terminals in your VS code
3. In the second terminal type: npx hardhat node
4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
5. Back in the first terminal, type npm run dev to launch the front-end.

After this, the project will be running on your localhost. 
Typically at http://localhost:3000/
# changes made

First change is addition of Donate function in my website 
---this is done by making a function Bank_transfer in the assesment.sol 
```javascript
 function Bank_transfer(uint256 amount, address _address) public payable {
        require(msg.sender == owner, "You are not the owner of this account");
        uint _previousBalance = balance;
        if (balance < amount) {
            revert InsufficientBalance({
                balance: balance,
                withdrawAmount: amount
            });
        }

        // decrease the given amount
        balance -= amount;
        Amount[_address]=amount;            ///new addition

        // assert the balance is correct
        assert(balance == (_previousBalance - amount));

        // emit the event
        emit Withdraw(amount);
    }
```
## addition of "Basic Casino Game"

code:
```javascript
export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);

  const [number, setNumber] = useState(null);        ///////change 1
  const [guess, setGuess] = useState(null);
  const [result, setResult] = useState(null);
```

```javascript
  const generateNumber = () => {
    const randomNum = Math.floor(Math.random() * 100);
    setNumber(randomNum);                                        ////change 3
    setGuess(null);
    setResult(null);
  };

  const handleGuess = (userGuess) => {
    setGuess(userGuess);
    const isEven = number % 2 === 0;
    const userGuessedCorrectly = (isEven && userGuess === "even") || (!isEven && userGuess === "odd");
    setResult(userGuessedCorrectly ? "You guessed correctly!" : "Sorry, you guessed wrong.");

    if (userGuessedCorrectly) {
      deposit();
    }
  };
```

```javascript
 <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h2>Basic Casino Game</h2>
          <button onClick={generateNumber} style={{ padding: "10px 20px", fontSize: "16px" }}>
            Generate Number
          </button>
          {number !== null && (
            <>
              <div style={{ marginTop: "20px" }}>
                <button onClick={() => handleGuess("even")} style={{ padding: "10px 20px", marginRight: "10px", fontSize: "16px" }}>
                  Even
                </button>
                <button onClick={() => handleGuess("odd")} style={{ padding: "10px 20px", fontSize: "16px" }}>
                  Odd
                </button>
              </div>
              {guess && (
                <div style={{ marginTop: "20px", fontSize: "18px" }}>
                  <p>The number was: {number}</p>
                  <p>{result}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  };
```
## Authors
Paaras

## License

This project is licensed under the MIT License - see the LICENSE.md file for details

