
// A template for creating a bank user. 
function bankUser(Name, Surname, Balance, Salary){
    // Properties of the Manager in his/her branch
    this.Name               = Name
    this.Surname            = Surname
    this.Balance            = Balance
    this.Salary             = Salary
}

// Creating Gandalf the Gray as a bank user. 
let GrayGandalf = new bankUser(
    "Gandalf",
    "The Brown",
    300,
    120,
)

window.onload = function(){
    document.getElementById('Gandalf').innerHTML = GrayGandalf.Name + " " + GrayGandalf.Surname
    document.getElementById('btn-getLoan').addEventListener("click", getLoan);
    document.getElementById('text-Balance').innerHTML = "Balance:   " + GrayGandalf.Balance
}

// Assign the Loan boolean as false because the loan has not been received yet
let gotLoan = false


// getLoan function checks for the requirements provided by the assignment document
function getLoan(amount){
    
    amount = 0
    //? Prompt popping up when asking for an amount for the Loan
    amount = Number(window.prompt("Type the amount for the Loan "))
    console.log("Gandalf got: " + GrayGandalf.Balance)
    
    if (amount >= ((GrayGandalf.Balance)*2))
        amount = 0 
        alert("The amount cannot be double your balance, please try again.")
        getLoan()

    if(gotLoan == true)
        alert("You have already received a loan, there will be no second loan before the previous one is repaid.")
    
    else {
        console.log("Getting loan....")
        console.log("Loan amount is: " + amount)
        gotLoan = true
        GrayGandalf.Balance = GrayGandalf.Balance + amount
        document.getElementById('text-Balance').innerHTML = "Balance:   " + GrayGandalf.Balance
    }
}

let outstandingValueBoolean = false

function checkLoanRepaid(Amount){
    if (Amount == 0)
        gotLoan = false       
}

function add(value, add){
    return value + add
}

function subtract(value, subtract) {
    return value - subtract
}


