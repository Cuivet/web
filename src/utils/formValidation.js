export function minLengthValidation(inputData, minLength) {
    const {value}=inputData;
    const parent = inputData.parentElement;
    removeClassErrorSuccess(inputData,parent);
    if(value.length >= minLength){
        //inputData.classList.add("success");
        parent.classList.add("success");
        inputData.classList.add("success");
        return true;
    } else{
        //inputData.classList.add("error");
        parent.classList.add("error");
        inputData.classList.add("error");
        return false;
    }

}

export function emailValidation(inputData){
    const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const {value}= inputData;
    const parent = inputData.parentElement;

    removeClassErrorSuccess(inputData, parent);

    const resultValidation = emailValid.test(value);
    if(resultValidation){
        parent.classList.add("success");
        inputData.classList.add("success");
        return true;
    }else{
        parent.classList.add("error");
        inputData.classList.add("error");
        return false;
    };
}

//no haria falta hacer la comprobacion ya que el framework de antd hace automaticamente esto, 
//pero solo para comprobaciones de numeros, excluye la comprobacion de numeros enteros

export function numberValidation(inputData){
    //const numberValid = /^\d{1,2}\.?\d{3}\.?\d{3}$/;
    const numberValid = /[0-9]+$/;
    const {value} = inputData;
    const parent = inputData.parentElement;


    removeClassErrorSuccess(inputData, parent);

    const resultValidation = numberValid.test(value);

    if(resultValidation){
        parent.classList.add("success");
        inputData.classList.add("success");
        return true;
    }else{
        parent.classList.add("error");
        inputData.classList.add("error");
        return false;
    };
}
export function textValidation(inputData) {
    const textValid = /^[A-Za-z\s]+$/; // This regex matches letters and spaces
    const { value } = inputData;
    const parent = inputData.parentElement;

    removeClassErrorSuccess(inputData, parent);

    const resultValidation = textValid.test(value);

    if(resultValidation) {
        parent.classList.add("success");
        inputData.classList.add("success");
        return true;
    } else {
        parent.classList.add("error");
        inputData.classList.add("error");
        return false;
    }
}



export function removeClassErrorSuccess(inputData, parent){
    inputData.classList.remove("success");
    inputData.classList.remove("error");
    parent.classList.remove("success");
    parent.classList.remove("error");

}
