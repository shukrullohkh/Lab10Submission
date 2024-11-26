class Vehicle {
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }

    getDetails() {
        return `${this.year} ${this.make} ${this.model}`;
    }
}


class Car extends Vehicle {
    constructor(make, model, year, passengerCapacity) {
        super(make, model, year);
        this.passengerCapacity = passengerCapacity;
    }

    getDetails() {
        return `${super.getDetails()}, Seats: ${this.passengerCapacity}`;
    }
}


class Truck extends Vehicle {
    constructor(make, model, year, cargoCapacity) {
        super(make, model, year);
        this.cargoCapacity = cargoCapacity;
    }

    getDetails() {
        return `${super.getDetails()}, Cargo Capacity: ${this.cargoCapacity}`;
    }
}


const inventory = [];


function addVehicle(event) {
    event.preventDefault();
    const type = document.getElementById('vehicleType').value;
    const make = document.getElementById('make').value.trim();
    const model = document.getElementById('model').value.trim();
    const year = parseInt(document.getElementById('year').value.trim());
    const property = document.getElementById('specificProperty').value.trim();

    if (!make || !model || !year || isNaN(year) || !property) {
        alert('Please fill out all fields with valid values.');
        return;
    }

    if (type === 'Car' && isNaN(property)) {
        alert('Please enter a valid number for passenger capacity.');
        return;
    }
    if (type === 'Truck' && isNaN(property)) {
        alert('Please enter a valid number for cargo capacity.');
        return;
    }


    const vehicle = type === 'Car'
        ? new Car(make, model, year, property)
        : new Truck(make, model, year, property);


    inventory.push(vehicle);
    displayInventory();
    document.getElementById('vehicleForm').reset();
}


function displayInventory() {
    const inventoryList = document.getElementById('inventory');
    inventoryList.innerHTML = '';

    inventory.forEach((vehicle, index) => {
        const li = document.createElement('li');
        li.textContent = vehicle.getDetails();

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => {
            inventory.splice(index, 1);
            displayInventory();
        };

        li.appendChild(deleteButton);
        inventoryList.appendChild(li);
    });
}


function sortInventory() {
    const sortOption = document.getElementById('sortOption').value;
    inventory.sort((a, b) => (a[sortOption] > b[sortOption] ? 1 : -1));
    displayInventory();
}


function searchInventory() {
    const searchValue = document.getElementById('search').value.toLowerCase();
    const inventoryList = document.getElementById('inventory');
    inventoryList.innerHTML = '';

    inventory
        .filter(vehicle =>
            `${vehicle.make} ${vehicle.model} ${vehicle.year}`
                .toLowerCase()
                .includes(searchValue)
        )
        .forEach((vehicle, index) => {
            const li = document.createElement('li');
            li.textContent = vehicle.getDetails();

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => {
                inventory.splice(index, 1);
                displayInventory();
            };

            li.appendChild(deleteButton);
            inventoryList.appendChild(li);
        });
}


function exportInventory() {
    const dataStr = JSON.stringify(inventory, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'inventory.json';
    a.click();

    URL.revokeObjectURL(url);
}


const testCar = new Car('Lamborghini', 'Urus', 2023, 5);
console.log('Testing Car:', testCar.getDetails());
testCar.passengerCapacity = 5;
console.log('Updated Car:', testCar.getDetails());
inventory.push(testCar);

const testTruck = new Truck('Ford', 'F-150', 2022, 1500);
console.log('Testing Truck:', testTruck.getDetails());
testTruck.cargoCapacity = 2000;
console.log('Updated Truck:', testTruck.getDetails());
inventory.push(testTruck);

displayInventory();


document.getElementById('vehicleForm').addEventListener('submit', addVehicle);