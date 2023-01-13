// ? GLOBAL VARIABLES

let gotLoan = false
let outstandingValueBoolean = false

// ???????????????

// A template for creating a bank user. 
function bankUser(Name, Surname, Balance, Salary, SalaryBalance, outLoan){
    // Properties of the Manager in his/her branch
    this.Name               = Name
    this.Surname            = Surname
    this.Balance            = Balance
    this.Salary             = Salary
    this.SalaryBalance      = SalaryBalance
    this.out_Loan           = outLoan
}

// Creating Gandalf the Gray as a bank user. 
let GrayGandalf = new bankUser(
    "Gandalf",
    "The Brown",
    300,
    100,
    0,
    0
)

// Loading elements when window is loaded....
window.onload = function(){

    //! FIXED TEXT ELEMENTSS
    document.getElementById('Gandalf').innerHTML = GrayGandalf.Name + " " + GrayGandalf.Surname

    //! BUTTONS
    document.getElementById('btn-getLoan').addEventListener("click", getLoan)
    document.getElementById('btn-doWork').addEventListener("click", work)

    //! CHANGEABLE TEXT ELEMENTS
    document.getElementById('text-per-balance').innerHTML = "Balance:   " + GrayGandalf.SalaryBalance
    document.getElementById('text-Balance').innerHTML = "Balance:   " + GrayGandalf.Balance
}

// getLoan function checks for the requirements provided by the assignment document
function getLoan(){
    
    //? Prompt popping up when asking for an amount for the Loan
    amount = Number(window.prompt("Type the amount for the Loan"))

    while (amount >= (GrayGandalf.Balance * 2) && gotLoan == false){
        amount = Number(window.prompt("The amount cannot be double or more, please type the amount for the Loan: "))
    }
    
    if(gotLoan == true && amount != 0){
        alert("You have already received a loan, there will be no second loan before the previous one is repaid.")
        amount = 0
    }

    else if (gotLoan == false){
        document.getElementById('text-outstanding-loan')
        .innerHTML = "Loan: " + amount
        gotLoan = true
        newBalance = GrayGandalf.Balance + amount
        document.getElementById('text-Balance')
        .innerHTML = "Balance: " + newBalance
    }
}

// the function Work adds a certain amount of money to the users personal balane before adding it to the bank
function work(){
    GrayGandalf.SalaryBalance += 100
    document.getElementById('text-per-balance')
    .innerHTML = "Balance:   " + GrayGandalf.SalaryBalance
}

function checkLoanRepaid(Amount){
    if (Amount == 0)
        gotLoan = false       
}
