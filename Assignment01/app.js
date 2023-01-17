const select_computers = document.getElementById("laptops")
const specs_list = document.getElementById("specs-list")
pc_description = document.getElementById("text-pc-paragraph")
pc_title       = document.getElementById("text-pc-title")
pc_price       = document.getElementById("text-pc-price")

let laptops = []
let specs = []

// Loading elements when window is loaded....
window.onload = function(){

    document.getElementById('laptops').addEventListener("change", laptopChange)
    //! FIXED TEXT ELEMENTSS
    document.getElementById('Gandalf').innerHTML = GrayGandalf.Name + " " + GrayGandalf.Surname

    //! BUTTONS
    document.getElementById('btn-getLoan').addEventListener("click", getLoan)
    document.getElementById('btn-doWork').addEventListener("click", work)
    document.getElementById('btn-bank').addEventListener("click", bank)
    document.getElementById('btn-payLoan').addEventListener("click", payLoan)
    document.getElementById('btn-payLoan').style.visibility = "hidden"

    //! CHANGEABLE TEXT ELEMENTS
    document.getElementById('text-per-balance').innerHTML = "Balance:   " + GrayGandalf.SalaryBalance
    document.getElementById('text-Balance').innerHTML = "Balance:   " + GrayGandalf.Balance
}

fetch("https://hickory-quilled-actress.glitch.me/computers")
    .then(response => response.json())
    .then(data => laptops = data)
    .then(laptops => addLaptops(laptops))


const addLaptops = (laptops) => {
    laptops.forEach(i => addLaptop(i))

    laptops[0].specs.forEach(function (item) {
        let newElement = document.createElement("li")
        let newContent = document.createTextNode(item)
        newElement.appendChild(newContent)
        document.querySelector("#specs-list").appendChild(newElement)
    })

    pc_title.innerHTML       = laptops[0].title
    pc_description.innerHTML = laptops[0].description
    pc_price.innerHTML       = laptops[0].price


}

const addLaptop = (laptop) => {
    //! ---------------
    const computers = document.createElement("option")
    //! ---------------
    computers.value = laptop.id
    //! ---------------
    computers.appendChild(document.createTextNode(laptop.title))
    //! ---------------
    select_computers.appendChild(computers)
}

const laptopChange = x => {
    const computer = laptops[x.target.selectedIndex]
    
    document.querySelector('#specs-list').innerHTML = ""

    computer.specs.forEach(function (item) {
        let newElement = document.createElement("li")
        let newContent = document.createTextNode(item)
        newElement.appendChild(newContent)
        document.querySelector("#specs-list").appendChild(newElement)
    })

    console.log(computer.title)
    console.log(computer.description)

    pc_title.innerHTML       = computer.title
    pc_description.innerHTML = computer.description
    pc_price.innerHTML       = computer.price

};

// ? GLOBAL VARIABLES
let gotLoan = false
let outstandingValueBoolean = false
payLoan.disableButton = false
// ???????????????

//! Function for disabling a button
const disableButton = (button) => {
    console.log("va");
      button.disabled = true;
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
        payLoan.disableButton = false
        GrayGandalf.outLoan += amount
        document.getElementById('text-outstanding-loan')
        .innerHTML = "Loan: " + GrayGandalf.outLoan

        //! Setting boolean values to true, both the oustanding and the loan itself
        outstandingValueBoolean = true
        gotLoan                 = true

        GrayGandalf.Balance = GrayGandalf.Balance + amount
        document.getElementById('text-Balance')
        .innerHTML = "Balance: " + GrayGandalf.Balance

        document.getElementById('btn-payLoan').style.visibility = "visible"
    }
}

//! Paying back the loan
function payLoan () {

    if (GrayGandalf.SalaryBalance < GrayGandalf.outLoan){
        alert("Why is it that you're broke all the time? Work some more, then pay back the loan..")
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
        document.getElementById('btn-payLoan').style.visibility = "hidden"
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

