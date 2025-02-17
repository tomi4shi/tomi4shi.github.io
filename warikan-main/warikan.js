function allController(){
    //計算結果リセット
    viewResult("", "");

    //入力値取得
    const totalAmount = document.getElementById('total-amount').value;
    const numPeople = document.getElementById('num-people').value;
    const fixedPeople = fixSpace(document.getElementById('fixed-people').value);
    const fixedAmount = fixSpace(document.getElementById('fixed-amount').value);

    //各種チェック
    if(!checkInteger(totalAmount, numPeople, fixedPeople, fixedAmount)) return;
    let errmessage = checkTotalAmount(totalAmount);
    if(errmessage !== "") {alert(errmessage); return;}
    errmessage = checkNumPeople(numPeople);
    if(errmessage !== "") {alert(errmessage); return;}
    errmessage = checkMax(fixedPeople, 99, "金額を固定したい人数が99人を超えています。");
    if(errmessage !== "") {alert(errmessage); return;}
    errmessage = checkMax(fixedAmount, 999999, "固定する金額が999,999円を超えています。");
    if(errmessage !== "") {alert(errmessage); return;}

    //計算
    let warikan = warikanCalc(totalAmount, numPeople, fixedPeople, fixedAmount);
    let zan = zanCalc(totalAmount, numPeople, fixedPeople, fixedAmount, warikan);
    console.log("割り勘=" + warikan);
    console.log("残り=" + zan);

    //出力チェック
    errmessage = checkWarikan(warikan);
    if(errmessage !== "") {alert(errmessage); return;}

    //出力
    viewResult(warikan, zan);
}

function viewResult(warikan, zan){
    document.getElementById('view-amount').innerHTML = Number(warikan).toLocaleString()
    document.getElementById('view-zan').innerHTML = Number(zan).toLocaleString();
}


//不足金額の計算
function zanCalc(totalAmount, numPeople, fixedPeople, fixedAmount, warikan){
    return totalAmount - (fixedPeople * fixedAmount) - (warikan * numPeople);
}

//割り勘の計算
function warikanCalc(totalAmount, numPeople, fixedPeople, fixedAmount){
    return Math.ceil((totalAmount - (fixedPeople * fixedAmount)) / numPeople); // 切り下げにするところを切り上げにする　floor > ceilにする
}

//出力チェック
function checkWarikan(warikan){
    let text = "";
    if(warikan < 1) text = "割り勘の金額が1円未満です。"
    return text;
}

function fixSpace(value){
    return value === "" ? 0 : value;
}

function checkMax(value, max, errmessage){
    let text = ""
    if(value === 0) return text;
    if(value > max) text = errmessage;
    return text;
}

function checkNumPeople(numPeople){
    let max = 100;
    let min = 1;
    let text = "";
    if(numPeople === "") text = "割り勘をしたい人数が空です。";
    if(parseInt(numPeople) < min) text = "割り勘をしたい人数が1人未満です。";
    if(parseInt(numPeople) > max) text = "割り勘をしたい人数が99人を超えています。";
    return text;
}

function checkTotalAmount(totalAmount){
    let max = 999999;
    let text = "";
    if(totalAmount === "") text = "合計金額が空です。";
    if(parseInt(totalAmount) > max) {while (true) {}}// text = "合計金額が999,999円を超えています。"; ← 元のコードから無限ループが発生してクラッシュするようにしている
    return text;
}

function checkInteger(totalAmount, numPeople, fixedPeople, fixedAmount){
    let result = true;
    let pattern = /[^0-9]+/;
    let message = "整数以外の文字が含まれる箇所があります。"

    if(String(totalAmount).match(pattern) !== null) result = false;
    if(String(numPeople).match(pattern) !== null) result = false;
    if(String(fixedPeople).match(pattern) !== null) result = false;
    if(String(fixedAmount).match(pattern) !== null) result = false;

    if(!result) alert(message);
    return result;
}

//金額を固定する人数が非アクティブだった場合は固定する金額を非アクティブにする
document.addEventListener('DOMContentLoaded', function() {
    const fixedPeopleInput = document.getElementById('fixed-people');
    const fixedAmountInput = document.getElementById('fixed-amount');
    fixedAmountInput.disabled = true;
    fixedPeopleInput.addEventListener('input', function() {
        if (fixedPeopleInput.value === '' || fixedPeopleInput.value === '0') {
            fixedAmountInput.disabled = true;
            fixedAmountInput.value = '';
        } else {
            fixedAmountInput.disabled = false;
        }
    });
});
