var screen = document.querySelector("#screen")
var screenHistory = document.querySelector("#screenHistory")
var btn = document.querySelector(".container-btn")
var dotStatus = true
var thousand = true
btn.addEventListener("click", function (e) {
    var btnClick = e.target
    var valueBtn = btnClick.innerText
    var valueBef = screen.value.substr(screen.value.length - 1)
    var regThousand = /\B(?=(\d{3})+(?!\d))/g
    var regComma = /,/g

    if (valueBtn == "AC") {
        screen.value = ""
        screenHistory.value = ""
        dotStatus = true
        thousand = true
    } else if (valueBtn == "CE") {
        if (valueBef == '.') {
            dotStatus = true
        }
        screen.value = screen.value.slice(0, -1)
    } else if (valueBtn == "=") {
        if (valueBef != '+' && valueBef != '/' && valueBef != '-' && valueBef != '*' && valueBef != '.') {
            let repVal = screen.value.replace(regComma, '')
            let screenVal = screen.value
            let val = eval(repVal).toString().replace(regThousand, ",")
            val = val.split('.')
            if (val.length > 1) {
                dotStatus = false
                thousand = false
                val[1] = val[1].replace(regComma, '')
            }
            screen.value = val.join('.')
            screenHistory.value = screenVal + '=' + screen.value
        }
    } else if (valueBtn == '+' || valueBtn == '/' || valueBtn == '-' || valueBtn == '*') {
        dotStatus = true
        thousand = true
        if (valueBef == '+' || valueBef == '/' || valueBef == '-' || valueBef == '*') {
            screen.value = screen.value.replace(/.$/, valueBtn)
        } else {
            if (screen.value != '') {
                screen.value = screen.value + valueBtn
            }
        }
    } else if (valueBtn == '.') {
        if (screen.value == '') {
            screen.value = '0' + valueBtn
        } else if (valueBef == '+' || valueBef == '/' || valueBef == '-' || valueBef == '*') {
            screen.value = screen.value + '0' + valueBtn
        } else if (valueBef != '.' && dotStatus) {
            dotStatus = false
            thousand = false
            screen.value = screen.value + valueBtn
        }
    } else {
        if (screen.value == '0' && valueBtn > '0') {
            screen.value = valueBtn
        } else {
            screen.value = screen.value + valueBtn
            if (thousand) {
                screen.value = screen.value.replace(regComma, '')
                screen.value = screen.value.replace(regThousand, ',')
            }
        }
    }
});