document.addEventListener('DOMContentLoaded', () => {
    console.log("The DOM has loaded")


    function getAllDogs() { 
        fetch('http://localhost:3000/dogs') 
        .then(res => res.json())
        .then(dogData => {
        
        dogData.forEach(dog =>  {
         renderDogTable(dog)   
        })       
        })   
    }
getAllDogs()       

    function renderDogTable(dog) {
        let dogTable = document.createElement('tr')
        
        let dogName = document.createElement('td')
        dogName.innerText = dog.name
        let dogBreed = document.createElement('td')
        dogBreed.innerText = dog.breed
        let dogSex = document.createElement('td')
        dogSex.innerText = dog.sex
        
        let editDogButton = document.createElement('button')
        editDogButton.innerText = 'Edit Dog'
       
        editDogButton.addEventListener('click', () => {
        let dogNameInput = document.querySelector('[name="name"]')
        dogNameInput.value = dog.name
        dogNameInput.id = dog.id
        let dogBreedInput = document.querySelector('[name="breed"]')
        dogBreedInput.value = dog.breed
        let dogSexInput = document.querySelector('[name="sex"]')
        dogSexInput.value = dog.sex   
        })
    
        document.querySelector("#table-body").append(dogTable)           
        dogTable.append(dogName)
        dogTable.append(dogBreed)
        dogTable.append(dogSex)
        dogTable.append(editDogButton)
    }


    
let dogSubmitForm = document.querySelector('#dog-form')
dogSubmitForm.addEventListener('submit', updateThisDog)
    function updateThisDog(e) {
       e.preventDefault()
       let newDogInput = document.querySelector('[name="name"]')
       let newDogBreedInput = document.querySelector('[name="breed"]')
       let newDogSexInput = document.querySelector('[name="sex"]')
       console.log(newDogInput.value)
       let updatedDog = {
        "name": newDogInput.value,
        "breed": newDogBreedInput.value,
        "sex": newDogSexInput.value
       }
        fetch(`http://localhost:3000/dogs/${newDogInput.id}`, {
        method: "PATCH", 
        headers: {
        "Content-Type": "application/json",
         Accept: "application/json"
        },
        
         body:JSON.stringify(updatedDog)
         
        })
        .then(res => res.json())
        .then(dog => {
            document.querySelector("#table-body").innerHTML = ""
                fetch('http://localhost:3000/dogs') 
                .then(res => res.json())
                .then(dogData => {
                dogData.forEach(dog =>  {
                renderDogTable(dog)   
        })    
    })

        })
    }
      

        // addEventListener
           
} )  
    
    
    //where can I put e.preventDefault


//${dog.id} at end of patch fetch?


    

