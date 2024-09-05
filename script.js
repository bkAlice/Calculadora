const result = document.querySelector(".result"); /*PEGA A REF PRO RESULTADO NO VISOR */
const buttons = document.querySelectorAll(".buttons button");/*TODOS OS BOTAO DO HTML*/


/*VARIAVEIS*/
let currentNumber = "";/*NUMERO ATUAL*/
let firstOperand = null;/*PRIMEIRO NUMERO*/
let operator = null;/* OPERADOR ATUAL*/
let restart = false; /*reiniciar o numero apos uma operação*/
let displayValue = ""; // Adiciona esta linha para definir displayValue

function updateDisplay() {
  result.textContent = displayValue; // Sincroniza displayValue com o visor da calculadora
}


function clearEntry() { // remove o ultimo caractere do displayvalue FAZER FUNCIONAR
  currentNumber = currentNumber.slice(0, -1);
  displayValue = currentNumber || "0"; // Define o visor para 0 se estiver vazio
  updateDisplay()
  
}

/*FUNÇAO UPDATE RESULTE*/
function updateResult(originClear = false) { /*RECEBE UM PARAMETRO*//*É O QUE ATUALIZA O RESULTADO*/
  result.innerText = originClear ? 0 : currentNumber.replace(".", ",");/*VEM DO CLEAR ATUALIZA PRA ZERO SE NAO PEGA O NUMERO ATUAL*/
}

function addDigit(digit) { /*verifica de estou clicando no botão da , e se ja tem alguma , no visor*/
  if (digit === "," && (currentNumber.includes(",") || !currentNumber)) return;

  if (restart) {  /*variavel restart que vai ser true apenas quando calcular */
    currentNumber = digit;
    restart = false;
  } else {
    currentNumber += digit;/*continua concatenando*/
  }

  updateResult();/*atualiza em tela*/
}

function setOperator(newOperator) { /*se toca num operador ele ja efetua o calculo*/
  if (currentNumber) { /*verifica se tem numero atual*/  
    calculate();

    firstOperand = parseFloat(currentNumber.replace(",", "."));
    currentNumber = "";
  }

  operator = newOperator;
}

function calculate() { /*faz o calculo*/
  if (operator === null || firstOperand === null) return;
  let secondOperand = parseFloat(currentNumber.replace(",", "."));
  let resultValue;/*variavel*/

  switch (operator) { /*switch para os operadores */
    case "+":
      resultValue = firstOperand + secondOperand;
      break;
    case "-":
      resultValue = firstOperand - secondOperand;
      break;
    case "×":
      resultValue = firstOperand * secondOperand;
      break;
    case "÷":
      resultValue = firstOperand / secondOperand;
      break;
    default:
      return;
  }

  
  currentNumber = resultValue.toString();
  if (resultValue.toString().split(".")[1]?.length > 5) {
    currentNumber = parseFloat(resultValue.toFixed(5)).toString();
  }

  operator = null;
  firstOperand = null;
  restart = true;/*apos clicar em igual o prox num que eu clicar o visor ja reinicia*/
  updateResult(); /*chamo a função update, que atualiza o visor o resultado da operaçao*/
}

function clearCalculator() { /*comando para limpar a calculadora*/
  currentNumber = ""; /*fica vazio*/
  firstOperand = null;
  operator = null;
  updateResult(true);/*passa pelo parametro*/
}

function setPercentage() { /*a porcentagem*/
  let result = parseFloat(currentNumber) / 100;

  if (["+", "-"].includes(operator)) { /*e diferente mais e menos*/
    result = result * (firstOperand || 1);
  }

  if (result.toString().split(".")[1]?.length > 5) { /*verificação*/
    result = result.toFixed(5).toString();
  }

  currentNumber = result.toString();
  updateResult();
}

buttons.forEach((button) => {
  button.addEventListener("click", () => { /*add evento de click*/
    const buttonText = button.innerText; /*cria variavel button text (pega texto do botao que clica)*/
    if (/^[0-9,]+$/.test(buttonText)) { /*verificação com regecs*/
      addDigit(buttonText); /*chama função de digit que add digito no resultado*/
    } else if (["+", "-", "×", "÷"].includes(buttonText)) { /* colocados no array verifica se o botão clicado é um operador*/
      setOperator(buttonText);
    } else if (buttonText === "=") {
      calculate();
    } else if (buttonText === "C") { /*limpa*/
      clearCalculator();
    } else if (buttonText === "±") {
      currentNumber = (
        parseFloat(currentNumber || firstOperand) * -1
      ).toString();
      updateResult();
    } else if (buttonText === "%") {
      setPercentage();
    } else if (buttonText === "CE") {   
      clearEntry();
    }
  });
});