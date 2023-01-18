//! Initiliazing some of the variables here, because it created issues for me down below in window.onLoad
const select_computers = document.getElementById("laptops")
const specs_list = document.getElementById("specs-list")
pc_description = document.getElementById("text-pc-paragraph")
pc_title       = document.getElementById("text-pc-title")
pc_price       = document.getElementById("text-pc-price")
pc_image       = document.getElementById("pc-img")

//! Two arrays, one for laptops in the catalog, the other for the list of specs of each laptop
let laptops = []
let specs = []

//! Loading elements when window is loaded....
window.onload = function(){

    document.getElementById('laptops').addEventListener("change", laptopChange)
    //! Name of the preinitialized user
    document.getElementById('Gandalf').innerHTML = GrayGandalf.Name + " " + GrayGandalf.Surname

    //! BUTTONS
    document.getElementById('btn-getLoan').addEventListener("click", getLoan)
    document.getElementById('btn-doWork').addEventListener("click", work)
    document.getElementById('btn-bank').addEventListener("click", bank)
    document.getElementById('btn-payLoan').addEventListener("click", payLoan)
    document.getElementById('btn-payForComputer').addEventListener("click", payPC)
    document.getElementById('btn-payLoan').style.visibility = "hidden"

    //! CHANGEABLE TEXT ELEMENTS
    document.getElementById('text-per-balance').innerHTML = "Balance:   " + GrayGandalf.SalaryBalance
    document.getElementById('text-Balance').innerHTML = "Balance:   " + GrayGandalf.Balance
}

//! Getting the information from the API
fetch("https://hickory-quilled-actress.glitch.me/computers")
    .then(response => response.json())
    .then(data => laptops = data)
    .then(laptops => addLaptops(laptops))

//! initializing the elements for the selectbox, title, pc description and 
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
//! This functions loops through addLaptops, executing this for each laptop
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
//! Whenever another computer is selected in the selectbox the information will change.
//! This function executes this task.
const laptopChange = x => {
    const computer = laptops[x.target.selectedIndex]
    
    document.querySelector('#specs-list').innerHTML = ""

    computer.specs.forEach(function (item) {
        let newElement = document.createElement("li")
        let newContent = document.createTextNode(item)
        newElement.appendChild(newContent)
        document.querySelector("#specs-list").appendChild(newElement)
    })

    //! There was an issue regarding image number 5 where the file was originally a png, but it was
    //! presented as a JPG in the API. The fix is done like this because the information is known
    //! If it was a bigger generated list, this would've been done differently
    if (computer.id == 5)
        pc_image.src = "https://hickory-quilled-actress.glitch.me/" + "assets/images/5.png"
    else
        pc_image.src = "https://hickory-quilled-actress.glitch.me/" + computer.image
    
    pc_title.innerHTML       = computer.title
    pc_description.innerHTML = computer.description
    pc_price.innerHTML       = computer.price

};

// ? GLOBAL VARIABLES that are defined to check if a loan is active and another for the outstanding loan
let gotLoan = false
let outstandingValueBoolean = false
// ???????????????

//! A template for creating a bank user. 
function bankUser(Name, Surname, Balance, Salary, SalaryBalance, outLoan){
    //! Properties of the User in his/her branch
    this.Name               = Name
    this.Surname            = Surname
    this.Balance            = Balance
    this.Salary             = Salary
    this.SalaryBalance      = SalaryBalance
    this.outLoan            = outLoan
}

//! Creating Gandalf the Gray as a bank user. I love LOTR, sorry...
let GrayGandalf = new bankUser(
    "Gandalf",
    "The Brown",
    0,
    100,
    0,
    0
)   

//! The getLoan function obtains the loan for the user. 
//! Some requirements were set when receiving the loan, these are set here.
function getLoan(){
    
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

//! This function will pay back the loan
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
//! This functions executes whenever the pay button in the computer section is pressed. 
//! It will check if the user have enough balance to buy the computer, otherwise it will cancel the payment. 
function payPC(){

    if (pc_price.innerHTML > GrayGandalf.Balance){
        alert("You do not have enough money in the bank to pay for this PC, please obtain some more money. This pc costs: " + pc_price.innerHTML)
        return;
    }
    else {
        alert("Congratulations, you're now an owner of a new: " + pc_title.innerHTML)
        GrayGandalf.Balance -= pc_price.innerHTML
        document.getElementById('text-Balance')
        .innerHTML = "Balance:   " + GrayGandalf.Balance;
    }
}