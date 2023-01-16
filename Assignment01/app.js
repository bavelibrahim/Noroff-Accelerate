
var computers_btn_list = document.getElementById("computers")
const btn_payLoan = document.querySelector('btn-payLoan')
const btn_doWork = document.querySelector('btn-doWork')
const btn_bank = document.querySelector('btn-bank')
const btn_getLoan = document.querySelector('btn-getLoan')
const balance_per = document.querySelector('text-per-balance')
const balance_bank = document.querySelector('text-Balance')


// Loading elements when window is loaded....
window.onload = function(){

    //! FIXED TEXT ELEMENTSS
    document.getElementById('Gandalf').innerHTML = GrayGandalf.Name + " " + GrayGandalf.Surname

    //! BUTTONS
    document.getElementById('btn-getLoan').addEventListener("click", getLoan)
    document.getElementById('btn-doWork').addEventListener("click", work)
    document.getElementById('btn-bank').addEventListener("click", bank)
    document.getElementById('btn-payLoan').addEventListener("click", payLoan)

    btn_payLoan.addEventListener('click', payLoan)
    btn_doWork.addEventListener('click', work)
    btn_bank.addEventListener('click', bank)
    btn_getLoan.addEventListener('click', getLoan)

    //! CHANGEABLE TEXT ELEMENTS
    balance_per.innerHTML = "Balance:   " + GrayGandalf.SalaryBalance
    balance_bank.innerHTML = "Balance:   " + GrayGandalf.Balance
}
// ? GLOBAL VARIABLES

let gotLoan = false
let outstandingValueBoolean = false

// ???????????????

const disableButton = () => {
    console.log("Disable Button")    
}

// A template for creating a bank user. 
function bankUser(Name, Surname, Balance, Salary, SalaryBalance, outLoan){
    // Properties of the Manager in his/her branch
    this.Name               = Name
    this.Surname            = Surname
    this.Balance            = Balance
    this.Salary             = Salary
    this.SalaryBalance      = SalaryBalance
    this.outLoan            = outLoan
}

// Creating Gandalf the Gray as a bank user. 
let GrayGandalf = new bankUser(
    "Gandalf",
    "The Brown",
    0,
    100,
    0,
    0
)

function onChange() {
    var value = computers_btn_list.value
    var text = computers_btn_list.text
    console.log(value,text)
}
computers_btn_list.onchange = onChange()
onChange()

//! getLoan function checks for the requirements provided by the assignment document
function getLoan(){
    
    console.log("Your Balance is: " + GrayGandalf.Balance)

    if (GrayGandalf.Balance == 0){
        alert("You lazy ass, go do some work... you're broke")
        return
    }

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
        GrayGandalf.outLoan += amount
        document.getElementById('text-outstanding-loan')
        .innerHTML = "Loan: " + GrayGandalf.outLoan

        //! Setting boolean values to true, both the oustanding and the loan itself
        outstandingValueBoolean = true
        gotLoan                 = true

        GrayGandalf.Balance = GrayGandalf.Balance + amount
        document.getElementById('text-Balance')
        .innerHTML = "Balance: " + GrayGandalf.Balance
    }
}

//! Paying back the loan
function payLoan () {

    if (GrayGandalf.SalaryBalance < GrayGandalf.outLoan){
        alert("Why is that you're broke all the time? Work some more, then pay back the loan..")
        return
    }

    else {
        outstandingValueBoolean = false
        gotLoan = false
        GrayGandalf.SalaryBalance -= GrayGandalf.outLoan
        GrayGandalf.outLoan = 0
        document.getElementById('text-outstanding-loan')
        .innerHTML = "Loan: " + GrayGandalf.outLoan
        document.getElementById('text-per-balance')
        .innerHTML = "Balance: " + GrayGandalf.SalaryBalance
        alert("Your loan has been paid back")
    }

}

//! Banking the salary
function bank(){

    if (outstandingValueBoolean == true){
        
        addToOutLoan = GrayGandalf.SalaryBalance / 10
        addToBank    = GrayGandalf.SalaryBalance - addToOutLoan
        
        GrayGandalf.Balance = GrayGandalf.Balance + addToBank
        GrayGandalf.outLoan = GrayGandalf.outLoan + addToOutLoan

        document.getElementById('text-Balance').innerHTML = "Balance:   " + GrayGandalf.Balance
        document.getElementById('text-outstanding-loan').innerHTML = "Loan: " + GrayGandalf.outLoan
    }

    else if (outstandingValueBoolean == false){
        GrayGandalf.Balance = GrayGandalf.SalaryBalance + GrayGandalf.Balance
        document.getElementById('text-Balance').innerHTML = "Balance:   " + GrayGandalf.Balance
    }

    GrayGandalf.SalaryBalance = 0
    document.getElementById('text-per-balance').innerHTML = "Balance:   " + GrayGandalf.SalaryBalance
}


//! the function Work adds a certain amount of money (100) to the users personal balance before adding it to the bank
function work(){
    GrayGandalf.SalaryBalance += 100
    document.getElementById('text-per-balance')
    .innerHTML = "Balance:   " + GrayGandalf.SalaryBalance
}

function checkLoanRepaid(Amount){
    if (Amount == 0)
        gotLoan = false       
}