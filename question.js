// question => Sum up quantity having same price and same option(attempts in java script)
let data = [
    {
        price: 20,
        quantity: 25,
        option: "yes"
    },
    {
        price: 12,
        quantity: 25,
        option: "yes"
    },
    {
        price: 20,
        quantity: 25,
        option: "yes"
    },
    {
        price: 15,
        quantity: 25,
        option: "yes"
    },
    {
        price: 15,
        quantity: 5,
        option: "yes"
    }
]

// output 
let op =
    [
        {
            Price: 20,
            quantity: 50,
            option: "yes"

        },
        {
            Price: 12,
            quantity: 25,
            option: "yes"

        },
        {
            price: 15,
            quantity: 30,
            option: "yes"

        }
    ]


function sum(data) {
    let obj = {}
    for (let i = 0; i < data.length; i++) {
        const key = `${data[i].price}-${data[i].option}`
        if (obj[key]) {
            obj[key].quantity += data[i].quantity
        } else {
            obj[key] = { ...data[i] };
        }
    }
    const newData = Object.values(obj)
    return newData
}
console.log("newData", sum(data));
