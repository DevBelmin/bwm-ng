const Rental = require('./rental');
const User = require('./user');

class FakeDB {
    constructor() {
        this.rentals = [{
            title: "Nice view on ocean",
            city: "San Francisco",
            street: "Main street",
            category: "condo",
            image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
            bedrooms: 4,
            shared: true,
            description: "Very nice apartment in center of the city.",
            dailyRate: 43
        },
        {
            title: "Modern apartment in center",
            city: "New York",
            street: "Time Square",
            category: "apartment",
            image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
            bedrooms: 1,
            shared: false,
            description: "Very nice apartment in center of the city.",
            dailyRate: 11
        },
        {
            title: "Old house in nature",
            city: "Spisska Nova Ves",
            street: "Banicka 1",
            category: "house",
            image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
            bedrooms: 5,
            shared: true,
            description: "Very nice apartment in center of the city.",
            dailyRate: 23
        }];

        this.users = [
            {
                username: 'musterman',
                password: 'Password1!',
                email: 'musterman@test.com',
                rentals : []
            }
        ];
    }

    pushRentalsToDb() {
        const user = new User(this.users[0]);

        this.rentals.forEach((rental) => {
            const newRental = new Rental(rental);
            newRental.user = user;

            user.rentals.push(new Rental(newRental));
            newRental.save();
        });

        user.save();
    }

    pushUsersToDb() {
        this.users.forEach((user)=>{
            const newUser = new User(user);
            newUser.save(function(err) {
                if (err) {
                    console.log("Error while trying to save the user to the DB.");
                }
            });
        });
    }

    async seedDb() {
        await this.cleanDb();
        //this.pushUsersToDb();
        this.pushRentalsToDb();
    }

    async cleanDb() {
        await Rental.deleteMany();
        await User.deleteMany();
    }
}

module.exports = FakeDB;