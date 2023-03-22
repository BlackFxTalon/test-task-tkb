function mountApp() {
    const dataFormTableTbody = document.querySelector('.data-form__table-tbody');
    const dataFormAddBtn = document.querySelector('.data-form__add-btn');
    const dataFormDeleteBtn = document.querySelector('.data-form__delete-btn');
    const headerInput = document.querySelector('.header__input');
    const dataForm = document.getElementById('data-form');
    const tableTbodyTrArray = [
       {
       id: `${crypto.randomUUID()}`, 
       inputFio: '', 
       selectOptions: ['аналитик', 'менеджер', 'программист', 'юрист'],
       inputAge: '',
       textArea: ''
       }
     ];

     let newTableTbodyTrArray = [];

    const addCryptoRandomUUIDToFirstEl = () => {
        let dataFormTableTbodyTr = document.querySelector('.data-form__table-tbody-tr');
        dataFormTableTbodyTr.setAttribute('id', `${crypto.randomUUID()}`);
    }
    
    const addTableTbodyTr = () => {
        newTableTbodyTrArray = tableTbodyTrArray.map(tableTbodyTrArr => {
            dataFormTableTbody.innerHTML += 
            `
            <tr class="data-form__table-tbody-tr" id="${tableTbodyTrArr.id}">
                            <td class="data-form__table-tbody-td">
                                <input type="text" class="data-form__input fio" name="fio" value="${tableTbodyTrArr.inputFio}" required>
                            </td>
                            <td class="data-form__table-tbody-td">
                                <select name="position" class="data-form__select">
                                    <option value="${tableTbodyTrArr.selectOptions[0]}" class="data-form__select-option" selected>${tableTbodyTrArr.selectOptions[0]}</option>
                                    <option value="${tableTbodyTrArr.selectOptions[1]}" class="data-form__select-option">${tableTbodyTrArr.selectOptions[1]}</option>
                                    <option value="${tableTbodyTrArr.selectOptions[2]}" class="data-form__select-option">${tableTbodyTrArr.selectOptions[2]}</option>
                                    <option value="${tableTbodyTrArr.selectOptions[3]}" class="data-form__select-option">${tableTbodyTrArr.selectOptions[3]}</option>
                                </select>
                            </td>
                            <td class="data-form__table-tbody-td">
                                <input type="number" class="data-form__input age" name="age" value="${tableTbodyTrArr.inputAge}" required>
                            </td>
                            <td class="data-form__table-tbody-td">
                                <textarea name="competencies" class="data-form__textarea competencies">${tableTbodyTrArr.textArea}</textarea>
                            </td>
                </tr>
            `; 

            return { id: tableTbodyTrArr.id, inputFio: tableTbodyTrArr.inputFio, selectOptions: [tableTbodyTrArr.selectOptions[0], tableTbodyTrArr.selectOptions[1], tableTbodyTrArr.selectOptions[2], tableTbodyTrArr.selectOptions[3]], inputAge: tableTbodyTrArr.inputAge, textArea: tableTbodyTrArr.textArea }
        })
    }

    const removeTableTbodyTr = () => {
        dataFormTableTbody.removeChild(dataFormTableTbody.lastElementChild);
    }

    const sendData = async () => {
         const formData = new FormData(dataForm);
         const formDataObj = Object.fromEntries(formData.entries());
         const jsonData = JSON.stringify(formDataObj); 

        //  for (const formDataValues of formData) {
           
        //     console.log(jsonData);
        //  }

        const response = await fetch('jsonToArray.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: jsonData,
        });

        if(response.ok) {
          console.log('успешно!');
        } 
        else {
           console.log(`ошибка: ${response.status}`);
        }
    }

    addCryptoRandomUUIDToFirstEl();

    dataFormAddBtn.addEventListener('click', ()=> {
         addTableTbodyTr();
     });

     dataFormDeleteBtn.addEventListener('click', ()=> {
        removeTableTbodyTr();
    });

    headerInput.addEventListener('input', ()=> {
        newTableTbodyTrArray = tableTbodyTrArray.map(tableTbodyTrArr => {
            return { id: tableTbodyTrArr.id, inputFio: tableTbodyTrArr.inputFio, selectOptions: [tableTbodyTrArr.selectOptions[0], tableTbodyTrArr.selectOptions[1], tableTbodyTrArr.selectOptions[2], tableTbodyTrArr.selectOptions[3]], inputAge: tableTbodyTrArr.inputAge, textArea: tableTbodyTrArr.textArea }
        });
    });

    dataForm.addEventListener('submit', (event)=> {
        event.preventDefault();
        sendData();
    })
}

mountApp();

