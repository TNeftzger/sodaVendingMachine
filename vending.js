var messageEl = document.getElementById("message")
var paidEl = document.getElementById("paid")

var msg = ""
var change = 0
var moneyInserted = 0

var totalPaid = 0
var sodas = ["Coke", "Pepsi", "Dr. Pepper"]

const currency_quarter = 0.25

const price = .50

//Custom Event Testing for Sailthru
Sailthru.integration('customEvent', {
    "name" : "needToCheckSite", 
    "email" : "tneftzger@campaignmonitor.com"
});

//Add Purchases Online
Sailthru.integration("purchase", {
    "email": "tneftzger@campaignmonitor.com",
    "items": [{
            "url": "https://varickandvandam.com/collections/men-accessories/products/1167959",
            "sku": 918273645, 
            "qty": 1,
            "title": "Stylish Backpack",
            "price": 13900,
            "images": {"https://cdn.shopify.com/s/files/1/1531/3835/products/1167959_1_large_bcf96c32-415c-4ecd-8633-73d596d5c73c_grande.jpg"}, 
            "vars" : {"color":"blue","material":"stainless steel"}    
        }],
});

Sailthru.integration("purchase", {
    "email": "tneftzger@campaignmonitor.com",
    "items": [{
            "url": "https://www.mobile.sailthru.com/not-a-real-item",
            "sku": 12675432, 
            "qty": 1,
            "title": "Lovely Coat",
            "price": 9900,
            "images": {"https://image.s5a.com/is/image/saks/0400017951451_MULTI"}, 
            "vars" : {"attire":"nighttime","material":"satin"}    
        }],
});

// Calculates how much money was entered
function getTotal() {
    var currency_quarters = Number(document.getElementById("quarters").value)
    

    if (currency_quarters > 0) {
        currency_quarters = currency_quarters * currency_quarter
    }

    totalPaid = currency_quarters
    return totalPaid.toFixed(2)
}

// Updates the display of Total Entered
function tally() {
    moneyInserted = getTotal()
    document.getElementById("paid").innerHTML = moneyInserted
}

// Resets the amount of Total Entered
function clearTally() {
    moneyInserted = 0
    document.getElementById("paid").innerHTML = moneyInserted
}

// Resets the form back to 0
function clearForm() {
  
    document.getElementById("quarters").value = 0
   
}

// Calculates the difference from total paid from price
function calculateChange() {
    var tempChange = 0

    if (getTotal() != 0) {
        return tempChange = (getTotal() - price).toFixed(2)
    }

    return tempChange.toFixed(2)
}

// Generate messages based on soda selected and amount paid
function dispenseSoda(soda) {
    messageEl.innerHTML = ''
    change = 0

    var selectedSoda = sodas[soda]
    
    change = calculateChange()

    if (change < 0) {
        msg = "You did not pay enough. $" + totalPaid.toFixed(2) + " has been returned to the coin return."
        totalPaid = 0
        change = 0
        clearForm()
        clearTally()
        messageEl.innerHTML = msg
    } else if (change > 0) {
        msg = selectedSoda + " has been dispensed. $" + change + " has been returned to the coin return."
        totalPaid = 0
        change = 0
        clearForm()
        clearTally()
        messageEl.innerHTML = msg
    } else if (totalPaid == 0) {
        msg = "Please pay before you select a soda."
        messageEl.innerHTML = msg
    } else if (change == 0) {
        msg = selectedSoda + " has been dispensed."
        totalPaid = 0
        change = 0
        clearForm()
        clearTally()
        messageEl.innerHTML = msg
    } 
}

// Cancels the transaction and resets the page
function cancel() {
    getTotal()
    if (totalPaid > 0) {
        msg = "Transaction cancelled. $" + totalPaid.toFixed(2) + " has been returned to the coin return."

        clearForm()
        clearTally()

        messageEl.innerHTML = msg
    } else if (totalPaid == 0) {
        msg = "Insert money first. Select a soda."

        messageEl.innerHTML = msg
    }
}
